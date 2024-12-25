import axios from "axios";
import { InternalServerError } from "@/errors";

import type {
  IAxiesGraphQLResponse,
  IAxie,
  IAxieGroup,
} from "@/app/axies/interfaces/types";

const axieGraphQLEndpoint: string =
  "https://graphql-gateway.axieinfinity.com/graphql";

export async function getLatestAxies(): Promise<IAxieGroup> {
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
        criteria: {
          stages: 4, // added criteria 4 to only return adult axies. exlcuding this will also return stage 0 axies (eggs) which does not have classes.
        },
      },
    };
    const response = await axios.post(axieGraphQLEndpoint, graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response || !response.data || !response.data.data)
      throw new InternalServerError(
        "Unable to retrieve Axies from Axie GraphQL",
      );
    const responseData = response?.data?.data;

    const axies = responseData.axies.results.map(
      (axie: IAxiesGraphQLResponse) => {
        return {
          id: axie.id,
          name: axie.name,
          stage: axie.stage,
          class: axie.class,
          currentPriceUsd: axie.order.currentPriceUsd,
        };
      },
    );

    return groupAxieData(axies);
  } catch (error) {
    throw new InternalServerError((error as Error).message);
  }
}

function groupAxieData(axieData: IAxie[]): IAxieGroup {
  const groupedAxieData: IAxieGroup = axieData.reduce(
    (accumulator: any, value: IAxie): IAxieGroup => {
      const classification: string = value.class;
      if (!accumulator[classification]) accumulator[classification] = [];
      accumulator[classification].push(value);
      return accumulator;
    },
    {},
  );

  return groupedAxieData;
}
