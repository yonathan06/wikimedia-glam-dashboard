export const getMediaImageUrlFromFilePath = (filePath: string) => {
  return `https://upload.wikimedia.org/${filePath}`;
}

export function getFormValuesFromLocalStorage(key: string) {
  const valuesString = localStorage.getItem(key);
  if (!valuesString) {
    return {};
  }
  try {
    const values = JSON.parse(valuesString);
    return {
      ...values,
      start: new Date(values.start),
      end: new Date(values.end),
    };
  } catch (error) {
    return {};
  }
}