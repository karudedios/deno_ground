import foodEmojis from './food.ts';
import travelEmojis from './travel.ts';
import smileyEmojis from './smiley.ts';
import animalEmojis from './animal.ts';
import peopleEmojis from './people.ts';
import clothingEmojis from './clothing.ts';
import activityEmojis from './activity.ts';

export default String.prototype.concat.call('',
  foodEmojis,
  travelEmojis,
  smileyEmojis,
  animalEmojis,
  peopleEmojis,
  activityEmojis,
  clothingEmojis,
).trim().split(' ');
