import { CommonState } from "../ducks/state";
import { ToastState } from "../components/toast/ducks/state";

export interface InstaState {
    common: CommonState;
    toast: ToastState;
}
