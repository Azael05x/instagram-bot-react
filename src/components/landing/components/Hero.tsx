import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
                        Hello,
                    </h1>
                    <small className={styles.heroSub}>
                        would you like to boost <br />your Instagram account?
                    </small>
                    <Divider />
                    {!this.props.hasUser && (
                        <Button
                            label={"Yes, I want a free demo"}
                            onClick={this.onFreeDemo}
                            type={ButtonType.Danger}
                        />
                    )}
                </div>
                <div className={styles.heroImage}></div>
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

export const HeroConnected = connect<HeroProps>(
    mapStateToProps
)(Hero);
