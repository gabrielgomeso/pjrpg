import { ref } from "vue";
import { defineStore } from "pinia";
import type { IAttributes, ICharacterData } from "../data/models";
import type { Ref } from "vue";
import { supabase } from "@/lib/supabase";
import { STATUS_MULTIPLIER, HEROIC_MULTIPLIER } from "@/assets/ts/constants";

export const useCharacterStore = defineStore("character", () => {
  const character_data: Ref<ICharacterData> = ref({
    name: "",
    age: "",
    race: "",
    group: "",
    level: 1,
  });

  const character_info: Ref<any> = ref({});

  const attributes: Ref<IAttributes> = ref({
    strenght: 1,
    agility: 1,
    wisdom: 1,
    intelligence: 1,
    constitution: 1,
    charisma: 1,
    available: 15,
  });

  const status = {
    healthPoints: attributes.value.constitution * STATUS_MULTIPLIER,
    energyPoints:
      (attributes.value.agility + attributes.value.strenght) *
      STATUS_MULTIPLIER,
    magicPoints:
      (attributes.value.intelligence + attributes.value.wisdom) *
      STATUS_MULTIPLIER,
    heroicPoints: attributes.value.charisma * HEROIC_MULTIPLIER,
  };

  const inventory: Ref<any> = ref([]);

  const characterEmail: Ref<string> = ref("");

  const character = {
    character_data: character_data.value,
    attributes: attributes.value,
    status: status,
    inventory: inventory.value,
  };

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

  async function createCharacter() {
    try {
      const { data, error } = await supabase
        .from("characters")
        .insert({ character_info: character, email: characterEmail.value })
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

  async function getCharacter(email: string) {
    console.log(email);
    try {
      const { data: character, error } = await supabase
        .from("characters")
        .select("character_info")
        .eq("email", email);
      if (error) {
        alert(error.message);
        console.error("There was an error inserting", error);
        return null;
      }
      return character;
    } catch (err) {
      alert("Error while fething data");
      console.error("Unknown problem getting from the db", err);
      return null;
    }
  }

  return {
    attributes,
    character_data,
    status,
    inventory,
    characterEmail,
    character_info,
    increase,
    decrease,
    createCharacter,
    hasAvailablePoints,
    getCharacter,
  };
});
