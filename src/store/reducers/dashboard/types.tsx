type GenericDashboardData<T> = {
  data: T | null;
  status: "success" | "loading" | "failed";
};
export type {GenericDashboardData}