import { QueryParams } from '../types/models';

// dotenv.config();
export function makeUrl(queryPath: QueryParams | string) {
  if (typeof queryPath !== 'string') {
    const queryToURL: { [key:string]: string } = { ...queryPath };
    queryToURL.app_key = process.env.REACT_APP__API_KEY as string;
    queryToURL.app_id = process.env.REACT_APP__ID as string;
    let url = '&';
    Object.keys(queryToURL).forEach((key) => {
      if (queryToURL[key].length > 0) {
        url += `${key}=${queryToURL[key]}&`;
      }
    });
    return url.slice(0, -1);
  } if (queryPath.includes('&')) return `${queryPath}&app_key=${process.env.REACT_APP__API_KEY}&app_id=${process.env.REACT_APP__ID}`;
  return `${queryPath}app_key=${process.env.REACT_APP__API_KEY}&app_id=${process.env.REACT_APP__ID}`;
}
