<script lang="ts" setup>
import { ref, computed } from "vue";

const selectedRace = ref("demigod");

const attributes = ref({
  força: 1,
  agilidade: 1,
  sabedoria: 1,
  inteligência: 1,
  constituição: 1,
  carisma: 1,
});

const groupList = computed(() => {
  if (selectedRace.value == "demigod") {
    return [
      "Filhe de Zeus",
      "Filhe de Hera",
      "Filhe de Poseidon",
      "Filhe de Demeter",
      "Filhe de Ares",
      "Filhe de Athena",
      "Filhe de Apollo",
      "Filhe de Artemis",
      "Filhe de Hefesto",
      "Filhe de Aphrodite",
      "Filhe de Hermes",
      "Filhe de Dionysus",
      "Filhe de Hades",
    ];
  } else if (selectedRace.value == "nature-spirit") {
    return [
      "Sátiro",
      "Ninfa",
      "Dríade",
      "Naiade",
      "Nereida",
      "Oreade",
      "Tritão",
    ];
  } else {
    return ["Minotauro", "Ciclope", "Harpia", "Sereia", "Górgona", "Centauro"];
  }
});

const itemsList = [
  {
    id: 1,
    name: "Espada de bronze celestial",
    description:
      "Uma espada de bronze celestial. É uma arma leve e fácil de manejar, mas não é muito resistente.",
    type: "weapon",
    damage: "1d8",
    damageType: "slashing",
    weight: 1,
    price: 20,
    resistence: 10,
    reach: 1,
  },
  {
    id: 2,
    name: "Escudo redondo de madeira",
    description:
      "Um escudo redondo de madeira e tiras de metal. É um escudo leve e fácil de manejar, mas não é muito resistente.",
    type: "armor",
    weight: 1,
    price: 4,
    resistence: 5,
    movimentRestriction: 2,
  },
  {
    id: 3,
    name: "Cantil de néctar",
    description:
      "Um cantil de néctar, feito de couro de vaca. É um cantil leve e fácil de manejar, mas não é muito resistente. Contém uma pequena quantia de néctar, que pode ser usado para recuperar energia ou magia.",
    type: "item",
    effect: "Recupera 1d8 de pontos de magia ou energia.",
    weight: 1,
    price: 15,
  },
  {
    id: 4,
    name: "Fragmentos de ambrosia",
    description:
      "Um pacote de papel pardo com pedaços de ambrosia. Contém uma pequena quantia de ambrosia, que pode ser usado para curar ferimentos leves.",
    type: "item",
    effect: "Cura 1d8 de pontos de vida. Elimina ferimentos leves.",
    weight: 1,
    price: 15,
  },
  {
    id: 5,
    name: "Arco curto de madeira",
    description:
      "Um arco curto de madeira. É uma arma leve que necessita certo treinamento, não possui tanto poder de força ou alcance. Acompanha aljava com 20 flechas.",
    type: "weapon",
    damage: "1d8",
    damageType: "piercing",
    weight: 1,
    price: 25,
    resistence: 5,
    reach: 10,
  },
  {
    id: 7,
    name: "Lança de bronze celestial",
    description:
      "Uma lança de bronze celestial. É uma arma longa e que necessita habilidade para manejar.",
    type: "weapon",
    damage: "1d8",
    damageType: "piercing",
    weight: 1,
    price: 25,
    resistence: 5,
    reach: 2,
  },
  {
    id: 8,
    name: "Adaga de bronze celestial",
    description:
      "Uma adaga de bronze celestial. É uma arma pequena, fácil de manejar e esconder.",
    type: "weapon",
    damage: "1d4",
    damageType: "piercing",
    weight: 1,
    price: 25,
    resistence: 5,
    reach: 1,
  },
  {
    id: 9,
    name: "Machado de bronze celestial",
    description:
      "Um machado de bronze celestial. É uma arma um pouco mais pesada e serve como ferramenta, mas não é muito resistente.",
    type: "weapon",
    damage: "1d6",
    damageType: "slashing",
    weight: 1,
    price: 25,
    resistence: 5,
    reach: 1,
  },
  {
    id: 10,
    name: "Armadura acolchoada",
    description:
      "Uma armadura acolchoada. É uma armadura leve de várias camadas de couro e tecido, mas não é muito resistente.",
    type: "armor",
    weight: 1,
    price: 5,
    resistence: 5,
    movimentRestriction: 1,
  },
  {
    id: 11,
    name: "Corda de escalada",
    description:
      "Uma corda de escalada. É uma corda de 15 metros de comprimento, feita de cânhamo trançado.",
    type: "item",
    weight: 1,
    price: 1,
  },
  {
    id: 12,
    name: "Instrumento Musical",
    description:
      "Um instrumento musical. É um instrumento de cordas, sopro ou percussão, feito de madeira, metal ou osso.",
    type: "item",
    weight: 1,
    price: 1,
  },
];

