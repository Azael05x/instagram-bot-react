import * as React from "react";
import { PricingData } from "@types";
import { getPricing } from "@utils/requests";
import { Card } from "../card/Card";

import * as styles from "./Pricing.scss";
import { adjustPrice } from "./utils";

export type PricingState = PricingData<string> & {
    multiplier: number;
};

export class Pricing extends React.PureComponent<{}, PricingState> {
    public state: PricingState = {
        comment: "0",
        follow: "0",
        like: "0",
        unfollow: "0",
        multiplier: 100,
    };

    private commentOriginal = 0;
    private followOriginal = 0;
    private likeOriginal = 0;
    private unfollowOriginal = 0;

    public async componentDidMount() {
        const {
            comment,
            follow,
            like,
            unfollow,
        } = (await getPricing()).data;

        this.commentOriginal = comment;
        this.followOriginal = follow;
        this.likeOriginal = like;
        this.unfollowOriginal = unfollow;

        this.setState({
            comment: adjustPrice(comment, this.state.multiplier),
            follow: adjustPrice(follow, this.state.multiplier),
            like: adjustPrice(like, this.state.multiplier),
            unfollow: adjustPrice(unfollow, this.state.multiplier),
        });
    }

    public render() {
        return <>
            <Card
                title={"Pay as you go"}
            >
                <div className={styles.calculator}>
                    How much is it per {this.state.multiplier} {this.state.multiplier === 1 ? "action" : "actions"}?

                    <input
                        className={styles.calculatorSlider}
                        type="range"
                        onChange={this.calculatePrice}
                        min={1}
                        max={1000}
                        value={this.state.multiplier}
                    />
                </div>
                <div className={styles.container}>
                    <div className={styles.priceContainer}>
                        <div className={styles.price}>{this.state.like}</div>
                        <span className={styles.subPriceContainer}>
                            <span className={styles.subPrice}>{this.likeOriginal}</span>
                            {" "}
                            per like
                        </span>
                    </div>
                    <div className={styles.priceContainer}>
                        <div className={styles.price}>{this.state.follow}</div>
                        <span className={styles.subPriceContainer}>
                            <span className={styles.subPrice}>{this.followOriginal}</span>
                            {" "}
                            per follow
                        </span>
                    </div>
                    <div className={styles.priceContainer}>
                        <div className={styles.price}>{this.state.unfollow}</div>
                        <span className={styles.subPriceContainer}>
                            <span className={styles.subPrice}>{this.unfollowOriginal}</span>
                            {" "}
                            per unfollow
                        </span>
                    </div>
                    <div className={styles.priceContainer}>
                        <div className={styles.price}>{this.state.comment}</div>
                        <span className={styles.subPriceContainer}>
                            <span className={styles.subPrice}>{this.commentOriginal}</span>
                            {" "}
                            per comment
                        </span>
                    </div>
                </div>
            </Card>
        </>;
    }

    private calculatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const multiplier = +event.currentTarget.value;

        this.setState({
            multiplier,
            comment: adjustPrice(this.commentOriginal, multiplier),
            follow: adjustPrice(this.followOriginal, multiplier),
            like: adjustPrice(this.likeOriginal, multiplier),
            unfollow: adjustPrice(this.unfollowOriginal, multiplier),
        });
    }
}
