export const getForm = (formId: string) =>
  <HTMLFormElement>document.getElementById(formId);

/* field */

export const getAgeLimit = (year: string): string => {
  const today = new Date();
  return `${today.getFullYear() - Number(year)}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};
