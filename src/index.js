
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

      shell.ShellString(result).to(destFile)
      const destFile = path.dirname(file) + '/' + simpleFilename + '.ts'
    } catch (ex) {
      console.log('Ignoring file ' + file + ' since is not valid JSON')
    }
  })
}
module.exports = tool