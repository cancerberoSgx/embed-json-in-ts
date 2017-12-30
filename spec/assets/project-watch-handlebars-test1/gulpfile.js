const gulp = require('gulp')
const watch = require('gulp-watch')
const shell = require('shelljs')
const handlebars = require('handlebars')
const glob = require('glob').sync
const json2ts = require('embed-json-in-ts')

var templates = {}
const templatesGlob = 'src/**/*.hbs'
const templateJsonOutput = 'src/templates/templates.json'

gulp.task('default', () => {
  // compile all first
  glob(templatesGlob).forEach(file => {
    templates[file] = handlebars.compile(shell.cat(file).toString()).toString()
  })

  console.log('Watching your template files...')
  watch(templatesGlob, file => {
    // console.log(file.path)
    templates[file.path] = handlebars.compile(shell.cat(file.path).toString()).toString()
    shell.ShellString(JSON.stringify(templates)).to(templateJsonOutput)
    json2ts({input: templateJsonOutput})
    shell.exec('node node_modules/typescript/bin/tsc')
  })

  watch('output/**/*.js', file => {
    console.log(`File changed. Uploading File: ${file.path} to the cloud ...`)
    // TODO: do the uploading of .js or bundle.js
  })
})
