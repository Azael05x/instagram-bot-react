export const adjustPrice = (price: number, multiplier: number, decimals = 4) => {
    return +(price * multiplier).toFixed(decimals);
};
