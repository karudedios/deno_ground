import { Dictionary } from "../types/dictionary.ts";

/**
 * Function to remove query parameters from URL
 *
 * @param url - Requested URL
 * @returns {string} URL without query parameters
 */
export function stripQueryParams(url: string): string {
  return url.indexOf('?') > -1 ? url.slice(0, url.indexOf('?')) : url;
}

/**
 * Function to extract Dictionary from Query Parameters
 * on a URL
 *
 * @param url - Requested URL
 * @returns {Dictionary} Dictionary with key/value pairs
 */
export function extractQueryParams(url: string): Dictionary {
  if (url.indexOf('?') === -1) {
    return {};
  }

  return url.slice(url.indexOf('?')).split(/[?&]/).reduce((params, item) => {
    if (!item) {
      return params;
    }

    const [ key, value ] = item.split('=');
    const numberValue = parseFloat(value);
    const val = isNaN(numberValue) ? value : numberValue;

    return {
      ...params,
      // let's assume all params are numbers
      [key]: val,
    };
  }, {});
}
