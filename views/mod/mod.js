function loadName(){
    const innerNameImg = document.getElementById('imageName')
    const nameImg = localStorage.getItem('name')

    innerNameImg.value = nameImg;

    localStorage.setItem('compress', false)
}

function nameCompress(){
    const compress = document.getElementById('compress')

    if(compress.checked == true){
        localStorage.setItem('compress', true)
    }

    if(compress.checked == false){
        localStorage.setItem('compress', false)
    }
}


// var dataImage = localStorage.getItem('img')
// img = document.getElementById('img')



