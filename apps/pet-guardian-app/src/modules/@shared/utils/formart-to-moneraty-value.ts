export const formatToMonetaryValue = (value: number | string) => {
  if (!value || value === 0) return 'R$ 0'

  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  }).format(Math.abs(+value))
}
