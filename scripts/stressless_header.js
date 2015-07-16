var blockScroll = false;
var scrolledTimes = 0;
var navHeader;
var navbar;
var headerBuffer;
var wantStress = false;
var speedBump = 0;

// function bodyLoaded() {
// 	window.onscroll = onScroll;
//     navbar = document.getElementById('navigation');
//     navbar.addEventListener("onchange", navbarResized());
// 	navHeader = document.getElementById ('navigation-header');
//     headerBuffer = document.getElementById ('header-buffer');
//     headerBuffer.style.height = navbar.clientHeight + 'px';
//     // onchange, onresize
// }

window.onload = function() {
    window.onscroll = onScroll;
    // window.onresize = function() {
    //     console.log("Acontece?")
    //     if(headerBuffer)
    //         headerBuffer.style.height = navbar.clientHeight + 'px';
    // }
    navbar = document.getElementById('navigation');
    navHeader = document.getElementById ('navigation-header');
    headerBuffer = document.getElementById ('header-buffer');
    headerBuffer.style.height = navbar.clientHeight + 'px';
    navbar.addEventListener("onresize", navbarResized(), false);
    // navbar.onresize = navbarResized;
}


function navbarResized() {
    console.log("Acontece?")
    if(headerBuffer)
        headerBuffer.style.height = navbar.clientHeight + 'px';
}

//Keys need to be sped up, to have the same feel as the rest of the page
window.addEventListener("keydown", function(e) {
    //Space
    if(e.keyCode === 32){
        speedBump+=5;
        scrolledTimes+=4;
    } //Page Down
    else if(e.keyCode === 34){
        speedBump+=5;
        scrolledTimes+=4;
    } //Page Up
    else if(e.keyCode === 33){
        speedBump+=5;
        scrolledTimes-=4;
    } //Arrow Up
    else if(e.keyCode === 38){
        speedBump++;
        scrolledTimes--;
    }//Arrow Down
    else if(e.keyCode === 40){
        speedBump++;
        scrolledTimes++;
    }
});

function onScroll() {
    // console.log("Speed: {0}", speedBump);
    if(speedBump<5) {
        speedBump++;
        blockScroll = true;
    }else{
       scrolledFunc();
       computeHideNav();
       speedBump = 0;    
    }
}

setInterval(function() {
	if(blockScroll) {
		blockScroll = false;
		scrolledFunc();
		computeHideNav()
	}
}, 5);

function scrolledFunc() {
    if ( typeof scrolledFunc.x == 'undefined' ) {
        scrolledFunc.x=window.pageXOffset;
        scrolledFunc.y=window.pageYOffset;
    }
    var diffX=scrolledFunc.x-window.pageXOffset;
    var diffY=scrolledFunc.y-window.pageYOffset;
    if( diffX<0 ) {
        // Scroll right
    } else if( diffX>0 ) {
        // Scroll left
    } else if( diffY<0 ) {
    	scrolledTimes++;
    } else if( diffY>0 ) {
    	scrolledTimes--;
    } else {
        // First scroll event
    }
    if(scrolledTimes > 5)
    	scrolledTimes = 5;
    else if(scrolledTimes < -5)
    	scrolledTimes = -5;
    scrolledFunc.x=window.pageXOffset;
    scrolledFunc.y=window.pageYOffset;
}

function computeHideNav() {
    // console.log("Scrolled: {0} tiems", scrolledTimes);
	if(scrolledTimes > 3) {
        hideMenu();
        scrolledTimes = 0;
    }
	else if(scrolledTimes < -3){
        showMenu();
        scrolledTimes = 0;
    }
}

function hideMenu() {
	navHeader.style.maxHeight = "0px";
	navHeader.style.opacity = "0.0";
	// console.log(navHeader);
	// console.log("HIDE");
}

function showMenu() {
	navHeader.style.maxHeight = "50px";
	navHeader.style.opacity = "1.0";
	// console.log(navHeader);
	// console.log("SHOW")
}