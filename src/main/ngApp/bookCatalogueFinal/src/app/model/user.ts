import { Book } from "./book";

export interface User {
    id?: number;
    username: string;
    email?: string;
    books?: Book[];
    password: string;
}