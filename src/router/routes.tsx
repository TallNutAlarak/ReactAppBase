import Tenant from "@pages/tenant";
import NftFamily from "@pages/nft-family";
import Nft from "@pages/nft";
import BusinessMonitor from "@pages/business-monitor";

export const routes = [
    {
        name: "NFT族管理",
        path: "/nft-family",
        permission: ["admin", "tenant"],
        component: NftFamily,
    },
    {
        name: "NFT管理",
        path: "/nft",
        permission: ["admin", "tenant"],
        component: Nft,
    },
    {
        name: "租户管理",
        path: "/tenant",
        permission: ["admin"],
        component: Tenant,
    },
    {
        name: "业务监控",
        path: "/business-monitor",
        permission: ["admin", "tenant"],
        component: BusinessMonitor,
    },
];
