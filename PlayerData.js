
function setInitialData(){
	firstTimePlayed = false;
	
	data_categories = [];
	for(var i = 0; i < catalogLibrary[0].length;i++){
		data_categories.push(2);
	}
	data_categories[0] = 1;

	score = 0;
}

	
//data_categories = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];