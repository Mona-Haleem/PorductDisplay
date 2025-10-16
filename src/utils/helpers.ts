export function getFriendlyErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong. Please try again.";

  const message = (error as Error)?.message || String(error);
console.log("original Error message:", message);
  if (message.includes("Network")) return "Network error — please check your internet connection.";
  if (message.includes("400")) return "Invalid username or password.";
    if (message.includes("timeout")) return "The request took too long. Try again in a moment.";
  if (message.includes("401")) return "Your session has expired. Please log in again.";
  if (message.includes("403")) return "You don’t have permission to do that.";
  if (message.includes("404")) return "We couldn’t find what you’re looking for.";
  if (message.includes("500")) return "Server error — we’re working on fixing it.";

  return "Something went wrong. Please try again.";
}
