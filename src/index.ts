import { Matrix } from './matrix';
import { Schema } from './schema';

const m = new Matrix();
const s = new Schema(m, {
    name: 'thing',
    label: 'Thing',
});

console.log(s);
