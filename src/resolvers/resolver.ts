import type { IUser } from "@/api/users/types";
import { userService } from "@/api/users/user.service";
import { authService } from "@/api/auth/auth.service";
import { axieService } from "@/api/axies/axie.service";

import type { UserResponse } from "@/api/users/types";
import type { IAxie, ITotalSupply } from "@/api/axies/types";

const resolvers = {
  async login(payload: IUser): Promise<UserResponse> {
    const { email, password } = payload;
    return await userService.login(email, password);
  },

  async register(payload: IUser): Promise<UserResponse> {
    const { email, password } = payload;
    return await userService.register(email, password);
  },

  async getLatestAxies(args: any, context: any): Promise<IAxie[]> {
    authService.authenticate(context.token);
    return axieService.getLatestAxies();
  },

  async saveLatestAxies(args: any, context: any): Promise<string> {
    authService.authenticate(context.token);
    await axieService.saveLatestAxies();
    return "Axie data has been successfully synced!";
  },

  async getAxieTotalSupply(args: any, context: any): Promise<ITotalSupply> {
    authService.authenticate(context.token);
    const totalSupply: number = await axieService.getAxieTotalSupply();
    return { totalSupply };
  },
};

export default resolvers;
