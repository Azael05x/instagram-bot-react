export interface MatchProps<P> {
    isExact: boolean;
    match: {
        params: P;
    };
    path: string;
    url: string;
}
