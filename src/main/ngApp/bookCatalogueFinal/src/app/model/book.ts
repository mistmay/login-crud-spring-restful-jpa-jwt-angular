import { Author } from "./author";
import { Genre } from "./genre";
import { User } from "./user";

export interface Book {
    id?: number;
    title: string;
    author: Author;
    genres: Genre[];
    user?: User;
}