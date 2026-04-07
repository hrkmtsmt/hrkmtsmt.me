// biome-ignore lint/complexity/noUselessTypeConstraint: extends any is required for generic arrow function syntax in TSX files
export const splitArray = <T extends any>(array: T[], limit: number): T[][] => {
  return array.reduce<T[][]>((acc, current) => {
    const latest = acc.at(-1);

    if (!latest || latest.length === limit) {
      acc.push([current]);
      return [...acc];
    }

    latest.push(current);
    return [...acc];
  }, []);
};
