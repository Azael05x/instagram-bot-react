export interface MatchProps<P> {
    isExact: boolean;
    match: {
        params: P;
    };
    path: string;
    url: string;
}

export enum Path {
    Home = "/",
    Login = "/login",
    Faq = "/faq",
    Profile = "/profile",
    LinkAccount = "/link-account",
    Accounts = "/accounts",
    AccountsID = "/accounts/:id",
    Register = "/register",
    Wildcard = "*",
}
