embed json files data from local files and easy typescript import and usage

Imagine you have a project with these two files, a typescript that loads a json file. As a TypeScript developer I want to easily import that json object from my code and make sure it get's embed in the typescript compiler option (so I can bundle its content)

 - src/index.ts
 - src/data1.json

 I want to embed the content of data1.json in my typescript program as a normal module that I can import: one of the generated .js files by the typescript compiler


so I use the command: 

```sh
embed-json-in-ts --input src/*.json
```

That generates data1.ts file ready to be used in your index.ts: 

```typescript
import {data1} from './data1'
console.log(data1.persons[0].name) // no problems with tsc - data1 has a type :)
```

The returned object is already "typed", so user don't have to cast and have full type-checking / autocompletion ( thanks to json2ts)

# Using it in typescript projects

You can start using this by instructing your developer tools to invoke `embed-json-in-ts` before `tsc`:

```
"scripts": {
  "build": "node node_modules/embed-json-in-ts/src/index --input src/**/data/**/*.json && node node_modules/typescript/bin/tsc",
```

# Use cases

 * Simulate a small static file server serving files from a single service/entrypoint. dir with .js, .css compresses as json object and embeded in the output code in a browser or any engine without fs. 

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