<script lang="ts" setup>
import { TimelineMoment } from "@/components/TimelineView";
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
      <TimelineMoment
        v-for="(moment, index) in timeline['default']"
        :key="moment.title + index"
        :index="index"
        :title="moment.title"
        :description="moment.description"
        :date="moment.date"
        :type="moment.type"
      />
    </div>
  </section>
</template>

<style>
.timeline {
  position: relative;
  max-width: 992px;
  margin: 100px;
  z-index: 10;
}

.timeline::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 100%;
  top: 0;
  left: 50%;
  background-color: rgb(44, 44, 44);
  animation: moveline 6s linear forwards;
}

@media screen and (max-width: 992px) {
  .timeline {
    margin: 50px auto;
  }

  .timeline::before {
    left: 31px;
  }
}

@keyframes moveline {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
</style>
