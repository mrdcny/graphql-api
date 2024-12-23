import type { IUser } from "@/api/users/types";
import { userService } from "@/api/users/user.service";
import { authService } from "@/api/auth/auth.service";
import { axieService } from "@/api/axies/axie.service";

import type { UserResponse } from "@/api/users/types";

const resolvers = {
  async login(payload: IUser): Promise<UserResponse> {
    const { email, password } = payload;
    return await userService.login(email, password);
  },

  async register(payload: IUser): Promise<UserResponse> {
    const { email, password } = payload;
    return await userService.register(email, password);
  },

  async getLatestAxies(args: any, context: any) {
    /**
     * TODO:
     * 1. (OPTIONAL) Find a way to add criteria where you can retrieve specific classes
     */
    authService.authenticate(context.token);
    return axieService.getLatestAxies();
  },

  async saveLatestAxies(args: any, context: any) {
    authService.authenticate(context.token);
    await axieService.saveLatestAxies();
    return "Axie data has been successfully synced!";
  },

  async getAxieTotalSupply(args: any, context: any) {
    authService.authenticate(context.token);
    const totalSupply = await axieService.getAxieTotalSupply();
    return `Axie total supply: ${totalSupply}`;
  },
};

export default resolvers;
