/**
 * General abstraction for window.scrollTo method
 */
const defaultOptions: ScrollToOptions = {
    behavior: "auto",
    left: 0,
    top: 0,
};

export const windowScrollTo = (props?: ScrollToOptions) => {
    const {
        behavior,
        top,
        left,
    } = props || defaultOptions;

    if (window.scrollY) {
        window.scrollTo({
            top,
            left,
            behavior,
        });
    }
};
