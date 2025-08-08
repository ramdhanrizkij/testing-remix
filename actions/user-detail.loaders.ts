import type { Route } from ".react-router/types/app/+types/root";
import { UserClient } from "app/user-client";
import { UserService } from "../services/user.services";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  try {
    const userClient = new UserClient(request);
    await userClient.verifySession();
    const userService = new UserService(userClient);
    const { id } = params;

    if (!id) {
      return Response.json(
        {
          error: "User ID is required",
        },
        { status: 400 },
      );
    }

    const userDetailData = await userService.getUserDetail(id);

    if (!userDetailData) {
      return Response.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }

    const schema = [
      {
        name: "first_name",
        type: "text",
        label: { text: "First Name" },
        config: {
          placeholder: "First Name",
          required: true,
        },
      },
      {
        name: "last_name",
        type: "text",
        label: { text: "Last Name" },
        config: {
          placeholder: "Last Name",
        },
      },
      {
        name: "display_name",
        type: "text",
        label: { text: "Display Name" },
        config: {
          placeholder: "Display Name",
        },
      },
      {
        name: "email_address",
        type: "email",
        label: { text: "Email Address" },
        config: {
          placeholder: "Email Address",
          required: true,
        },
      },
      {
        name: "job_title",
        type: "text",
        label: { text: "Job Title" },
        config: {
          placeholder: "Job Title",
          required: true,
        },
      },
      {
        name: "username",
        type: "text",
        label: { text: "Username" },
        config: {
          placeholder: "Username",
          required: true,
        },
      },
      // {
      //   name: "date_of_birth",
      //   type: "date",
      //   label: { text: "Date of Birth" },
      //   config: {
      //     placeholder: "Date of Birth",
      //     required: true,
      //   },
      // },
      // TODO: Replace with enum type when available from backend
      {
        name: "gender",
        type: "dropdown",
        config: {
          kind: "dropdown",
          options: [
            { label: "Male", value: "43c645de-db9b-4c55-bb8b-43428a840e56" },
            { label: "Female", value: "8630cb43-7ac5-4b80-b58a-22204ee17a45" },
            { label: "Unknown", value: "b8d14a80-49f2-4a44-ade0-df74d0881dce" },
            { label: "Others", value: "1d68447b-c77c-44f9-a7db-785eaea449ed" },
          ],
          placeholder: "Gender",
        },
        label: {
          text: "Gender",
        },
      },
    ];

    return {
      userDetailData,
      schema,
    };
  } catch (error) {
    throw new Response(
      JSON.stringify({
        error: "Failed to load user detail data",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
