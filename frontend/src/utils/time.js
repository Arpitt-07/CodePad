export function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

export function currentFormattedTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
