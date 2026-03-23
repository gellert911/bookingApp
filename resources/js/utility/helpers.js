import { DateTime } from 'luxon';

export function getNonEmptyFields(data) {
    return Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) => value != "" && value !== null && value !== undefined
        )
    );
}

export function toISOFormat(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth()+1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
   
    return `${y}-${m}-${d}`;
}

export function toLuxon(date) {
    if (DateTime.isDateTime(date)) {
        return date;
    }

    if (date instanceof Date) {
        return DateTime.fromJSDate(date);
    }
}

export function dateToString(date, format = "MMMM d") {
    if (!date) return "";

    date = DateTime.fromISO(date);

    return date.toFormat(format)
}

export function getCookie(name) {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1];
}