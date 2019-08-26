import { ServerRequest } from "../../lib/http.ts";
import { Dictionary } from "../../types/dictionary.ts";
import { ok, notFound } from "../../lib/httpContentNegotiator.ts";
import { findById, getAllPaged, recordCount } from '../../db/emojis.ts';

/**
 * HTTP GET to get a List of Emojis by page and pageSize
 *
 * @param {ServerRequest} req - Request from the Client
 * @param {Dictionary} queryParams - Parsed Query Parameters from Request
 * @param {number} queryParams.page - Page to fetch
 * @param {number} queryParams.pageSize - Records per page
 */
export async function getEmojis (req: ServerRequest, { page = 1, pageSize = 10 }: Dictionary = {}) {
  const headerCurrentPage = page || 1;
  const headerPageSize = pageSize || 10;
  const headerTotalPages = (recordCount / headerPageSize) | 0;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Page-Size': String(headerPageSize),
    'X-Total-Pages': String(headerTotalPages),
    'X-Current-Page': String(headerCurrentPage),
  });

  ok(req, await getAllPaged(headerCurrentPage, headerPageSize), headers);
}

/**
 * HTTP GET to get an Emoji by ID.
 * @param req - Request from the Client
 */
export async function getEmoji (req: ServerRequest) {
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  const record = await findById(Number(id));

  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  if (!record) {
    return notFound(req, { "message": `Emoji with id ${id} not found` }, headers);
  }

  return ok(req, record, headers);
}
