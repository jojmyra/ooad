export interface System {
    courseYear: Number;
    courseTerm: Number;
}

export interface SystemInput {
    courseYear: Number;
    courseTerm1: String;
    courseTerm2: String;
}

export interface SystemInterface {
    systemInfo: System;
    
    onupdate(): void;
}