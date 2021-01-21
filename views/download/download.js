function loadLink(){
    const innerNameImg = document.getElementById('imageName')
    const nameImg = localStorage.getItem('name')

    const innerCompressCheked = document.getElementById('compress')
    const compressCheked = localStorage.getItem('compress')

    innerNameImg.value = nameImg
    innerCompressCheked.value = compressCheked
}