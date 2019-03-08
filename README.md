[![Build Status](https://travis-ci.org/cancerberoSgx/embed-json-in-ts.png?branch=master)](https://travis-ci.org/cancerberoSgx/embed-json-in-ts)
[![Dependencies](https://david-dm.org/cancerberosgx/embed-json-in-ts.svg)](https://david-dm.org/cancerberosgx/embed-json-in-ts)


Natural way of importing json files from TypeScript: 

Have a `data/data1.json` file in the same folder as your .ts sources and just load it: 

```typescript
import {data1} from './data/data1'
console.log(data1.persons[0].name) // no problems with types - data1 is well described by a typescript interface :)
```

**Problem to solve**: As a TypeScript developer I want to import the data inside a .json local file naturally from my TypeScript code. Also I want to make sure it get's embedded in the output (so I can bundle its content)

`embed-json-in-js` is a JSON pre-processing tool that convert .json files into real TypeScript modules for easy importing and embedding. 


# Install and Use in Command Line

Install:

```sh
npm install -g embed-json-in-ts
```

Use:
```sh
embed-json-in-ts --input="src/**/*.json"
```

# Install and use in node js project

```sh
npm install --save-dev embed-json-in-ts
```

Use it in your build scripts `gulpfile.js` or whatever your build system:

```javascript
var tool = require('embed-json-in-ts')
tool({input: 'src/**/*.json'})
```

# Integrating in existing TypeScript projects

Basically you want to call embed-json-in-ts before the typescript compiler `tsc` for example in package.json:

```json
"scripts": {
  "build": "node node_modules/embed-json-in-ts/src/cli --input src/**/data/**/*.json && node node_modules/typescript/bin/tsc",
```

# folder to json tool

it will generate a .json file containing a folder contents and then generate the .ts from that: 
 
 ```sh
embed-json-in-ts --mode=fs2json --input="folder/**/*" --output="./data/folder.json"
```

and then you are ready to:

```ts
import {folder} from './data/folder'
```

# Project example: 

 *see spec/assets/project-watch-handlebars-test1 
 - gulp watch, handlebars templates imported using json. in this case template compilation into a json is not responsibility of this project - just the support for importing and embedding. 

# TODO

 * get input from given `tsconfig.json` file (current one - since this is a ts project should have one)