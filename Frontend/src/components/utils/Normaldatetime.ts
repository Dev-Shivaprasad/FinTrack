export default function normaldatetime(isoDate: string | undefined) {

    if (isoDate) {
        const date = new Date(isoDate);

        // Convert to a readable format
        return date.toLocaleString("en-GB");
    }
    return ""
}

export function getTimeLeft(targetDateString: string): { value: number, unit: 'days' | 'hours' | 'minutes' } {
    const now = Date.now();
    const target = new Date(targetDateString).getTime();

    let difference = target - now;

    const isPast = difference < 0;
    difference = Math.abs(difference);

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference %= (1000 * 60 * 60);

    const minutes = Math.floor(difference / (1000 * 60));
    difference %= (1000 * 60);

    let result = 0;
    let unit: 'days' | 'hours' | 'minutes' = 'minutes'; // default

    if (days > 0) {
        result = days;
        unit = 'days';
    } else if (hours > 0) {
        result = hours;
        unit = 'hours';
    } else {
        result = minutes;
        unit = 'minutes';
    }

    return {
        value: isPast ? -result : result,
        unit,
    };
}

