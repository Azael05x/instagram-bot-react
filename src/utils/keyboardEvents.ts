import {
    ENTER_KEY_NAME,
    ENTER_KEY_CODE,
} from "@consts";

export function getPressedKey(event: any): string | void {
    if (event.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
    }

    /**
     * Such structure is required until keyboard event handling
     * is finalized across browsers
     * 21.07.18.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
     */
    let handled = false;
    let keyCode: number | string;
    if (event.key !== undefined) {
        keyCode = event.key;
        handled = true;
    } else if (event.keyIdentifier !== undefined) {
        keyCode = event.keyIdentifier;
        handled = true;
    } else if (event.keyCode !== undefined) {
        keyCode = event.keyCode;
        handled = true;
    }

    if (handled) {
        event.preventDefault();
        return `${keyCode}`;
    }
}

export function isEnterKey(keyPressed: string) {
    return keyPressed === ENTER_KEY_NAME || keyPressed === ENTER_KEY_CODE;
}
