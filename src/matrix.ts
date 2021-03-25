import { Schema } from './schema';

/**
 * Class for representing a Matrix instance.
 */
export class Matrix {
    private schemas: Schema[];

    /**
     * Get a schema from its name.
     * @function getSchema
     * @memberof Matrix
     * @param {string} name The name of the schema.
     * @returns {Schema | null} Schema, unless not found then null.
     */
    getSchema(name: string): Schema | null {
        return this.schemas.find((schema) => schema.getName() == name) || null;
    }
}
