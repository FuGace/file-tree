import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as treeData from '../data/data.json';
import { IItem } from '../lib/interfaces';
import { ITEM_TYPE } from '../lib/enums';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    public tree: IItem[] = (treeData as any).default.tree; // дерево файлов и папок

    public ngOnInit(): void {
        this._sortAscendingFolder(this.tree);
    }

    /**
     * Свернуть/развернуть ноду
     */
    public onClick(item: IItem) {
        if (item.type === ITEM_TYPE.FOLDER && item.children.length) {
            item.expanded = !item.expanded;
            item.selected = !item.selected;
        }
    }

    /**
     * Сортировка дерева по возрастанию
     */
    private _sortAscendingFolder(items: IItem[]) {
        items.sort((a, b) => {
            if (a.type === b.type)
                return a.name.localeCompare(b.name, undefined, {numeric: true});

            if (a.type === ITEM_TYPE.FOLDER)
                return -1;

            if (b.type === ITEM_TYPE.FOLDER)
                return 1;

            return 0;
        });
        items.forEach((item: IItem) => {
            if (item.children?.length) {
                // проходим рекурсией по всему дереву
                this._sortAscendingFolder(item.children);
            }
        })
    }
}
