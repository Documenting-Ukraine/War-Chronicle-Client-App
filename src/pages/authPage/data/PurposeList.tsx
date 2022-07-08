import { transformOptions } from "./OccupationList";
interface PurposeOption {
    readonly value: string,
    readonly label: string
}
const optionsArr = ["Research", "Education", "Personal Curiosity", "Other"];
const purposeList: PurposeOption[] = optionsArr.map((option)=> transformOptions(option))
export { purposeList }
export type{PurposeOption}