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
}
