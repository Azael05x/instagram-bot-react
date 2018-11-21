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
    Dashboard = "/accounts",
    AccountsID = "/accounts/:id",
    Register = "/register",
    PasswordChangeLink = "/link/password",
    Wildcard = "*",
}
