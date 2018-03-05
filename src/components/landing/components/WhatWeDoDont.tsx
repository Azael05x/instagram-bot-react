import * as React from "react";
import { Divider, DividerTheme } from "../../divider/Divider";

import * as styles from "../Landing.scss";

export class WhatWeDoDont extends React.PureComponent {
    public render() {
        return <>
            <h1 className={styles.title}>
                So... fake likes, fake followers?
            </h1>
            <Divider theme={DividerTheme.Small} />

            <div>
                <h2 className={styles.accent} style={{marginBottom: 0}}>Absolutely not.</h2>
                <small>and here's 2 pretty boxes to elaborate</small>
            </div>

            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <i className={`fas fa-check ${styles.icon} ${styles.success}`} />
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>We Do</h2>
                    </div>
                    <Divider theme={DividerTheme.Small} />
                    <ul className={styles.cardInfo}>
                        <li>Expose your account to thousands real potential followers</li>
                        <li>Allow to follow any hashtags and users</li>
                        <li>Use your custom comments for posts</li>
                        <li>Allow to unfollow recently followed users</li>
                        <li>Provide statistics to see each accounts growth dynamics</li>
                    </ul>
                </div>
                <div className={styles.card}>
                    <i className={`fas fa-times ${styles.icon} ${styles.danger}`} />
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>We Don't</h2>
                    </div>
                    <Divider theme={DividerTheme.Small} />
                    <ul className={styles.cardInfo}>
                        <li>Add fake followers</li>
                        <li>Add fake likes</li>
                        <li>Add fake comments</li>
                    </ul>
                </div>
            </div>
        </>;
    }
}
