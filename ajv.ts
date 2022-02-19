import ajv from 'ajv';
import fs from 'fs';

const Ajv = new ajv({ allErrors: true });

const schema = JSON.parse(fs.readFileSync('schema.json').toString())

const data = {
    image: "string",
    operations: [
      {
        operation: "flip",
        parameters: {
          orientation: "horizontal",
        }
      },
      {
        operation: "resize",
        parameters: {
            width: 100,
            height: 1

        }
      },
      {
        operation: "rotate",
        parameters: {
          angle: -90
        }
      },
      {
        operation: "thumbnail",
      },
      {
        operation: "grayscale",
      }
    ]
  }


let validate = Ajv.compile(schema);

console.time('validation')
let x = validate(data)
console.timeEnd('validation')

if (!x) {
    console.log(validate.errors)

}

