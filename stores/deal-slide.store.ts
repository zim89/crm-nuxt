import type { ICard } from "~/components/kanban/kanban.types";

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => ({
    card: null as ICard | null,
    isOpen: false,
  }),
  actions: {
    clear() {
      this.$patch({
        card: null,
        isOpen: false,
      });
    },
    set(card: ICard) {
      this.$patch({
        card: { ...card },
        isOpen: true,
      });
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
