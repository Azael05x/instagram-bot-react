import { StatusCode } from "@types";

export function noop() {/*noop*/}

/**
 * Checks whether the user is authorized before setting state
 * Doing this until a better error intercept handling is created
 */
export function afterErrorSetState(status: StatusCode, setState: () => void) {
    if (status !== StatusCode.Unauthorized) {
        setState();
    }
}
