import {atom} from "jotai";
import {atomWithLocation} from "jotai-location";

export const homeActiveIdAtom = atom<string | null>(null);
export const locationAtom = atomWithLocation();