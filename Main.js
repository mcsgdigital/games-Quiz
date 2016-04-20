var canvas;
var W,H;
var container,listContainer,trophiesContainer;
var queue;

var firstTimePlayed = true;
var catalogLibrary = [];
var bg;
var meter,meterFill,star;
var perfectScore = false;

var flags_sp;
var flag;
var answers;
var catalog;
var possibleAnswers;
var correctAnswerIndex;
var category_totalQ;

var txt_score;
var score,currentScore;
var nbrOfQuestions;
var questions,questionNbr;
var alreadyAsked;

var iconInfo,iconList,iconCup;

//player's data
var data_categories;
var saveLastImage;
var mode;
var category_list,category_nbr,list_descFlag;
var nav_next,nav_prev,nav_forward,nav_backward,nav_eject;


window.onload = function init() {
		//fill catalog
		populateCatalog();
		catalogLibrary = sortCatalog();
		if(firstTimePlayed){
			setInitialData();
		}
		
		preloadImages();
}

function preloadImages() {
	
	queue = new createjs.LoadQueue(false);
	queue.on("complete", handleFileComplete);
	queue.loadFile({id: "bg", src:"assets/images/bg.jpg"});
	queue.loadFile({id: "sp_flags", src:"assets/images/flags.jpg"});
	queue.loadFile({id: "iconInfo", src:"assets/images/icon_info.png"});
	queue.loadFile({id: "iconList", src:"assets/images/icon_list.png"});
	queue.loadFile({id: "iconCup", src:"assets/images/icon_cup.png"});
	queue.loadFile({id: "closeBtn", src:"assets/images/close.png"});
	queue.loadFile({id: "padlock", src:"assets/images/padlock.png"});
	queue.loadFile({id: "new", src:"assets/images/new.png"});
	queue.loadFile({id: "nav_next", src:"assets/images/nav_next.png"});
	queue.loadFile({id: "nav_prev", src:"assets/images/nav_prev.png"});
	queue.loadFile({id: "nav_forward", src:"assets/images/nav_forward.png"});
	queue.loadFile({id: "nav_backward", src:"assets/images/nav_backward.png"});
	queue.loadFile({id: "nav_eject", src:"assets/images/nav_exit.png"});
	queue.loadFile({id: "bg_worldMap", src:"assets/images/bg_trophies.jpg"});

}

function handleFileComplete(event) {
	console.log("Images load complete.");
	
	canvas = new createjs.Stage("canvas");
	
	canvas.enableMouseOver();
	
	W = window.document.getElementById('canvas').width;
	H = window.document.getElementById('canvas').height;
	
	setup();
}


function setup(){
	container = new createjs.Container();
	

	//SCENERY background
	bg = new createjs.Container();
	var bmp = new createjs.Bitmap(queue.getResult("bg"));
	bg.addChild(bmp);
	canvas.addChildAt(bg, 0);
	
	//create category title
	var bg_txt = new createjs.Shape();
	bg_txt.graphics.beginFill('#6e7e8e').drawRoundRect(150, 10, 250, 70,5,5,5,5);
	canvas.addChild(bg_txt);
	
	var txt = new createjs.Text();
	canvas.addChild(txt);
	txt.set({
		text: catalog[0][0],
		font: '30px comic3',
		color: '#0ff',
		textAlign: 'center'
	});
	txt.x = 275;
	txt.y = 10;
	
	
	nbrOfQuestions = checkCatAvailable();
	var txtChallenges = new createjs.Text();
	canvas.addChild(txtChallenges);
	txtChallenges.set({
		text: nbrOfQuestions +' questions challenge',
		font: '16px comic2',
		color: '#fff',
		textAlign: 'center'
	});
	txtChallenges.x = 650;
	txtChallenges.y = 60;
	
	//category game begins...
	currentScore = 0;

	
	createTextScore();
	startGame();
	
	canvas.addChild(container);
	
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", handleTickApp1);
	
	
	createjs.Tween.get(txtChallenges).wait(1000).to({x:275}, 500, createjs.Ease.bounceOut).to({alpha:0}, 200).to({alpha:1}, 200).to({alpha:0}, 200).to({alpha:1}, 200);
	
	createNavigationIcons();
}

function checkCatAvailable(){
	var catLimitIndex = data_categories.indexOf(2) -1;
	console.log('Categories unlocked: ', catLimitIndex +1);
	
	category_totalQ = [];
	for(var i=0;i<=catLimitIndex;i++){
		category_totalQ.push.apply(category_totalQ, catalogLibrary[1][i]);
	}
	console.log('total questions unlocked: ', category_totalQ.length);
		
	return category_totalQ.length;
}

function handleTickApp1(event) {
	if (!event.paused) {
		var currentDate = new Date();
		if(star && !perfectScore){
			star.rotation += 2;
			star.y = 28 + (Math.cos(currentDate.getTime() * 0.002) * 10);
		}
		canvas.update();
	}
}





