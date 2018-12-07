export const deserialize = data => {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      throw new Error("JSON could not be parsed.");
    }
  } else if (typeof data === "object") {
    return data;
  } else {
    throw new Error("ArcGIS data must be JSON or JavaScript object.");
  }
};