const selectedItems = ref([]);

const advantages = {
  talentos: [
    {
      name: "Empatia",
      cost: 2,
      description:
        "Você consegue ler as emoções dos outros com mais facilidade. Seja um indivíduo suspeito ou um aliado duas “caras”, você consegue identificar as intenções dessa pessoa. Para compreender as emoções de alguém, rola-se um teste de Sabedoria. Com essa vantagem, você pode rerrolar o teste e escolher o melhor resultado.",
    },
    {
      name: "Intimidação",
      cost: 2,
      description:
        "Você impor sua presença e amedrontar pessoas e criaturas, às vezes para convencê-los a fazer o que quer. Para intimidar alguém, rola-se um teste de Carisma. Com essa vantagem, você pode rerrolar o teste e escolher o melhor resultado.",
    },
    {
      name: "Liderança ",
      cost: 3,
      description:
        "Você tem uma tendência maior a liderar e a ser escutado por seus aliados. Em um ambiente de combate de massas, os aliados costumam seguir suas ordens. Você pode direcionar NPCs com mais facilidade.",
    },
    {
      name: "Manha Humana",
      cost: 1,
      description:
        "As ruas podem fornecer muitas informações ou dinheiro para aqueles que conhecem a sua linguagem. Essa vantagem permite que você se misture discretamente ao cenário local, ouça os rumores, entenda as gírias ou até mesmo participe de negócios escusos.",
    },
    {
      name: "Lábia",
      cost: 2,
      description:
        "Você sabe como ocultar os seus próprios motivos e mostrar aquilo que você deseja. Além disso, você pode chegar à raiz dos motivos de outras pessoas e usá-los contra elas. Essa vantagem define o seu talento para intrigas, segredos e jogos duplos. Tem um bônus de +2 ao fazer um teste de Carisma para influenciar alguém.",
    },
  ],
  facilidades: [
    {
      name: "Forte",
      cost: 3,
      description:
        "Você é naturalmente forte. Sempre que for realizar um teste de Força, um sucesso será garantido.",
    },
    {
      name: "Organizado",
      cost: 1,
      description:
        "Por ser mais disciplinado do que os outros adolescentes da sua idade, sua organização permite que você consiga carregar mais itens do que o normal.\n+5 espaços na mochila.",
    },
    {
      name: "Rápido",
      cost: 3,
      description:
        "Você é naturalmente ágil. Sempre que for realizar um teste de Agilidade, um sucesso será garantido.",
    },
    {
      name: "Conhecedor de todos os caminhos",
      cost: 2,
      description:
        "Você já viajou muito, já subiu montanhas, já investigou cavernas. Passou por pântanos e praias. Por conta disso, não recebe penalidades em terrenos irregulares.",
    },
    {
      name: "Inteligente",
      cost: 3,
      description:
        "Você demonstra ser mais esperto desde cedo. Sempre que for realizar um teste de Inteligência, um sucesso será garantido.",
    },
    {
      name: "Prodígio",
      cost: 4,
      description:
        "Desde sempre um às nos estudos, aprende tudo com grande facilidade.\nVocê precisa de metade de sucessos para aprender algo novo.",
    },
    {
      name: "Sábio",
      cost: 3,
      description:
        "Você é naturalmente sábio, compreendendo o cerne da consciência humana. Sempre que for realizar um teste de Sabedoria, um sucesso será garantido.",
    },
    {
      name: "Robusto",
      cost: 3,
      description:
        "Sua saúde é sólida. Sempre que for realizar um teste de Constituição, um sucesso será garantido.",
    },
    {
      name: "Duro de Matar",
      cost: 3,
      description:
        "Você só fica inconsciente se atingir -10 de algum status e só morre se atingir -20 de Pontos de Vida.",
    },
    {
      name: "Belo",
      cost: 3,
      description:
        "Sua beleza é, de fato, divina. Você atrai atenção ao seu redor, encantando pessoas. Sempre que for realizar um teste de Carisma, um sucesso será garantido.",
    },
    {
      name: "Herói das Eras",
      cost: 3,
      description: "Você recupera pontos heroicos com mais facilidade.",
    },
    {
      name: "Indolor",
      cost: 1,
      description:
        "Você consegue ignorar dor, sem receber penalidades quando está gravemente ferido.",
    },
    {
      name: "Resistência Toxicológica",
      cost: 2,
      description:
        "Você recebe metade do dano por qualquer tipo de envenenamento.",
    },
    {
      name: "Excelente Senso de Direção",
      cost: 1,
      description: "",
    },
    {
      name: "Grande Durabilidade",
      cost: 1,
      description:
        "Você recebe +10 de Pontos de Estamina sempre que sobe de nível e recupera eles com mais facilidade.",
    },
    {
      name: "Herança Mágica",
      cost: 1,
      description:
        "Você recebe +10 de Pontos de Magia sempre que sobe de nível e recupera eles com mais facilidade.",
    },
    {
      name: "Grande Vitalidade",
      cost: 1,
      description:
        "Você recebe +10 de Pontos de Vida sempre que sobe de nível e recupera eles com mais facilidade.",
    },
    {
      name: "Visão Aguçada",
      cost: 2,
      description:
        "Tem a capacidade de ver mais longe do que os demais e também uma facilidade para enxergar no escuro.",
    },
    {
      name: "Audição Aguçada",
      cost: 2,
      description: "Escuta coisas mais distantes.",
    },
    {
      name: "Olfato Aguçado",
      cost: 2,
      description: "Consegue sentir o cheiro e rastrear certas coisas.",
    },
  ],
  pericias: [
    {
      name: "Condução",
      cost: 1,
      description: "",
    },
    {
      name: "Especificação de veículo",
      cost: 1,
      description: "",
    },
    {
      name: "Empatia com Animais",
      cost: 1,
      description: "",
    },
    {
      name: "Esporte",
      cost: 1,
      description: "",
    },
    {
      name: "Especificação de esporte",
      cost: 1,
      description: "",
    },
    {
      name: "Furtividade",
      cost: 1,
      description: "Um sucesso garantido quando você tentar ser silencioso",
    },
    {
      name: "Ladroagem",
      cost: 1,
      description: "",
    },
    {
      name: "Ofícios",
      cost: 1,
      description: "Permite criações",
    },
    {
      name: "Artesanato",
      cost: 1,
      description: "",
    },
    {
      name: "Carpintaria",
      cost: 1,
      description: "",
    },
    {
      name: "Cozinhar",
      cost: 1,
      description: "",
    },
    {
      name: "Escultura",
      cost: 1,
      description: "",
    },
    {
      name: "Pintura",
      cost: 1,
      description: "",
    },
    {
      name: "Metalurgia",
      cost: 1,
      description: "",
    },
    {
      name: "Performance",
      cost: 1,
      description: "",
    },
    {
      name: "Música (especificar instrumento)",
      cost: 1,
      description: "",
    },
    {
      name: "Dança",
      cost: 1,
      description: "",
    },
    {
      name: "Atuação",
      cost: 1,
      description: "",
    },
    {
      name: "Sobrevivência",
      cost: 1,
      description: "",
    },
  ],
  conhecimentos: [
    {
      name: "Biologia",
      cost: 2,
      description: "",
    },
    {
      name: "Computação",
      cost: 2,
      description:
        "Este Conhecimento representa a habilidade de operar e programar computadores, assim como a compreensão necessária para se manter a par da tecnologia mais avançada.",
    },
    {
      name: "Direito",
      cost: 2,
      description: "",
    },
    {
      name: "Filosofia",
      cost: 2,
      description: "",
    },
    {
      name: "Finanças",
      cost: 2,
      description: "",
    },
    {
      name: "Física",
      cost: 2,
      description: "",
    },
    {
      name: "História Global",
      cost: 2,
      description: "",
    },
    {
      name: "Investigação",
      cost: 2,
      description: "",
    },
    {
      name: "Literatura",
      cost: 2,
      description: "",
    },
    {
      name: "Linguística",
      cost: 2,
      description: "",
    },
    {
      name: "Medicina",
      cost: 2,
      description: "",
    },
    {
      name: "Mitologia",
      cost: 2,
      description: "",
    },
    {
      name: "Política",
      cost: 2,
      description: "",
    },
    {
      name: "Química",
      cost: 3,
      description: "Permite criações",
    },
  ],
  combate: [
    {
      name: "Hábil com Arma",
      cost: 1,
      description: "Facas, porretes, espadas, arcos e flecha; (FOR)",
    },
    {
      name: "Briga",
      cost: 1,
      description: "Especificar estilo (FOR)",
    },
    {
      name: "Prontidão",
      cost: 3,
      description:
        "Esta é sua aptidão básica de estar pronto para as coisas que acontecem ao seu redor, mesmo quando você não está realmente procurando por elas. Você não é surpreendido com tanta facilidade.\nVocê pode fazer um teste a mais para bloquear esses ataques furtivos por completo.",
    },
    {
      name: "Esquiva",
      cost: 3,
      description: "+ tantos para esquivar de golpes",
    },
    {
      name: "Sanguinário",
      cost: 2,
      description:
        "Quando você ataca, você não tem dó nem piedade. Não se importa com regras ou com a segurança de um oponente, mesmo que seja um treinamento ou inimigo que você precise manter vivo para extrair informações.\nRecebe um bônus de +1d6 de dano.",
    },
    {
      name: "Ambidestria",
      cost: 3,
      description:
        "Você tem a capacidade de utilizar as duas mãos no combate. Com isso, pode atacar duas vezes, porém o segundo ataque dá apenas metade do dano.\nRecebe um bônus de +1d6 de dano.",
    },
  ],
};

