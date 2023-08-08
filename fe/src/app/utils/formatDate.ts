export function formatDate(date: Date) {
  return Intl.DateTimeFormat("pt-bt").format(date);
}
