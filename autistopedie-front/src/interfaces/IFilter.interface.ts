import type { Category } from "@/enums/Category.enum";

export interface IFilter {
    alphaAZ?: boolean;
    alphaZA?: boolean;
    createdAsc?: boolean;
    createdDesc?: boolean;
    categories?: Category[];
    title?: string;
    contents?: string;
}