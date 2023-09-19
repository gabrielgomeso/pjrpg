import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ICharacter } from "../data/models";
import { supabase } from "@/lib/supabase";
import { STATUS_MULTIPLIER, HEROIC_MULTIPLIER } from "@/assets/ts/constants";

export const useCharacterStore = defineStore("character", () => {
  const character = ref<ICharacter>({
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
    status: {
      healthPoints: 0,
      energyPoints: 0,
      magicPoints: 0,
      heroicPoints: 0,
    },
    level: 1,
    experiencePoints: 0,
    userId: "",
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

  async function deleteCharacter(characterId: string) {
    try {
      const { error } = await supabase
        .from("characters")
        .delete()
        .eq("id", characterId);

      if (error) throw new Error(error.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCharacter(characterId: string) {
    try {
      const { data: character_data, error } = await supabase
        .from("characters")
        .select("character_info, user_id")
        .eq("id", characterId);

      character.value = character_data[0].character_info;
      const userId = character_data[0].user_id;

      character.value.userId = userId;
      character.value.appeareance = await getCharacterAvatar(userId);

      if (error) {
        alert(error.message);
        console.error("There was an error inserting", error);
        return null;
      }

      return character_data;
    } catch (err) {
      alert("Error while fething the character sheet data");
      console.error("Unknown problem getting from the db", err);
      return null;
    }
  }

  async function getCharacterAvatar(userId: string) {
    const { data } = await supabase.storage
      .from("character-images")
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (!data) return "https://i.imgur.com/ctOlkzy.png";
    const characterImage = data.find((image: any) =>
      image.name
        .split(".")
        .includes(
          `avatar_${character.value.name.toLowerCase().replace(/\s/g, "")}`
        )
    );

    const fullImageName = characterImage
      ? await getAvatarUrl(userId, characterImage.name)
      : "https://i.imgur.com/ctOlkzy.png";
    console.log(fullImageName);

    return fullImageName;
  }

  async function getAvatarUrl(userId: string, characterImageName: string) {
    const { data } = supabase.storage
      .from("character-images")
      .getPublicUrl(`${userId}/${characterImageName}`);

    return data.publicUrl;
  }

  return {
    createCharacter,
    getCharacter,
    character,
    status,
    deleteCharacter,
  };
});
