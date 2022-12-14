import { ITodoItem } from "shared/api";

export function getFilteredData(arr: ITodoItem[], filterName: string): ITodoItem[] {
  switch (filterName) {
    case "active":
      return arr.filter((el) => el.completed);
    case "completed":
      return arr.filter((el) => !el.completed);
    default:
      return arr;
  }
}
