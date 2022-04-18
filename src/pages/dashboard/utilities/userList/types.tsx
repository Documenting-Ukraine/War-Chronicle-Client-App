interface UserSortOrder {
  key: "name" | "join_date";
  direction: "ascending" | "descending";
}

export const isUserSortOrder = (arg: any): arg is UserSortOrder => {
    try {
      const direction = arg.direction; ;
      const validDirection = (direction === "ascending" || direction === "descending");
      const validKey = arg.key === "name" || arg.key === "join_date"
      return validDirection && validKey
    } catch (e) {
      return false;
    }
}

export type UserSortProps = UserSortOrder | undefined;
