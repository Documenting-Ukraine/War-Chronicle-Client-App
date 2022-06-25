export type FormDataIndexType = {
  [key: string]: FormDataEntryValue;
};
export const extractStringFormData = (
  key: string,
  formData: FormDataIndexType
): string => {
  const formValue = formData[key] ? formData[key].toString() : "";
  return formValue;
};
