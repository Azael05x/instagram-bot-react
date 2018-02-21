import * as React from "react";
import * as styles from "../Popup.scss";

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
        .addButtons(props.buttons)
        .addTitle(props.title ? props.title : <h3 className={styles.title}>Please Re-Log In</h3>)
        .addContent(() => props.content)
    ;
}
