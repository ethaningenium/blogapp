export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];

  return `${day} ${month}`;
}
