import { bcrypt, auth } from "@/utils/index";
import UserRepository from "@/app/users/user.repository";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  errorMessages,
} from "@/errors";
import type { LoginUserDto } from "@/app/users/dto/login-user.dto";
import type { CreateUserDto } from "@/app/users/dto/create-user.dto";
import type { IUser, IUserResponse } from "@/app/users/interfaces/types";

class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async login(user: LoginUserDto): Promise<IUserResponse> {
    const { email, password } = user;
    const existingUser: IUser | null =
      await this.userRepository.findByEmail(email);

    if (!existingUser) throw new NotFoundError(errorMessages.USER_NOT_FOUND);

    const isPasswordMatching: boolean = await bcrypt.validateHash(
      password,
      existingUser.password,
    );
    if (!isPasswordMatching)
      throw new UnauthorizedError(errorMessages.INVALID_CREDENTIALS);

    const accessToken: string = auth.generateAccessToken(email);
    return { email, accessToken };
  }

  async register(user: CreateUserDto): Promise<IUserResponse> {
    const { email, password } = user;
    const userExists: IUser | null =
      await this.userRepository.findByEmail(email);

    if (userExists)
      throw new InternalServerError(errorMessages.USER_ALREADY_EXIST);

    const encryptedPassword: string = await bcrypt.hash(password);
    const newUser: IUser = await this.userRepository.save({
      email,
      password: encryptedPassword,
    });

    const accessToken: string = auth.generateAccessToken(newUser.email);

    return { email, accessToken };
  }
}

export const userService = new UserService();
