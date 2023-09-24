<script lang="ts" setup>
const props = defineProps<{
  type: string;
  title: string;
  description: string;
  date: string;
  index: number;
}>();

const momentType = (type: string) => (type === "livro" ? "📚" : "🎲");
const momentText = (type: string) =>
  type === "livro"
    ? "Esse acontecimento fez parte de um livro da série Percy Jackson"
    : "Esse acontecimento foi parte de uma de nossas aventuras de RPG";
</script>

<template>
  <div
    class="timeline-moment"
    :class="{
      'right-moment': props.index % 2 === 1,
      'left-moment': props.index % 2 === 0,
    }"
  >
    <div class="moment-information">
      <h2>
        {{ props.title }}
        <span class="moment-information__type">
          {{ momentType(props.type) }}
          <span class="moment-information__type-text">
            {{ momentText(props.type) }}
          </span>
        </span>
      </h2>
      <small>
        {{ props.date }}
      </small>

      <p>{{ props.description }}</p>
      <span
        :class="{
          'right-moment-arrow': props.index % 2 === 1,
          'left-moment-arrow': props.index % 2 === 0,
        }"
      ></span>
    </div>
  </div>
</template>

<style>
.timeline-moment {
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

.moment-information {
  padding: 20px 30px;
  background-color: #fff;
  position: relative;
  border-radius: 6px;
  border: 1px solid rgb(82, 81, 81);
  transition: box-shadow 0.3s ease-in-out;
  font-size: 15px;
}

.moment-information__type {
  cursor: pointer;
  position: relative;
  font-size: 0.75rem;
  width: 15px;
  display: block;
}

.moment-information__type-text {
  display: none;
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgb(82, 81, 81);
  padding: 0.5rem;
  width: 350px;
  color: whitesmoke;
  font-size: 14px;
  z-index: 999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.moment-information:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.moment-information__type:hover .moment-information__type-text {
  display: block;
}

.left-moment {
  left: 0;
}

.right-moment {
  left: 50%;
}

.left-moment-arrow,
.right-moment-arrow {
  position: absolute;
  top: 28px;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.left-moment-arrow {
  right: -15px;
  border-left: 15px solid rgb(82, 81, 81);
}

.right-moment-arrow {
  left: -15px;
  border-right: 15px solid rgb(82, 81, 81);
}

@media screen and (max-width: 486px) {
  .moment-information__type-text {
    left: -100px;
  }
}

@media screen and (max-width: 992px) {
  .timeline-moment {
    width: 100%;
    padding: 0 25px 15px 80px;
  }

  .moment-information {
    font-size: 13px;
  }

  .right-moment {
    left: 0;
  }

  .left-moment-arrow {
    right: 0px;
    border-left: none;
    left: -15px;
    border-right: 15px solid rgb(82, 81, 81);
  }
}
</style>
