import { atom } from "jotai";

export const inputAudio = atom<string | undefined>(undefined);
export const inputVideo = atom<string | undefined>(undefined);

export const isAudioEnable = atom<boolean>(false);
export const isVideoEnable = atom<boolean>(true);
