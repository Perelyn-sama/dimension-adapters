import { Adapter } from "../adapters/types";
import volumeAdapter from "../dexs/babydogeswap";
import { getGraphDimensions } from "../helpers/getUniSubgraph";

import { CHAIN } from "../helpers/chains";
import { univ2DimensionAdapter } from "../helpers/getUniSubgraph";

// 0.2% to LP providers
// 0.05% to treasury
// 0.05% to buy back and burn BabyDoge!

const adapters = univ2DimensionAdapter({
  graphUrls: {
    [CHAIN.BSC]: "https://graph-bsc-mainnet.babydoge.com/subgraphs/name/babydoge/exchange"
  },
  dailyVolume: {
    factory: "factoryDayData"
  },
  totalVolume: {
    factory: "babyDogeFactories"
  },
  feesPercent: {
    type: "volume",
    Fees: 0.3,
    UserFees: 0.3,
    Revenue: 0.1,
    ProtocolRevenue: 0.05,
    HoldersRevenue: 0.05,
    SupplySideRevenue: 0.2,
  }
}, {
  methodology: {
    Fees: "Fees collected from user trading fees",
    UserFees: "Users pays 0.3% of each swap. Different user fee discounts depening on Baby Doge wallet balance (up to 70% off). Calculation made with base 0.3%",
    Revenue: "A 0.1% of user fees are distributed 50/50 between treasury and BabyDoge buy back and burn",
    ProtocolRevenue: "A 0.05% of user fees goes to treasure",
    HoldersRevenue: "A 0.05% of user fees is used to buy back and burn BabyDoge tokens",
    SupplySideRevenue: "A 0.2% user fees is distributed among LPs",
  }
});

adapters.adapter.bsc.start = async () => 1661780137;
export default adapters;