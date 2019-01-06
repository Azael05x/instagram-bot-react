import * as React from "react";
import { Activities } from "@middleware/types";

import { Switch } from "../../../switch/Switch";

import * as styles from "./General.scss";

export interface GeneralProps {
    values: Activities;
    onLikesToggle: (value: boolean) => void;
    onFollowsToggle: (value: boolean) => void;
    onUnfollowsToggle: (value: boolean) => void;
    onCommentsToggle: (value: boolean) => void;
}

export class General extends React.PureComponent<GeneralProps> {
    public render() {
        const {
            values,
            onCommentsToggle,
            onFollowsToggle,
            onLikesToggle,
            onUnfollowsToggle,
        } = this.props;
        return (
            <>
                <div className={styles.setting}>
                    <span>Enable Likes</span>
                    <Switch value={values.enabledLikes} onToggle={onLikesToggle} />
                </div>
                <div className={styles.setting}>
                    <span>Enable Comments</span>
                    <Switch value={values.enabledComments} onToggle={onCommentsToggle} />
                </div>
                <div className={styles.setting}>
                    <span>Enable Follows</span>
                    <Switch value={values.enabledFollows} onToggle={onFollowsToggle} />
                </div>
                <div className={styles.setting}>
                    <span>Enable Unfollows</span>
                    <Switch value={values.enabledUnfollows} onToggle={onUnfollowsToggle} />
                </div>
            </>
        );
    }
}
