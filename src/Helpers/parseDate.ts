const parseDate = (string: string) => {
  return string
    .split(" ")
    .map((e) => {
      return e.match(/^\d{1,2}[.-/]\d{1,2}[.-/](\d{2}|\d{4})$/) !== null ? e : "";
    })
    .filter((e) => e !== "");
};

export { parseDate };
