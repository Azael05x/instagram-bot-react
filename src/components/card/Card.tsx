import * as React from "react";
import { Divider, DividerTheme } from "../divider/Divider";
import * as styles from "./Card.scss";

export interface CardProps {
    iconComponent: JSX.Element;
    title: string;
    info?: string;
}

export class Card extends React.PureComponent<CardProps> {
    public render() {
        const {
            iconComponent,
            info,
            title,
        } = this.props;

        return (
            <div className={styles.card}>
            <div className={styles.iconContainer}>
                {iconComponent}
            </div>
             <div className={styles.cardHeader}>
                 <h2 className={styles.cardTitle}>{title}</h2>
             </div>
             <Divider theme={DividerTheme.Small} />
             {info ? (
                <p className={styles.cardInfo}>
                    {info}
                </p>
             ) : this.props.children}
         </div>
        );
    }
}

// width: 6.9em;
//     right: 30%;
//     top: 50%;
//     transform: translateY(-50%);
// }