import type { Category } from '@/enums/Category.enum.js';
import type { Delta } from '@vueup/vue-quill';

export interface IEditDataPage {
    title?: string|null;
    summary?: string|null;
    contents?: typeof Delta | string | undefined | null;
    authors?: string | null;
    categories?: Category[] | null;
}