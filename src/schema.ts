import { ObjectOf, SerializedField, SerializedSchema } from './type';
import { formatAsLabel } from './util';
import { Matrix } from './matrix';
import { Field } from './fields';
import { REQUIRED } from './constants';

/**
 * Class to represent a Schema.
 */
export class Schema {
    private name: string;
    private label?: string;
    private description?: string;
    private parentName?: string;
    private abstract = false;
    private fields: ObjectOf<Field> = {};

    /**
     * Constructor for a Schema.
     * @param {Matrix} matrix The matrix instance.
     * @param {SerializedSchema} schema Schema data.
     */
    constructor(private matrix: Matrix, schema: SerializedSchema) {
        // Deserialize the data.
        this.deserializeSchemaData(schema);
        // Add the Schema to the Matrix.
        this.matrix.addSchema(this);
    }

    /**
     * Return a value from the schema.
     * @function getSchemaValue
     * @memberof Schema
     * @private
     * @param {SerializedSchema} schema The schema object.
     * @param {keyof SerializedSchema} key The key of the schema.
     * @param {unknown} defaultValue The value to return if key is not found.
     * @returns {unknown} The value from the schema.
     */
    // Used to maintain syntax highlighting in VSCode.
    // prettier-ignore
    private static getSchemaValue(
        schema: SerializedSchema,
        key: keyof SerializedSchema,
        defaultValue: SerializedSchema[keyof SerializedSchema] | null = null,
    ): (typeof defaultValue) {
        const keyIndex = Object.keys(schema).indexOf(key);
        if (keyIndex != -1) return Object.values(schema)[keyIndex];
        if (defaultValue == REQUIRED)
            throw new Error(`'${key}' is not present in the schema`);
        return defaultValue;
    }

    /**
     * Deserialize the schema data.
     * @function deserializeSchemaData
     * @memberof Schema
     * @private
     * @param {SerializedSchema} schema The serialized schema object.
     * @returns {void}
     */
    private deserializeSchemaData(schema: SerializedSchema): void {
        // Used to get attributes of the 'schema' object.
        const get = (
            key: keyof SerializedSchema,
            defaultValue:
                | SerializedSchema[keyof SerializedSchema]
                | null = null,
        ): typeof defaultValue =>
            Schema.getSchemaValue(schema, key, defaultValue);
        // Sets the instance variables.
        this.name = get('name', REQUIRED) as string;
        this.label = get('label', formatAsLabel(this.name)) as string;
        this.description = get('description') as string;
        this.parentName = get('parent') as string;
        this.abstract = get('isAbstract', false) as boolean;
        this.fields = this.deserializeFields(
            get('fields', {}) as ObjectOf<SerializedField>,
        );
    }

    /**
     * Deserialize the schema fields data.
     * @function deserializeFields
     * @memberof Schema
     * @param {ObjectOf<SerializedField>} serializedFields Serialized fields.
     * @returns {ObjectOf<Field>} Object of fields.
     */
    private deserializeFields(
        serializedFields: ObjectOf<SerializedField>,
    ): ObjectOf<Field> {
        const fields: ObjectOf<Field> = {};
        Object.keys(serializedFields).map(
            (key, index) =>
                (fields[key] = new Field(
                    Object.values(serializedFields)[index],
                )),
        );
        return fields;
    }

    /**
     * Represent the Schema as a string.
     * @function toString
     * @memberof Schema
     * @returns {string} The string representation.
     */
    toString(): string {
        return `<Schema: '${this.getName()}'>`;
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

    /**
     * Return the name of the parent.
     * @function getParentName
     * @memberof Schema
     * @returns {string | null} Name of the parent schema, null if none.
     */
    getParentName(): string | null {
        return this.parentName || null;
    }

    /**
     * Returns the parent schema.
     * @function getParent
     * @memberof Schema
     * @returns {Schema | null} The parent schema, null if none.
     */
    getParent(): Schema | null {
        const parentName = this.getParentName();
        if (parentName == null) return null;
        return this.matrix.getSchema(parentName);
    }

    /**
     * Returns if the Schema has a parent or not.
     * @function hasParent
     * @memberof Schema
     * @returns {boolean} `true` if the schema has a parent schema.
     */
    hasParent(): boolean {
        return this.getParent() != null;
    }

    /**
     * Return if the class is abstract or not.
     * @function isAbstract
     * @memberof Schema
     * @returns {boolean} `true` if it is abstract.
     */
    isAbstract(): boolean {
        return this.abstract;
    }

    /**
     * Return the fields for the Schema.
     * @function getFields
     * @memberof Schema
     * @returns {ObjectOf<Field>} Fields object.
     */
    getFields(): ObjectOf<Field> {
        return this.fields;
    }
}
