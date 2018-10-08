import {
    PopupData,
    PopupType,
    PopupButton,
    PopupId,
} from "./PopupData";

export interface PopupProps {
    buttons?: PopupButton[];
    title?: string | JSX.Element;
    content?: JSX.Element;
}

export function createReloginPopup(props: PopupProps) {
    return new PopupData(PopupType.Info)
        .addId(PopupId.Relogin)
        .addTitle("You've been logged out by Instagram")
        .addContent(() => props.content)
    ;
}
export function createDeletePopup(props: PopupProps) {
    return new PopupData(PopupType.Info)
        .addId(PopupId.DeleteAccount)
        .addButtons(props.buttons)
        .addTitle("You're about to delete this account")
        .addContent(() => "Do you want to remove this account from the dashboard? You can link it again later")
    ;
}
