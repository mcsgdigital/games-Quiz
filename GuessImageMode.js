
function startGame(){
	mode = "game";
	alreadyAsked = [];
	questions = 1;
	meterFill = 0;
	perfectScore = false;
	createMainImageHolder(150, 200);
}

function createMainImageHolder(imageX, imageY){
	var fg = new createjs.Shape();
	fg.graphics.beginFill('#fff').drawRoundRect(25, 100, 500, 250,5,5,5,5);
	canvas.addChild(fg);
	fg.alpha = .5;
	
	createQuestionsMeter();
	
	var bg_questionNbr = new createjs.Shape();
	bg_questionNbr.graphics.beginFill('#Fc6').drawCircle(520, 100, 15);
	canvas.addChild(bg_questionNbr);
	questionNbr = new createjs.Text();
	canvas.addChild(questionNbr);
	questionNbr.set({
		text: questions,
		font: '16px comic1',
		color: '#000',
		textAlign: 'center'
	});
	questionNbr.x = 518;
	questionNbr.y = 90;
	
	
	createImageCatalog(imageX, imageY);
}

function createImageCatalog(imageX, imageY){
	flags_sp = new createjs.SpriteSheet({
		framerate: 24,
		images: [queue.getResult("sp_flags")],
		frames: {width:200, height:135, count:200, regX:100, regY:67, spacing:0, margin:0},
		animations: {
			flag_0: [0],flag_1: [1],flag_2: [2],flag_3: [3],flag_4: [4],
			flag_5: [5],flag_6: [6],flag_7: [7],flag_8: [8],flag_9: [9],
			flag_10: [10],flag_11: [11],flag_12: [12],flag_13: [13],flag_14: [14],
			flag_15: [15],flag_16: [16],flag_17: [17],flag_18: [18],flag_19: [19],
			flag_20: [20],flag_21: [21],flag_22: [22],flag_23: [23],flag_24: [24],
			flag_25: [25],flag_26: [26],flag_27: [27],flag_28: [28],flag_29: [29],
			flag_30: [30],flag_31: [31],flag_32: [32],flag_33: [33],flag_34: [34],
			flag_35: [35],flag_36: [36],flag_37: [37],flag_38: [38],flag_39: [39],
			flag_40: [40],flag_41: [41],flag_42: [42],flag_43: [43],flag_44: [44],
			flag_45: [45],flag_46: [46],flag_47: [47],flag_48: [48],flag_49: [49],
			flag_50: [50],flag_51: [51],flag_52: [52],flag_53: [53],flag_54: [54],
			flag_55: [55],flag_56: [56],flag_57: [57],flag_58: [58],flag_59: [59],
			flag_60: [60],flag_61: [61],flag_62: [62],flag_63: [63],flag_64: [64],
			flag_65: [65],flag_66: [66],flag_67: [67],flag_68: [68],flag_69: [69],
			flag_70: [70],flag_71: [71],flag_72: [72],flag_73: [73],flag_74: [74],
			flag_75: [75],flag_76: [76],flag_77: [77],flag_78: [78],flag_79: [79],
			flag_80: [80],flag_81: [81],flag_82: [82],flag_83: [83],flag_84: [84],
			flag_85: [85],flag_86: [86],flag_87: [87],flag_88: [88],flag_89: [89],
			flag_90: [90],flag_91: [91],flag_92: [92],flag_93: [93],flag_94: [94],
			flag_95: [95],flag_96: [96],flag_97: [97],flag_98: [98],flag_99: [99],
			flag_100: [100],flag_101: [101],flag_102: [102],flag_103: [103],flag_104: [104],
			flag_105: [105],flag_106: [106],flag_107: [107],flag_108: [108],flag_109: [109],
			flag_110: [110],flag_111: [111],flag_112: [112],flag_113: [113],flag_114: [114]
		} 
	});
	flag = new createjs.Sprite(flags_sp, "flag_0");
	canvas.addChild(flag);
	flag.x = imageX;
	flag.y = imageY;
	
	/* var border = new createjs.Shape();
	border.graphics.beginStroke("#000");
	border.graphics.setStrokeStyle(5);
	border.graphics.drawRect(0, 0, 200, 135);
	canvas.addChild(border);
	border.x = flag.x -100;
	border.y = flag.y -67; */
	
	//graphics and catalog ready, now start game
	chooseAnItem();
}

function chooseAnItem(){
	
	
	var theOne = Math.floor(Math.random() * category_totalQ.length);
	//var theOne = Math.floor(Math.random() * catalog[0][1].length);
	//check if this item already been asked
	while(alreadyAsked.indexOf(category_totalQ[theOne]) > -1){
		theOne = Math.floor(Math.random() * category_totalQ.length);
		//theOne = Math.floor(Math.random() * catalog[0][1].length);
	} 

	var id;
	for (var i = 0; i < catalog[0][1].length; i++) {
		if(catalog[0][1][i][1] == category_totalQ[theOne]){
			id = catalog[0][1][i][0];
			break;
		}
	}
	alreadyAsked.push(theOne);
	displayImage(id);
	console.log('alreadyAsked: ', alreadyAsked);
}

