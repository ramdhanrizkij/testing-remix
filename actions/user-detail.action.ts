import { Methods } from "@hyperscal/core/types/panel";
import { UserClient } from "app/user-client";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;

  if (!id) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const actionType = formData.get("_action") as string;

    const userClient = new UserClient(request);
    await userClient.verifySession();

    switch (actionType) {
      case "update": {
        const userData = formData.get("userData");
        if (!userData) {
          return Response.json({ error: "User data is required for update" }, { status: 400 });
        }

        const payload = JSON.parse(userData as string);

        const response = await userClient.fetch(
          `${process.env.HYPERSCAL_BACKEND_BASE_URL}/v1.0/iam/tenant/users/${id}`,
          {
            method: Methods.Put,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to update user: ${response.status}`);
        }

        return Response.json({
          success: true,
          data: await response.json(),
          message: "User updated successfully",
        });
      }

      case "deactivate": {
        // TODO: Implement deactivation logic when available
        // const response = await userClient.fetch(
        //   `${process.env.HYPERSCAL_BACKEND_BASE_URL}/v1.0/iam/tenant/users/${id}`,
        //   {
        //     method: Methods.Post,
        //   },
        // );

        // if (!response.ok) {
        //   const errorData = await response.json().catch(() => ({}));
        //   throw new Error(errorData.message || `Failed to deactivate user: ${response.status}`);
        // }

        const response = { success: true, data: { id }, message: "User deactivated successfully" };

        return Response.json({
          success: true,
          // data: await response.json(),
          data: response,
          message: `User ${id} deactivated successfully`,
        });
      }

      case "delete": {
        const response = await userClient.fetch(
          `${process.env.HYPERSCAL_BACKEND_BASE_URL}/v1.0/iam/tenant/users/${id}`,
          {
            method: Methods.Delete,
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to delete user: ${response.status}`);
        }

        return Response.json({
          success: true,
          data: await response.json(),
          message: `User ${id} deleted successfully`,
        });
      }

      default:
        return Response.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("User detail action error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to perform user operation",
        success: false,
      },
      { status: 500 },
    );
  }
}
