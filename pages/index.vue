<script lang="ts" setup>
import { useMutation } from "@tanstack/vue-query";
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import type { EnumStatus } from "~/types/deals.types";
import { generateColumnStyle } from "~/components/kanban/generate-gradient";
import { convertCurrency } from "~/utils";
import dayjs from "dayjs";
import { dbCollectionEnum } from "~/constants";
import { useDealSlideStore } from "~/stores/deal-slide.store";

useSeoMeta({
  title: "Home | CRM System",
});

const { $appwrite } = useNuxtApp();

const dragCard = ref<ICard | null>(null);
const sourceColumn = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    $appwrite.DB.updateDocument(
      $appwrite.DB_ID,
      dbCollectionEnum.deals,
      docId,
      {
        status,
      }
    ),
  onSuccess: () => {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCard.value = card;
  sourceColumn.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCard.value && sourceColumn.value) {
    mutate({ docId: dragCard.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl mb-10">Main Page</h1>
    <div v-if="isLoading">Loading...</div>

    <div v-else>
      <div class="grid grid-cols-5 gap-10">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          class="min-h-screen"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-5"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <UiCardHeader role="button" @click="store.set(card)">
                <UiCardTitle>{{ card.name }}</UiCardTitle>

                <UiCardDescription class="mt-2 block">{{
                  convertCurrency(card.price)
                }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs text flex gap-1">
                <span>Company:</span>
                <span class="text-amber-500">{{
                  card.companyName
                }}</span></UiCardContent
              >
              <UiCardFooter>
                {{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}
              </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>

      <KanbanSlideover />
    </div>
  </div>
</template>
