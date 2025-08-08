import { Size, Variant } from "@hyperscal/core/types/styles";
import { Button } from "@hyperscal/core/ui/Button";
import { DialogTrigger } from "@hyperscal/ui/atoms";

const UsersHeader = () => {
  return (
    <DialogTrigger asChild>
      <div className="flex items-center px-4 py-2">
        <Button variant={Variant.Primary} size={Size.Medium}>
          Create New
        </Button>
      </div>
    </DialogTrigger>
  );
};

UsersHeader.displayName = "UsersHeader";
export default UsersHeader;
