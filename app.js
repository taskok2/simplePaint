const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

const canvas = document.getElementById("js-canvas");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let isPaint = false;
let isFill = false;

function startPainting(e){
    isPaint = true;
}
function stopPainting (){
    isPaint = false;
}
function onMouseMove (e) {
    const pos = { x : e.offsetX, y : e.offsetY};
    if(!isPaint){
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    } else {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
}

function handleCanvaseClick(){
    if(isFill)
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleContextMenu(e){
    e.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvaseClick);
    canvas.addEventListener("contextmenu", handleContextMenu)
}

const colors = document.getElementsByClassName("js-color");

function handleColorClick(e){
    const color= e.target.style.backgroundColor;

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

if(colors){   
    Array.from(colors).forEach(c => c.addEventListener("click", handleColorClick));
}

const range = document.getElementById("js-brush-range");

function handleRangeChange(e){
    const brush = e.target.value;
    ctx.lineWidth = brush;
}

if (range){
    range.addEventListener("change", handleRangeChange);
}

const modeBtn = document.getElementById("js-mode");

function handleModeClick(e){
    isFill = !isFill;
    modeBtn.innerText = (isFill ? "Paint" : "Fill");
}

if(modeBtn){
    modeBtn.addEventListener("click", handleModeClick);
}

const saveBtn = document.getElementById("js-save");

function handleSaveClick(e){
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    
    link.href = img;
    link.download = "testImage.png";
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
