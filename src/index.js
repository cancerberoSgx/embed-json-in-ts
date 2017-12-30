const shell = require('shelljs')
const path = require('path')
const glob = require('glob').sync
const json2ts = require('json2ts')

function tool (config) {
  glob(config.input).forEach(file => {
    let str = shell.cat(file).toString(),
      parsed
    try {
      const jsonStr = shell.cat(file).toString()
      let result = json2ts.convert(jsonStr)
      const simpleFilename = path.basename(file, path.extname(file))
      const interfaceName = simpleFilename + '_definition'
      result = result.replace(
        'export interface RootObject',
        `export interface ${interfaceName}`
      )

      result =
        result +
        `
export var ${simpleFilename}:${interfaceName} = ${jsonStr};
`
      const destFile = path.dirname(file) + '/' + simpleFilename + '.ts'
      shell.ShellString(result).to(destFile)
      if(config.debug){
        console.log('Generated ' + destFile)
      }
    } catch (ex) {
      if(config.debug){
        console.log('Ignoring file ' + file + ' since is not valid JSON. Reason', ex, ex.stack)
      }
    }
  })
}

module.exports = tool
