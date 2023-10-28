const INTEGER_FORMATTER = new Intl.NumberFormat('ru', {
  maximumFractionDigits: 0
});

export const formatNumber = (number: number) => {
  return INTEGER_FORMATTER.format(number);
};
