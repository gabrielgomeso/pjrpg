export function useFilters() {
  const raceFilter = (race: string) => {
    switch (race) {
      case "demigod":
        return "Semideus";
      case "nature-spirit":
        return "Espírito da Natureza";
      case "monster":
        return "Monstro";
      default:
        "Criatura Mitológica";
        break;
    }
  };

  const statusFilter = (status: string) => {
    switch (status) {
      case "healthPoints":
        return "Pontos de Vida";
      case "energyPoints":
        return "Pontos de Energia";
      case "magicPoints":
        return "Pontos de Magia";
      case "heroicPoints":
        return "Pontos de Heroísmo";
      default:
        "";
        break;
    }
  };

  const questionsFilter = (question: string) => {
    switch (question) {
      case "hobby":
        return "Hobbies";
      case "secret":
        return "Segredos";
      case "fear":
        return "Medos";
      case "family":
        return "Família e amigos";
      case "dream":
        return "Sonhos e objetivos";
      default:
        "";
        break;
    }
  };

  return {
    raceFilter,
    statusFilter,
    questionsFilter,
  };
}
