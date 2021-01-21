const express = require('express');
const ejs = require('ejs')
const bodyPareser = require('body-parser')
const fs = require('fs')

const upload = require('./modules/upload')
const resize = require('./modules/resize')
const compress = require('./modules/compress')


const app = express()

// EJS
app.set('view engine', 'ejs')

// Public Folder
app.use(express.static(__dirname + '/views'));

//Body Parser 
app.use(bodyPareser.urlencoded({extended: false}))
app.use(bodyPareser.json())

app.get('/', (req, res) => res.render('index'));

app.get('/mod', (req, res)=>{
  res.sendFile('/mod/')
})

app.post('/mod', bodyPareser.json(),(req,res)=>{
  const localImg = `./uploadImg/${req.body.nameImg}`
  const rotate = Number(req.body.rotate)
  const width = Number(req.body.width)
  const height = Number(req.body.height)

  const outputPath = `./finalFile/${req.body.nameImg}`

  resize(localImg, outputPath, width, height, rotate, cb)

  function cb(){
    if(req.body.compress){
      compress(`./finalFile/${req.body.nameImg}`, './finalFile/compressed/')
    }  
  }

  res.redirect('/download')
})

app.get('/download', (req,res)=>{
  res.sendFile('/download/')
})

app.post('/getDownload', (req,res)=>{
  const nameImg = req.body.nameImg
  const compressCheked = req.body.compress

  if(compressCheked == 'true'){
    res.download(`./finalFile/compressed/${nameImg}`)
  }else{
    res.download(`./finalFile/${nameImg}`)
  }

  function del(){
    if(compressCheked == 'true'){
    fs.unlink(`./finalFile/compressed/${nameImg}`)
    }else{
    fs.unlink(`./finalFile/${nameImg}`)
    }
  }

})

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
        res.render('index', {
          msg: err
        })
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });   
      } else {
          res.redirect('/mod')
      }
    }
  });
});



const port = 3000;

// const httpsOptions = {
//   cert: fs.readFileSync(path.join(__dirname, "ssl", 'server.crt')),
//   key:  fs.readFileSync(path.join(__dirname, "ssl", 'server.key'))
// }

app.listen(port, () => console.log(`Server started on port ${port}`));

// https.createServer(httpsOptions, app).listen(port, ()=>{
//   console.log(`Server on port ${port}`)
// })













































// const express = require('express')
// const path = require('path')
// const upload = require('./modules/upload')

// const app = express()

// app.use(express.static(__dirname + '/src'));

// app.get('/', (req,res)=> {
//     res.sendFile(__dirname + '/src/')
// })

// app.post('/upload', (req, res)=>{
//     upload(req,res, (err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(req.file == undefined){
//                 console.log('Error: No file Selected!')
//             }else{
//                 console.log('File Uploaded!')
//             }
//         }
//     })
// })

// const port = 5000
// app.listen(port,()=>{
//     console.log(`Server on port ${port}`)
// })