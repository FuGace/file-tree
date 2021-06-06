import { ITEM_TYPE } from './enums';

export interface IItem {
    name: string;
    type: ITEM_TYPE;
    expanded: boolean;
    selected: boolean;
    children: IItem[];
}
