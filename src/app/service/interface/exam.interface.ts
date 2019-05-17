export interface Item {
    examData: any;
    timeStart: any;
    timeEnd: any;
    subjectId: any;
    subjectName: any;
    buildingId: any;
    roomName: any;
}

export interface ItemList {
    items: Item[];
    totalItems: number;
}