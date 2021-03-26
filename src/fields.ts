import { SerializedField } from './type';

/**
 * Class to represent a Field for a Schema.
 */
export class Field {
    /**
     * Constructor for a Field.
     * @param {SerializedField} serializedField The field object.
     */
    constructor(private serializedField: SerializedField) {}
}
