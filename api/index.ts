import { ServerRequest } from '../lib/http.ts';
import { findOrElse } from '../lib/arrayUtils.ts';
import * as homeApiDefinition from './home/index.ts';
import * as emojiApiDefinition from './emoji/index.ts';
import { stripQueryParams, } from '../lib/urlUtils.ts';
import { EndpointInterpreter } from '../types/endpointInterpreter.ts';

export const homeApi = homeApiDefinition;
export const emojiApi = emojiApiDefinition;

const endpointInterpreters: EndpointInterpreter[] = [
  { verb: 'GET', pattern: /^\/$/                , handler: homeApi.get        },
  { verb: 'GET', pattern: /^\/api\/emojis\/\d+$/, handler: emojiApi.getEmoji  },
  { verb: 'GET', pattern: /^\/api\/emojis$/     , handler: emojiApi.getEmojis },
];

/**
 * Function to get the corresponding interpreter for
 * a given URL from a ServerRequest.
 *
 * @param {ServerRequest} req - Request from the Client
 * @param {string} req.url  - Requested URL
 */
export const interpretRequest = ({ url }: ServerRequest): EndpointInterpreter => {
  const cleanUrl = stripQueryParams(url);

  return findOrElse(
    endpointInterpreters,
    ({ pattern }) => pattern.test(cleanUrl),
    { verb: null, handler: null, pattern: null }
  );
};
