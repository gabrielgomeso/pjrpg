<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Área do administrador - Painel de Personagens</h1>
    </header>

    <div class="characters-panel__characters-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Grupo</th>
            <th>Raça</th>
            <th>Nível</th>
            <th>Experiência</th>
            <th>Origem</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
      </table>
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

.characters-panel__characters-list table {
  border: 1px solid black;
}

@media (min-width: 768px) {
  .section-container {
    margin: 1rem auto;
  }
}
</style>
