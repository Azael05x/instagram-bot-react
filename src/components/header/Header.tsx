import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { selectUser } from "../../ducks/selectors";
import { User } from "../../ducks/state";
import { CaretIcon } from "../icons/Caret";
import { MOBILE_WIDTH } from "../../consts";

import * as styles from "./Header.scss";

export interface HeaderStateProps {
    user: User;
}
export interface HeaderState {
    isMenuOpen: boolean;
    isMobile: boolean;
}

export type HeaderProps = HeaderStateProps & RouteComponentProps<{}>;

export class Header extends React.PureComponent<HeaderProps, HeaderState> {
    public state = {
        isMenuOpen: false,
        isMobile: false,
    };
    public componentDidMount() {
        this.setDeviceType();
        window.addEventListener("resize", this.setDeviceType);
    }
    public componentWillUnmount() {
        window.removeEventListener("resize", this.setDeviceType);
    }
    public render() {
        const {
            user: {
                email,
                auth_token,
            }
        } = this.props;

        const userComponent = !!auth_token
            ? (
                this.state.isMobile
                    ? <>
                        <NavLink
                            className={`${styles.link} ${styles.parentLink}`}
                            to={"/profile"}
                            exact
                            about="Profile"
                            activeClassName={styles.active}
                            onClick={this.onCloseMenu}
                        >
                            Profile
                        </NavLink>
                        <div
                            className={styles.link}
                            onClick={this.onLogout}
                        >
                            Logout
                        </div>
                    </>
                    : (
                        <div className={`${styles.link} ${styles.parentLink}`}>
                            Welcome, {email}
                            <span className={styles.caret}>
                                <CaretIcon />
                            </span>
                            <div className={styles.dropdown}>
                                <NavLink
                                    className={styles.link}
                                    to={"/profile"}
                                    exact
                                    about="Profile"
                                    activeClassName={styles.active}
                                    onClick={this.onCloseMenu}
                                >
                                    Profile
                                </NavLink>
                                <div
                                    className={styles.link}
                                    onClick={this.onLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
            )
            : (
                <NavLink
                    className={styles.link} to={"/login"}
                    exact
                    about="Login"
                    activeClassName={styles.active}
                    onClick={this.onCloseMenu}
                >
                    Login
                </NavLink>
            );

        return (
            <div className={`${styles.container} ${this.state.isMenuOpen && styles.active}`}>
                <div className={styles.innerContainer}>
                    <NavLink
                            className={styles.logo}
                            to={"/"}
                            exact
                            about="Home"
                            onClick={this.onCloseMenu}
                        >
                            {/* Insert logo here  */}
                            gekotta.
                        </NavLink>
                    <div className={styles.mobileNavigation} >
                        <div
                            className={`${styles.icon} ${!this.state.isMenuOpen && styles.active}`}
                            onClick={this.onOpenMenu}
                        >
                            <i className="fas fa-bars" />
                        </div>
                        <div
                            className={`${styles.icon} ${this.state.isMenuOpen && styles.active}`}
                            onClick={this.onCloseMenu}
                        >
                            <i className="fas fa-chevron-left" />
                        </div>
                    </div>
                    <div className={`${styles.navigation} ${this.state.isMenuOpen && styles.active}`}>
                        <NavLink
                            className={styles.link}
                            to={"/"}
                            exact
                            about="Home"
                            activeClassName={styles.active}
                            onClick={this.onCloseMenu}
                        >
                            Home
                        </NavLink>
                        { this.props.user.auth_token && (
                            <NavLink
                                className={styles.link}
                                to={"/accounts"}
                                exact
                                about="Dashboard"
                                activeClassName={styles.active}
                                onClick={this.onCloseMenu}
                            >
                                Dashboard
                            </NavLink>
                        )}
                        <NavLink
                            className={styles.link}
                            to={"/faq"}
                            exact
                            about="FAQ"
                            activeClassName={styles.active}
                            onClick={this.onCloseMenu}
                        >
                            FAQ
                        </NavLink>
                        {userComponent}
                    </div>
                </div>
            </div>
        );
    }
    private onLogout = () => {
        localStorage.removeItem("auth_token");
        this.onCloseMenu();

        // Redirect to home page
        window.location.href = "/";
    }
    private onOpenMenu = () => {
        // To prevent page scrolling
        document.querySelector("html").style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        this.setState({
            isMenuOpen: true,
        });
    }
    private onCloseMenu = () => {
        if (this.state.isMenuOpen) {
            // To prevent page scrolling
            document.querySelector("html").style.overflow = "initial";
            document.body.style.overflow = "initial";

            this.setState({
                isMenuOpen: false,
            });
        }
    }
    private setDeviceType = () => {
        if (document.body.clientWidth <= MOBILE_WIDTH) {
            if (!this.state.isMobile) {
                this.setState({
                    isMobile: true,
                });
            }
        } else {
            if (this.state.isMobile) {
                this.setState({
                    isMobile: false,
                });
            }
        }
    }
}

const mapStateToProps = (state: any): HeaderStateProps => ({
    user: selectUser(state),
});

export const HeaderConnected = withRouter(connect<HeaderStateProps, {}>(
    mapStateToProps,
    {},
)(Header));
