const output = document.getElementById('output');
const fileInput = document.getElementById('file-input');

function doSomethingWithFiles(fileList) {
    let file = null;
    for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
            file = fileList[i];
            break;
        }
    }
    if (file !== null) {
        output.src = URL.createObjectURL(file);
        output.style.height = "120px";
        output.style.width = "120px";
    }
}
fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));
let count = 0;

function addToDo() {
    let text = document.getElementById('text').value.trim()
    if (!text) {
        alert('Type something')
        return
    }
    let list = document.getElementById('list')
    let li = document.createElement('li')
    if (document.getElementById('output').style.height != "0px") {
        li.innerHTML = `<a href="#">
    <input type='checkbox' id="checkbox${count}" onClick="strike(${count})"/> 
    <img style="height:120px;width:120px" src=${document.getElementById('output').src}>
   <span id="span${count}">${text}</span>
   <button id="button${count}" onClick="cross(${count})">x</button></a>
   `
    } else {
        li.innerHTML = `<a href="#">
              <input type='checkbox' id="checkbox${count}" onClick="strike(${count})"/> 
              <span id="span${count}">${text}</span>
              <button id="button${count}" onClick="cross(${count})">x</button></a>

      `
    }


    list.appendChild(li)
    count++;
    document.getElementById('text').value = "";
    document.getElementById('output').src = "";
    // document.getElementByTagName('img')[0].removeAttribute("height");
    // document.getElementByTagName('img')[0].removeAttribute("width");
    output.style.height = "0px";
    output.style.width = "0px";
    file = null;
    fileList = null;

}


function cross(id) {
    var litt = document.getElementById('button' + id).parentElement;
    litt.style.display = "none";
}

function strike(id) {
    document.getElementById('span' + id).classList.toggle('strikethrough')
}

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}