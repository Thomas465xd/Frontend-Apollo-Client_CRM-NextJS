export function formatUnixTimestamp(timestamp: number): string {
	const date = new Date(timestamp);
	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	});
}

export function formatRelativeTime(timestamp: number | string): string {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const now = new Date();
    const date = new Date(Number(timestamp)); // convertir el Unix timestamp
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    const divisions = [
        { amount: 60, name: "seconds" },
        { amount: 60, name: "minutes" },
        { amount: 24, name: "hours" },
        { amount: 7, name: "days" },
        { amount: 4.34524, name: "weeks" },
        { amount: 12, name: "months" },
        { amount: Number.POSITIVE_INFINITY, name: "years" },
    ];

    let duration = diffInSeconds;
    for (const division of divisions) {
        if (Math.abs(duration) < division.amount) {
            return rtf.format(Math.round(duration), division.name as Intl.RelativeTimeFormatUnit);
        }
        duration /= division.amount;
    }

    return "some time ago";
}

