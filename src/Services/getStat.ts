import { CategoryStat, Note, Stat } from "src/Store/types";

const getStat = (list: Note[]): Stat[] => {
  const statList: CategoryStat = list.reduce<CategoryStat>((acc, el) => {
    if (!(el.category in acc)) {
      acc[el.category] = { id: el.id, active: 0, archive: 0 };
    }
    if (el.archive) {
      acc[el.category].archive++;
    } else {
      acc[el.category].active++;
    }
    return acc;
  }, {});

  return Object.entries(statList).map(([key, stat]) => {
    return { category: key, ...stat };
  });
};

export { getStat };
