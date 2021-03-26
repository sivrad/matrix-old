import { Matrix, Schema } from '../src';

const mtx = new Matrix();

new Schema(mtx, {
    name: 'thing',
    label: 'Thing',
    description: 'Base Representation of a thing',
    isAbstract: true,
});

const entity = new Schema(mtx, {
    name: 'entity',
    parent: 'thing',
    fields: {
        id: {
            type: 'str',
            description: 'Thing identifier',
            defaultValue: {
                '@type': 'str',
                value: 'IDK MAN',
            },
        },
    },
});

console.log(entity);
