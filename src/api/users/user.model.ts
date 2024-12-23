import { Schema, model } from "mongoose";
import type { IUser } from "@/api/users/types";

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
