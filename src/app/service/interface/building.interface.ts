import { PageChangedEvent } from 'ngx-bootstrap';

export interface Item {
    buildingId: string;
    buildingName: string;
}

export interface buildingInterface {
    items: ItemList;

    // ส่วนของการค้นหา
    searchText: string;
    serachType: SearchKey;
    searchTypeItems: SearchKey[];
    onSearchItem(): void;

    // ส่วนของ pagination
    startPage: number;
    limitPage: number;
    onPageChanged(page: PageChangedEvent);

    getRoleName(role: string): string;
    onDeleteMember(_id: string): void;
    onUpdateMember(_id: string): void;
}


export interface ItemList {
    items: Item[];
    totalItems: number;
}

export interface Search {
    searchText?: string;
    searchType?: string;

    startPage?: number;
    limitPage?: number;
}

export interface SearchKey {
    key: string;
    value: string;
}