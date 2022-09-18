/* eslint-disable prefer-destructuring */
import { QueryToObject } from '../types/models';

// dotenv.config();
export function objMaker(queryPath: string):[string[], string[]] {
  const object: QueryToObject = {};
  const queryPairs = queryPath.split('&');
  queryPairs.shift();
  queryPairs.filter((pair) => !pair.includes('_')).map((item) => {
    const keyValArr = item.split('=');
    object[keyValArr[0]] = keyValArr[1];
    return item;
  });
  return [Object.keys(object), Object.values(object)];
}
