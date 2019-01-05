import { debounce, DebounceSettings } from "lodash";

const DEFAULT_TIMEOUT = 500;
const DEFAULT_DEBOUNCE_SETTINGS: DebounceSettings = { trailing: false, leading: true};

export interface DebounceFuncArgs {
    cb: () => void;
    options?: {
        timeoutInMs?: number;
        debounceSettings: DebounceSettings;
    };
}
export const debouncedCb = ({ cb, options }: DebounceFuncArgs) => {
    const timeout = (options && options.timeoutInMs) || DEFAULT_TIMEOUT;
    const settings = (options && options.debounceSettings) || DEFAULT_DEBOUNCE_SETTINGS;

    return debounce(
        cb,
        timeout,
        settings,
    );
};
