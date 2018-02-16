export function cleanTags(tag: string) {
    return tag.replace(/#/g, "").replace(/@/g, "").split(" ");
}
export function cleanTextArea(tag: string) {
    return tag.trim();
}
