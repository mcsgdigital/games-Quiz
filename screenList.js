function createListBackground(event){
	for(var i=0;i < container.numChildren;i++){
		if(container.getChildAt(i).name == "button"){
			container.getChildAt(i).cursor = null;
		}
	}

	listContainer = new createjs.Container();
	canvas.addChild(listContainer);
	var bg = new createjs.Shape();
	bg.graphics.beginFill('#000').drawRect(0, 0, W, H);
	listContainer.addChild(bg);
	//list screen background
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#cceeaa').drawRoundRect(25, 90, 500, 260,5,5,5,5);
	listContainer.addChild(rect);
	var rect2 = new createjs.Shape();
	rect2.graphics.beginFill('#fff').drawRoundRect(40, 100, 470, 40,5,5,5,5);
	listContainer.addChild(rect2);
	rect2.name = "rectWhite";
	//screen title
	var txtListDescription = new createjs.Text();
	listContainer.addChild(txtListDescription);
	txtListDescription.set({
		text: 'Choose a category',
		font: '18px comic1',
		color: '#000',
		textAlign: 'center'
	});
	txtListDescription.x = 260;
	txtListDescription.y = 110;
	txtListDescription.name = "txt_listDesc";
	//screen title
	var txt = new createjs.Text();
	listContainer.addChild(txt);
	txt.set({
		text: 'LISTING',
		font: '36px comic1',
		color: '#f2810d',
		textAlign: 'center'
	});
	txt.x = 260;
	txt.y = 20;
	
	if(mode != "list"){
		//saving last image before opening listing window
		saveLastImage = flag._animation.name;
	}
	mode = "list";
	
	var closeButton = createCloseButton(490, 10, listContainer, handleClickListClose);
	createList();
}

function createDescriptionBox(message){
	//text description background
	var rectDesc = new createjs.Shape();
	rectDesc.graphics.beginFill('#7e7e7e').drawRoundRect(100, 110, 400, 180,5,5,5,5);
	listContainer.addChild(rectDesc);
	var rectDesc2 = new createjs.Shape();
	rectDesc2.graphics.beginFill('#fff').drawRoundRect(250, 120, 240, 160,5,5,5,5);
	listContainer.addChild(rectDesc2);
	
	list_descFlag = new createjs.Text();
	listContainer.addChild(list_descFlag);
	list_descFlag.set({
		text: message,
		font: '18px comic1',
		color: '#000',
		textAlign: 'center'
	});
	list_descFlag.x = 175;
	list_descFlag.y = 130;
}

function createList(){
	//console.log('Categories List: ', categories);
	for(var n = 0; n < catalogLibrary[0].length;n++){
		createListButton(n);
	}
	
}
function createListButton(n){
	//console.log(list);
	var btn = new createjs.Container();
	listContainer.addChild(btn);
	btn.setBounds(0, 0, 50, 50);
	var rect = new createjs.Shape();
	rect.graphics.beginFill('#01db1b').drawRoundRect(0, 0, 50, 50,5,5,5,5);
	btn.addChild(rect);
	var txt = new createjs.Text();
	btn.addChild(txt);
	
	txt.set({
		text: catalogLibrary[0][n],
		font: '18px comic1',
		color: '#000',
		textAlign: 'center'
	});
	txt.x = 25;
	txt.y = 25;
	
	btn.x = 40 + (n * 60) - (Math.floor(n / 8) * 480);
	btn.y = 160 + (Math.floor(n / 8) * 70);
	btn.name = catalogLibrary[0][n];
	btn.cursor = 'pointer';
	
	if(data_categories[n] == 2){
		var padlock = new createjs.Bitmap(queue.getResult("padlock"));
		btn.addChild(padlock);
		padlock.regX = 15;
		padlock.regY = 15;
		padlock.x = 25;
		padlock.y = 0;
		var rect = new createjs.Shape();
		rect.graphics.beginFill('#ff0').dr(0, 0, 30, 30);
		btn.addChild(rect);
		rect.alpha = 0.01;
		padlock.hitArea  = rect;
	} else if(data_categories[n] == 1){
		var newItem = new createjs.Bitmap(queue.getResult("new"));
		btn.addChild(newItem);
		newItem.regX = 25;
		newItem.regY = 25;
		newItem.x = 25;
		newItem.y = 25;
		var rect = new createjs.Shape();
		rect.graphics.beginFill('#ff0').dr(0, 0, 30, 30);
		btn.addChild(rect);
		rect.alpha = 0.01;
		newItem.hitArea  = rect;
	}
	
	
	btn.addEventListener('click', handleClickList);
}

