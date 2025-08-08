import { Button, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "@hyperscal/ui/atoms";

interface UserDetailDeactivateDialogProps {
  readonly username: string;
  readonly onDeactivate: () => void;
  readonly isLoading: boolean;
}

/**
 * UserDetailDeactivateDialog component provides confirmation dialog for user deactivation.
 */
const UserDetailDeactivateDialog: React.FC<UserDetailDeactivateDialogProps> = ({
  username,
  onDeactivate,
  isLoading,
}) => {
  return (
    <DialogContent dock="center" size="small">
      <DialogHeader>Deactivate user "{username}"</DialogHeader>
      <DialogBody>
        <p>
          Are you sure you want to deactivate this user? They will lose access to the system but their data will be
          preserved and the account can be reactivated later.
        </p>
      </DialogBody>
      <DialogFooter className="flex gap-4">
        <DialogClose asChild>
          <Button variant="default" size="fill" aria-label="Cancel deactivation">
            Cancel
          </Button>
        </DialogClose>
        <Button
          variant="negative"
          size="fill"
          onClick={onDeactivate}
          disabled={isLoading}
          aria-label={isLoading ? "Deactivating user..." : `Confirm deactivation of user ${username}`}
        >
          {isLoading ? "Deactivating..." : "Deactivate"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

UserDetailDeactivateDialog.displayName = "UserDetailDeactivateDialog";

export default UserDetailDeactivateDialog;
