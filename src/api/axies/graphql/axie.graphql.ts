import { request } from "graphql-request";
import type { IAxie } from "@/api/axies/axie.model";

interface AxieTypeDef {
  id: number;
  name: string;
  stage: string;
  class: string;
  order: { currentPriceUsd: number };
}

export async function getLatestAxies(): Promise<IAxie[]> {
  try {
    const query =
      "query GetAxieLatest( $auctionType: AuctionType $criteria: AxieSearchCriteria $from: Int $sort: SortBy $size: Int $owner: String) { axies( auctionType: $auctionType criteria: $criteria from: $from sort: $sort size: $size owner: $owner ) { results { id name stage class order { currentPriceUsd } } }}";
    const variables = {
      auctionType: "Sale",
      from: 0,
      size: 300,
      sort: "PriceAsc",
      criteria: {},
    };
    const response: any = await request("https://graphql-gateway.axieinfinity.com/graphql", query, variables);

    const axies = response?.axies?.results.map((axie: AxieTypeDef) => {
      return {
        id: axie.id,
        name: axie.name,
        stage: axie.stage,
        class: axie.class,
        currentPriceUsd: axie.order.currentPriceUsd,
      };
    });

    return axies;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}
