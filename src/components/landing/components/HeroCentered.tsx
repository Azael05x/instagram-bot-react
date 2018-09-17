import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as classnames from "classnames";
import { Path } from "@types";
import { selectUser } from "@ducks/selectors";

import { Divider } from "../../divider/Divider";
import { Button, ButtonType } from "../../button/Button";

import * as styles from "../Landing.scss";

export interface HeroProps {
    hasUser: boolean;
}
export interface HeroState {
    redirect: boolean;
}

export class Hero extends React.PureComponent<HeroProps, HeroState> {
    public state = {
        redirect: false,
    };
    public render() {
        if (this.state.redirect) {
            return <Redirect exact to={Path.Register} />;
        }

        return (
            <div className={styles.heroContainer}>
                <div className={styles.heroTitleContainer}>
                    <h1 className={styles.heroTitle}>
                        Are you getting the most out of your Instagram?
                    </h1>
                    <small className={styles.heroSub}>
                        Reach thousands of people in seconds rather than months
                    </small>
                    {!this.props.hasUser && <>
                        <Divider />
                        <div className={styles.ctaButtonContainer}>
                            <Button
                                label={"Yes, let's try it for free"}
                                onClick={this.onFreeDemo}
                                type={ButtonType.Danger}
                            />
                            <small className={classnames(styles.heroSub, styles.ctaSub)}>
                                No credit card required
                            </small>
                        </div>
                    </>}
                </div>
            </div>
        );
    }
    private onFreeDemo = () => {
        // Redirect to sign up page
        this.setState({
            redirect: true,
        });
    }
}

const mapStateToProps = (state: any): HeroProps => ({
    hasUser: !!selectUser(state).email,
});

export const HeroCenteredConnected = connect<HeroProps>(
    mapStateToProps
)(Hero);
