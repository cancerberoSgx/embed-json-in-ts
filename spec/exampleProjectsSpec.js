const shell = require('shelljs')
const tool = require('../src/index.js')

describe('example projects', () => {
  it('project1', () => {
    var pwd = shell.pwd()
    shell.cd('spec/assets/project-watch-handlebars-test1')
    expect(shell.exec('npm install').code).toBe(0)
    expect(shell.exec('npm run compile').code).toBe(0)
    expect(shell.exec('npm test').code).toBe(0)
    shell.cd(pwd)
  })
})
