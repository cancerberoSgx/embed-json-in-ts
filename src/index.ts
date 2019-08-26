import shell from 'shelljs'
import path from 'path'
const json2ts = require('json2ts')
import { sync as glob } from 'glob'
import { writeFileSync } from 'fs';
import {fs2json} from 'fs-to-json'

export interface Config {
  /** glob file pattern referencing target json files we want to pack */
  input: string
  mode?: 'normal' | 'fs2json' | 'string'
  debug?: boolean
  /** in case only one file is matched user can specify an output file path */
  outputFile?: string
  /** keep original file extension in emitted variable name */
  preserveExtension?: boolean
  transformFileName?: (f: string) => string
  output?:string
}

export function tool(config: Config) {
  config.transformFileName = config.transformFileName || (file => file.replace(/[^\w]/gi, '_'))
  config.debug && console.log('starting with config: ', config)
  if (config.mode === 'fs2json') {
    fs2json(config)
      .then(() => {
        config.input = config.output!
        base({...config, output: undefined})
        process.exit(0)
      })
      .catch((ex: any) => {
        console.log('ERROR', ex)
        process.exit(1)
      })
  } 
  else {
    base(config)
  }
}

function base(config: Config) {
  const files = glob(config.input)
  files.forEach(file => {
    try {
      const outputFolder = config.output || path.dirname(file)
      const jsonStr = config.mode === 'string' ? JSON.stringify(shell.cat(file).toString()) : shell.cat(file).toString()
// console.log(json2ts);
      
      let result = config.mode === 'string' ? '' : json2ts.convert(jsonStr)
      const simpleFilename = path.basename(file, config.preserveExtension ? undefined : path.extname(file)).replace(/[^a-z0-9_]/gi, '_')
      const interfaceName = config.mode === 'string' ? 'string' : simpleFilename + '_definition'
      result = result.replace(
        'export interface RootObject',
        `export interface ${interfaceName}`
      )
      result +=
        `
export const ${simpleFilename}: ${interfaceName} = ${jsonStr};
`
      const destFile = files.length===1 && config.outputFile || outputFolder + '/' + simpleFilename + '.ts'
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

