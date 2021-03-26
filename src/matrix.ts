import { Schema } from './schema';

/**
 * Class for representing a Matrix instance.
 */
export class Matrix {
    private schemas: Schema[] = [];

    /**
     * Add a schema to the schema list.
     * @function addSchema
     * @memberof Matrix
     * @param {Schema} schema Schema instance.
     * @returns {void}
     */
    addSchema(schema: Schema): void {
        if (this.getSchema(schema.getName()) != null)
            throw new Error('Duplicate schema');
        this.schemas.push(schema);
    }

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
