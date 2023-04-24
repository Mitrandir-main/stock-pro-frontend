import React, { useEffect, useState } from "react";
import Stock from "./Stock";
import { CircularProgress, Grid } from "@mui/material";

export default function ChartRenderer() {
    const [assets, setAssets] = useState<AssetData | undefined>(undefined);

    function processJsons(data: any) {
        const jsonStrings = data.trim().split("\n");
        const combinedAssets: any = [];

        jsonStrings.forEach((jsonString: any) => {
            const object = JSON.parse(jsonString);
            combinedAssets.push(...object.assets);
        });

        const distinctAssets: any = [];

        combinedAssets.forEach((asset: Asset) => {
            if (
                !distinctAssets.some(
                    (existingAsset: Asset) => existingAsset.name === asset.name
                )
            ) {
                distinctAssets.push(asset);
            }
        });

        const combinedObject = {
            assets: distinctAssets,
        };

        const combinedJsonString: AssetData = combinedObject;

        return combinedJsonString;
    }

    useEffect(() => {
        fetch("/dumy.json")
            .then((response) => response.text())
            .then((data) => {
                const combinedAssets = processJsons(data);
                setAssets(combinedAssets);
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    }, []);

    return (
        <div style={{ marginTop: "50px", width: "90%", margin: "0 auto" }}>
            {assets !== undefined ? (
                <Grid container spacing={4} justifyContent="center">
                    {assets.assets.map((x) => {
                        return (
                            <Grid item xs={12} md={4}>
                                <Stock asset={x} />
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <div>
                    <CircularProgress color="success" />
                </div>
            )}
        </div>
    );
}
