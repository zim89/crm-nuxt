import { useNuxtApp } from "#app";
import { dbCollectionEnum } from "~/constants";
import type { IColumn } from "./kanban.types";
import { kanbanColumns } from "./kanban.data";
import type { IDeal } from "~/types/deals.types";
import { useQuery } from "@tanstack/vue-query";

export function useKanbanQuery() {
  const { $appwrite } = useNuxtApp();

  return useQuery({
    queryKey: ["deals"],
    queryFn: () =>
      $appwrite.DB.listDocuments($appwrite.DB_ID, dbCollectionEnum.deals),
    select(data) {
      const newBoard: IColumn[] = kanbanColumns.map((column) => ({
        ...column,
        items: [],
      }));

      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer.name,
            status: column.name,
          });
        }
      }

      return newBoard;
    },
  });
}