function handleClickList(event){
	event = event || window.event; // IE-ism
	
	if(mode == "list"){
		var selected = event.target.parent.children[1].text;

		var catLimitIndex = data_categories.indexOf(2) -1;
		if(catalogLibrary[0].indexOf(selected) <= catLimitIndex){//check if this category is available
			//remove 'new' tag
			var idx = catalogLibrary[0].indexOf(selected);
			if(data_categories[idx] == 1){
				data_categories[idx] = 0;
			}

			var firstItem = getFirstItem(selected);
			console.log('First item in: ', selected, ' is ', catalog[0][1][firstItem][1], ' cat. No.:', firstItem);
			
			category_list = [];
			for(var i = 0; i < catalog[0][1].length;i++){
				var str = catalog[0][1][i][1].toString();
				if(str.substring(0,1) == selected){
					category_list.push(str);
				}
			}
			console.log('List: ', category_list);
			
			//var index = category_list.indexOf(selected);
			//console.log(index);
			
			var selectedCategory = event.target.parent;
			selectedCategory.removeEventListener('click', handleClickList);
			selectedCategory.cursor = 'null';
			createjs.Tween.get(selectedCategory).to({x: 40, y: 125}, 500).call(function(){
				category_nbr = 0;
				canvas.addChild(flag);
				flag.scaleX = flag.scaleY = .5;
				flag.x = 175;
				flag.y = 200;
				createDescriptionBox(null);
				showCategoryList(firstItem);
				createNavigation();
			});
			for(var i = 0; i < listContainer.numChildren;i++){
				
				if(listContainer.getChildAt(i).name != null && listContainer.getChildAt(i).name != selectedCategory.name){
					var thing = listContainer.getChildAt(i);
					thing.removeEventListener('click', handleClickList);
					thing.cursor = 'null';
					createjs.Tween.get(thing).to({alpha: 0}, 200);
				}
				if(listContainer.getChildAt(i).name == "rectWhite"){
					createjs.Tween.get(listContainer.getChildAt(i)).to({alpha: 0}, 200);
				}
				if(listContainer.getChildAt(i).name == "txtListDescription"){
					createjs.Tween.get(listContainer.getChildAt(i)).to({alpha: 0}, 200);
				}
			}

		}
		
	}
	
}
function getFirstItem(whichLetter){
	var firstItem;
	for(var i = 0; i < catalog[0][1].length;i++){
		if(catalog[0][1][i][1].toString().substring(0,1) == whichLetter){
			firstItem = catalog[0][1][i][0];
			break;
		}
	}
	
	return firstItem;
}

function showCategoryList(item){
	
	flag.gotoAndPlay('flag_'+ item);
	list_descFlag.text = category_list[category_nbr];
	
	if(list_descFlag.text.replace(/[^a-zA-Z]/gi, "").length > 16){
		list_descFlag.set({
			text: list_descFlag.text,
			font: '14px comic1',
			color: '#000',
			textAlign: 'center',
			lineWidth: 140
		});
	} else{
		list_descFlag.set({
			text: list_descFlag.text,
			font: '18px comic1',
			color: '#000',
			textAlign: 'center'
		});
	}
	//console.log('current category item: ', item);
	
	
}

function nextItem(){
	category_nbr++;
	if(category_nbr >= category_list.length){
		category_nbr = 0;
	}
	var which;
	for(var i = 0; i < catalog[0][1].length;i++){
		var str = catalog[0][1][i][1].toString();
		if(str == category_list[category_nbr]){
			which = catalog[0][1][i][0];
		}
	}
	
	showCategoryList(which, category_nbr);
}
function lastItem(){
	category_nbr--;
	if(category_nbr < 0){
		category_nbr = category_list.length -1;
	}
	var which;
	for(var i = 0; i < catalog[0][1].length;i++){
		var str = catalog[0][1][i][1].toString();
		if(str == category_list[category_nbr]){
			which = catalog[0][1][i][0];
		}
	}
	showCategoryList(which, category_nbr);
}

function returnToListing(){
	while(listContainer.numChildren){
		listContainer.removeChildAt(0);
	}
	flag.scaleX = flag.scaleY = 1;
	flag.x = 150;
	flag.y = 200;
	
	createListBackground(null);
}

function handleClickListClose(event){
	event = event || window.event; // IE-ism
	
	event.target.removeEventListener('click', handleClickListClose);
	hideListContainer();
}
function hideListContainer(){
	while(listContainer.numChildren){
		listContainer.removeChildAt(0);
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



