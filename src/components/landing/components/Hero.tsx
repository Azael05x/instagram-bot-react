import * as React from "react";
import { connect } from "react-redux";

import { Divider } from "../../divider/Divider";
import { Button, ButtonType } from "../../button/Button";
import { selectUser } from "../../../ducks/selectors";

import * as styles from "../Landing.scss";

export interface HeroProps {
    hasUser: boolean;
}

export class Hero extends React.PureComponent<HeroProps> {
    private onFreeDemo = () => {
        // TODO: Redirect to sign up page
    }
    public render() {
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
}

const mapStateToProps = (state: any): HeroProps => ({
    hasUser: !!selectUser(state).auth_token,
});

export const HeroConnected = connect<HeroProps>(
    mapStateToProps
)(Hero);
