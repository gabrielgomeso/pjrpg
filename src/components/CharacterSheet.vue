<script setup lang="ts">
// import { useCharacterStore } from "@/stores/character";
import { isDemigod } from "@/assets/ts/utils";
import { computed } from "vue";

const props = defineProps<{
  character_data: any;
}>();

const groupOrAffiliation = computed(() => {
  if (isDemigod(props.character_data.race)) {
    return "Affiliation";
  } else {
    return "Group";
  }
});
</script>

<template>
  <div>
    <h2 class="step-title">Character Sheet</h2>
    <div class="character-overview">
      <section class="character-info-section">
        <h3 class="character-info-section__title">Character Information</h3>
        <div class="character-info-section__box">
          <span>
            Name: <span>{{ props.character_data.character_data.name }}</span>
          </span>
          <span>
            Age:
            <span>{{ props.character_data.character_data.age }} </span>
          </span>
          <span>
            Race:
            <span>{{ props.character_data.character_data.race }}</span>
          </span>
          <span>
            {{ groupOrAffiliation }}:
            <span>{{ props.character_data.character_data.group }}</span>
          </span>
          <span>
            Level:
            <span contenteditable>
              {{ props.character_data.character_data.level }}
            </span>
          </span>
        </div>
      </section>

      <section class="character-attributes-section">
        <h3 class="character-attributes-section__title">Attributes</h3>
        <div class="character-attributes-section__box">
          <span>
            Strenght:
            <span contenteditable>{{ props.character_data.attributes.strenght }}</span>
          </span>
          <span>
            Agility:
            <span contenteditable>{{ props.character_data.attributes.agility }} </span>
          </span>
          <span>
            Constitution:
            <span contenteditable>{{ props.character_data.attributes.constitution }}</span>
          </span>
          <span>
            Intelligence:
            <span contenteditable>{{ props.character_data.attributes.intelligence }}</span>
          </span>
          <span>
            Wisdom:
            <span contenteditable>{{ props.character_data.attributes.wisdom }}</span>
          </span>
          <span>
            Charisma:
            <span contenteditable>{{ props.character_data.attributes.charisma }}</span>
          </span>
        </div>
      </section>

      <section class="character-status-section">
        <h3 class="character-status-section__title">Status</h3>
        <div class="character-status-section__box">
          <span>
            Health
            <span class="character-status-section__box--status-highlight">{{
              props.character_data.status.healthPoints
            }}</span>
          </span>
          <span>
            Magic
            <span class="character-status-section__box--status-highlight">{{
              props.character_data.status.magicPoints
            }}</span>
          </span>
          <span>
            Energy
            <span class="character-status-section__box--status-highlight">{{
              props.character_data.status.energyPoints
            }}</span>
          </span>
          <span>
            Heroic
            <span class="character-status-section__box--status-highlight">{{
              props.character_data.status.heroicPoints
            }}</span>
          </span>
        </div>
      </section>

      <section class="character-habilities-section">
        <h3 class="character-habilities-section__title">Habilities</h3>
        <div contenteditable class="character-habilities-section__box">Teste</div>
      </section>

      <section class="character-feats-section">
        <h3 class="character-feats-section__title">Feats</h3>
        <div contenteditable class="character-feats-section__box">Teste</div>
      </section>

      <section class="character-inventory-section">
        <h3 class="character-inventory-section__title">Inventory</h3>
        <div contenteditable class="character-inventory-section__box">
          <p v-for="item in props.character_data.inventory" :key="item.slug">
            {{ item.name }} - {{ item.damageDice }} - {{ item.reach }} -
            {{ item.description }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.character-info-section,
.character-attributes-section,
.character-status-section,
.character-habilities-section,
.character-feats-section,
.character-inventory-section {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 1rem;
}

.character-info-section__title {
  margin-bottom: 1rem;
}

.character-info-section__box {
  display: grid;
  grid-template-columns: 1fr minmax(50px, auto);
  grid-template-rows: 1fr 1fr;
}

.character-attributes-section__box {
  display: flex;
  flex-direction: column;
}

.character-status-section__box,
.character-status-section__box > span,
.character-status-section__box--status-highlight {
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-status-section__box {
  gap: 1rem;
}

.character-status-section__box > span {
  flex-direction: column;
  max-width: 50px;
}

.character-status-section__box--status-highlight {
  width: 50px;
  height: 50px;
  border: 1px solid gray;
  padding: 5px;
  flex-direction: column;
}

.character-overview {
  display: grid;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  /* max-width: 1024px; */
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 768px) {
  .character-overview {
    display: grid;
    grid-template-areas:
      "information information"
      "attributes status"
      "attributes habilities"
      "feats habilities"
      "inventory inventory";
    gap: 1rem;
  }

  .character-info-section {
    grid-area: information;
  }
  .character-attributes-section {
    grid-area: attributes;
  }

  .character-status-section {
    grid-area: status;
  }

  .character-habilities-section {
    grid-area: habilities;
  }

  .character-feats-section {
    grid-area: feats;
  }

  .character-inventory-section {
    grid-area: inventory;
  }
}
</style>
