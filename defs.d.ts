declare module "*.css" {
    var styles: { [key: string]: string };
    export = styles
}
declare module "*.scss" {
    var styles: { [key: string]: string };
    export = styles
}
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare var Process: {
    env: {
        NODE_ENV: string;
    }
}
