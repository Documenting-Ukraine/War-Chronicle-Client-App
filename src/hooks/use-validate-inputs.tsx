import { useState } from "react"

const useValidateInput = ():[boolean, (e: boolean) => boolean] => {
    const [err, setErr] = useState(false)
    const validateInput = (
        condition: boolean
    ) => {
        if (!condition) setErr(true)
        else setErr(false)
        return condition
    }
    return [err, validateInput]
}
export default useValidateInput