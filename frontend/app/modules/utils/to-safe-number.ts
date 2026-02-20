export const toSafeNumber = (value: string | undefined | null, defaultValue: number) => {
  const number = Number(value);
  return value && Number.isFinite(number) ? number : defaultValue;
};
