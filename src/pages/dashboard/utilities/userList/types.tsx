interface NameOrder {
  name: "ascending" | "descending";
}
interface JoinOrder {
  joined: "ascending" | "descending";
}
export function generalIsOrder(arg: any, key: string) {
  try {
    const argkey = Object.keys(arg)[0];
    return argkey === key && (arg[key] === "ascending" || arg[key] === "descending");
  } catch (e) {
    return false;
  }
}
export const isName = (arg: any): arg is NameOrder =>
  generalIsOrder(arg, "name");
export const isJoin = (arg: any): arg is JoinOrder =>
  generalIsOrder(arg, "joined");

export type UserSortProps = NameOrder | JoinOrder;
