import mongoose from "mongoose";
import Web3 from "web3";

import { AxieClass } from "@/api/axies/enums/AxieClass";
import { CONTRACT_ADDRESS, ABI } from "@/abis/axie.abi";
import { env } from "@/common/utils/config";
import { getLatestAxies } from "@/api/axies/graphql/axie.graphql";
import { GraphQLError } from "graphql";
import { StatusCodes } from "http-status-codes";

import { Beast, Aqua, Plant, Bird, Bug, Reptile, Mech, Dawn, Dusk } from "@/api/axies/axie.model";

import type { IAxie, IAxieGroup } from "@/api/axies/types";

class AxieService {
  async getLatestAxies(): Promise<IAxie[]> {
    try {
      const axieData: IAxie[] = await populateAxieList();
      const sortedAxiesByPrice: IAxie[] = axieData.sort((a, b) => (a.currentPriceUsd < b.currentPriceUsd ? 1 : -1));
      return sortedAxiesByPrice;
    } catch (error) {
      throw new GraphQLError("Unable to retrieve Axies.", {
        extensions: { code: StatusCodes.INTERNAL_SERVER_ERROR },
      });
    }
  }

  async saveLatestAxies(): Promise<void> {
    try {
      const axieData: IAxie[] = await getLatestAxies();

      const groupedAxieData: IAxieGroup = axieData.reduce((accumulator: any, value: any): any => {
        const classification: string = value.class;
        if (!accumulator[classification]) accumulator[classification] = [];
        accumulator[classification].push(value);
        return accumulator;
      }, {});

      await syncAxieData(groupedAxieData);
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Unable to sync Axie data with Axie GraphQL API", {
        extensions: { code: StatusCodes.INTERNAL_SERVER_ERROR },
      });
    }
  }

  async getAxieTotalSupply(): Promise<number> {
    const web3 = new Web3(new Web3.providers.HttpProvider(env.INFURA_ENDPOINT));
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const totalSupply: number = await contract.methods.totalSupply().call();
    return totalSupply;
  }
}

async function syncAxieData(axieData: IAxieGroup) {
  /** TODO: Optimize FILTER usage */

  /** Added Session since there are transactions to multiple collections */
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    /** Delete all data from collections */
    await Beast.deleteMany().session(session);
    await Aqua.deleteMany().session(session);
    await Plant.deleteMany().session(session);
    await Bird.deleteMany().session(session);
    await Bug.deleteMany().session(session);
    await Reptile.deleteMany().session(session);
    await Mech.deleteMany().session(session);
    await Dawn.deleteMany().session(session);
    await Dusk.deleteMany().session(session);

    /** save all data to collections */

    await Beast.create(axieData.Beast || [], { session });
    await Aqua.create(axieData.Aquatic || [], { session });
    await Plant.create(axieData.Plant || [], { session });
    await Bird.create(axieData.Bird || [], { session });
    await Bug.create(axieData.Bug || [], { session });
    await Reptile.create(axieData.Reptile || [], { session });
    await Mech.create(axieData.Mech || [], { session });
    await Dawn.create(axieData.Dawn || [], { session });
    await Dusk.create(axieData.Dusk || [], { session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw new GraphQLError("Unable to sync Axie data with Axie GraphQL API", {
      extensions: { code: StatusCodes.INTERNAL_SERVER_ERROR },
    });
  }
}

async function populateAxieList(): Promise<IAxie[]> {
  const axiesArr = [];
  axiesArr.push(await Beast.find());
  axiesArr.push(await Aqua.find());
  axiesArr.push(await Plant.find());
  axiesArr.push(await Bird.find());
  axiesArr.push(await Bug.find());
  axiesArr.push(await Reptile.find());
  axiesArr.push(await Mech.find());
  axiesArr.push(await Dawn.find());
  axiesArr.push(await Dusk.find());
  return axiesArr.flat();
}

export const axieService = new AxieService();
