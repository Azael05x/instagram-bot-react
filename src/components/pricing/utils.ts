import { round } from "@utils/numbers";

export function adjustPrice(price: number, multiplier: number, decimals = 4) {
    return round(price * multiplier, decimals);
}
