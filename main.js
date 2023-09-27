let duration=500;
var startButton = document.querySelector('.start-game')
startButton.onclick= function(){
    var name= prompt('whats your name?')
    if(name == "")
    {
        document.querySelector('.name span').innerHTML=' Unknown'
        localStorage.setItem('name','Unkown')

    }
    else{
        document.querySelector('.name span').innerHTML=name
            localStorage.setItem('name',name)

    }
    document.querySelector('.start').remove()
}

let tries =document.querySelector('.tries span')
var orderRange=[0,1,2,3,4,5,6,7,8]

function shafling(array){
    var current=9,
        random,
        temp
    while(current>0){
        random=Math.floor(Math.random()*current)
        current--;
        temp= array[current]
        array[current]=array[random]
        array[random]=temp
    }
    return array;
}


// shafle
var randomOrder=shafling(orderRange)

var container = document.querySelector(".chovie-game")
var blocks = Array.from(container.children)
blocks.forEach((block,index)=>{
    block.style.order = randomOrder[index]
    block.addEventListener('click',function(){
        flip(block)

    // console.log(block)
    })
    // if(block.classList.contains('match')){
    //     console.log(11)
    // }
}

)

// var haveMatch= true;

// for(let i=0;i<blocks.length;i++){
//     if(!blocks[i].classList.contains('match')){
//         haveMatch= false
//     }
// }
// if(haveMatch){
//     console.log(12)
// }


//flip
function flip(b){
    b.classList.add('flipped')
    var allflippedblocks=blocks.filter(f=>f.classList.contains('flipped'))
    if(allflippedblocks.length === 2){
        stopClicking()
        checkMatchedBlock(allflippedblocks[0],allflippedblocks[1])
    }
}

//stop
function stopClicking(){
    container.classList.add('stop')
    setTimeout(function(){
        container.classList.remove('stop')
    },duration)
}

//check matching

function checkMatchedBlock(firstBlock,secondBlock){
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('flipped')
        secondBlock.classList.remove('flipped')

        firstBlock.classList.add('match')
        secondBlock.classList.add('match')
        document.getElementById('success').play()
    }
    else{
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        if(tries.innerHTML== 5){
            var tryAgain=document.createElement('div')
            tryAgain.classList.add('try')
            document.body.appendChild(tryAgain)
            document.getElementById('idiot').play()
            var reload = document. createElement('span')
            var reloadTxt = document.createTextNode('5 wrong tries and still can\'t solve it! \n Reload to try again you dump jackass')
            reload.appendChild(reloadTxt)
            tryAgain.appendChild(reload)
        }

        setTimeout(function(){
        firstBlock.classList.remove('flipped')
        secondBlock.classList.remove('flipped')
        },duration)
        
    }
}
