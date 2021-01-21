const compress_images = require('compress-images')
const fs = require('fs')
const path = require('path');

function compress(pathInput, outputPath){
    
    compress_images(`${pathInput}`, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
  
            fs.unlink(`${pathInput}`,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(pathInput,'Apagado')
                }
            })
        }
    );
  
  }

module.exports = compress;