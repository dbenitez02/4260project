import { Course } from "./course";
/**
 * Columns from the section table
 */
export class Section {
    id: number;
    number: string;
    year: number;
    semester: string;
    courseId: number;
    constructor(product: Course) { 
        this.id = product.id; 
        this.number = product.number; 
    } 
}
