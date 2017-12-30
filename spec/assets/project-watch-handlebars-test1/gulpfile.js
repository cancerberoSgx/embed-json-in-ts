const gulp = require('gulp')
const watch = require('gulp-watch')
const shell = require('shelljs')
const handlebars = require('handlebars')
const glob = require('glob').sync
const json2ts = require('embed-json-in-ts')
const path = require('path')

const templateJsonOutput = 'src/templates/templates.json'
const templatesGlob = 'src/**/*.hbs'

var templates = {}

gulp.task('dev', ['compile'], () => {
  console.log('Watching your template files...')
  watch(templatesGlob, file => {
      const templateName = path.basename(file.path, path.extname(file.path))
      templates[templateName] = handlebars.precompile(shell.cat(file.path).toString()).toString()
      shell.ShellString(JSON.stringify(templates)).to(templateJsonOutput)
      json2ts({input: templateJsonOutput})
      shell.exec('node node_modules/typescript/bin/tsc')   
  })

})

gulp.task('compile', ()=>{
  
  // compile all 
  glob(templatesGlob).forEach(file => {
    const templateName = path.basename(file, path.extname(file))
    templates[templateName] = handlebars.precompile(shell.cat(file).toString()).toString()
  })
  shell.ShellString(JSON.stringify(templates)).to(templateJsonOutput)
  json2ts({input: templateJsonOutput})
  shell.exec('node node_modules/typescript/bin/tsc')
})