import { Schema, model } from "mongoose";
import type { IUser } from "@/app/users/interfaces/types";

const schemaDefinition = new Schema<IUser>({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const userModel = model("users", schemaDefinition);
export default userModel;
