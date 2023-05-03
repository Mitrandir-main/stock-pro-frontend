import React, { useEffect, useState } from "react";
import Stock from "./Stock";
import { CircularProgress, Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ChartRenderer() {
    const [assets, setAssets] = useState<AssetData | undefined>(undefined);
    const [searchValue, setSearchValue] = useState<string>("");
    const [sort, setSort] = React.useState("");
    const [filter, setFilter] = React.useState("");
    const [filterValueMin, setFilterValueMin] = React.useState(0);
    const [filterValueMax, setFilterValueMax] = React.useState(0);

    const [up, setUp] = React.useState(true);

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

    const stockParameters = [
        "change1s",
        "change1m",
        "change30m",
        "change1h",
        "change12h",
        "change1d",
    ];
    const handleSearch = () => {};
    const handleSort = (event: SelectChangeEvent) => {
        setSort(event.target.value);
    };
    const handleFilter = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

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
                    <Grid item xs={12} md={3}>
                        <Paper
                            elevation={3}
                            style={{
                                margin: "20px",
                                padding: "10px",
                            }}
                        >
                            <FormControl
                                sx={{ width: "25ch" }}
                                variant="outlined"
                                style={{ backgroundColor: "white" }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Search
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={"text"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="search"
                                                onClick={() => {
                                                    handleSearch();
                                                }}
                                                edge="end"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Search"
                                />
                            </FormControl>
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
                                                    <MenuItem value={x}>
                                                        {x}
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
                                    <IconButton onClick={() => setUp(!up)}>
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
                                                    <MenuItem value={x}>
                                                        {x}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton onClick={() => setUp(!up)}>
                                        {up ? (
                                            <ArrowDownwardIcon />
                                        ) : (
                                            <ArrowUpwardIcon />
                                        )}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {assets.assets.length === 0 ? (
                        <div>No stocks found...</div>
                    ) : (
                        assets.assets.map((x) => {
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
