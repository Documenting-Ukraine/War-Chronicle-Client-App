import parsePhoneNumber from "libphonenumber-js";
const validPhoneNum = (str: string) => {
    const number = parsePhoneNumber(str, 'US')
    const isValid = number?.isValid()

    return {err: !isValid, message: !isValid? 'Invalid Phone Number' : ''}
}
export default validPhoneNum