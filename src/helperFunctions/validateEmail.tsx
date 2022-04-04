const validEmail = (str: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const test = emailRegex.test(str)
    return {err: !test, message: !test ? "Invalid email": ''}
}   
export default validEmail