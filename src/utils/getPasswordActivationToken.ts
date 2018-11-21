/**
 * Is used exclusively for changing user
 * password via link sent in an email
 */
export function getPasswordActivationToken() {
    try {
        const rawValue = window.location.hash.match(/(?:token=)(?:\w)+/)[0];
        return rawValue.replace("token=", "");
    } catch (error) {
        throw new Error("No token found");
    }
}
