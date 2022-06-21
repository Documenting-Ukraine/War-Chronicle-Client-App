const transformCamelToSnakeCase = (str: string): string => {
  const upperCaseRegex = /[A-Z0-9][^A-Z0-9]*/g;
  const upperCaseWords = str.match(upperCaseRegex);
  const firstCapital = str.search(upperCaseRegex);
  if (upperCaseWords) {
    const newStr = upperCaseWords.reduce(
      (a, b) => a.toLowerCase() + "_" + b.toLowerCase(),
      str.substring(0, firstCapital)
    );
    return newStr;
  } else return str;
};
export default transformCamelToSnakeCase;
