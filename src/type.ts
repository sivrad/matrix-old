export * from './out/type';

export type ObjectOf<T> = { [key: string]: T };

export interface SivradValue {
    // Type of the value
    /**
     * The type of the value.
     */
    '@type': string;
    [key: string]: unknown;
}
