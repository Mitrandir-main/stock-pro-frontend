import React, { useEffect, useState } from "react";
import Stock from "./Stock";
import { CircularProgress, Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SocketConnection from "./SocketConnection";

export default function AssetRenderer() {
    const [assetsLatest, setAssetsLatest] = useState<Asset[]>([]);
    const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);

    const [searchValue, setSearchValue] = useState<string>("");
    const [sort, setSort] = React.useState("");
    const [filter, setFilter] = React.useState("");
    const [filterValueMin, setFilterValueMin] = React.useState(0);
    const [filterValueMax, setFilterValueMax] = React.useState(0);

    const [ascending, setAscending] = React.useState(true);

    const stockParameters = [
        { value: "change1s", text: "1s Change" },
        { value: "change1m", text: "1m Change" },
        { value: "change30m", text: "30m Change" },
        { value: "change1h", text: "1h Change" },
        { value: "change12h", text: "12h Change" },
        { value: "change1d", text: "1d Change" },
    ];

    const handleFilterAndSort = () => {
        const applySearch = (assets: Asset[]) => {
            if (!searchValue) return assets;

            return assets.filter((asset) =>
                asset.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        };

        const applyFilter = (assetsToFilter: Asset[]) => {
            if (filter === "") {
                return assetsToFilter;
            } else {
                const filtered = assetsToFilter.filter((asset) => {
                    const assetValue = asset[filter as keyof Asset];
                    if (typeof assetValue === "number") {
                        return (
                            assetValue >= filterValueMin &&
                            assetValue <= filterValueMax
                        );
                    }
                    return false;
                });
                return filtered;
            }
        };

        const applySort = (assetsToSort: Asset[]) => {
            if (sort === "") {
                return assetsToSort;
            } else {
                const sorted = [...assetsToSort].sort((a, b) => {
                    const aValue = a[sort as keyof Asset];
                    const bValue = b[sort as keyof Asset];
                    if (
                        typeof aValue === "number" &&
                        typeof bValue === "number"
                    ) {
                        return ascending ? aValue - bValue : bValue - aValue;
                    }
                    return 0;
                });
                return sorted;
            }
        };

        if (assetsLatest.length > 0) {
            let filteredAndSortedAssets = assetsLatest;
            filteredAndSortedAssets = applySearch(filteredAndSortedAssets);
            filteredAndSortedAssets = applyFilter(filteredAndSortedAssets);
            filteredAndSortedAssets = applySort(filteredAndSortedAssets);
            setFilteredAssets(filteredAndSortedAssets);
        }
    };

    useEffect(() => {
        handleFilterAndSort();
    }, [
        assetsLatest,
        searchValue,
        filter,
        sort,
        ascending,
        filterValueMin,
        filterValueMax,
    ]);

    const handleSort = (event: SelectChangeEvent) => {
        setSort(event.target.value);
    };
    const handleFilter = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const handleLatestAssets = (data: any) => {
        console.log("comming data ", data);
        let assetData: Asset[] = [];

        if (data instanceof MessageEvent) {
            const parsedData = JSON.parse(data.data);
            assetData = Array.isArray(parsedData) ? parsedData : [parsedData];
        }

        if (Array.isArray(assetData)) {
            console.log(assetData);
            let newAsset = [...assetsLatest];

            assetData.map((asset) => {
                if (asset && asset.name !== null) {
                    let matchedAsset = newAsset.find(
                        (x) =>
                            x.name.toLocaleLowerCase() ===
                            asset.name.toLocaleLowerCase()
                    );

                    if (matchedAsset) {
                        matchedAsset.price =
                            asset.price !== null && asset.price
                                ? asset.price
                                : matchedAsset.price;

                        matchedAsset.change30m =
                            asset.change30m !== null && asset.change30m
                                ? asset.change30m
                                : matchedAsset.change30m;

                        matchedAsset.change1s =
                            asset.change1s !== null && asset.change1s
                                ? asset.change1s
                                : matchedAsset.change1s;

                        matchedAsset.change1m =
                            asset.change1m !== null && asset.change1m
                                ? asset.change1m
                                : matchedAsset.change1m;

                        matchedAsset.change1h =
                            asset.change1h !== null && asset.change1h
                                ? asset.change1h
                                : matchedAsset.change1h;

                        matchedAsset.change1d =
                            asset.change1d !== null && asset.change1d
                                ? asset.change1d
                                : matchedAsset.change1d;

                        matchedAsset.change12h =
                            asset.change12h !== null && asset.change12h
                                ? asset.change12h
                                : matchedAsset.change12h;
                    } else {
                        console.log("add ", asset);
                        if (asset.name !== null && asset.price !== null) {
                            asset.change30m =
                                asset.change30m !== null ? asset.change30m : 0;

                            asset.change1s =
                                asset.change1s !== null ? asset.change1s : 0;

                            asset.change1m =
                                asset.change1m !== null ? asset.change1m : 0;

                            asset.change1h =
                                asset.change1h !== null ? asset.change1h : 0;

                            asset.change1d =
                                asset.change1d !== null ? asset.change1d : 0;

                            asset.change12h =
                                asset.change12h !== null ? asset.change12h : 0;

                            newAsset = newAsset.concat(asset);
                        }
                    }
                }
            });
            setAssetsLatest(newAsset);
        }
    };
    return (
        <div style={{ marginTop: "50px", width: "90%", margin: "0 auto" }}>
            <SocketConnection handleLatestAssets={handleLatestAssets} />

            {/* <div style={{ minHeight: "300px", backgroundColor: "white" }}>
                <h1>blah</h1>
                {Array.isArray(assetsLatest) &&
                    assetsLatest.map((x, index) => {
                        return (
                            <div key={index}>
                                <Stock asset={x} />
                            </div>
                        );
                    })}
            </div> */}
            {assetsLatest !== undefined ? (
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={3}>
                        <Paper
                            elevation={3}
                            style={{
                                margin: "20px",
                                padding: "10px",
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="search"
                                                onClick={() => {
                                                    handleFilterAndSort();
                                                }}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            style={{
                                margin: "20px",
                                padding: "10px",
                            }}
                        >
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Filter
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filter}
                                            label="Filter"
                                            onChange={handleFilter}
                                        >
                                            {stockParameters.map((x) => {
                                                return (
                                                    <MenuItem value={x.value}>
                                                        {x.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Min"
                                        variant="outlined"
                                        type="number"
                                        value={filterValueMin}
                                        onChange={(e) => {
                                            setFilterValueMin(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="outlined-basic"
                                        label="max"
                                        variant="outlined"
                                        type="number"
                                        value={filterValueMax}
                                        onChange={(e) => {
                                            setFilterValueMax(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={1}>
                                    <IconButton
                                        onClick={() => handleFilterAndSort()}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper
                            elevation={3}
                            style={{
                                margin: "20px",
                                padding: "10px",
                            }}
                        >
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={9}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Sort By
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sort}
                                            label="Sort By:"
                                            onChange={handleSort}
                                        >
                                            {stockParameters.map((x) => {
                                                return (
                                                    <MenuItem value={x.value}>
                                                        {x.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton
                                        onClick={() => setAscending(!ascending)}
                                    >
                                        {ascending ? (
                                            <ArrowDownwardIcon />
                                        ) : (
                                            <ArrowUpwardIcon />
                                        )}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {filteredAssets.length === 0 ? (
                        <div>No stocks found...</div>
                    ) : (
                        filteredAssets.map((x) => {
                            return (
                                <Grid item xs={12} md={4}>
                                    <Stock asset={x} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            ) : (
                <div>
                    <CircularProgress color="success" />
                </div>
            )}
        </div>
    );
}
