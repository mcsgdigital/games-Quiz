function createTrophiesBackground(){
	for(var i=0;i < container.numChildren;i++){
		if(container.getChildAt(i).name == "button"){
			container.getChildAt(i).cursor = null;
		}
	}
	trophiesContainer = new createjs.Container();
	canvas.addChild(trophiesContainer);
	/*var blackBg = new createjs.Shape();
	blackBg.graphics.beginFill('#000').drawRect(0, 0, W, H);
	trophiesContainer.addChild(blackBg);*/
	//SCENERY background
	var trophiesBackground = new createjs.Bitmap(queue.getResult("bg_worldMap"));
	trophiesContainer.addChild(trophiesBackground);

	//list screen background
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#cceeaa').drawRoundRect(370, 90, 150, 260,5,5,5,5);
	trophiesContainer.addChild(rect);
	rect.alpha = 0.5;
	var rect2 = new createjs.Shape();
	rect2.graphics.beginFill('#fff').drawRoundRect(380, 100, 130, 40,5,5,5,5);
	trophiesContainer.addChild(rect2);
	rect2.name = "rectWhite";
	
	//screen title
	var txt = new createjs.Text();
	trophiesContainer.addChild(txt);
	txt.set({
		text: 'WORLD ROOM',
		font: '36px comic1',
		color: '#f2810d',
		textAlign: 'center'
	});
	txt.x = 260;
	txt.y = 20;
	
	//Main display of countries on L shaped prices chart
	var chart = new createjs.Container(0);
	trophiesContainer.addChild(chart);
	var linePrices = new createjs.Shape();
	linePrices.graphics.beginFill('#fff').drawRoundRect(20, 100, 2, 250,5,5,5,5);
	chart.addChild(linePrices);
	var lineContinent = new createjs.Shape();
	lineContinent.graphics.beginFill('#fff').drawRoundRect(20, 350, 320, 2,5,5,5,5);
	chart.addChild(lineContinent);


	if(mode != "trophies"){
		//saving last image before opening listing window
		saveLastImage = flag._animation.name;
	}
	mode = "trophies";
	
	var closeButton = createCloseButton(490,10,trophiesContainer,handleClickTrophiesClose);
}


function handleClickTrophiesClose(event){
	event = event || window.event; // IE-ism
	
	event.target.removeEventListener('click', handleClickTrophiesClose);
	hideTrophiesContainer();
}

function hideTrophiesContainer(){
	while(trophiesContainer.numChildren){
		trophiesContainer.removeChildAt(0);
	}
	
	flag.scaleX = flag.scaleY = 1;
	flag.x = 150;
	flag.y = 200;
	var idx = saveLastImage.indexOf('_') +1;
	var correctAnswer = parseInt(saveLastImage.substr(idx, saveLastImage.length - idx));
	flag.gotoAndPlay('flag_'+ correctAnswer);
	
	for(var i=0;i < container.numChildren;i++){
		if(container.getChildAt(i).name == "button"){
			container.getChildAt(i).cursor = 'pointer';
		}
	}
	
	mode = "game";
}