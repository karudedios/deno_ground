import { serve } from './lib/http.ts';
import { interpretRequest } from './api/index.ts';
import { extractQueryParams } from './lib/urlUtils.ts';
import { respondFromInterpreter } from './lib/httpContentNegotiator.ts';

const { IP: ip = 'localhost', PORT: port = '8000' } = Deno.env();
const addr = `${ip}:${port}`;

async function main() {
  console.log(`Server running in http://${addr}`);

  for await (const req of serve(addr)) {
    const interpreter = interpretRequest(req);
    const queryParams = extractQueryParams(req.url);
    respondFromInterpreter(req, interpreter, queryParams);
  }
}

main();
