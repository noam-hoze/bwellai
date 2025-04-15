export function getEnumName(enumObj: any, value?: number, defaultName = "") {
  return (
    (typeof enumObj === "function" &&
      value &&
      Object.keys(enumObj).find((key) => enumObj[key] === value)) ||
    defaultName
  );
}

// export function makeEnumFromName(enumObj: any, name: string) {
//   console.log("makeEnumFromName", name, enumObj, typeof enumObj);
//   return typeof enumObj === "function" && enumObj.hasOwnProperty(name)
//     ? enumObj[name]
//     : undefined;
// }

export function getEnumNames(enumObj: any) {
  return typeof enumObj === "function"
    ? Object.keys(enumObj).filter((x) => x != "values")
    : [];
}

export const filterFaceScanData = ({ userFaceDataLatest, key }) => {
  const list = userFaceDataLatest
    ?.filter(
      (item) =>
        item?.faceScanData?.[key] !== undefined &&
        item?.faceScanData?.[key] !== null &&
        Number(item?.faceScanData?.[key]) !== 0
    )
    ?.map((item) => {
      return {
        value: Number(item?.faceScanData?.[key]),
        date: item?.createdAtUTC,
      };
    })
    ?.slice(-20);

  const date = userFaceDataLatest
    ?.filter(
      (item) =>
        item?.faceScanData?.[key] !== undefined &&
        item?.faceScanData?.[key] !== null &&
        Number(item?.faceScanData?.[key]) !== 0
    )
    ?.map((item) => item?.createdAtUTC)
    ?.slice(-20);

  return list;
};
