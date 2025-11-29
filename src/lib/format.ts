export function formatDate(input?: string) {
  if (!input) {
    return "Coming soon";
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "Coming soon";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

