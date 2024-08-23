export function formatTimestamp(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // 'Thu'
    day: "numeric", // '23'
    month: "short", // 'May'
    // year: "numeric", // '2023'
    hour: "numeric", // '4'
    minute: "numeric", // '14'
    hour12: true, // 'PM'
  };

  return new Date(timestamp).toLocaleString("en-US", options);
}



