import React from "react";

type Props = {
    asset: Asset;
};

const Stock = (props: Props) => {
    return (
        <div>
            <h5>{props.asset.name}</h5>
            <p>Price: {props.asset.price}</p>
            <p>change1s: {props.asset.change1s}</p>
            <p>change1m: {props.asset.change1m}</p>
            <p>change30m: {props.asset.change30m}</p>
            <p>change1h: {props.asset.change1h}</p>
            <p>change12h: {props.asset.change12h}</p>
            <p>change1d: {props.asset.change1d}</p>
        </div>
    );
};

export default Stock;
