import OccupationFile from "./OccupationList.json";
export const isOption = (e: any): e is Option => {
  try {
    return e.value && e.label;
  } catch (e) {
    return false;
  }
};
interface Option {
  readonly value: string;
  readonly label: string;
}
interface GroupedOption {
  readonly label: string;
  readonly options: readonly Option[];
}
const occupationDataKeys = Object.keys(OccupationFile);
const transformOptions = (value: string) => {
  return { value: value, label: value };
};
export const transformSingleList = (
  list: string[] | readonly string[]
): Option[] => {
  return list.map((key) => {
    return {
      label: key,
      value: key,
    };
  });
};
const occupationData: GroupedOption[] = occupationDataKeys.map((key) => {
  const groupName = key;
  const groupOptions = OccupationFile[key].map((value) =>
    transformOptions(value)
  );
  return {
    label: groupName,
    options: groupOptions,
  };
});

export { occupationData, transformOptions };
export type { GroupedOption, Option };
