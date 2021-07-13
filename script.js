var mydragg = function(){
  return {
    move : function(divid,xpos,ypos){
      divid.style.left = xpos + 'px';
      divid.style.top = ypos + 'px';
    },
    startMoving : function(divid,container,evt){
      evt = evt || window.event;
      var posX = evt.clientX,
          posY = evt.clientY,
          divTop = divid.style.top,
          divLeft = divid.style.left,
          eWi = parseInt(divid.style.width),
          eHe = parseInt(divid.style.height),
          cWi = parseInt(document.getElementById(container).style.width),
          cHe = parseInt(document.getElementById(container).style.height);
      document.getElementById(container).style.cursor='move';
      divTop = divTop.replace('px','');
      divLeft = divLeft.replace('px','');
      var diffX = posX - divLeft,
          diffY = posY - divTop;
      document.onmousemove = function(evt){
        evt = evt || window.event;
        var posX = evt.clientX,
            posY = evt.clientY,
            aX = posX - diffX,
            aY = posY - diffY;
        if (aX < 0) aX = 0;
        if (aY < 0) aY = 0;
        if (aX + eWi > cWi) aX = cWi - eWi;
        if (aY + eHe > cHe) aY = cHe -eHe;
        mydragg.move(divid,aX,aY);
      }
    },
    stopMoving : function(container){
      var a = document.createElement('script');
      document.getElementById(container).style.cursor='default';
      document.onmousemove = function(){}
    },
  }
}();

var xmlns = "http://www.w3.org/2000/svg",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
 // container = select('.container'),
    ring = select('#ring')
  
TweenMax.set('svg', {
  visibility:'visible'
})

TweenMax.set('#clickLineGroup line', {
  drawSVG:'20% 20%'
})

for(var i = 0; i < 4; i++){
  select('#radio' + i).radioId = i;
  select('#radio' + i).onclick = function(e){
    //console.log(e.target.radioId)
    var tl = new TimelineMax();
    tl.set('#clickLineGroup line', {
        drawSVG:'20% 20%'
      })
     .set('#clickLineGroup', {
        y:e.target.radioId * 75
      })
      .set(ring, {
      attr:{
        cy:e.target.getAttribute('cy'),
        rx:0,
        ry:0
      }
    })
      .to(ring, 1, {
      attr:{
        ry:14 // this controls blob thing
      },
      ease:Elastic.easeOut.config(0.8, 0.6)
    })
      .to(ring, 0.8, {
      attr:{
        rx:14
      },
      ease:Elastic.easeOut.config(1.5, 0.79)
    },'-=1')
      
      .fromTo(e.target, 0.8, {
      attr:{
        r:4
      }
    },{
      attr:{
        r:6
      },
      ease:Elastic.easeOut.config(2.1, 0.9)
    },'-=1')
    .to('#clickLineGroup line', 0.4, {
      drawSVG:'40% 70%',
      ease:Linear.easeNone
},'-=1')
      .to('#clickLineGroup line', 0.4, {
        drawSVG:'100% 100%',
        ease:Linear.easeNone
},'-=0.6')
    
    
     tl.timeScale(1.2);
    
    TweenMax.set('text', {
      alpha:0.5
    })
    TweenMax.to(['#text' + e.target.radioId], 1, {
      alpha:1
    })  
    document.getElementById("placeholder").innerHTML = document.getElementById('text'+e.target.radioId).textContent;
    document.getElementById("windowName").innerHTML = `Alex Jiang: ${document.getElementById('text'+e.target.radioId).textContent}`;
  }//end loop
    
 
}


select('#radio0').onclick({target:select('#radio0')});

function changeDiv() {
  document.getElementById("placeholder").innerHTML = "whatever";
}

$(document).click(function(event) {
  var text = ""
  if (event.target.id == "exit") {
    text = "Easter egg???"
    document.getElementById("exitPressCount").innerHTML = `${Number(document.getElementById("exitPressCount").innerHTML)+1}`
    if (Number(document.getElementById("exitPressCount").innerHTML) >= 3) {
      text = "YOU FOUND ME"
      document.getElementById("easterEggBSOD").style.display = "initial";
    }
  } else if (event.target.id == "minimize") {
    text = "Disappearing..."
    document.getElementById("cover").style.animationName = "fade"
    document.getElementById("cover").style.animationDuration = "0.25s"
    document.getElementById("cover").style.animationTimingFunction = "ease-in-out"
    document.getElementById("cover").style.animationFillMode = "backwards" 
    document.getElementById("cover").style.animationDirection = "normal"
  } else if (event.target.id == "cover") {
    text = "Clicking cover..."
    document.getElementById("cover").style.animationName = "fadeOut"
    document.getElementById("cover").style.animationDuration = "0.25s"
    document.getElementById("cover").style.animationTimingFunction = "ease-in-out"
    document.getElementById("cover").style.animationFillMode = "forwards" 
    document.getElementById("cover").style.animationDirection = "normal"
    
  } else if (event.target.id == "fullscreen") {
    if (document.getElementById("hiddenFullscreenToggle").innerHTML.includes("False")) {
      document.getElementById("hiddenFullscreenToggle").innerHTML = `True ${document.getElementById("canvas").style.top} ${document.getElementById("canvas").style.left}`;
      document.getElementById("canvas").style.top = "0px";
      document.getElementById("canvas").style.left = "0px";
      document.getElementById("canvas").style.width = "920px";
      document.getElementById("canvas").style.height = "540px";
      document.getElementById("header").style.width = "920px";
      text = "Getting bigger now"
    } else if (event.target.id == "easterEggBSOD") {
      text = "It died"
    } else {
      oldTop = document.getElementById("hiddenFullscreenToggle").innerHTML.split(" ")[1]
      oldLeft = document.getElementById("hiddenFullscreenToggle").innerHTML.split(" ")[2]
      document.getElementById("hiddenFullscreenToggle").innerHTML = "False 0 0";
      document.getElementById("canvas").style.top = oldTop;
      document.getElementById("canvas").style.left = oldLeft;
      document.getElementById("canvas").style.width = "460px";
      document.getElementById("canvas").style.height = "270px";
      document.getElementById("header").style.width = "460px";
      text = "Getting smaller now"
    }
  } else {
    text = "Nothin to see here..."
  }
  document.getElementById("dev").innerHTML = text
    
});

document.getElementById("cover").style.animationName = "fadeOut"
document.getElementById("cover").style.animationDuration = "0.5s"
document.getElementById("cover").style.animationTimingFunction = "ease-in-out"
document.getElementById("cover").style.animationFillMode = "forwards" 
document.getElementById("cover").style.animationDirection = "normal"

function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}