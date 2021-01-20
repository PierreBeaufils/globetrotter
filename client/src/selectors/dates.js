// Convert timeStamp to readable date format DD/MM/YYYY
export const timestampToDate = (date) => {
  const stringDate = new Date(date).toISOString().split('T')[0];
  const splitDate = stringDate.split('-');
  const convertedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  return convertedDate;
};

// Convert timeStamp to ISO format YYYY/MM/DD
export const timestampToISO = (date) => {
  if (date === undefined) {
    return new Date().toISOString().substring(0, 10);
  }
  return new Date(date).toISOString().substring(0, 10);
};
