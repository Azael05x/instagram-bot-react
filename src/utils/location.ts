
/**
 * Used in middlewares when the current instagram account is unknown
 */
export const getAccountIdFromParams = () => {
    const accountsRouteMatch = window.location.href.match(/accounts\/\d+/);
    return accountsRouteMatch && +accountsRouteMatch[0].split("/")[1];
};
