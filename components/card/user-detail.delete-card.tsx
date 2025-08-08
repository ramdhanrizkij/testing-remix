import { Button, Dialog, DialogTrigger } from "@hyperscal/ui/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@hyperscal/ui/molecules";
import UserDetailDeleteDialog from "../dialog/user-detail.delete-dialog";

interface UserDetailDeleteCardProps {
  readonly username: string;
  readonly onDelete: () => void;
  readonly isLoading: boolean;
}

/**
 * UserDetailDeleteCard component provides UI for deleting a user account.
 * Displays a card with delete action and confirmation dialog.
 */
const UserDetailDeleteCard: React.FC<UserDetailDeleteCardProps> = ({ username, onDelete, isLoading }) => {
  return (
    <Dialog>
      <Card className="mx-auto max-w-[420px] bg-neutral-30">
        <CardHeader className="grid-cols-2 items-center">
          <CardTitle>Delete this user</CardTitle>
          <DialogTrigger asChild>
            <Button
              variant="negative"
              className="w-fit justify-self-end"
              aria-label={`Delete user ${username}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Delete"}
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent>
          <p>
            Permanently remove this user from the system. This action will delete all user data, revoke access
            permissions, and cannot be reversed. Please ensure you have a backup if needed.
          </p>
        </CardContent>
      </Card>
      <UserDetailDeleteDialog username={username} onDelete={onDelete} isLoading={isLoading} />
    </Dialog>
  );
};

UserDetailDeleteCard.displayName = "UserDetailDeleteCard";

export default UserDetailDeleteCard;
