export function sameDay(timestamp1: number, timestamp2: number): boolean {
    const date1: Date = new Date(timestamp1);
    const date2: Date = new Date(timestamp2);
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export function dateToString(timestamp: number): string {
    // const date: Date = new Date(timestamp);
    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(timestamp).toLocaleDateString('fr-FR', options);
}
