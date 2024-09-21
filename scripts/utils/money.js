export function formatCurrency(priceCents) {
   return (Math.round(priceCents) / 100).toFixed(2);
   //We use math.round ---> bcz, for some number toFixed not working properly
}

export default formatCurrency;