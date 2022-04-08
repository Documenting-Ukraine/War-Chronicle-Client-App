import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../../realm/RealmApp";
interface ContributionsData{
    
    creation_date: "string",
}
export type {ContributionsData}
function isContributionsData(arg: any): arg is ContributionsData {
  if (!arg) return false;
  const keys = Object.keys(arg);
  const check = keys.every(
    (key) => typeof arg[key] === "number" && typeof key === "string"
  );
  return check;
}
export const fetchContributions = createAsyncThunk(
  "dashboard/fetchContributions",
  async (app: RealmApp): Promise<ContributionsData | null> => {
    const userData = await app.currentUser?.callFunction(
      "read_contributions"
    );
    if (isContributionsData(userData)) return userData;
    return null;
  }
);
