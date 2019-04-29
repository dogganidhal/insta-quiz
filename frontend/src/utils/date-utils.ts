import moment from "moment";

export function formatDeadline(deadline: string): string {
  return moment(deadline).format("DD/MM/YYYY hh:mm")
}