import Alert from "@components/Alert";
import type { FormGeneratorRef } from "@hyperscal/form/form-generator";
import { FormGenerator } from "@hyperscal/form/form-generator";
import { Button, DialogBody, DialogContent, DialogFooter, DialogHeader } from "@hyperscal/ui/atoms";
import type { FieldConfig } from "@hyperscal/ui/atoms/form-inputs/form-input.types";
import { type FC, useEffect, useRef, useState } from "react";
import { useFetcher, useNavigate } from "react-router";

interface UsersCreateDialogProps {
  schema: FieldConfig<Record<string, unknown>>[];
}

const UsersCreateDialog: FC<UsersCreateDialogProps> = ({ schema }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<FormGeneratorRef>(null);

  // TODO: change this to use mutation
  const actionError = fetcher.data?.error;
  const isSubmitting = fetcher.state === "submitting";

  // Show toast when error occurs
  useEffect(() => {
    if (actionError && fetcher.state === "idle") {
      setError(actionError);
    }
  }, [actionError, fetcher.state]);

  // Show success toast when entity is created successfully
  useEffect(() => {
    if (fetcher.data && !fetcher.data.error && fetcher.state === "idle") {
      // TODO: close dialog and show success message on list view
      navigate(0);
    }
  }, [fetcher.data, fetcher.state, navigate]);

  const onSubmitHandler = async (formData: Record<string, unknown>) => {
    fetcher.submit(
      { userInformation: JSON.stringify(formData) },
      {
        method: "post",
      },
    );
  };

  const handleOnClick = () => {
    formRef.current?.handleSubmit();
  };

  return (
    <DialogContent dock="center" size="medium">
      <DialogHeader showCloseBtn>Create New User</DialogHeader>
      <DialogBody className="max-h-[28rem] overflow-y-auto">
        <Alert
          title="Failed to create user"
          message={error || "An error occurred while creating the user."}
          showAlert={error !== null}
        />
        <FormGenerator
          ref={formRef}
          schema={schema}
          initialValues={{}}
          onSubmit={onSubmitHandler}
          submitButton={false}
        />
      </DialogBody>
      <DialogFooter className="flex justify-end border-t bg-neutral-30">
        <Button variant="primary" loading={isSubmitting} onClick={handleOnClick}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

UsersCreateDialog.displayName = "UsersCreateDialog";
export default UsersCreateDialog;
