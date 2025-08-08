import type { RowActionTemplateProps } from "@hyperscal/core/component/DataTable/type";
import { IconType } from "@hyperscal/core/icons/Icons";
import { Variant } from "@hyperscal/core/types/styles";
import { Button } from "@hyperscal/core/ui/Button";
import type { FC } from "react";

const UsersAction: FC<RowActionTemplateProps> = ({ row }) => {
  return (
    <div className="flex gap-4">
      {/**
       * TODO: add link to handle actions like edit, delete, etc.
       */}
      <Button variant={Variant.Plain} leftIcon={IconType.Note} onClick={() => alert(`Edit user ${row.uuid}`)} />
      <Button variant={Variant.Plain} leftIcon={IconType.Trash} onClick={() => console.log("Delete user", row.uuid)} />
    </div>
  );
};

UsersAction.displayName = "UsersAction";
export default UsersAction;
