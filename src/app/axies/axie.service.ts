import Web3 from "web3";
import AxieRepository from "@/app/axies/axie.repository";

import { ABI, CONTRACT_ADDRESS } from "@/app/axies/abis/axie.abi";
import { env } from "@/config/environment";
import { getLatestAxies } from "@/app/axies/graphql/axie.graphql";
import { InternalServerError, errorMessages } from "@/errors";

import type { IAxie, IAxieGroup } from "@/app/axies/interfaces/types";

class AxieService {
  private axieRepository: AxieRepository;

  constructor(axieRepository: AxieRepository = new AxieRepository()) {
    this.axieRepository = axieRepository;
  }

  async getLatestAxies(): Promise<IAxie[]> {
    try {
      const axieData: IAxie[] =
        await this.axieRepository.getAllAxiesFromCollections();

      return sortByPriceAsc(axieData);
    } catch (error) {
      throw new InternalServerError(
        errorMessages.UNABLE_TO_RETRIEVE_AXIES,
        (error as Error).message,
      );
    }
  }

  async saveLatestAxies(): Promise<void> {
    try {
      const axieData: IAxieGroup = await getLatestAxies(); // retrieve Axie data from Axie GraphQL
      await this.axieRepository.syncAxieData(axieData); // Syncs data from GraphQL Response to Database
    } catch (error) {
      throw new InternalServerError(
        errorMessages.UNABLE_TO_SYNC_AXIES,
        (error as Error).message,
      );
    }
  }

  async getAxieTotalSupply(): Promise<number> {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(env.INFURA_ENDPOINT),
      ); // initialize connection to web3 endpoint (infura)
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS); // initialize Axie Smart contract

      const totalSupply: number = await contract.methods.totalSupply().call(); // call a "totalSupply" function from Axie SC
      return Number(totalSupply);
    } catch (error) {
      throw new InternalServerError(
        errorMessages.WEB3_ERROR,
        (error as Error).message,
      );
    }
  }
}

function sortByPriceAsc(axieData: IAxie[]) {
  return axieData.sort((a, b) =>
    a.currentPriceUsd > b.currentPriceUsd ? 1 : -1,
  );
}

export const axieService = new AxieService();
