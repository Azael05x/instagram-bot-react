import * as React from "react";
import { connect } from "react-redux";

import { selectPopup } from "@ducks/selectors";

import { PopupData, PopupButton } from "./factory/PopupData";
import { Divider, DividerTheme } from "../divider/Divider";
import { Button } from "../button/Button";

import * as styles from "./Popup.scss";

export interface PopupStateProps {
    popup: PopupData;
}
export type PopupProps = PopupStateProps;

export class Popup extends React.PureComponent<PopupProps> {
    render() {
        // TODO: Fix animation of popup
        // if (!this.props.popup) {
        //     return null;
        // }

        const { popup } = this.props;

        return (
            <div className={`${styles.container} ${!!this.props.popup && styles.active}`}>
                <div className={styles.overlay} />
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        <h3 className={styles.title}>{popup && popup.title}</h3>
                        <Divider theme={DividerTheme.SmallBigMargin} />
                    </div>
                    <div className={styles.contentBody}>
                        {popup && popup.content()}
                    </div>
                    {popup && popup.buttons && (
                        <div className={styles.buttonContainer}>
                            {this.renderButtons(popup.buttons)}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    private renderButtons = (buttons: PopupButton[]) => {
        return buttons.map((button, i) => {
            return (
                <Button
                    key={i}
                    onClick={button.callback}
                    label={button.title}
                    type={button.type}
                    size={button.size}
                />
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
