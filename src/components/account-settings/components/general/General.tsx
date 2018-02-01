import * as React from "react";
import { Switch } from "../../../switch/Switch";
import { Activities } from "../../../../middleware/types";
import * as styles from "./General.css";

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
                        <Switch value={values.enabled_likes} onToggle={onLikesToggle} />
                    </div>
                    <div className={styles.setting}>
                        <span>Enable Comments</span>
                        <Switch value={values.enabled_comments} onToggle={onCommentsToggle} />
                    </div>
                    <div className={styles.setting}>
                        <span>Enable Unfollows</span>
                        <Switch value={values.enabled_unfollows} onToggle={onUnfollowsToggle} />
                    </div>
                    <div className={styles.setting}>
                        <span>Enable Follows</span>
                        <Switch value={values.enabled_follows} onToggle={onFollowsToggle} />
                    </div>
            </>
        );
    }
}
