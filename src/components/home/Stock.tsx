import { Grid, Paper } from "@mui/material";
import React from "react";
import { FaBeer } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";

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

    return (
        <Paper
            elevation={3}
            style={{ margin: "20px", padding: "10px", paddingLeft: "40px" }}
        >
            <Grid container spacing={2}>
                <Grid xs={6} md={6}>
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            <MdCurrencyBitcoin size={60} color="green" />
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
                            1 second:{" "}
                            {" " + formatDollarAmount(props.asset.change1s)}
                        </p>
                        <p>
                            1 minute:{" "}
                            {" " + formatDollarAmount(props.asset.change1m)}
                        </p>
                        <p>
                            30 minutes:{" "}
                            {" " + formatDollarAmount(props.asset.change30m)}
                        </p>
                        <p>
                            1 hour:{" "}
                            {" " + formatDollarAmount(props.asset.change1h)}
                        </p>
                        <p>
                            12 hours:{" "}
                            {" " + formatDollarAmount(props.asset.change12h)}
                        </p>
                        <p>
                            1 day:{" "}
                            {" " + formatDollarAmount(props.asset.change1d)}
                        </p>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Stock;
