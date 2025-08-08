import { Card, CardContent, CardHeader, CardTitle } from "@hyperscal/ui";
import { Button, Dialog, DialogTrigger } from "@hyperscal/ui/atoms";
import UserDetailDeactivateDialog from "../dialog/users-detail.deactivate-dialog";

interface UserDetailDeactivateCardProps {
  readonly username: string;
  readonly onDeactivate: () => void;
  readonly isLoading: boolean;
  readonly isDisabled: boolean;
}

/**
 * UserDetailDeactivateCard component provides UI for deactivating a user account.
 * Displays a card with deactivate action and confirmation dialog.
 */
const UserDetailDeactivateCard: React.FC<UserDetailDeactivateCardProps> = ({
  username,
  onDeactivate,
  isLoading,
  isDisabled,
}) => {
  return (
    <Dialog>
      <Card className="mx-auto max-w-[420px] bg-neutral-30">
        <CardHeader className="grid-cols-2 items-center">
          <CardTitle>Deactivate this user</CardTitle>
          <DialogTrigger asChild>
            <Button
              variant="negative"
              className="w-fit justify-self-end"
              aria-label={`Deactivate user ${username}`}
              disabled={isDisabled || isLoading}
            >
              {isLoading ? "Processing..." : "Deactivate"}
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent>
          <p>
            Temporarily disable this user's access to the system. The user will not be able to log in or access any
            resources until their account is reactivated. User data will be preserved and can be restored later.
          </p>
        </CardContent>
      </Card>
      <UserDetailDeactivateDialog username={username} onDeactivate={onDeactivate} isLoading={isLoading} />
    </Dialog>
  );
};

UserDetailDeactivateCard.displayName = "UserDetailDeactivateCard";

export default UserDetailDeactivateCard;