const initialPoints = 16;

const remainingPoints = computed(() => {
  const usedPoints = Object.values(attributes.value).reduce(
    (total, value) => total + value,
    0
  );
  return initialPoints - usedPoints;
});

const selectedAdvantages = ref([]);

const advantageKeys = computed(() => Object.keys(advantages));
</script>

<template>
  <section>
    <h1>Novo personagem</h1>
    <p>Crie um novo personagem e faça parte do mundo de Percy Jackson!</p>

    <hr />

    <form class="new-character__form">
      <h2>Informações do personagem</h2>
      <label for="character-name">
        Nome do personagem
        <input name="character-name" type="text" />
      </label>

      <label for="character-name">
        Idade do personagem
        <span class="new-character__form-label-info">
          (mínimo 10 anos, máximo 99 anos)
        </span>
        <input name="character-age" type="number" min="10" max="99" />
      </label>

      <label for="character-race">
        Raça do personagem
        <select v-model="selectedRace" name="character-race">
          <option value="demigod" selected>Semideus</option>
          <option value="nature-spirit">Espírito da Natureza</option>
          <option value="monster">Monstro</option>
        </select>
      </label>

      <label for="character-group">
        Grupo do personagem
        <select name="character-group">
          <option
            v-for="(group, index) in groupList"
            :key="index"
            value="demigod"
            selected
          >
            {{ group }}
          </option>
        </select>
      </label>

      <hr />

      <h2>Seleção de atributos</h2>
      <p>Você possui {{ remainingPoints }} ponto para gastar</p>
      <label
        v-for="(attribute, index) in Object.keys(attributes)"
        :for="`character-${attribute}-attribute`"
        :key="index"
      >
        {{ attribute }}
        <input
          v-model="attributes[attribute]"
          name="`character-${attribute}-attribute`"
          type="number"
          min="1"
          :max="remainingPoints + attributes[attribute]"
        />
      </label>

      <hr />

      <h2>Seleção dos primeiros itens</h2>

      <fieldset>
        <legend>
          Você tem direito a 3 itens iniciais. Não precisa se preocupar,
          conseguirá novos ao longo de sua jornada.
        </legend>

        <div class="new-character__form-items-list">
          <label
            v-for="(item, index) in itemsList"
            :for="`character-item-${index}`"
            :key="index"
            class="new-character__form-items-list-item"
          >
            <p class="new-character__form-items-list-item--title">
              {{ item.name }}
            </p>
            <p v-show="item.description">{{ item.description }}</p>
            <p v-show="item.damage">Dano: {{ item.damage }}</p>
            <p v-show="item.resistence">Resistência: {{ item.resistence }}</p>
            <p v-show="item.effect">Efeito: {{ item.effect }}</p>
            <input
              type="checkbox"
              :name="item.name"
              v-model="selectedItems"
              :disabled="
                selectedItems.length === 3 && !selectedItems.includes(item)
              "
              :value="item"
            />
          </label>
        </div>
      </fieldset>

      <hr />

      <h2>Seleção das vantagens e desvantagens</h2>

      <fieldset>
        <legend>
          Você tem direito a 3 itens iniciais. Não precisa se preocupar,
          conseguirá novos ao longo de sua jornada.
        </legend>

        <details v-for="(advantage, index) in advantageKeys" :key="index">
          <summary>{{ advantage }}</summary>
          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in advantages[advantage]"
              :for="`character-advantage-${index}`"
              :key="index"
              class="checkbox-wrapper"
            >
              <input
                type="checkbox"
                class="checkbox-input"
                :name="item.name"
                v-model="selectedAdvantages"
                :value="item"
              />

              {{ item.name }} ({{ item.cost }})
            </label>
          </div>
        </details>
      </fieldset>
    </form>

    {{ selectedAdvantages }}
  </section>
</template>

<style lang="scss">
.new-character__form,
.new-character__form label {
  display: flex;
  flex-direction: column;
}

.new-character__form {
  gap: 16px;
}

.new-character__form label {
  max-width: 260px;
  font-size: 16px;
}

.new-character__form-label-info {
  font-size: 12px;
  color: var(--color-gray-500);
}

.new-character__form-items-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.new-character__form-items-list-item {
  display: block;
  max-width: 260px;
  padding: 8px;
}

.new-character__form-items-list-item--title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}
</style>
