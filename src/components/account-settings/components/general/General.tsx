import * as React from "react";
import { Switch } from "../../../switch/Switch";
import * as styles from "./General.css";

export class General extends React.PureComponent {
    public render() {
        return (
            <>
                    <div className={styles.setting}>
                        <span>Enable Likes</span>
                        <Switch />
                    </div>
                    <div className={styles.setting}>
                        <span>Enable Comments</span>
                        <Switch />
                    </div>
                    <div className={styles.setting}>
                        <span>Enable Unfollows</span>
                        <Switch />
                    </div>
                    <div className={styles.setting}>
                        <span>Enable Follows</span>
                        <Switch />
                    </div>
            </>
        );
    }
}
