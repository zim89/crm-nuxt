<script lang="ts" setup>
import { useDealSlideStore } from "~/stores/deal-slide.store";

const store = useDealSlideStore();

const isOpen = computed({
  get: () => store.isOpen,
  set: (value) => {
    store.isOpen = value;
  },
});
</script>

<template>
  <UiSheet v-model:open="isOpen">
    <UiSheetContent side="right" class="flex flex-col flex-1 overflow-y-auto">
      <UiSheetHeader class="hidden">
        <UiSheetTitle>{{ store.card?.name }}</UiSheetTitle>
        <UiSheetDescription> Observe deal details. </UiSheetDescription>
      </UiSheetHeader>

      <KanbanSlideoverContent />

      <UiSheetFooter class="flex flex-col gap-4">
        <KanbanSlideoverComments />
      </UiSheetFooter>
    </UiSheetContent>
  </UiSheet>
</template>
