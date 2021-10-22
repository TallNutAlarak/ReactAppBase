export const routes = [
    {
        name: "租户管理",
        path: "/tenant",
        permission: ["admin"],
    },
    {
        name: "NFT族管理",
        path: "/nft-family",
        permission: ["admin", "tenant"],
    },
];
