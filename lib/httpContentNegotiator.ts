import { ServerRequest } from "./http.ts";
import { EndpointInterpreter } from "../types/endpointInterpreter.ts";
import { Dictionary } from "../types/dictionary.ts";
const textEncoder = new TextEncoder();

export const ok = respondWithDefaultText(200, 'Ok');
export const notFound = respondWithDefaultText(404, 'Not Found');
export const methodNotAllowed = respondWithDefaultText(405, 'Method Not Allowed');
export const internalServerError = respondWithDefaultText(500, 'Internal Server Error');

export const respondFromInterpreter = (req: ServerRequest, { handler, verb }: Partial<EndpointInterpreter>, queryParams: Dictionary) => {
  if (!handler) {
    notFound(req);
  }
  else if (req.method !== verb) {
    methodNotAllowed(req);
  }
  else {
    try {
      handler(req, queryParams);
    }
    catch(e) {
      console.log(e);
      internalServerError(req);
    }
  }
};

function respondWithDefaultText<T>(status: number, defaultMsg: T = null) {
  return (req: ServerRequest, msg: any = defaultMsg, headers: Headers = null) => {
    const str: string = typeof msg !== 'string' ? JSON.stringify(msg) : msg;

    req.respond({
      status,
      headers,
      body: textEncoder.encode(str),
    });
  };
}
