import type { CellTemplateProps } from "@hyperscal/core/component/DataTable/type";
import { DateFormatter } from "@hyperscal/core/libs/date";
import { Button, IconType } from "@hyperscal/ui/atoms";
import type { FC } from "react";
import { Link } from "react-router";

const UsersCell: FC<CellTemplateProps> = ({ row, column, ...props }) => {
  const renderCellContent = () => {
    switch (column.name) {
      case "display_name":
        return (
          <Link to={`/systems/users/${row.uuid}`}>
            <Button leftIcon={IconType.User} variant="link">
              {row.display_name}
            </Button>
          </Link>
        );
      // todo: update this to use component
      // case "active_status": {
      //   return (
      //     <CellActiveStatusIndicator
      //       isActive={row.active_status as ActiveStatusEnum}
      //       activeLabel="Active"
      //       inactiveLabel="Deactivated"
      //     />
      //   );
      // }
      case "created_at": {
        const date = new DateFormatter(row.created_at);
        return <div>{date.format("DD/MM/YYYY")}</div>;
      }
      case "updated_at": {
        const date = new DateFormatter(row.updated_at);
        return <div>{date.format("DD/MM/YYYY HH:mm:ss")}</div>;
      }

      default:
        return <div>{row[column.name] || "-"}</div>;
    }
  };

  const { ...domProps } = props;

  return <div {...domProps}>{renderCellContent()}</div>;
};

UsersCell.displayName = "UsersCell";
export default UsersCell;
