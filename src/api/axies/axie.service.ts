import Web3 from "web3";

import { axieRepository } from "@/api/axies/axie.repository";
import { CONTRACT_ADDRESS, ABI } from "@/api/axies/abis/axie.abi";
import { env } from "@/config/environment";
import { getLatestAxies } from "@/api/axies/graphql/axie.graphql";
import { InternalServerError } from "@/errors";

import type { IAxie, IAxieGroup } from "@/api/axies/types";

class AxieService {
  async getLatestAxies(): Promise<IAxie[]> {
    try {
      const axieData: IAxie[] = await axieRepository.getAllAxiesFromCollections();
      const sortedAxiesByPrice: IAxie[] = axieData.sort((a, b) => (a.currentPriceUsd > b.currentPriceUsd ? 1 : -1));
      return sortedAxiesByPrice;
    } catch (error) {
      throw new InternalServerError("Unable to retrieve Axies from the database", (error as Error).message);
    }
  }

  async saveLatestAxies(): Promise<void> {
    try {
      const axieData: IAxieGroup = await getLatestAxies();
      await axieRepository.syncAxieData(axieData);
    } catch (error) {
      console.log("(error as Error).stack", (error as Error).stack);
      throw new InternalServerError("Unable to sync axie data", (error as Error).message);
    }
  }

  async getAxieTotalSupply(): Promise<number> {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(env.INFURA_ENDPOINT));
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

      const totalSupply: number = await contract.methods.totalSupply().call();
      return Number(totalSupply);
    } catch (error) {
      throw new InternalServerError("Error getting data from Smart Contract.", (error as Error).message);
    }
  }
}

export const axieService = new AxieService();
