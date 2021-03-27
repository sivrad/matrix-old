// Script to build the library from the schema.json.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { CODE_GEN_PATH, SCHEMA_URL, TYPES_FILE_PATH } from './constants';
import { JSONSchema4 } from 'json-schema';
import { compileFromFile } from 'json-schema-to-typescript';

const getSchemaObject = (): JSONSchema4 => {
    return JSON.parse(readFileSync(SCHEMA_URL, 'utf-8'));
};

const generateOutDirectory = () => {
    if (!existsSync(CODE_GEN_PATH)) mkdirSync(CODE_GEN_PATH);
};

const generateTypesFileContent = async (): Promise<string> => {
    return await compileFromFile(SCHEMA_URL);
};

const generateTypesFile = async () => {
    writeFileSync(TYPES_FILE_PATH, await generateTypesFileContent());
};

const build = async () => {
    // Build.
    // const schema = getSchemaObject();
    generateOutDirectory();
    await generateTypesFile();
};

build();
