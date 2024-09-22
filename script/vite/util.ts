const firstCharUpperCase = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
};

const handleTagName = (tagName: string) => {
  return tagName.toLowerCase();
};

const switchTagName = (tagNames: string[], code: string) => {
  code = code.replace(
    new RegExp(`${tagNames.map((item) => item.toLowerCase()).join("|")}`, "g"),
    (match: string) => {
      return firstCharUpperCase(match);
    }
  );

  return code;
};

export { firstCharUpperCase, handleTagName, switchTagName };
