import { axieService } from "@/app/axies/axie.service";
import { auth, messagesConst } from "@/utils";

import type { IAxie, ITotalSupply } from "@/app/axies/interfaces/types";

const axieResolver = {
  async getLatestAxies(args: any, context: any): Promise<IAxie[]> {
    auth.validateAuthentication(context.token);
    return axieService.getLatestAxies();
  },
  async getAxieTotalSupply(args: any, context: any): Promise<ITotalSupply> {
    auth.validateAuthentication(context.token);
    const totalSupply: number = await axieService.getAxieTotalSupply();
    return { totalSupply };
  },
  async saveLatestAxies(args: any, context: any): Promise<string> {
    auth.validateAuthentication(context.token);
    await axieService.saveLatestAxies();
    return messagesConst.SYNC_SUCCESS;
  },
};

export default axieResolver;
