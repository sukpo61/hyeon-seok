interface labeltype {
  name: string;
  value: string;
}

export const labelDataConvert = (initialData: string, labels: labeltype[]) => {
  let resultData = "";
  for (const { name, value } of labels) {
    if (initialData === value) {
      resultData = name;
      break;
    }
  }
  return resultData;
};
