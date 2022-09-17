// import dotenv from 'dotenv';
import { QueryParams } from '../types/models';

// dotenv.config();
export function makeUrl(queryPath: QueryParams | string) {
  if (typeof queryPath !== 'string') {
    const queryToURL: { [key:string]: string } = { ...queryPath };
    queryToURL.app_key = 'cccfb4464ba349b4557a6013a27109bf';
    queryToURL.app_id = 'e7de9a05';
    let url = '&';
    Object.keys(queryToURL).forEach((key) => {
      if (queryToURL[key].length > 0) {
        url += `${key}=${queryToURL[key]}&`;
      }
    });
    return url.slice(0, -1);
  }
  return `${queryPath}?app_key=cccfb4464ba349b4557a6013a27109bf&app_id=e7de9a05`;
}
