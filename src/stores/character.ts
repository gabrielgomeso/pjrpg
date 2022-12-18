import { ref } from "vue";
import { defineStore } from "pinia";
import type { IAttributes, IStatus } from "../data/models";
import type { Ref } from "vue";

export const useCharacterStore = defineStore("counter", () => {
  const attributes: Ref<IAttributes> = ref({
    strenght: 0,
    agility: 0,
    wisdom: 0,
    intelligence: 0,
    constitution: 0,
    charisma: 0,
  });

  const status: Ref<IStatus> = ref({
    healthPoints: 0,
    energyPoints: 0,
    magicPoints: 0,
  });

  const inventory: Ref<Object> = ref({});

  function increase(attribute: string) {
    attributes.value[attribute] += 1;
  }

  function decrease(attribute: string) {
    attributes.value[attribute] -= 1;
  }

  return { attributes, increase, decrease, status, inventory };
});
