export function getUniqueId(min = 1000, max = 999999) {
    return Math.random() * (max - min) + min;
}
