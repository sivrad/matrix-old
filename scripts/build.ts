// Script to build the library from the schema.json.
import { readFileSync } from 'fs';

const SCHEMA_URL = './schema.json';

type Schema = any;

const getSchemaObject = (): Schema => {
    return JSON.parse(readFileSync(SCHEMA_URL, 'utf-8'));
};

const generateTypesFile = (schema: Schema): string => {
    let content = `import { SivradValue, ObjectOf } from '../type';\n`;

    return content;
};

const build = () => {
    // Build.
    const schema = getSchemaObject();
    console.log(schema);
};

build();
