
import OccupationFile from "./OccupationList.json"
interface Option {
    readonly value: string, 
    readonly label: string
}
interface GroupedOption {
  readonly label: string;
  readonly options: readonly Option[];
}
const occupationDataKeys = Object.keys(OccupationFile)
const transfromOptions = (value: string) => {
    return{value: value, label: value}
}
const occupationData: GroupedOption[] = occupationDataKeys.map((key) => {
    const groupName = key
    const groupOptions = OccupationFile[key].map((value) => transfromOptions(value))
    return {
        label: groupName,
        options: groupOptions
    }
})

export { occupationData, transfromOptions};
export type { GroupedOption, Option }
