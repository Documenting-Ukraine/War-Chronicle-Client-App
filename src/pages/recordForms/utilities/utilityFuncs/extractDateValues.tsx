import { FormDataIndexType } from "./extractStringFormData";
export const extractDateValues = ({
  name,
  formData,
  timeInput,
}: {
  name: string;
  formData: FormDataIndexType;
  timeInput: boolean;
}): Date | undefined => {
  const nameRegex = new RegExp(name);
  const dateRegex = new RegExp(name + "Date");
  const timeRegex = new RegExp(name + "Time");
  const dateKeys = Object.entries(formData).filter(([key, value]) =>
    nameRegex.test(key)
  );
  if (dateKeys.length <= 0) return undefined;
  const date = dateKeys.filter(([key, value]) => dateRegex.test(key));
  const time = dateKeys.filter(([key, value]) => timeRegex.test(key));
  if (date.length > 0 && time.length > 0)
    return new Date(`${date[0][1].toString()}T${time[0][1].toString()}`);
  else if (date.length > 0) return new Date(date[0][1].toString());
  else return new Date();
};
