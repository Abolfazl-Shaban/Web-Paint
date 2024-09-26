document.getElementById('sBrush').setAttribute('open','')

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const fontWit = document.getElementById('fontRange');
const color = document.getElementById('color');
const sColor = document.getElementById('sColor');
const brush = document.getElementById('sBrush');
const eraser = document.getElementById('sEraser');
const eraserMouse = document.getElementById('eraserMouse');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

const nameP = document.getElementById('pname');
const backgroundP = document.getElementById('groundColor');
const sWidth = document.getElementById('sWidth');
const sHeight = document.getElementById('sHeight');
const startBtn = document.getElementById('startBtn');
const dialog = document.getElementById('dialogStart');

let isDraw= false;

let paintX;
let paintY;

startBtn.addEventListener('click' , ()=>{
    paintX = parseInt(sWidth.value);
    let paintXmax = parseInt(sWidth.max);
    paintY = parseInt(sHeight.value);
    let paintYmax = parseInt(sHeight.max);
    

    if (paintXmax < paintX || paintX < 100){
        return alert("Please enetr number between 100 to 1400")
    }

    if (paintYmax < paintY || paintY < 100){
        return alert("Please enetr number between 100 to 700")
    }

    dialog.style.opacity = '0';
    
    dialog.addEventListener('transitionend', ()=>{
        dialog.classList.add('hidden');
    })
    
    canvas.style.width = paintX + 'px';
    canvas.style.height = paintY + 'px';

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight



        ctx.fillStyle = backgroundP.value;
        ctx.fillRect(0,0,canvas.width,canvas.height)
         if(backgroundP.value == 'black'){
              color.value = '#ffffff'
              ctx.strokeStyle = '#ffffff'
        }
    

        
    
})

brush.addEventListener('click',()=>{
    eraser.removeAttribute('open');
    brush.setAttribute('open','');
    ctx.strokeStyle = color.value
    sColor.style.visibility = 'visible'
})

eraser.addEventListener('click',()=>{
    brush.removeAttribute('open');
    eraser.setAttribute('open','');
    sColor.style.visibility = 'hidden'
    ctx.strokeStyle = backgroundP.value;
    
})




function drawing(e){
    
    eraserMouse.style.left = e.offsetX -  (fontWit.value /2) + 'px'
    eraserMouse.style.top = e.offsetY -  (fontWit.value /2)  + 'px'
    eraserMouse.style.width = fontWit.value + 'px'
    eraserMouse.style.height = fontWit.value + 'px'
        eraserMouse.style.backgroundColor = ctx.strokeStyle


    if(!isDraw) return
    ctx.lineTo(e.offsetX , e.offsetY)
    ctx.stroke()
    ctx.lineWidth = fontWit.value
}
canvas.addEventListener('mousemove',drawing)
canvas.addEventListener('mousedown' , ()=>{
    isDraw = true
    ctx.beginPath();
})
window.addEventListener('mouseup' , ()=>{
    isDraw = false
})
canvas.addEventListener('mouseleave' , ()=>{
    eraserMouse.style.display = 'none';
})
canvas.addEventListener('mouseenter' , ()=>{
    eraserMouse.style.display = 'block';
})
fontWit.addEventListener('change', ()=>{
    document.getElementById('fontText').innerText = fontWit.value + "px" 
    document.getElementById('fontText').style.borderBottom = fontWit.value + "px solid gray" 
})
fontWit.addEventListener('mousemove', ()=>{
    document.getElementById('fontText').innerText = fontWit.value + "px" 
    document.getElementById('fontText').style.borderBottom = fontWit.value + "px solid gray" 
})
color.addEventListener('change', ()=>{
    ctx.strokeStyle = color.value
})
clearBtn.addEventListener('click', ()=>{
    ctx.fillStyle = backgroundP.value;
    ctx.fillRect(0,0,canvas.width,canvas.height)

})
saveBtn.addEventListener('click', ()=>{
    let link = document.createElement('a');
    let pName= nameP.value;
    pName.replace(' ','_');
    link.download = `${pName}.jpg`;
    link.href = canvas.toDataURL();
    link.click()
})