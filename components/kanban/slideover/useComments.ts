import { useQuery } from "@tanstack/vue-query";
import { dbCollectionEnum } from "~/constants";
import { useDealSlideStore } from "~/stores/deal-slide.store";

export function useComments() {
  const { $appwrite } = useNuxtApp();
  const store = useDealSlideStore();
  const cardId = store.card?.id || "";

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: () =>
      $appwrite.DB.getDocument($appwrite.DB_ID, dbCollectionEnum.deals, cardId),
  });
}
