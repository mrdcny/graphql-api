import { GraphQLError, type GraphQLErrorExtensions } from "graphql";

interface ErrorArgs {
  message: string;
  errorType: string;
}

interface ErrorExtension {
  extensions: {
    code: number;
    stackTrace: string;
  };
}

export class BaseError extends GraphQLError {
  readonly message: string;
  readonly extensions: GraphQLErrorExtensions;

  constructor(args: ErrorArgs, extensions: GraphQLErrorExtensions) {
    super(args.message);

    this.message = args.message;
    this.extensions = extensions;
  }
}
