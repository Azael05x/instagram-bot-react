/**
 * Avoid Javascript rounding issues
 */
export function round(value: number, decimals: number) {
    return Number(Math.round(`${value}e${decimals}` as any as number) + "e-" + decimals);
}
