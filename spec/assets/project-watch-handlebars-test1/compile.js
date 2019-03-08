const shell = require('shelljs')
const handlebars = require('handlebars')
const glob = require('glob').sync
const json2ts = require('embed-json-in-ts').tool
const path = require('path')
const templateJsonOutput = 'src/templates/templates.json'
const templatesGlob = 'src/**/*.hbs'

var templates = {}

glob(templatesGlob).forEach(file => {
  const templateName = path.basename(file, path.extname(file))
  templates[templateName] = handlebars.precompile(shell.cat(file).toString()).toString()
})
require('fs').writeFileSync(templateJsonOutput, JSON.stringify(templates))
json2ts({ input: templateJsonOutput })
shell.exec('npx tsc')