export function convertCentsToDollars(cents: number) {
  return cents / 100;
}

export const UnixTimestampToDate = (timestamp: number) => {
  // const timestamp = 1686675030000; // Replace this with your timestamp

  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
