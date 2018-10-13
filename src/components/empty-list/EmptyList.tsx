import * as React from "react";
import * as styles from "./EmptyList.scss";
import { InstagramSVG } from "../icons/Instagram";

export enum EmptyListType {
    NoAccounts,
    NoActivities,
}

export interface EmptyListProps {
    type?: EmptyListType;
}
export class EmptyList extends React.PureComponent<EmptyListProps> {
    public static defaultProps = {
        type: EmptyListType.NoAccounts,
    };
    public render() {
        switch (this.props.type) {
            case EmptyListType.NoActivities: {
                return this.renderNoActivities();
            }
            default:
                return this.renderNoAccounts();
        }
    }
    private renderNoAccounts = () => {
        return (
            <div className={styles.container}>
                <div className={styles.icon}>
                    <InstagramSVG fill={"#e7e7e7"} />
                </div>
                Looks like you're about to link your Instagram account! 😍<br />
                To do so, just press on the Link Instagram account button in the upper-right corner.
            </div>
        );
    }
    private renderNoActivities = () => {
        return (
            <div className={styles.container}>
                {/* <i className={`fas fa-bullhorn ${styles.icon}`}></i> */}
                There are no activities on this account yet.<br />
                Be sure to check in later! 🤗
            </div>
        );
    }
}
