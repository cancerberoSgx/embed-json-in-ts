const shell = require('shelljs')

describe('example projects', () => {
  it('project1', () => {
    var pwd = shell.pwd()
    shell.cd('..')
    expect(shell.exec('npm pack').code).toBe(0)
    const lib = shell.ls('embed-json-*.tgz')[0]
    expect(shell.exec('cd dist').code).toBe(0)    
    shell.cd('dist')
    shell.cd('spec/assets/project-watch-handlebars-test1')
    if(!shell.test('-d', 'node_modules')) {
      expect(shell.exec('npm install').code).toBe(0)
    }
    expect(shell.exec('npm install -D ../../../../'+lib).code).toBe(0)
    expect(shell.exec('npm run compile').code).toBe(0)
    expect(shell.exec('npm test').code).toBe(0)
    shell.cd(pwd)
  })
})
