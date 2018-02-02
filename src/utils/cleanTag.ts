export function cleanTag(tag: string) {
    return tag.replace(/#/g, "").replace(/\s/g, "_").replace(/@/g, "");
}
