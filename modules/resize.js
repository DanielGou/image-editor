const sharp = require('sharp')
const fs = require('fs')
const path = require('path');


function resize( inputPath, outputPath , width, height, rotate,cb){
    sharp(inputPath).resize({width: width, height: height}).rotate(rotate).toFile(outputPath, (err) => {
        if (err){
            console.log(err)
        }else{
            console.log('Imagem redimensionada com sucesso.')
            cb()
            fs.unlink(inputPath, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(inputPath,'Apagado')
                }
            })
        }
    })
  }
  
module.exports = resize;  