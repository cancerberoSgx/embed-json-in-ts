import shell from 'shelljs'
import path from 'path'
const json2ts = require('json2ts')
import { sync as glob } from 'glob'
import { writeFileSync } from 'fs';

export interface Config {
  /** glob file pattern referencing target json files we want to pack */
  input: string
  mode?: 'normal'|'fs2json'
  debug?: boolean
  output: string
  transformFileName? : (f:string)=>string
}

export function tool(config: Config) {
  glob(config.input).forEach(file => {
    try {
      const jsonStr = shell.cat(file).toString()
      let result = json2ts.convert(jsonStr)
      const simpleFilename = path.basename(file, path.extname(file))
      const interfaceName = simpleFilename + '_definition'
      result = result.replace(
        'export interface RootObject',
        `export interface ${interfaceName}`
      )
      result +=
        `
export var ${simpleFilename}:${interfaceName} = ${jsonStr};
`
      const destFile = path.dirname(file) + '/' + simpleFilename + '.ts'
      writeFileSync(destFile, result)
      if (config.debug) {
        console.log('Generated ' + destFile)
      }
    } catch (ex) {
      if (config.debug) {
        console.log('Ignoring file ' + file + ' since is not valid JSON. Reason', ex, ex.stack)
      }
    }
  })
}

