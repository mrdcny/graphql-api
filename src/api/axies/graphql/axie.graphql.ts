import axios from "axios";
import type { AxieTypeDef, IAxie } from "@/api/axies/types";

const axieGraphQLEndpoint: string = "https://graphql-gateway.axieinfinity.com/graphql";

export async function getLatestAxies(): Promise<IAxie[]> {
  try {
    const graphqlQuery = {
      operationName: "GetAxieLatest",
      query:
        "query GetAxieLatest( $auctionType: AuctionType $criteria: AxieSearchCriteria $from: Int $sort: SortBy $size: Int $owner: String) { axies( auctionType: $auctionType criteria: $criteria from: $from sort: $sort size: $size owner: $owner ) { results { id name stage class order { currentPriceUsd } } }}",
      variables: {
        auctionType: "Sale",
        from: 0,
        size: 300,
        sort: "PriceAsc",
        criteria: {},
      },
    };
    const response = await axios.post(axieGraphQLEndpoint, graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = response?.data?.data;
    const axies = responseData?.axies?.results?.map((axie: AxieTypeDef) => {
      return {
        id: axie.id,
        name: axie.name,
        stage: axie.stage,
        class: axie.class,
        currentPriceUsd: axie.order.currentPriceUsd,
      };
    });

    console.log(axies);

    return axies;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}
