import React, { useEffect, useState } from "react";

type Props = {};

interface Asset {
    name: string;
    price: number;
    change1s: number;
    change1m: number;
    change30m: number;
    change1h: number;
    change12h: number;
    change1d: number;
}

interface AssetData {
    assets: Asset[];
}

export default function ChartRenderer(props: Props) {
    const [assets, setAssets] = useState<AssetData | undefined>(undefined);

    function processJsons(data: any) {
        const jsonStrings = data.trim().split("\n");
        const combinedAssets: any = [];

        jsonStrings.forEach((jsonString: any) => {
            const object = JSON.parse(jsonString);
            combinedAssets.push(...object.assets);
        });

        const combinedObject = {
            assets: combinedAssets,
        };

        const combinedJsonString: AssetData = combinedObject;

        return combinedJsonString;
    }

    useEffect(() => {
        const jsonString = '{"assets":[...]}';

        fetch("/dumy.json")
            .then((response) => response.text())
            .then((data) => {
                const combinedAssets = processJsons(data);
                setAssets(combinedAssets);
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    }, []);

    return (
        <div>
            {assets !== undefined ? (
                <div>
                    {assets.assets.map((x) => {
                        return <div>{x.name}</div>;
                    })}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
