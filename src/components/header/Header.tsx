import * as React from 'react';
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { selectUser, User } from '../../ducks/common';

import * as styles from "./Header.css";

export interface HeaderStateProps {
    user: User;
}

export type HeaderProps = HeaderStateProps;

export class Header extends React.PureComponent<HeaderProps, {}> {
    render() {
        const userComponent = this.props.user.logged_in
            ? (
            <NavLink
                className={styles.link}
                to={"/profile"}
                exact
                about="Profile"
                activeClassName={styles.active}
            >
                Welcome, {this.props.user.email}
            </NavLink>
            )
            : (
                <NavLink
                    className={styles.link} to={"/login"}
                    exact
                    about="Login"
                    activeClassName={styles.active}
                >
                    Login
                </NavLink>
            );
        return (
            <div className={styles.container}>
                <NavLink
                    className={styles.link}
                    to={"/"}
                    exact
                    about="Dashboard"
                    activeClassName={styles.active}
                >
                    Dashboard
                </NavLink>
               {userComponent}
            </div>
        );
    }
}

const mapStateToProps = (state: any): HeaderStateProps => ({
    user: selectUser(state),
});

export const HeaderConnected = withRouter(connect<HeaderStateProps, {}>(
    mapStateToProps,
    {},
)(Header) as any);