import {atom} from "jotai";

export const homeActiveIdAtom = atom<string | null>(null);
export const searchQueryAtom = atom('');
export const searchResultsAtom = atom((get) => {
  const query = get(searchQueryAtom);
  return query.trim().toLowerCase();
});