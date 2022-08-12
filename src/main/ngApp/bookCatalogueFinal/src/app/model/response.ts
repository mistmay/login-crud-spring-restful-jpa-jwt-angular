import { User } from "./user";

export interface Response {
    message: string;
    status: boolean;
    user?: User;
}