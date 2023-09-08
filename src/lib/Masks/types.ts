import Masks from './Masks';

type MaskKeys = keyof typeof Masks;
export type IMasks = (typeof Masks)[MaskKeys];
