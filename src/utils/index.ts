const returnAsJson = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

export default returnAsJson;
