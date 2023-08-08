<script lang="ts" setup>
import { ref, computed } from "vue";
import * as habilities from "../../../habilities.json";
import { useCharacterStore } from "@/stores/character";

const characterStore = useCharacterStore();

const character = ref({
  name: "",
  appeareance: "",
  age: null,
  race: "demigod",
  group: "",
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
});

const attributes = ref({
  força: 1,
  agilidade: 1,
  sabedoria: 1,
  inteligência: 1,
  constituição: 1,
  carisma: 1,
});

const groupList = computed(() => {
  if (character.value.race == "demigod") {
    return [
      "Zeus",
      "Hera",
      "Poseidon",
      "Demeter",
      "Ares",
      "Athena",
      "Apollo",
      "Artemis",
      "Hefesto",
      "Afrodite",
      "Hermes",
      "Dionísio",
      "Hades",
      "Thanatos",
    ];
  } else if (character.value.race == "nature-spirit") {
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

const disadvantages = {
  fisicas: [
    {
      name: "Falta de Membro",
      cost: 4,
      description:
        "Personagens com esta desvantagem não possuem membros devido a defeitos de nascença ou acidentes. Eles enfrentam dificuldades de mobilidade e tarefas cotidianas, muitas vezes requerendo assistência ou ferramentas adaptativas.",
    },
    {
      name: "Mudez",
      cost: 2,
      description:
        "Personagens mudos são incapazes de falar, tornando a comunicação um desafio. Eles dependem de pistas não verbais e comunicação escrita para interagir com outros.",
    },
    {
      name: "Surdez",
      cost: 4,
      description:
        "Personagens surdos têm audição limitada ou nula, afetando a percepção do mundo. Eles usam a linguagem de sinais ou outras pistas visuais para se comunicar e navegar em seu ambiente.",
    },
    {
      name: "Cegueira",
      cost: 6,
      description:
        "Personagens cegos não conseguem enxergar, dependendo de outros sentidos e de ferramentas como bengalas ou animais-guia para se orientar. Suas interações e compreensão do ambiente são baseadas principalmente em som, toque e intuição.",
    },
    {
      name: "Vício (Álcool, cigarro, medicamentos)",
      cost: 3,
      description:
        "Personagens com vícios como álcool, tabaco ou dependência de medicamentos enfrentam dificuldades com sua dependência. Isso pode levar a problemas de saúde, comportamento errático e tomada de decisões ruins, afetando seus relacionamentos e bem-estar geral.",
    },
  ],
  psicologicas: [
    {
      name: "Esquizofrenia",
      cost: 2,
      description:
        "Personagens com esquizofrenia sofrem de distorções na percepção da realidade, incluindo alucinações e delírios. Isso afeta sua capacidade de distinguir o que é real e pode influenciar suas interações e decisões.",
    },
    {
      name: "Amnésia",
      cost: 1,
      description:
        "Personagens com amnésia têm dificuldade em lembrar eventos passados, o que pode levar a lacunas em suas memórias e confusão sobre sua própria identidade e experiências.",
    },
    {
      name: "Fobia",
      cost: 2,
      description:
        "Personagens com fobias têm medos intensos e irracionais de situações, objetos ou lugares específicos. Esses medos podem causar ansiedade extrema e limitar suas opções e ações.",
    },
    {
      name: "Tique",
      cost: 2,
      description:
        "Personagens com tiques têm movimentos ou vocalizações involuntárias e repetitivas. Isso pode afetar seu comportamento social e a maneira como são percebidos pelos outros.",
    },
    {
      name: "Estresse Pós-Traumático",
      cost: 3,
      description:
        "Personagens com estresse pós-traumático sofrem após experiências traumáticas, revivendo memórias dolorosas e enfrentando sintomas como ansiedade e evitação. Isso pode impactar sua saúde mental e interações.",
    },
  ],
  doencas: [
    {
      name: "Diabético",
      cost: 2,
      description:
        "Personagens diabéticos possuem problemas de regulação do açúcar no sangue, o que pode afetar sua energia e saúde ao longo do tempo.",
    },
    {
      name: "Asmático",
      cost: 2,
      description:
        "Personagens asmáticos têm dificuldade em respirar e podem ser afetados negativamente em situações que exigem esforço físico ou exposição a alérgenos.",
    },
    {
      name: "Anêmico",
      cost: 2,
      description:
        "Personagens anêmicos têm uma contagem baixa de glóbulos vermelhos, o que pode levar à fadiga, tontura e falta de resistência física.",
    },
    {
      name: "Vitiligo",
      cost: 2,
      description:
        "Personagens com vitiligo têm perda de coloração da pele. Devido ao preconceito no mundo, eles enfrentam desafios sociais e precisam ter o dobro de sucesso em testes de Carisma.",
    },
  ],
  mitologicas: [
    {
      name: "Indefinido",
      cost: 15,
      description:
        "Você não possui herança divina, seu pai/mãe olimpiano nunca o reclamou. Você não possui poderes.",
    },
    {
      name: "Maldição (Variável)",
      cost: "Variável",
      description:
        "Alguma parte do seu corpo é animalesca, você não pode comer nem beber mas ainda sente fome, você tem que fazer alguma tarefa específica em determinada quantidade de tempo, você não pode ir até certo lugar ou não pode falar certa informação… Algum deus ficou muito bravo contigo e te impôs uma maldição (talvez fazer uma tabela e a pessoa rola)",
    },
    {
      name: "Perseguição Monstruosa",
      cost: 2,
      description: "Um monstro mitológico específico te persegue eternamente.",
    },
    {
      name: "Perseguição Divina",
      cost: 4,
      description:
        "Um deus específico te persegue eternamente. Fazer tabela de deuses e de possíveis motivos.",
    },
  ],
  dificuldades: [
    {
      name: "Fraco",
      cost: 3,
      description:
        "Você é naturalmente fraco. Sempre que for realizar um teste de Força, um sucesso será ignorado. Você carrega menos itens e não pode usar armas e armaduras pesadas.",
    },
    {
      name: "Lento",
      cost: 3,
      description:
        "Você é naturalmente lento. Sempre que for realizar um teste de Agilidade, um sucesso será ignorado. Você anda -2 quadrados por turno.",
    },
    {
      name: "Estúpido",
      cost: 3,
      description:
        "Te falta massa cerebral. Sempre que for realizar um teste de Inteligência, um sucesso será ignorado.",
    },
    {
      name: "Imprudente",
      cost: 3,
      description:
        "Você é naturalmente insensato, ignorante. Sempre que for realizar um teste de Sabedoria, um sucesso será ignorado.",
    },
    {
      name: "Debilitado",
      cost: 3,
      description:
        "Sua saúde é parca. Sempre que for realizar um teste de Constituição, um sucesso será ignorado.",
    },
    {
      name: "Feio",
      cost: 3,
      description:
        "Você é naturalmente feio. Ninguém vai com a sua cara. Te falta a beleza divina. Sempre que for realizar um teste de Carisma, um sucesso será ignorado. Você recupera pontos heroicos com mais dificuldade (se o narrador devolver 2 pontos heroicos para cada jogador, você só recebe 1).",
    },
    {
      name: "Desonra",
      cost: 3,
      description:
        "Seu progenitor divino te odeia. Você gasta o dobro de pontos heroicos por uso. Ou seja, quando precisar rerrolar algo, aumentar um bônus, etc, vai gastar 2 pontos ao invés de 1, já que a 'ajuda divina' está contra você.\n\nSuperável: Faça algo em nome do seu progenitor. Derrote um monstro épico, dê-lhe um item especial, faça alguma tarefa importante em seu nome.",
    },
    {
      name: "Dificuldade em Aprender",
      cost: 2,
      description:
        "Você precisa do dobro de sucessos para aprender algo novo.\n\nSuperável: Adquira 2 novos Conhecimentos.",
    },
  ],
  combate: [
    {
      name: "Inabilidade Armamentista",
      cost: 4,
      description:
        "Seja por medo, algum trauma do passado ou simples inabilidade, o seu personagem não sabe usar armas. -3 ao rolar qualquer tipo de ataque armado.\nSuperável: Treinar Hábil com Arma",
    },
    {
      name: "Inabilidade Mágica",
      cost: 2,
      description:
        "Seja por medo, algum trauma do passado ou simples inabilidade, o seu personagem não sabe usar as magias de seu progenitor divino.\nSuperável:",
    },
    {
      name: "Inexperiência",
      cost: 1,
      description: "Fica com medo em combates e não ataca no primeiro turno.",
    },
    {
      name: "Visão Imprecisa",
      cost: 2,
      description:
        "Sua visão é imprecisa, dificultando ataques à distância. -2 ao rolar ataques com armas de longo alcance.",
    },
    {
      name: "Mãos Trêmulas",
      cost: 2,
      description:
        "Suas mãos tremem em momentos de estresse, prejudicando sua mira. -2 ao rolar ataques à distância ou ataques precisos.",
    },
    {
      name: "Compulsão de Combate",
      cost: 3,
      description:
        "Você não consegue recuar de um combate e sempre deve enfrentar inimigos, mesmo em situações desvantajosas.",
    },
    {
      name: "Fobia de Feridas",
      cost: 2,
      description:
        "Você tem aversão a ferimentos e sangue, tornando-se menos eficaz em combate após sofrer dano. -2 em ataques e defesa após ser ferido.",
    },
    {
      name: "Reação Excessiva",
      cost: 2,
      description:
        "Em situações de combate, sua reação é excessiva e muitas vezes descontrolada, prejudicando a estratégia do grupo.",
    },
  ],
};

const initialPoints = 16;

const remainingPoints = computed(() => {
  const usedPoints = Object.values(character.value.attributes).reduce(
    (total, value) => total + value,
    0
  );
  return initialPoints - usedPoints;
});

const advantagePoints = computed(() => {
  return character.value.advantages.reduce(
    (total, advantage) => total + advantage.cost,
    0
  );
});

const disavantagePoints = computed(() => {
  return character.value.disadvantages.reduce(
    (total, disadvantage) => total + disadvantage.cost,
    0
  );
});

const differenceAdvantagePoints = computed(() => {
  return advantagePoints.value - disavantagePoints.value;
});

const advantageKeys = computed(() => Object.keys(advantages));
const disadvantageKeys = computed(() => Object.keys(disadvantages));

async function handleSubmit() {
  try {
    await characterStore.createCharacter(character.value);
    alert("Personagem criado com sucesso!");
  } catch (error) {
    alert("Erro ao criar personagem!");
  }
}
</script>

<template>
  <section>
    <h1>Novo personagem</h1>
    <p>Crie um novo personagem e faça parte do mundo de Percy Jackson!</p>

    <hr />

    <form class="new-character__form" @submit.prevent="handleSubmit()">
      <h2>Informações do personagem</h2>
      <label for="character-name">
        Nome do personagem
        <input name="character-name" type="text" v-model="character.name" />
      </label>

      <label for="character-name">
        Idade do personagem
        <span class="new-character__form-label-info">
          (mínimo 10 anos, máximo 99 anos)
        </span>
        <input
          name="character-age"
          type="number"
          min="10"
          max="99"
          v-model="character.age"
        />
      </label>

      <label for="character-race">
        Raça do personagem
        <select v-model="character.race" name="character-race">
          <option value="demigod" selected>Semideus</option>
          <option value="nature-spirit">Espírito da Natureza</option>
          <option value="monster">Monstro</option>
        </select>
      </label>

      <label for="character-group">
        Grupo do personagem
        <select name="character-group" v-model="character.group">
          <option
            v-for="(group, index) in groupList"
            :key="index"
            :value="group"
            selected
          >
            {{ group }}
          </option>
        </select>
      </label>

      <label for="character-appearance">
        Aparência do personagem
        <span class="new-character__form-label-info">
          (imagem preferencialmente 200x400, máx 2MB)
        </span>
        <input name="character-appearance" type="file" accept="image/*" />
      </label>

      <h2>Perguntas sobre o personagem</h2>
      <label for="character-question-hobby">
        Qual é um interesse ou hobby que o seu personagem tem? Onde e por que
        ele começou a praticá-lo?

        <textarea
          v-model="character.questions.hobby"
          name="character-question-hobby"
          cols="15"
          rows="5"
        ></textarea>
      </label>

      <label for="character-question-secret">
        Nomeie um segredo que o seu personagem esconde dos outros. Por que ele
        mantém esse segredo?

        <textarea
          v-model="character.questions.secret"
          name="character-question-secret"
          cols="15"
          rows="5"
        ></textarea>
      </label>

      <label for="character-question-fear">
        Nomeie um medo ou fobia que o seu personagem tem. Como isso afeta ele?

        <textarea
          v-model="character.questions.fear"
          name="character-question-fear"
          cols="15"
          rows="5"
        ></textarea>
      </label>

      <label for="character-question-family">
        Nomeie duas pessoas próximas do seu personagem. Por que ele se importa
        com elas? O que ele faria para protegê-las?

        <textarea
          v-model="character.questions.family"
          name="character-question-family"
          cols="15"
          rows="5"
        ></textarea>
      </label>

      <label for="character-question-dream">
        Qual o maior sonho do seu personagem? O que ele faria para realizá-lo?

        <textarea
          v-model="character.questions.dream"
          name="character-question-dream"
          cols="15"
          rows="5"
        ></textarea>
      </label>
      <hr />

      <h2>Seleção de atributos</h2>
      <p>Você possui {{ remainingPoints }} ponto para gastar</p>
      <label
        v-for="(attribute, index) in Object.keys(character.attributes)"
        :for="`character-${attribute}-attribute`"
        :key="index"
      >
        {{ attribute }}
        <input
          v-model="character.attributes[attribute]"
          name="`character-${attribute}-attribute`"
          type="number"
          min="1"
        />
      </label>

      <hr />

      <h2>Seleção dos primeiros itens</h2>

      <fieldset>
        <legend>
          Você tem direito a 3 itens iniciais. Não precisa se preocupar,
          conseguirá novos ao longo de sua jornada.
        </legend>

        <details>
          <summary>Lista de items</summary>

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
                v-model="character.items"
                :disabled="
                  character.items.length === 3 &&
                  !character.items.includes(item)
                "
                :value="item"
              />
            </label>
          </div>
        </details>
      </fieldset>

      <hr />

      <h2>Seleção das vantagens e desvantagens</h2>

      <h3>Vantagens</h3>
      <fieldset>
        <legend>
          Você selecionou {{ advantagePoints }} pontos de vantagem. Selecione o
          equivalente em desvantagens.
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
                v-model="character.advantages"
                :value="item"
              />

              {{ item.name }} ({{ item.cost }})
            </label>
          </div>
        </details>
      </fieldset>

      <h3>Desvantagens</h3>
      <fieldset>
        <legend>
          Você selecionou {{ disavantagePoints }} pontos de desvantagens.
          Selecione mais {{ differenceAdvantagePoints }} pontos em desvantagens
          para .
        </legend>

        <details v-for="(disadvantage, index) in disadvantageKeys" :key="index">
          <summary>{{ disadvantage }}</summary>
          <div class="new-character__form-items-list">
            <label
              v-for="(item, index) in disadvantages[disadvantage]"
              :for="`character-disadvantage-${index}`"
              :key="index"
              class="checkbox-wrapper"
            >
              <input
                type="checkbox"
                class="checkbox-input"
                :name="item.name"
                v-model="character.disadvantages"
                :value="item"
              />

              {{ item.name }} ({{ item.cost }})
            </label>
          </div>
        </details>
      </fieldset>

      <hr />

      <h2>Poderes iniciais ({{ character.group }})</h2>
      <fieldset>
        <legend>
          Você pode selecionar até 2 poderes inicias referentes a sua origem
          divina.
        </legend>

        <div class="new-character__form-items-list">
          <label
            v-for="(hability, index) in habilities[character.group]"
            :for="`character-power-${index}`"
            :key="index"
            class="checkbox-wrapper"
          >
            <input
              type="checkbox"
              class="checkbox-input"
              :name="hability.name"
              v-model="character.initialPowers"
              :value="hability"
              :disabled="
                character.initialPowers.length === 2 &&
                !character.initialPowers.includes(hability)
              "
            />

            <p class="new-character__form-items-list-item--title">
              {{ hability.name }}
            </p>
            <p>{{ hability.description }}</p>
            <p>Nível 1: {{ hability.levels["1"] }}</p>
          </label>
        </div>
      </fieldset>

      <button @click="handleSubmit()">Criar personagem</button>
    </form>
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
