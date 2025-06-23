export const formatToMonetaryValue = (value: number | string) => {
  if (!value || value === 0) return 'R$ 0'

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  }).format(+value)

  if (formatted.startsWith('-R$')) {
    return formatted.replace('-R$', 'R$ -')
  }

  return formatted
}
