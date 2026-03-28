import { create } from "zustand";

interface IngredientRef {
  id: string;
  name: string;
}

export interface PizzaState {
  base: IngredientRef | null;
  sauce: IngredientRef | null;
  cheese: IngredientRef | null;
  selectedVeggies: IngredientRef[];
  selectedProteins: IngredientRef[];
  setBase: (id: string, name: string) => void;
  setSauce: (id: string, name: string) => void;
  setCheese: (id: string, name: string) => void;
  toggleVeggie: (id: string, name: string) => void;
  toggleProtein: (id: string, name: string) => void;
  resetPizza: () => void;
  preloadPizza: (config: {
    base: IngredientRef | null;
    sauce: IngredientRef | null;
    cheese: IngredientRef | null;
    veggies: IngredientRef[];
    proteins: IngredientRef[];
  }) => void;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  base: null,
  sauce: null,
  cheese: null,
  selectedVeggies: [],
  selectedProteins: [],

  setBase: (id, name) => set({ base: { id, name } }),
  setSauce: (id, name) => set({ sauce: { id, name } }),
  setCheese: (id, name) => set({ cheese: { id, name } }),

  toggleVeggie: (id, name) =>
    set((state) => ({
      selectedVeggies: state.selectedVeggies.some((v) => v.id === id)
        ? state.selectedVeggies.filter((v) => v.id !== id)
        : [...state.selectedVeggies, { id, name }],
    })),

  toggleProtein: (id, name) =>
    set((state) => ({
      selectedProteins: state.selectedProteins?.some((p) => p.id === id)
        ? state.selectedProteins.filter((p) => p.id !== id)
        : [...state.selectedProteins, { id, name }],
    })),

  resetPizza: () =>
    set({
      base: null,
      sauce: null,
      cheese: null,
      selectedVeggies: [],
      selectedProteins: [],
    }),

  preloadPizza: (config) => set({
    base: config.base,
    sauce: config.sauce,
    cheese: config.cheese,
    selectedVeggies: config.veggies,
    selectedProteins: config.proteins,
  }),
}));
