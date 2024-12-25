import {
  Beast,
  Aqua,
  Plant,
  Bird,
  Bug,
  Reptile,
  Mech,
  Dawn,
  Dusk,
} from "@/app/axies/entities/axie.model";

import mongoose from "mongoose";
import type { IAxie, IAxieGroup } from "@/app/axies/interfaces/types";

class AxieRepository {
  /**
   * Retrieve and combine axie data from collections
   */
  async getAllAxiesFromCollections(): Promise<IAxie[]> {
    const beastAxies = await Beast.find();
    const aquaticAxies = await Aqua.find();
    const plantAxies = await Plant.find();
    const birdAxies = await Bird.find();
    const bugAxies = await Bug.find();
    const reptileAxies = await Reptile.find();
    const mechAxies = await Mech.find();
    const dawnAxies = await Dawn.find();
    const duskAxies = await Dusk.find();

    return [
      ...beastAxies,
      ...aquaticAxies,
      ...plantAxies,
      ...birdAxies,
      ...bugAxies,
      ...reptileAxies,
      ...mechAxies,
      ...dawnAxies,
      ...duskAxies,
    ];
  }

  /**
   * Removes data from all collections (cleanup)
   */
  async deleteAllFromCollections(
    session: mongoose.ClientSession,
  ): Promise<void> {
    await Beast.deleteMany().session(session);
    await Aqua.deleteMany().session(session);
    await Plant.deleteMany().session(session);
    await Bird.deleteMany().session(session);
    await Bug.deleteMany().session(session);
    await Reptile.deleteMany().session(session);
    await Mech.deleteMany().session(session);
    await Dawn.deleteMany().session(session);
    await Dusk.deleteMany().session(session);
  }

  /**
   * Save axie data to every collection
   */

  async saveAllToCollections(
    axieData: IAxieGroup,
    session: mongoose.ClientSession,
  ): Promise<void> {
    await Beast.create(axieData.Beast || [], { session });
    await Aqua.create(axieData.Aquatic || [], { session });
    await Plant.create(axieData.Plant || [], { session });
    await Bird.create(axieData.Bird || [], { session });
    await Bug.create(axieData.Bug || [], { session });
    await Reptile.create(axieData.Reptile || [], { session });
    await Mech.create(axieData.Mech || [], { session });
    await Dawn.create(axieData.Dawn || [], { session });
    await Dusk.create(axieData.Dusk || [], { session });
  }

  /**
   * Syncs Axie data by removing all data from collections, then save fresh data to collections
   * Uses transaction session to ensure commit and rollback of data
   */

  async syncAxieData(axieData: IAxieGroup) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await this.deleteAllFromCollections(session);
      await this.saveAllToCollections(axieData, session);
      await session.commitTransaction();
    } finally {
      session.endSession();
    }
  }
}

export default AxieRepository;
