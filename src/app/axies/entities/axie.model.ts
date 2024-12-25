import { Schema, model } from "mongoose";
import type { IAxie } from "@/app/axies/interfaces/types";

const schemaDefinition = new Schema<IAxie>({
  id: {
    required: true,
    type: Number,
  },
  name: {
    required: false,
    type: String,
  },
  stage: {
    required: true,
    type: String,
  },
  class: {
    required: true,
    type: String,
  },
  currentPriceUsd: {
    required: true,
    type: Number,
  },
});

const Beast = model("beast_class", schemaDefinition);
const Aqua = model("aquatic_class", schemaDefinition);
const Plant = model("plant_class", schemaDefinition);
const Bird = model("bird_class", schemaDefinition);
const Bug = model("bug_class", schemaDefinition);
const Reptile = model("reptile_class", schemaDefinition);
const Mech = model("mech_class", schemaDefinition);
const Dawn = model("dawn_class", schemaDefinition);
const Dusk = model("dusk_class", schemaDefinition);

export { Beast, Aqua, Plant, Bird, Bug, Reptile, Mech, Dawn, Dusk };
