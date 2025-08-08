import type { Route } from ".react-router/types/app/+types/root";
import { FormGenerator } from "@hyperscal/form/form-generator";
import type { FormGeneratorRef } from "@hyperscal/form/types";
import { Button } from "@hyperscal/ui/atoms";
import type { FieldConfig } from "@hyperscal/ui/atoms/form-inputs/form-input.types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@hyperscal/ui/molecules";
import { FullWidthContainer } from "@hyperscal/ui/templates/FullWidthContainer";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import UserDetailDeactivateCard from "../components/card/UserDetailDeactivateCard";
import UserDetailDeleteCard from "../components/card/user-detail.delete-card";
import type { UpdateUserRequest, UserType } from "../user.type";

type LoaderData = {
  userDetailData: UserType;
  schema: FieldConfig<Record<string, unknown>>[];
};

const UserDetailPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const formRef = useRef<FormGeneratorRef>(null);
  const fetcher = useFetcher();

  const actionError = fetcher.data?.error;
  useEffect(() => {
    if (fetcher.data && !fetcher.data.error && fetcher.state === "idle") {
      console.log("User details updated successfully:", fetcher.data);
    }
  }, [fetcher.data, fetcher.state]);

  useEffect(() => {
    if (actionError && fetcher.state === "idle") {
      console.log("Error occurred:", actionError);
    }
  }, [actionError, fetcher.state]);

  if (!loaderData) {
    return (
      <FullWidthContainer>
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">Loading user details...</p>
        </div>
      </FullWidthContainer>
    );
  }

  const { userDetailData, schema } = loaderData as LoaderData;

  const handleEditSubmitForm = () => {
    formRef.current?.handleSubmit();
  };

  const formEditSubmitHandler = async (formData: Record<string, unknown>) => {
    const payload: UpdateUserRequest = {
      first_name: formData.first_name as string,
      last_name: formData.last_name as string,
      job_title: formData.job_title as string,
      display_name: formData.display_name as string,
      // TODO: update this after form schema is updated
      // date_of_birth: formData.date_of_birth as string,
      date_of_birth: "2000-01-01", // Placeholder, adjust as needed
      thumbnail_url: formData.thumbnail_url as string,
      gender: formData.gender as string,
    };
    fetcher.submit({ _action: "update", payload: JSON.stringify(payload) }, { method: "post" });
  };

  const handleDeactivate = () => {
    fetcher.submit({ _action: "deactivate" }, { method: "post" });
  };

  const handleDelete = () => {
    fetcher.submit({ _action: "delete" }, { method: "post" });
  };

  return (
    <FullWidthContainer>
      <div className="flex flex-col gap-4">
        <Card className="mx-auto w-[420px] py-0">
          <CardHeader className="!py-3 border-b px-4">
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <FormGenerator
              ref={formRef}
              schema={schema}
              initialValues={userDetailData as UserType}
              onSubmit={formEditSubmitHandler}
              submitButton={false}
            />
          </CardContent>
          <CardFooter className="!py-3 justify-end border-t bg-neutral-30 px-4">
            <Button
              variant="primary"
              className="mr-2"
              type="submit"
              onClick={handleEditSubmitForm}
              aria-label="Save user changes"
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        <UserDetailDeactivateCard
          username={userDetailData.username}
          onDeactivate={handleDeactivate}
          isLoading={false}
          isDisabled={false}
        />

        <UserDetailDeleteCard username={userDetailData.username} onDelete={handleDelete} isLoading={false} />
      </div>
    </FullWidthContainer>
  );
};

UserDetailPage.displayName = "UserDetailPage";

export default UserDetailPage;
