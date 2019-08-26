import { Dictionary } from "./dictionary.ts";
import { ServerRequest } from "../lib/http.ts";

export type EndpointInterpreter = {
  verb: string,
  pattern: RegExp,
  handler: (req: ServerRequest, params?: Dictionary) => Promise<void>,
};
