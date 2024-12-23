import axieResolver from "@/graphql/resolvers/axie.resolver";
import userResolver from "@/graphql/resolvers/user.resolver";

const resolvers = {
  ...axieResolver,
  ...userResolver,
};

export default resolvers;
