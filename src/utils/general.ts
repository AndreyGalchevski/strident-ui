export function formatDate(date: Date): string {
  let dd = String(date.getDate());
  let mm = String(date.getMonth() + 1);

  const yyyy = date.getFullYear();
  if (Number(dd) < 10) {
    dd = `0${dd}`;
  }
  if (Number(mm) < 10) {
    mm = `0${mm}`;
  }

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  return formattedDate;
}
