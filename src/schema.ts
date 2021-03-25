import { SerializedSchema } from './type';
import { formatAsLabel } from './util';
import { Matrix } from './matrix';

/**
 * Class to represent a Schema.
 */
export class Schema {
    private name: string;
    private label: string;
    private description?: string;
    private parentName?: string;
    private isAbstract = false;

    /**
     * Constructor for a Schema.
     * @param {Matrix} matrix The matrix instance.
     * @param {SerializedSchema} schema Schema data.
     */
    constructor(private matrix: Matrix, private schema: SerializedSchema) {
        this.deserializeSchemaData();
    }

    /**
     * Return a value from the schema.
     * @function getSchemaValue
     * @memberof Schema
     * @private
     * @param {keyof SerializedSchema} key The key of the schema.
     * @param {unknown} defaultValue The value to return if key is not found.
     * @returns {unknown} The value from the schema.
     */
    private getSchemaValue<T extends SerializedSchema[keyof SerializedSchema]>(
        key: keyof SerializedSchema,
        defaultValue:
            | SerializedSchema[keyof SerializedSchema]
            | undefined = undefined,
    ): T {
        const keyIndex = Object.keys(this.schema).indexOf(key);
        if (keyIndex != -1) return Object.values(this.schema)[keyIndex];
        if (defaultValue == undefined)
            throw new Error(key + ' does not exist in the schema');
        return defaultValue as T;
    }

    /**
     * Deserialize the schema data.
     * @function deserializeSchemaData
     * @memberof Schema
     * @private
     * @returns {void}
     */
    private deserializeSchemaData(): void {
        this.name = this.getSchemaValue('name');
        this.label = this.getSchemaValue('label') || formatAsLabel(this.name);
        this.description = this.getSchemaValue('description');
        this.parentName = this.getSchemaValue('parent', '');
    }

    /**
     * Return the name of the schema.
     * @function getName
     * @memberof Schema
     * @returns {string} Name of the schema.
     */
    getName(): string {
        return this.name;
    }

    /**
     * Return the label of the schema.
     * @function getLabel
     * @memberof Schema
     * @returns {string | null} Label of the schema.
     */
    getLabel(): string | null {
        return this.label || null;
    }

    /**
     * Return the description of the schema.
     * @function getDescription
     * @memberof Schema
     * @returns {string | null} Description of the schema.
     */
    getDescription(): string | null {
        return this.description || null;
    }
}