function displayImage(which){
	createjs.Tween.get(flag).to({scaleX:.2,scaleY:.2}, 200).call(function(){
		showNewImage(which);
		//console.log('flag nbr.: ', which);
	});
}
function showNewImage(which){
	createjs.Tween.get(flag).to({scaleX:1,scaleY:1}, 200);
	flag.gotoAndPlay('flag_'+ which);
	createMultipleChoiceAnswers(which);
}

function createMultipleChoiceAnswers(which){
	//choose which of the 4 answers will be correct
	possibleAnswers = [];
	answers = [0,0,0,0];
	//save correct answer for future reference
	correctAnswerIndex = Math.floor(Math.random() * answers.length);
	answers[correctAnswerIndex] = 1;
	//console.log('answer is '+ (correctAnswerIndex +1));
	
	for(var i = 0; i < answers.length;i++){
		createAnswerButton(i,which,correctAnswerIndex);
	}
}

function createAnswerButton(i,whichAnswer,id){
	//console.log('buttons: ',i,whichAnswer,id);
	var btn = new createjs.Container();
	container.addChild(btn);
	btn.setBounds(0, 0, 200, 30);
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#fff').drawRoundRect(0, 0, 200, 30,5,5,5,5);
	btn.addChild(rect);
	var txt = new createjs.Text();
	btn.addChild(txt);
	
	//console.log('response: topic, allAnswers, singleAnswerGroup, answer');
	//console.log('example: FLAGS, [Andorra, France,...], [0,Andorra], ANDORRA');
	//console.log('response: ', category_totalQ[whichAnswer]);
	
	var string;
	for (var n1 = 0; n1 < catalog[0][1].length; n1++) {
		if(catalog[0][1][n1][0] == whichAnswer){
			string = catalog[0][1][n1][1];
			break;
		}
	}
	if(i == id){
		var correctId = category_totalQ.indexOf(string);
		
		possibleAnswers.push(correctId);
	} else{
		var rand = Math.floor(Math.random() * category_totalQ.length);
		while(possibleAnswers.indexOf(rand) > -1 || category_totalQ[rand] == string){
			rand = Math.floor(Math.random() * category_totalQ.length);
		} 
		string = category_totalQ[rand];
		
		possibleAnswers.push(rand);
		//console.log('possible answers: ', possibleAnswers);
	}
	
	if(string.replace(/[^A-Z]/gi, "").length > 16){
		txt.set({
			text: string,
			font: '14px comic1',
			color: '#000',
			textAlign: 'center'
		});
	} else{
		txt.set({
			text: string,
			font: '18px comic1',
			color: '#000',
			textAlign: 'center'
		});
	}
	txt.x = 100;
	txt.y = 6;
	
	btn.x = 300;
	btn.y = -100;
	btn.name = i;
	btn.cursor = 'pointer';
	btn.alpha = 0;
	
	btn.addEventListener('click', handleClickAnswer);
	
	createjs.Tween.get(btn).to({y:120 + (i * 50), alpha: 1}, 500, createjs.Ease.bounceOut);
}

function handleClickAnswer(event){
	event = event || window.event; // IE-ism
	
	if(mode == "game"){
		var selected = parseInt(event.target.parent.name) +1;
		//console.log('youclicked on: ', selected, event.target.parent.children[1].text);
		
		var str = flag._animation.name;
		var idx = str.indexOf('_') +1;
		var correctAnswer = parseInt(str.substr(idx, str.length - idx));
		//console.log('correct answer: ', correctAnswerIndex +1);
		
		var result;
		if(selected == correctAnswerIndex +1){
			event.target.parent.children[0].graphics._fill.style = '#00FF00';
			result = true;
			fillMeter();
		} else{
			event.target.parent.children[0].graphics._fill.style = '#FF0000';
			//highlight correct answer
			window.setTimeout(function(){
				container.children[correctAnswerIndex].children[0].graphics._fill.style = '#00FF00';
			}, 500);
			
			result = false;
		}
		
		updateScore(result);
		setTimeout(function(){resetChallenge();},1500);
	}
}

function resetChallenge(){
	container.removeAllChildren();
	
	if(questions == nbrOfQuestions){
		endGame();
	}else{
		questions++;
		questionNbr.text = questions.toString();
		chooseAnItem();
	}
}

function endGame(){
	//console.log('Result ', questions,'/',nbrOfQuestions);
	
	canvas.removeChild(flag);
	var txt_result = new createjs.Text();
	canvas.addChild(txt_result);
	txt_result.set({
		text: 'Result:   '+ currentScore +'/'+ nbrOfQuestions,
		font: '20px comic1',
		color: '#FF8000',
		textAlign: 'center'
	});
	txt_result.x = 260;
	txt_result.y = 200;

	//check what new category result has been unlocked
	var catLimitIndex = data_categories.indexOf(2) -1;
	var tot = 0;
	for (var i = 0; i < catLimitIndex; i++) {
		tot += catalogLibrary[2][i];
	}
	if(currentScore >= tot && catLimitIndex < data_categories.length -1){
		data_categories[catLimitIndex +1] = 1;
	}

	if(currentScore == nbrOfQuestions){
		perfectScore = true;
		starAnimation();
	}

	console.log('pass rate, data_categories: ', tot, data_categories);
	
	canvas.addEventListener('stagemousedown', restartGame);
}

function restartGame(){
	canvas.removeEventListener('stagemousedown', restartGame);
	canvas.removeAllChildren();
	
	setup();
}





