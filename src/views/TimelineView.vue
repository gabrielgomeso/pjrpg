<script lang="ts" setup>
import * as timeline from "../../moments.json";
</script>

<template>
  <section class="section-container">
    <header class="section-container__header">
      <h1>Linha do tempo</h1>
      <p>
        Aqui você vê a linha do tempo comparando os acontecimentos do livro e do
        nosso RPG!
      </p>
    </header>

    <div class="timeline">
      <div
        v-for="(moment, index) in timeline['default']"
        :key="moment.title + index"
        class="container"
        :class="{
          'right-container': index % 2 === 1,
          'left-container': index % 2 === 0,
        }"
      >
        <div class="text-box">
          <h2>{{ moment.title }}</h2>
          <small> {{ moment.date }}</small>
          <p>{{ moment.description }}</p>
          <span
            :class="{
              'right-container-arrow': index % 2 === 1,
              'left-container-arrow': index % 2 === 0,
            }"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 100px;
}

.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 100%;
  top: 0;
  left: 50%;
  background-color: rgb(82, 81, 81);
  animation: moveline 6s linear forwards;
}

@keyframes moveline {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}

.container {
  padding: 10px 50px;
  position: relative;
  width: 50%;
  animation: movedown 1s linear forwards;
  opacity: 0;
}

@keyframes movedown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.text-box {
  padding: 20px 30px;
  background-color: #fff;
  position: relative;
  border-radius: 6px;
  border: 1px solid rgb(82, 81, 81);

  font-size: 15px;
}

.left-container {
  left: 0;
}

.right-container {
  left: 50%;
}

.left-container-arrow,
.right-container-arrow {
  position: absolute;
  top: 28px;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.left-container-arrow {
  right: -15px;
  border-left: 15px solid rgb(82, 81, 81);
}

.right-container-arrow {
  left: -15px;
  border-right: 15px solid rgb(82, 81, 81);
}
</style>
