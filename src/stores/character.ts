import { ref } from "vue";
import { defineStore } from "pinia";
import type { IAttributes, IStatus, ICharacterData } from "../data/models";
import type { Ref } from "vue";
import { supabase } from "@/lib/supabase";

export const useCharacterStore = defineStore("character", () => {
  const character_data: Ref<ICharacterData> = ref({
    name: "",
    age: "",
    race: "",
    group: "",
  });

  const attributes: Ref<IAttributes> = ref({
    strenght: 1,
    agility: 1,
    wisdom: 1,
    intelligence: 1,
    constitution: 1,
    charisma: 1,
    available: 10,
  });

  const status: Ref<IStatus> = ref({
    healthPoints: 0,
    energyPoints: 0,
    magicPoints: 0,
  });

  const inventory: Ref<Object> = ref({});

  function increase(attribute: string) {
    if (hasAvailablePoints()) {
      attributes.value[attribute] += 1;
      attributes.value.available -= 1;
    }
  }

  function decrease(attribute: string) {
    if (attributes.value[attribute] > 1) {
      attributes.value[attribute] -= 1;
      attributes.value.available += 1;
    }
  }

  function hasAvailablePoints() {
    return attributes.value.available > 0;
  }

  async function createCharacter(character: string): Promise<any | string> {
    try {
      const { data, error } = await supabase
        .from("characters")
        .insert(character)
        .single();

      if (error) {
        alert(error.message);
        console.error("There was an error inserting", error);
        return null;
      }

      console.log("created a new character");
      return data;
    } catch (err) {
      alert("Error");
      console.error("Unknown problem inserting to db", err);
      return null;
    }
  }

  return {
    attributes,
    character_data,
    status,
    inventory,
    increase,
    decrease,
    createCharacter,
    hasAvailablePoints,
  };
});
