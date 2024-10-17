import type { UUID } from 'crypto';

export interface INewIllustration {
    dataId: UUID;
    illustration: File | null;
}