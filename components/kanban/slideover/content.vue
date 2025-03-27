<script setup lang="ts">
import dayjs from "dayjs";
import { useDealSlideStore } from "~/stores/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">About the Deal</div>
    <KanbanSlideoverLabel label-text="Name">
      <h2>
        {{ store.card?.name }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Amount">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Client">
      {{ store.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Created at">
      {{ dayjs(store.card?.$createdAt).format("DD MMMM YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>
