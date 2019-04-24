

export function formatDeadline(deadline: string): string {
  let date = new Date(deadline);
  return date.toLocaleDateString();
}