<script lang="ts" setup>
const props = defineProps({
  characterAvatarUrl: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <figure class="character-avatar__figure">
    <img
      class="character-avatar__image"
      :src="props.characterAvatarUrl"
      alt="Imagem do seu personagem"
      width="200"
      height="400"
    />
  </figure>
</template>

<style>
.character-avatar__figure {
  width: 200px;
  height: 400px;
}
.character-avatar__image {
  object-fit: cover;
}
</style>
