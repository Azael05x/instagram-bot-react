export function formatDate(value: number, last = 2) {
    return `0${value}`.slice(-last);
}
export function parseDate(date: Date) {
    const day = formatDate(date.getDate());
    const month = formatDate(date.getMonth()+1);
    const year = formatDate(date.getFullYear());

    return `${day}.${month}.${year}`
}
export function parseTime(date: Date) {
    return formatDate(date.getHours()) + ":" + formatDate(date.getMinutes());
}
