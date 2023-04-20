// index.d.ts
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
