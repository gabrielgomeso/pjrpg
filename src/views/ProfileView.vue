<script setup lang="ts">
// import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
// const isLoading = ref(true);
// const characters: any = ref(null);

// async function findCharacter() {
//   try {
//     const character = await getCharacter(loggedUser.value.email);
//     if (!character) {
//       return;
//     }
//     characters.value = character;
//   } catch (err) {
//     isLoading.value = false;

//     alert("Unknown error finding character" + err);
//   } finally {
//     isLoading.value = false;
//   }
// }

// async function handleLogout() {
//   try {
//     // Call the login action from the auth store
//     await logout();

//     // If login is successful, redirect to /my-profile
//     if (loggedUser.value == null) {
//       router.push("/");
//     }
//   } catch (error: any) {
//     // If there's an error, display the error message
//     alert(error.message);
//   }
// }

// onMounted(() => {
//   findCharacter();
// });
</script>

<template>
  <div>
    <h1>My profile</h1>
    <h2>My Characters</h2>
    <!-- <p v-if="isLoading">Loading characters...</p>
    <ul v-else>
      <li v-for="(character, index) in characters" :key="index">
        {{ character.character_info.character_data.name }}
      </li>
    </ul> -->
  </div>
</template>

<style></style>
