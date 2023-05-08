import { Grid, Paper } from "@mui/material";
import React from "react";
import { MdCurrencyBitcoin } from "react-icons/md";
import "../../App.css";

type Props = {
    asset: Asset;
};

const Stock = (props: Props) => {
    function formatDollarAmount(amount: number) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });

        return formatter.format(amount);
    }
    function removeUSDT(str: string) {
        return str.replace(/USDT/g, "");
    }

    const isZero = (value: number) => {
        if (value === 0) {
            return true;
        } else {
            return false;
        }
    };

    const isPositive = (value: number) => {
        if (value > 0) {
            return true;
        } else {
            return false;
        }
    };

    function formatNumber(number: number) {
        return parseFloat(number.toFixed(5));
    }

    return (
        <Paper
            elevation={3}
            style={{ margin: "20px", padding: "10px", paddingLeft: "40px" }}
        >
            <Grid container spacing={2}>
                <Grid xs={6} md={6}>
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            {props.asset.name
                                .toLocaleLowerCase()
                                .includes("btc") ? (
                                <MdCurrencyBitcoin size={60} color="green" />
                            ) : (
                                <div style={{ height: "65px" }}></div>
                            )}
                        </div>
                        <h3>{removeUSDT(props.asset.name)}</h3>

                        <p>Current Price:</p>
                        <b>{formatDollarAmount(props.asset.price)}</b>
                    </div>
                </Grid>
                <Grid xs={6} md={6}>
                    <div>
                        <h5>Time Changes:</h5>
                        <p>
                            1s: {"  "}{" "}
                            <span
                                className={
                                    isZero(props.asset.change1s)
                                        ? "stock-text-normal"
                                        : isPositive(props.asset.change1s)
                                        ? "stock-text-green"
                                        : "stock-text-red"
                                }
                            >
                                {formatNumber(props.asset.change1s) + "%"}
                            </span>{" "}
                        </p>
                        <p>
                            1m: {"  "}{" "}
                            <span
                                className={
                                    isZero(props.asset.change1m)
                                        ? "stock-text-normal"
                                        : isPositive(props.asset.change1m)
                                        ? "stock-text-green"
                                        : "stock-text-red"
                                }
                            >
                                {formatNumber(props.asset.change1m) + "%"}
                            </span>{" "}
                        </p>
                        <p>
                            30m: {"  "}
                            <span
                                className={
                                    isZero(props.asset.change30m)
                                        ? "stock-text-normal"
                                        : isPositive(props.asset.change30m)
                                        ? "stock-text-green"
                                        : "stock-text-red"
                                }
                            >
                                {formatNumber(props.asset.change30m) + "%"}
                            </span>{" "}
                        </p>
                        <p>
                            1h: {"  "}{" "}
                            <span
                                className={
                                    isZero(props.asset.change1h)
                                        ? "stock-text-normal"
                                        : isPositive(props.asset.change1h)
                                        ? "stock-text-green"
                                        : "stock-text-red"
                                }
                            >
                                {formatNumber(props.asset.change1h) + "%"}
                            </span>{" "}
                        </p>
                        <p>
                            12h: {"  "}{" "}
                            <span
                                className={
                                    isZero(props.asset.change12h)
                                        ? "stock-text-normal"
                                        : isPositive(props.asset.change12h)
                                        ? "stock-text-green"
                                        : "stock-text-red"
                                }
                            >
                                {formatNumber(props.asset.change12h) + "%"}
                            </span>{" "}
                        </p>
                        <p>
                            1d: {"  "}{" "}
                            <span
                                className={
                                    isZero(props.asset.change1d)
                                        ? "stock-text-normal"
                                        : isPositive(props.asset.change1d)
                                        ? "stock-text-green"
                                        : "stock-text-red"
                                }
                            >
                                {formatNumber(props.asset.change1d) + "%"}
                            </span>{" "}
                        </p>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Stock;
