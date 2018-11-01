// tslint:disable:max-line-length

import * as React from "react";
import { connect } from "react-redux";
import * as styles from "./Landing.scss";
import {
    withRouter,
    RouteComponentProps,
} from "react-router-dom";
import { selectUser } from "@ducks/selectors";
import { Divider, DividerTheme } from "../divider/Divider";
import { SignUpConnected } from "./components/SignUp";
// import { HeroConnected } from "./components/Hero";
import { WhatWeDoDont } from "./components/WhatWeDoDont";
import { PlaySVG } from "../icons/Play";
import { CogSVG } from "../icons/Cog";
import { Card } from "../card/Card";
import { LinkSVG } from "../icons/Link";
import { HeroCenteredConnected } from "./components/HeroCentered";
import { FluidTitle } from "../fluid-title/FluidTitle";
import { Pricing } from "../pricing/Pricing";

const SignUpTitleChildren = () => <>
    Not sure?<br />
    Try us for <span className={styles.accent}>free</span>!
</>;

export interface LandingStateProps {
    hasUser: boolean;
}

export type LandingProps = LandingStateProps & RouteComponentProps<{}>;

export class Landing extends React.Component<LandingProps> {
    render() {
        return (
            <div className={styles.container}>
                <HeroCenteredConnected />

                <div className={styles.sectionContainer}>
                    <h1 className={styles.title}>
                        Boost your <span className={styles.accent}>Instagram exposure</span><br />
                        in just <span className={styles.accent}>3 easy steps</span>
                    </h1>
                    <Divider theme={DividerTheme.Small} />
                    <div className={styles.cardContainer}>
                        <Card
                            iconComponent={<LinkSVG />}
                            title={"Link"}
                            info={"Link and Manage as many Instagram accounts as you wish. We don't store your passwords, don't worry."}
                        />
                        <Card
                            iconComponent={<CogSVG />}
                            title={"Setup"}
                            info={"Add any hashtags and/or users that you prefer to follow, add comments for video and image posts"}
                        />
                        <Card
                            iconComponent={<PlaySVG />}
                            title={"Start"}
                            info={"Start or Pause activities on your account with just a click of a button"}
                        />
                    </div>
                </div>

                <div className={styles.sectionContainer}>
                    <WhatWeDoDont />
                </div>

                <div className={styles.sectionContainer}>
                    <h1 className={styles.title}>
                        Why <span className={styles.accent}>choose us</span>?
                    </h1>
                    <Divider theme={DividerTheme.Small} />
                    <Pricing />
                </div>

                {!this.props.hasUser && (
                    <div className={styles.sectionContainer}>
                        <FluidTitle title={<SignUpTitleChildren />} />
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

export default LandingConnected;
