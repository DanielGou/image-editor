
function loadImg() {
    var file    = document.querySelector('input[type=file]').files[0];  
    localStorage.setItem("name", file.name)
}

