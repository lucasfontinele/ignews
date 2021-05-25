export const formatCurrency = (amount: number, currency: string): string => {
  const formattedAmount = Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
  }).format(amount);

  return formattedAmount;
}