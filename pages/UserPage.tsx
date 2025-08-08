import type { Route } from ".react-router/types/app/+types/root";
import { ListView } from "@hyperscal/core/component/ListView/ListView";
import type { ListViewDefinition } from "@hyperscal/core/component/ListView/types";
import { Dialog } from "@hyperscal/ui/atoms";
import type { FieldConfig } from "@hyperscal/ui/atoms/form-inputs/form-input.types";
import { FullWidthContainer } from "@hyperscal/ui/templates/FullWidthContainer";
import UsersCreateDialog from "../components/dialog/UserCreateDialog";
import UsersAction from "../components/table/UsersTableAction";
import UsersCell from "../components/table/UsersTableCell";
import UsersHeader from "../components/table/UsersTableHeader";

interface UsersLoaderData {
  config: ListViewDefinition;
  messages: Record<string, string>;
  schema: FieldConfig<Record<string, unknown>>[];
}

const UsersPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  if (!loaderData) {
    return (
      <FullWidthContainer>
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      </FullWidthContainer>
    );
  }

  const { config, messages, schema } = loaderData as UsersLoaderData;

  return (
    <FullWidthContainer>
      {/**
       * TODO
       * add alert / toast for action results
       * e.g. user created, updated, deleted
       */}
      <Dialog>
        <ListView
          columns={config.columns}
          endpoint={config.endpoint}
          name={config.name}
          messages={messages}
          headerTemplate={UsersHeader}
          cellTemplate={UsersCell}
          rowActionsTemplate={UsersAction}
        />
        <UsersCreateDialog schema={schema} />
      </Dialog>
    </FullWidthContainer>
  );
};

UsersPage.displayName = "UsersPage";

export default UsersPage;
