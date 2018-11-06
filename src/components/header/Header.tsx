import * as React from "react";
import {
    NavLink,
    withRouter,
    RouteComponentProps,
} from "react-router-dom";
import { connect } from "react-redux";
import * as classnames from "classnames";

import { selectUser } from "@ducks/selectors";
import { User } from "@ducks/state";
import { MOBILE_WIDTH } from "@consts";
import { logout } from "@utils/requests";

import { CaretIcon } from "../icons/Caret";
import { MenuSVG } from "../icons/Menu";
import { CaretMenuSVG } from "../icons/CaretMenu";
import { Balance } from "../balance/Balance";

import * as styles from "./Header.scss";

export interface HeaderStateProps {
    user: User;
}
export interface HeaderState {
    isMenuOpen: boolean;
    isMobile: boolean;
    isHeaderMinimized: boolean;
}

export type HeaderProps = HeaderStateProps & RouteComponentProps<{}>;

export class Header extends React.PureComponent<HeaderProps, HeaderState> {
    private isScrolling = false;
    private lastScrollPositionY= 0;

    public state: HeaderState = {
        isMenuOpen: false,
        isMobile: false,
        isHeaderMinimized: false,
    };
    public componentDidMount() {
        this.setDeviceType();
        window.addEventListener("resize", this.setDeviceType);
        window.addEventListener("scroll", this.resizeHeader);
    }
    public componentWillUnmount() {
        window.removeEventListener("resize", this.setDeviceType);
        window.removeEventListener("scroll", this.resizeHeader);
    }
    public render() {
        const {
            user: {
                email,
                // balance,
            }
        } = this.props;

        const { isHeaderMinimized } = this.state;

        const userComponent = !!email
            ? (
                this.state.isMobile
                    ? <>
                        <NavLink
                            className={classnames(styles.link, styles.parentLink)}
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
                        <div className={classnames(styles.link, styles.parentLink)}>
                            <span className={styles.welcomeText}>Welcome, {email}</span>
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
            <div className={classnames(
                styles.container,
                {
                    [styles.active]: this.state.isMenuOpen,
                    [styles.isHeaderMinimized]: isHeaderMinimized,
                },
            )}>
                <div className={styles.innerContainer}>
                    <div className={styles.headerTop}>
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
                        <div className={styles.mobileNavigation}>
                            {
                                !this.state.isMenuOpen
                                ? <MenuSVG onClick={this.onOpenMenu} />
                                : <CaretMenuSVG onClick={this.onCloseMenu} />
                            }
                        </div>
                    </div>
                    <div className={classnames(styles.navigation, {[styles.active]: this.state.isMenuOpen})}>
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
                        { this.props.user.email && (
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
                    <Balance />
                </div>
            </div>
        );
    }
    private onLogout = async () => {
        try {
            await logout();

            localStorage.removeItem("email");
            this.onCloseMenu();
            window.location.href = "/";
        } catch (error) {
        }

        // Redirect to home page
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
    private resizeHeader = () => {
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => {
                const pageYOffset = window.pageYOffset;
                if (this.lastScrollPositionY !== pageYOffset) {
                    this.lastScrollPositionY = pageYOffset;
                    if (this.lastScrollPositionY > 60) {
                        this.setState({
                            isHeaderMinimized: true,
                        });
                    } else {
                        this.setState({
                            isHeaderMinimized: false,
                        });
                    }
                }

                this.isScrolling = false;
            });

            this.isScrolling = true;
        }
    }
}

const mapStateToProps = (state: any): HeaderStateProps => ({
    user: selectUser(state),
});

export const HeaderConnected = withRouter(connect<HeaderStateProps>(
    mapStateToProps,
)(Header));
