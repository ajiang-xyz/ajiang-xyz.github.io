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
     
  }//end loop
    
 
}


select('#radio0').onclick({target:select('#radio0')});