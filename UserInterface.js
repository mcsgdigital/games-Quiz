function createNavigationIcons(){
	iconInfo = new createjs.Bitmap(queue.getResult("iconInfo"));
	canvas.addChild(iconInfo);
	iconInfo.x = 420;
	iconInfo.y = 10;
	//LIST ICON
	iconList = new createjs.Container();
	canvas.addChild(iconList);
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#ff0').dr(0, 0, 40, 40);
	iconList.addChild(rect);
	rect.alpha = 0.01;
	var iconListImage = new createjs.Bitmap(queue.getResult("iconList"));
	iconList.addChild(iconListImage);
	iconList.x = 460;
	iconList.y = 10;
	iconList.setBounds(0, 0, 40, 40);
	iconList.hitArea  = rect;
	//TROPHIES ICON
	iconCup = new createjs.Container();
	canvas.addChild(iconCup);
	var rect2 = new createjs.Shape();
	rect2.graphics.beginFill('#ff0').dr(0, 0, 40, 40);
	iconCup.addChild(rect2);
	rect2.alpha = 0.01;
	var iconCupImage = new createjs.Bitmap(queue.getResult("iconCup"));
	iconCup.addChild(iconCupImage);
	iconCup.x = 500;
	iconCup.y = 10;
	iconCup.setBounds(0, 0, 40, 40);
	iconCup.hitArea  = rect2;

	
	iconList.addEventListener('click', createListBackground);
	iconCup.addEventListener('click', createTrophiesBackground);
}

function createTextScore(){
	var bg_score = new createjs.Shape();
	bg_score.graphics.beginFill('#9F81F7').drawCircle(50, 0, 80);
	canvas.addChild(bg_score);
	
	var txt_title = new createjs.Text();
	canvas.addChild(txt_title);
	txt_title.set({
		text: 'score',
		font: '16px comic1',
		color: '#000',
		textAlign: 'center'
	});
	txt_title.x = 25;
	txt_title.y = 10;
	
	txt_score = new createjs.Text();
	canvas.addChild(txt_score);
	txt_score.set({
		text: '',
		font: '48px comic1',
		color: '#ffa500',
		textAlign: 'center'
	});
	txt_score.x = 40;
	txt_score.y = 20;
	
	updateScore(false);
}
function updateScore(result){
	if(result){
		score += 1;
		currentScore +=1;
	}
	//console.log('score: ',score);
	
	txt_score.text = score;
	
}

function createNavigation(){
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#ff0').dr(0, 0, 32, 32);
	rect.alpha = 0.01;
	var navNextImage = new createjs.Bitmap(queue.getResult("nav_next"));
	nav_next = new createjs.Container();
	listContainer.addChild(nav_next);
	nav_next.addChild(navNextImage);
	nav_next.x = 300;
	nav_next.y = 300;
	nav_next.addChild(rect);
	nav_next.hitArea = rect;
	
	var rect2 = new createjs.Shape();
	rect2.graphics.beginFill('#ff0').dr(0, 0, 32, 32);
	rect2.alpha = 0.01;
	var nav_prevImage = new createjs.Bitmap(queue.getResult("nav_prev"));
	nav_prev = new createjs.Container();
	listContainer.addChild(nav_prev);
	nav_prev.addChild(nav_prevImage);
	nav_prev.x = 200;
	nav_prev.y = 300;
	nav_prev.addChild(rect2);
	nav_prev.hitArea  = rect2;
	
	var rect3 = new createjs.Shape();
	rect3.graphics.beginFill('#ff0').dr(0, 0, 32, 32);
	rect3.alpha = 0.01;
	var nav_ejectImage = new createjs.Bitmap(queue.getResult("nav_eject"));
	nav_eject = new createjs.Container();
	listContainer.addChild(nav_eject);
	nav_eject.addChild(nav_ejectImage);
	nav_eject.x = 250;
	nav_eject.y = 300;
	nav_eject.addChild(rect3);
	nav_eject.hitArea  = rect3;
	
	nav_next.addEventListener('click', nextItem);
	nav_prev.addEventListener('click', lastItem);
	nav_eject.addEventListener('click', returnToListing);
}

