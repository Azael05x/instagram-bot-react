import * as React from "react";
import { connect } from "react-redux";

import { selectPopup } from "../../ducks/selectors";
import { PopupData, PopupButton } from "./factory/PopupData";
import { Divider, DividerTheme } from "../divider/Divider";
import * as styles from "./Popup.scss";

export interface PopupStateProps {
    popup: PopupData;
}
export type PopupProps = PopupStateProps;

export class Popup extends React.PureComponent<PopupProps> {
    render() {
        if (!this.props.popup) {
            return null;
        }

        const { popup } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.overlay} />
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        {popup.title}
                        <Divider theme={DividerTheme.Small} />
                    </div>
                    <div className={styles.contentBody}>
                        {popup.content()}
                    </div>
                    <div className={styles.buttonContainer}>
                        {this.renderButtons(popup.buttons)}
                    </div>
                </div>
            </div>
        );
    }
    private renderButtons = (buttons: PopupButton[]) => {
        return buttons.map((button, i) => {
            return (
                <button
                    key={i}
                    data-role={button.id}
                    onClick={button.callback}
                    className={`${styles.button} ${styles[button.id]}`}
                >
                    {button.icon}
                    {button.icon && " "}
                    {button.title}
                </button>
            );
        });
    }
}

const mapStateToProps = (state: any): PopupStateProps => ({
    popup: selectPopup(state),
});

export const PopupConnected = connect<PopupStateProps, {}>(
    mapStateToProps,
    undefined,
)(Popup);
