import { round } from "@utils/numbers";

export function adjustPrice(price: number, multiplier: number, decimals = 4) {
    const priceAdjusted = round(price * multiplier, decimals);
    const delimiterIndex = priceAdjusted.indexOf(".");
    const basePrice = priceAdjusted.slice(0, delimiterIndex) + priceAdjusted.slice(delimiterIndex, delimiterIndex + 3);
    const leftOver = priceAdjusted.replace(basePrice, "");
    const finalPrice = leftOver === "00"
        ? basePrice
        : `${basePrice}${leftOver}`;

    return finalPrice;
}
