import * as React from "react";
import { ButtonType, ButtonSize } from "../../button/Button";

export enum PopupId {
    Relogin = "RELOG_IN",
    DeleteAccount = "DELETE_ACCOUNT",
}

export interface PopupButton {
    type: ButtonType;
    icon?: JSX.Element;
    title: string;
    callback: (argument?: any) => void;
    disabled?: boolean;
    size?: ButtonSize;
}

export enum PopupType {
    Info,
    Error,
}
export type PopupCallback = (data?: object) => void;
export type PopupContentCreator = () => React.ReactNode;

export class PopupData {
    public readonly type: PopupType;
    private popupId: PopupId;
    private popupButtons: PopupButton[];
    private popupCallback: PopupCallback | undefined;
    private popupTitle: string | React.ReactNode;

    constructor(type: PopupType) {
        this.type = type;
    }

    public addId(id: PopupId): PopupData {
        this.popupId = id;
        return this;
    }
    public addButtons(buttons: PopupButton[]): PopupData {
        this.popupButtons = buttons;
        return this;
    }
    public addCallback(callback: PopupCallback | undefined): PopupData {
        this.popupCallback = callback;
        return this;
    }
    public addContent(content: () => React.ReactNode): PopupData {
        this.popupContent = content;
        return this;
    }
    public addTitle(value: string | React.ReactNode): PopupData {
        this.popupTitle = value;
        return this;
    }
    get id(): string {
        return this.popupId;
    }
    get buttons(): Array<PopupButton> {
        return this.popupButtons;
    }
    get callback(): PopupCallback | undefined {
        return this.popupCallback;
    }
    get content(): PopupContentCreator {
        return this.popupContent;
    }
    get title(): string | React.ReactNode {
        return this.popupTitle;
    }

    private popupContent: PopupContentCreator = () => null;
}
