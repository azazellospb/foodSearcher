// dotenv.config();
export function historyFilter(queryPathArr: string[]):string[] {
  const filtring = queryPathArr.map((queryPath) => queryPath.split('%20').join(' ').split('&').filter((pair) => !pair.includes('_'))
    .join('&'));
  const filtredQueries = Array.from(new Set(filtring));
  return filtredQueries.filter((item) => !!item);
}