function createQuestionsMeter(){
	var meterGroup = new createjs.Container();
	canvas.addChild(meterGroup);
	meterGroup.x = 10;//W/2 -12;
	meterGroup.y = 122;
	meterGroup.name = 'meterGroup';

	var meter_bg = new createjs.Shape();
	meter_bg.graphics.beginFill('#f00').drawRect(2, 53, 10, 5,5,5,5,5);
	meterGroup.addChild(meter_bg);
	//meter_bg.alpha = .5;
	
	//fill
	var meterObject = new createjs.Shape();
	meterObject.graphics.beginFill('#56ea61').drawRect(2, 0, 10, 200,5,5,5,5);
	meter = new createjs.Container();
	meter.addChild(meterObject);
	meterGroup.addChild(meter);
	meter.scaleY = meterFill;
	meter.y = 200;

	
	var border = new createjs.Shape();
	border.graphics.beginStroke("#fff");
	border.graphics.setStrokeStyle(5);
	border.graphics.drawRoundRect(0, 0, 14, 202,5,5,5,5);
	meterGroup.addChild(border);
	var border2 = new createjs.Shape();
	border2.graphics.beginStroke("#000");
	border2.graphics.setStrokeStyle(2);
	border2.graphics.drawRoundRect(2, 3, 10, 196,5,5,5,5);
	meterGroup.addChild(border2);

	//star for all questions answered right
	var starGraphic2 = new createjs.Graphics();
	starGraphic2.beginFill("#fff").drawPolyStar(0, 0, 5, 5, 0.6, -90);
	star = new createjs.Shape(starGraphic2);
	meterGroup.addChild(star);
	star.alpha = .65;
	star.x = 7;
	star.y = 15;
	//starAnimation();
}

function fillMeter(){
	var factor = (200 / nbrOfQuestions) /200;
	meter.scaleY -= factor;
}

function starAnimation(){
	console.log(star);
	var starGraphic = new createjs.Graphics();
	starGraphic.beginFill("#ffa500").drawPolyStar(0, 0, 8, 5, 0.6, -90);
	var star2 = new createjs.Shape(starGraphic);
	star.parent.addChildAt(star2, star.parent.numChildren -1);
	star2.x = 7;
	star2.y = 30;

	star.graphics._fill.style = "#ff0";
	star.alpha = 1;
	star.y = 30;
	createjs.Tween.get(star).to({scaleX: 3, scaleY: 3}, 300)
							.to({scaleX: 1, scaleY: 1}, 500)
							.to({scaleX: 3, scaleY: 3}, 300)
							.to({scaleX: 1, scaleY: 1}, 500)
							.to({scaleX: 2, scaleY: 2}, 500);
	createjs.Tween.get(star2).to({scaleX: 3, scaleY: 3}, 300)
							.to({scaleX: 1, scaleY: 1}, 500)
							.to({scaleX: 3, scaleY: 3}, 300)
							.to({scaleX: 1, scaleY: 1}, 500)
							.to({scaleX: 2, scaleY: 2}, 500);

	for(var i=0; i < Math.random() *5 +18;i++){
		var littleStar = new createjs.Graphics();
		littleStar.beginFill("#fff").drawPolyStar(0, 0, 5, 5, 0.6, -90);
		ls = new createjs.Shape(littleStar);
		star.parent.addChild(ls);

		ls.x = Math.random() * 50 - 15;
		ls.y = Math.random() * 100 - 25;
		ls.alpha = 0;
		createjs.Tween.get(ls).wait(Math.random() * 20 *50).to({alpha: 1}, 200).to({alpha: 0, y: H/2}, Math.random() * 10 * 50, createjs.Ease.backIn).call(function(){
			star.parent.removeChild(ls);
		})
	}
}


function createCloseButton(X, Y, parentContainer, clickFunction){
	var closeButton = new createjs.Container();
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#ff0').dr(2, 0, 32, 36);
	closeButton.addChild(rect);
	rect.alpha = 0.01;
	var closeButtonImage = new createjs.Bitmap(queue.getResult("closeBtn"));
	closeButton.addChild(closeButtonImage);
	closeButton.setBounds(0, 0, 50, 50);
	closeButton.hitArea  = rect;
	parentContainer.addChild(closeButton);
	closeButton.x = X;
	closeButton.y = Y;

	closeButton.addEventListener('click', clickFunction);

	return closeButton;
}
