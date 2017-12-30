import {templates} from './templates/templates'
import {template} from 'handlebars'

var _templates:any = {}
function getTemplate(name){
    if(!_templates[name]){
        _templates[name] = template(eval('('+templates[name]+')'))
        // console.log('seba', _templates[name])
    }
    return _templates[name]
}

const header = getTemplate('header')
// console.log(header)
console.log(header({title: 'seba is the best'}))