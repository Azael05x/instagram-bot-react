/**
 * Avoid Javascript rounding issues
 */
export function round(value: number | string, decimals: number) {
    const preciseNumber = Number(Math.round(`${value}e${decimals}` as any as number) + "e-" + decimals);
    return preciseNumber.toFixed(decimals);
}
