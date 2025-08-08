import { UserClient } from "app/user-client";
import type { ActionFunctionArgs } from "react-router";
import { UserService } from "../services/user.services";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const userData = formData.get("userInformation") as string;

    if (!userData) {
      return {
        error: "User data is required",
        success: false,
      };
    }

    const payload = JSON.parse(userData);

    const userClient = new UserClient(request);
    await userClient.verifySession();

    const userService = new UserService(userClient);
    const result = await userService.createUser(payload);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Failed to create user:", error);

    return {
      error: error instanceof Error ? error.message : "Failed to create user",
      success: false,
    };
  }
}
