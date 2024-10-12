export function calculateDay(start_date: Date, end_date: Date): number {
  const date1 = new Date(start_date)
  const date2 = new Date(end_date)
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}
