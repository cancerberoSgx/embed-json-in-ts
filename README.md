[![Build Status](https://travis-ci.org/cancerberoSgx/embed-json-in-ts.png?branch=master)](https://travis-ci.org/cancerberoSgx/embed-json-in-ts)
[![Dependencies](https://david-dm.org/cancerberosgx/embed-json-in-ts.svg)](https://david-dm.org/cancerberosgx/embed-json-in-ts)


Natural way of importing json files from TypeScript: 

Have a `data/data1.json` file in the same folder as your .ts sources and just load it: 

```typescript
import {data1} from './data/data1'
console.log(data1.persons[0].name) // no problems with tsc - data1 has a type :)
```

`embed-json-in-js` is a JSON pre-processing tool that convert .json files into real TypeScript modules for easy importing and embedding. 

Problem to solve: **As a TypeScript developer I want to import the data inside a .json local file naturally from my TypeScript code**. Also I want to make sure it get's embedded in the output (so I can bundle its content)

So I use the command `embed-json-in-ts` like this: 

```sh
embed-json-in-ts --input src/**.json
```

That generates `data1.ts` file ready to be used in your index.ts as in : 
```typescript
import {data1} from './data/data1'
console.log(data1.persons[0].name) // no problems with tsc - data1 has a type :)
```

The returned object is already "typed", so user don't have to cast and have full type-checking / auto-completion ( thanks to json2ts)

# Using it in typescript projects

You can start using this by instructing your developer tools to invoke `embed-json-in-ts` before `tsc`:

```
"scripts": {
  "build": "node node_modules/embed-json-in-ts/src/index --input src/**/data/**/*.json && node node_modules/typescript/bin/tsc",
```

# Use cases

 * Simulate a small static file server serving files from a single service/entrypoint. directory with .js, .css serialized as json ts module and embedded in output to run in browser or other

 * compile handlebars templates and embed in bundle so can render in browser. in this case template compilation into a json is not responsibility of this project - just the support for importing and embedding: 
 
 ```javascript
let data = {templates: {}}
shell.ls('templates/*.hbs').forEach((file)=>{
  data.templates[file] = handlebars(shell.cat(file))
})
fs.writeFileSync(JSON.stringify(data).to('src/templates.json')
embedJsonInTs({input: 'src/templates.json'})
shell.exec('tsc')
 ```


# TODO

 * get input from given tsconfig.json file (current one - since this is a ts project should have one)