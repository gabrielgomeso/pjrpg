<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Área do administrador</h1>
    </header>

    <div class="admin-container">
      <div class="admin-container__left">
        <h2>Personagens</h2>
        <p>Gerencie os personagens do sistema.</p>
        <router-link to="/admin/characters_panel">Personagens</router-link>
      </div>

      <div class="admin-container__right">
        <h2>Usuários</h2>
        <p>Gerencie os usuários do sistema.</p>
        <router-link to="/admin/users">Usuários</router-link>
      </div>
    </div>
  </section>
</template>

<style>
.section-container {
  max-width: 1024px;
  border: 1px solid rgb(80, 80, 80);
  margin: 1rem 1rem;
  padding: 1rem;
  container-type: inline-size;
  background-color: whitesmoke;
}

.section-container__header {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgb(80, 80, 80);
}

.admin-container {
  display: flex;
  justify-content: space-between;
}

.admin-container__left {
  width: 45%;
}

.admin-container__right {
  width: 45%;
}

.admin-container__left,
.admin-container__right {
  border: 1px solid black;
  padding: 1rem;
}

.admin-container__left h2,
.admin-container__right h2 {
  margin-bottom: 0.5rem;
}

.admin-container__left p,
.admin-container__right p {
  margin-bottom: 1rem;
}

.admin-container__left a,
.admin-container__right a {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid black;
  text-align: center;
  text-decoration: none;
  color: black;
}

.admin-container__left a:hover,
.admin-container__right a:hover {
  background-color: black;
  color: white;
}

@media (min-width: 768px) {
  .section-container {
    margin: 1rem auto;
  }
}
</style>
