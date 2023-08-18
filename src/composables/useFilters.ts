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

  return {
    raceFilter,
  };
}
