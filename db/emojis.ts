import emojiList from '../emojis/index.ts';
import descriptions from './descriptions.ts';
import { EmojiRecord } from '../types/emojiRecord.ts';

const inventoryDb: Map<number, EmojiRecord> = new Map();

function* inventoryIterator(from: number, to: number = from + 1): IterableIterator<EmojiRecord> {
  for (let id = from; (id < to && id <= recordCount); id++) {
    if (!inventoryDb.has(id)) {
      const rand = Math.random();

      const emojiIdx = (rand * emojiList.length) | 0;
      const descriptionIdx = id % descriptions.length;
      const emoji = emojiList[emojiIdx];
      const fontSize = (rand * 10 + 14) | 0; // From 10 ~ 24
      const price = (rand * 25 + 25) | 0 // From 25 ~ 50

      const record: EmojiRecord = {
        // force ids to start at 1 instead of 0
        id: id + 1,
        price: price,
        emoji: emoji,
        fontSize: `${fontSize}px`,
        description: descriptions[descriptionIdx].trim(),
      };

      inventoryDb.set(id, record);
    }

    yield inventoryDb.get(id);
  }
}

/**
 * Get chunk of EmojiRecords for a given page with a provided
 * page size.
 *
 * @param page - Requested page
 * @param pageSize - Amount of records per page
 * @returns {Promise<EmojiRecord[]>} List of EmojiRecord matching the page and pageSize criteria
 *
 * @example
 * const first_page = await getAllPaged(1, 10);
 * console.assert(first_page.length === 10, 'Should have exactly ten records');
 */
export async function getAllPaged(page: number, pageSize: number) {
  const to = page * pageSize;
  const from = (page - 1) * pageSize;
  return [ ...inventoryIterator(from, to) ];
}

/**
 * Function to get an EmojiRecord by Id
 * @param {number} id - Id of Emoji Record to look for
 * @returns {Promise<EmojiRecord>} Matching EmojiRecord
 */
export async function findById(id: number) {
  const { value }= inventoryIterator(id - 1).next();
  return value;
}

export const recordCount: number = 10_000;
