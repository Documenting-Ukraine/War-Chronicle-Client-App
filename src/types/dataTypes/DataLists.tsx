//missing lists
export interface ReadonlyArray<T> {
  includes<U>(x: U & (T & U extends never ? never : unknown)): boolean;
}
export const isInList = (e: string, a: readonly any[]) => {
  try {
    return a.includes(e);
  } catch (a) {
    return false;
  }
};
export const WarCrimeTypes = [
  "Attacks on Civilians",
  "Destruction of Culture"
] as const;
export const WarCrime = WarCrimeTypes as ReadonlyArray<string>;
export const isWarCrime = (e: string): e is typeof WarCrimeTypes[number] => {
  try {
    return WarCrime.includes(e);
  } catch (a) {
    return false;
  }
};
//International Response
export const Countries = [] as const;
export const AidTypes = [] as const;

//Disinformation
export const Disinformation = [] as const;

//Russia
export const ResponseType = [] as const;
export const CorporationIndustry = [] as const;
export const OrganizationType = [] as const;
