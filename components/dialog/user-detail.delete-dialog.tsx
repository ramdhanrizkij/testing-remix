import { Button, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "@hyperscal/ui/atoms";

interface UserDetailDeleteDialogProps {
  readonly username: string;
  readonly onDelete: () => void;
  readonly isLoading: boolean;
}

/**
 * UserDetailDeleteDialog component provides confirmation dialog for user deletion.
 */
const UserDetailDeleteDialog: React.FC<UserDetailDeleteDialogProps> = ({ username, onDelete, isLoading }) => {
  return (
    <DialogContent dock="center" size="small">
      <DialogHeader>Delete user "{username}"</DialogHeader>
      <DialogBody>
        <p>
          Are you sure you want to delete this user? This action cannot be undone and will permanently remove all user
          data and access permissions.
        </p>
      </DialogBody>
      <DialogFooter className="flex gap-4">
        <DialogClose asChild>
          <Button variant="default" size="fill" aria-label="Cancel deletion">
            Cancel
          </Button>
        </DialogClose>
        <Button
          variant="negative"
          size="fill"
          onClick={onDelete}
          disabled={isLoading}
          aria-label={isLoading ? "Deleting user..." : `Confirm deletion of user ${username}`}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

UserDetailDeleteDialog.displayName = "UserDetailDeleteDialog";

export default UserDetailDeleteDialog;
