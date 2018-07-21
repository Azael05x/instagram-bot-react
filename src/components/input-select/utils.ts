import {
    SearchTagItem,
    SearchUserItem,
} from "@types";

export function isUserSearch(result: SearchTagItem[] | SearchUserItem[]): result is SearchUserItem[] {
    return result[0] && (<SearchUserItem>result[0]).fullName !== undefined;
}

export function sortTagSearchResult(results: SearchTagItem[]) {
    return results.sort((a, b) => {
        return b.mediaCount - a.mediaCount;
    });
}
export function sortUserSearchResult(results: SearchUserItem[]) {
    return results.sort((a, b) => {
        return b.followerCount - a.followerCount;
    });
}

export function checkDuplicateTagResult(currentValues: string[], results: SearchTagItem[]) {
    return results.filter(result => !currentValues.includes(result.name));
}
export function checkDuplicateUsersResult(currentValues: string[], results: SearchUserItem[]) {
    return results.filter(result => !currentValues.includes(result.username));
}
