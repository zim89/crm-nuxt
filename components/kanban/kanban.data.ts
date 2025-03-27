import { EnumStatus } from "~/types/deals.types";
import type { IColumn } from "./kanban.types";

export const kanbanColumns: IColumn[] = [
  {
    id: EnumStatus.todo,
    name: "Incoming",
    items: [],
  },
  {
    id: EnumStatus["to-be-agreed"],
    name: "Pending Approval",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "In Progress",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "Produced",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "Ready for Shipment",
    items: [],
  },
] as const;
