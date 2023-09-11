import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import type { IAttributes, ICharacterData } from "../data/models";
// import type { Ref } from "vue";
import { supabase } from "@/lib/supabase";
import { STATUS_MULTIPLIER, HEROIC_MULTIPLIER } from "@/assets/ts/constants";

export const useCharacterStore = defineStore("character", () => {
  const character = ref({
    name: "",
    appeareance: "",
    age: 10,
    race: "demigod",
    group: "Afrodite",
    origin: "",
    questions: {
      hobby: "",
      secret: "",
      fear: "",
      family: "",
      dream: "",
    },
    attributes: {
      força: 1,
      agilidade: 1,
      sabedoria: 1,
      inteligência: 1,
      constituição: 1,
      carisma: 1,
    },
    items: [],
    advantages: [],
    disadvantages: [],
    initialPowers: [],
    status: {},
    level: 1,
    experiencePoints: 0,
  });

  const status = computed(() => {
    return {
      healthPoints: character.value.attributes.constituição * STATUS_MULTIPLIER,
      energyPoints:
        (character.value.attributes.agilidade +
          character.value.attributes.força) *
        STATUS_MULTIPLIER,
      magicPoints:
        (character.value.attributes.inteligência +
          character.value.attributes.sabedoria) *
        STATUS_MULTIPLIER,
      heroicPoints: character.value.attributes.carisma * HEROIC_MULTIPLIER,
    };
  });

  async function createCharacter(payload: any, user_id: string) {
    try {
      const { data, error } = await supabase
        .from("characters")
        .insert({ character_info: payload, user_id })
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
      alert("Error while fething character data");
      console.error("Unknown problem getting from the db", err);
      return null;
    }
  }

  return {
    createCharacter,
    getCharacter,
    character,
    status,
  };
});
