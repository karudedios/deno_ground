import { ServerRequest } from "../../lib/http.ts";
import { ok } from "../../lib/httpContentNegotiator.ts";

/**
 * HTTP GET for default route
 * @param req - Client Request
 */
export async function get(req: ServerRequest) {
  ok(req, 'Hello to the Emoji Store! Call /api/emojis to see a response.');
}
