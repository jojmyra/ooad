import { PageChangedEvent } from 'ngx-bootstrap';

export interface Item {
    buildingId: string;
    roomName: string;
    roomType: string;
    roomFloor: string;
    roomplan: Number;
    roomSeat: Number;
}

export interface RoomInterface {
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
    onDelete(_id: string): void;
    onUpdate(_id: string): void;
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