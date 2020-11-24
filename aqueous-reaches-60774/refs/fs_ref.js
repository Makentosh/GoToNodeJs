const fs = require('fs');
const path = require('path');

//file system
//
// fs.mkdir(path.join(__dirname,  'notes'), (err) => {
//   if (err) {
//     throw  new Error(err)
//   }
//
//   console.log('Папка создана')
// })


// fs.writeFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'hello vasya', (err) => {
//   if (err) throw  err
//
//   console.log('file sozdan')
//
//   fs.appendFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'hello vasya 222', err => {
//     if (err) throw  err
//     console.log('file izmenen')
//
//     fs.readFile(
//         path.join(__dirname, 'notes', 'mynotes.txt'), 'utf-8', (err, data) => {
//           if(err) throw err
//
//           console.log(data)
//         }
//     )
//
//   })
// })
//

// fs.rename(
//     path.join(__dirname, 'notes', 'mynotes.txt'),
//     path.join(__dirname, 'notes', 'notes.txt'),
//     err => {
//       if(err) throw err
//     }
//   )
