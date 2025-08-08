import type { Route } from ".react-router/types/app/+types/root";
import type {
  ColumnDefinition,
  EnumColumnDefinition,
  ListViewDefinition,
} from "@hyperscal/core/component/ListView/types";
import { getCombinedTranslationMessages } from "@hyperscal/core/libs/translation/tServer";
import { Methods } from "@hyperscal/core/types/panel";
import { UserClient } from "app/user-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const userClient = new UserClient(request);
    await userClient.verifySession();

    const messages = await getCombinedTranslationMessages({
      filters: "components.filters",
    });

    const config: ListViewDefinition = {
      name: "User Management",
      columns: [
        {
          name: "display_name",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Display Name",
        },
        {
          name: "username",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Username",
        },
        {
          name: "email_address",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Email",
        },
        {
          name: "job_title",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Job Title",
        },
        {
          name: "user_status",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Status",
        },
        {
          name: "created_at",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Created At",
        },
        {
          // name: "last_activity",
          name: "updated_at",
          filterType: "text",
          showByDefault: true,
          sortable: true,
          label: "Last Activity",
        },
      ] satisfies Array<ColumnDefinition | EnumColumnDefinition>,
      endpoint: {
        uri: `/api/v1.0/iam/tenant/users`,
        method: Methods.Get,
      },
    } satisfies ListViewDefinition;

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
      {
        name: "date_of_birth",
        type: "date",
        rules: {
          kind: "date",
          pastOnly: true,
        },
        label: {
          text: "Date Field",
        },
        config: {
          placeholder: "Date of Birth",
        },
      },
    ];

    return {
      messages,
      config,
      schema,
    };
  } catch (error) {
    throw new Response(
      JSON.stringify({
        error: "Failed to load user data",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
