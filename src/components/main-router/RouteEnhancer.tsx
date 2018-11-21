import * as React from "react";
import { RequireAuth } from "../require-auth/RequireAuth";
import { AsyncComponent } from "../async-component/AsyncComponent";
import { Module } from "@types";

/**
 * Enhancer handles <Route /> components
 * helps determine whether to require authorisation
 * or simply return an AsyncComponent (syntax required for RR4)
 *
 * 1. Required auth paths - check required, if not logged in
 * push to /login history and React Router will
 * handle the rest
 * 2. Simple paths - no check required
 */
export function RouteEnhancer(
    module: Module,
    isAuthRequired: boolean = false,
) {
    if (isAuthRequired) {
        return RequireAuth(module);
    } else {
        return () => <AsyncComponent moduleProvider={module} />;
    }
}
