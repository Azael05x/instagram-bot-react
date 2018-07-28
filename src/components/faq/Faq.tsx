import * as React from "react";
import {
    RouteComponentProps,
} from "react-router-dom";
import { Divider, DividerTheme } from "../divider/Divider";

import * as styles from "./Faq.scss";

export interface FaqOwnProps {
    hasUser: boolean;
}
export type FaqProps = FaqOwnProps & RouteComponentProps<{}>;

export class Faq extends React.PureComponent<FaqProps> {
    public render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>FAQ</h1>
                <Divider theme={DividerTheme.Small} />
                <div className={styles.itemContainer}>
                    <div className={styles.item}>
                        <h3 className={styles.title}>How many new followers will I have?</h3>
                        <Divider theme={DividerTheme.Small} />
                        <small className={styles.itemInfo}>
                            This depends entirely on the relevancy of the hashtags to your profile content,
                            the quality of your posts
                            and, well... luck.
                        </small>
                    </div>
                    <div className={styles.item}>
                        <h3 className={styles.title}>Do you sell fake likes and fake followers?</h3>
                        <Divider theme={DividerTheme.Small} />
                        <small className={styles.itemInfo}>
                            No.
                            <br />
                            <br />
                            Also, we don't recommend you to buy them.
                            You gain only an illusion of legitimacy
                            and can loose a significant amount of trust from
                            real followers.
                        </small>
                    </div>
                    <div className={styles.item}>
                        <h3 className={styles.title}>How to improve content quality?</h3>
                        <Divider theme={DividerTheme.Small} />
                        <small className={styles.itemInfo}>
                            A rather broad question dependant on the context.
                            However, to quote Ryan Holliday – "Be bold, be brash."
                            and "It's a Marathon, not a Sprint."
                            <br />
                            <br />
                            What we mean is don't expect results tomorrow.
                            You need to put yourself out in the world first,
                            expose yourself to as many people as possible.
                            Gain their trust by liking, commenting and, maybe, following them.
                            <br />
                            <br />
                            I'm saying maybe because no one likes an instagram account
                            with thousands of followed people. This stinks of spam.
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default Faq;
