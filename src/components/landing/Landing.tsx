// tslint:disable:max-line-length

import * as React from "react";
import { connect } from "react-redux";
import * as styles from "./Landing.scss";
import {
    withRouter,
    RouteComponentProps,
} from "react-router-dom";
import { Divider, DividerTheme } from "../divider/Divider";
import { SignUpConnected } from "./components/SignUp";
import { HeroConnected } from "./components/Hero";
import { WhatWeDoDont } from "./components/WhatWeDoDont";
import { selectUser } from "../../ducks/selectors";

export interface LandingStateProps {
    hasUser: boolean;
}

export type LandingProps = LandingStateProps & RouteComponentProps<{}>;

export class Landing extends React.Component<LandingProps> {
    render() {
        return (
            <div className={styles.container}>
                <HeroConnected />

                <div className={styles.sectionContainer}>
                    <h1 className={styles.title}>
                        Boost your <span className={styles.accent}>Instagram exposure</span><br />
                        in just <span className={styles.accent}>3 easy steps</span>
                    </h1>
                    <Divider theme={DividerTheme.Small} />
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <i className={`fas fa-plus ${styles.icon}`} />
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>Link</h2>
                            </div>
                            <Divider theme={DividerTheme.Small} />
                            <p className={styles.cardInfo}>
                                Link and Manage as many Instagram accounts as you wish.
                                By the way, We don't store your passwords, don't worry.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <i className={`fas fa-cog ${styles.icon}`} />
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>Setup</h2>
                            </div>
                            <Divider theme={DividerTheme.Small} />
                            <p className={styles.cardInfo}>
                                Add any hashtags and/or users that you prefer to follow, add comments for video and image posts
                            </p>
                        </div>
                        <div className={styles.card}>
                            <i className={`fas fa-play ${styles.icon}`} />
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>Start</h2>
                            </div>
                            <Divider theme={DividerTheme.Small} />
                            <p className={styles.cardInfo}>
                                Start or Pause activities on your account with just a click of a button
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.sectionContainer}>
                    <WhatWeDoDont />
                </div>

                {!this.props.hasUser && (
                    <div className={styles.sectionContainer}>
                        <h1 className={styles.title}>
                            Not sure?<br />
                            Try us for <span className={styles.accent}>free</span>!
                        </h1>
                        <Divider theme={DividerTheme.Small} />
                        <SignUpConnected />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any): LandingStateProps => ({
    hasUser: !!selectUser(state).email,
});

export const LandingConnected = withRouter(connect<LandingStateProps>(
    mapStateToProps
)(Landing));
