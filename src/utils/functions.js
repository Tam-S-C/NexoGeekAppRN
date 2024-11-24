export const calculate_total_price = (items) => {
  return items.reduce((acc, item) => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    return acc + discountedPrice * item.quantity;
  }, 0);
};
