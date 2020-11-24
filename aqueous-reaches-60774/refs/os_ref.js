const os = require('os')

//операційна система
// console.log(os.platform())
//
// //архітектура
// console.log(os.arch())
//
//
// console.log(os.cpus(), 'данні проца')


console.log(os.freemem(), 'память вільна')
console.log(os.totalmem(), 'память вся')
console.log(os.homedir(), 'память вся')


console.log(os.uptime()/1000/60, 'память вся')
