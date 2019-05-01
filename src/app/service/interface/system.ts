import { NgForm } from '@angular/forms';

export interface System {
    year: Number;
    term: Number;
}

export interface SystemInput {
    year: Number;
    term1: String;
    term2: String;
}

export interface SystemInterface {
    systemInfo: System;
    
    onUpdate(f: NgForm): void;
}