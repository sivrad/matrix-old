export type ObjectOf<T> = { [key: string]: T };

export interface SivradValue {
    // Type of the value
    /**
     * The type of the value.
     */
    '@type': string;
    [key: string]: unknown;
}

export interface SerializedField {
    // Type of the field.
    type: string;

    // Description, used for interfacing.
    description?: string;

    // Default value of the field.
    defaultValue?: SivradValue;
}

export interface SerializedSchema {
    // Identifier, used internally.
    name: string;

    // Label, used for human interfacing.
    label?: string;

    // Description, used for human interfacing.
    description?: string;

    // Parent schema ID for inheritance.
    parent?: string;

    // If the Schema can not be instantiated.
    isAbstract?: boolean;

    // The fields of the schema
    fields?: ObjectOf<SerializedField>;
}
