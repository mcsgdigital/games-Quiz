
function populateCatalog(){
	catalog = [];
	
	catalog = [ 
                        ['WORLD FLAGS',
                            [
                                [0,'Andorra','AD'],
                                [1,'United Arab Emirate','AE'],
                                [2,'Afghanistan','AF'],
                                [3,'Antigua and Barbuda','AG'],
                                [4,'Anguilla','AI'],
                                [5,'Armenia','AM'],
                                [6,'Netherlands Antilles','AN'],
                                [7,'Angola','AO'],
                                [8,'Antartica','AQ'],
                                [9,'Argentina','AR'],
                                [10,'American Samoa','AS'],
                                [11,'Austria','AT'],
                                [12,'Australia','AU'],
                                [13,'Aruba','AW'],
                                [14,'Azerbaijan','AZ'],
                                [15,'Bosnia and Herzegovina',''],
                                [16,'Barbados','BB'],
                                [17,'Bangladesh','BD'],
                                [18,'Belgium','BE'],
                                [19,'Burkina Faso','BF'],
                                [20,'Bulgaria','BG'],
                                [21,'Bahrain','BH'],
                                [22,'Burundi','BI'],
                                [23,'Benin','BJ'],
                                [24,'Bermuda','BM'],
                                [25,'Brunei','BN'],
                                [26,'Bolivia','BO'],
                                [27,'Brazil','BR'],
                                [28,'The Bahamas','BS'],
                                [29,'Bhutan','BT'],
                                [30,'Bouvet Island','BV'],
                                [31,'Botswana','BW'],
                                [32,'Belarus','BY'],
                                [33,'Belize','BZ'],
                                [34,'Canada','CA'],
                                [35,'Cocos Island','CC'],
                                [36,'DR Congo','CD'],
                                [37,'C. African Replubican','CF'],
                                [38,'Congo (Brazzaville)','CG'],
                                [39,'Switzerland','CH'],
                                [40,'Cote d`Ivoire','CI'],
                                [41,'Cook Islands','CK'],
                                [42,'Chile','CL'],
                                [43,'Cameroon','CM'],
                                [44,'China','CN'],
                                [45,'Colombia','CO'],
                                [46,'Costa Rica','CR'],
                                [47,'Cuba','CU'],
                                [48,'Cape Verde','CV'],
                                [49,'Christmas Island','CX'],
                                [50,'Cyprus','CY'],
                                [51,'Czech Republic','CZ'],
                                [52,'Germany','DE'],
                                [53,'Djibouti','DJ'],
                                [54,'Denmark','DK'],
                                [55,'Dominica','DM'],
                                [56,'The Dominican Republic','DO'],
                                [57,'Algeria','DZ'],
                                [58,'Ecuador','EC'],
                                [59,'Estonia','EE'],
                                [60,'Egypt','EG'],
                                [61,'Western Sahara','EH'],
                                [62,'Eritrea','ER'],
                                [63,'Spain','ESf'],
                                [64,'Ethiopia','ET'],
                                [65,'Finland','FI'],
                                [66,'Fiji','FJ'],
                                [67,'Falkland Islands','FK'],
                                [68,'Fed. States of Micronesia','FM'],
                                [69,'Faroe Islands','FO'],
                                [70,'France','FR'],
                                [71,'Gabon','GA'],
                                [72,'United Kingdom','GB'],
                                [73,'Grenada','GD'],
                                [74,'Georgia','GE'],
                                [75,'Guernsey','GG'],
                                [76,'Ghana','GH'],
                                [77,'Gibraltar','GI'],
                                [78,'Greenland','GL'],
                                [79,'Gambia','GM'],
                                [80,'Guinea','GN'],
                                [81,'Equatorial Guinea','GQ'],
                                [82,'Greece','GR'],
                                [83,'Georgia and Sandwich Islands',''],
                                [84,'Guatemala','GT'],
                                [85,'Guam','GU'],
                                [86,'Guinea Bisseau','GW'],
                                [87,'Guyana','GY'],
                                [88,'Hong Kong','HK'],
                                [89,'Albania','AL'],
                                [90,'Honduras','HN'],
                                [91,'Croatia','HR'],
                                [92,'Haiti','HT'],
                                [93,'Hungary','HU'],
                                [94,'Indonesia','ID'],
                                [95,'Ireland','IE'],
                                [96,'Israel','IL'],
                                [97,'Isle of Man','IM'],
                                [98,'India','IN'],
                                [99,'British Indian Ocean','IO'],
                                [100,'Iraq','IQ'],
                                [101,'Iran','IR'],
                                [102,'Iceland','IS'],
                                [103,'Italy','IT'],
                                [104,'Jersey','JE'],
                                [105,'Jamaica','JM'],
                                [106,'Jordan','JO'],
                                [107,'Japan','JP'],
                                [108,'Kenya','KE'],
                                [109,'Kyrgyzstan','KG'],
                                [110,'Cambodia','KH'],
                                [111,'Kiribati','KI'],
                                [112,'Comoros','KM'],
                                [113,'St. Kitts and Nevis','KN'],

                                [130,'Montenegro','ME'],
                                [131,'Madasgascar','MG'],
                                [132,'Marshall Islands','MH'],
                                [133,'Macedonia','MK'],
                                [134,'Mali','ML'],
                                [135,'Burma','MM'],
                                [136,'Mongolia','MN'],
                                [137,'Macau','MO']
                            ]
                        ]
			     ];
}

function sortCatalog(){
	var args = [];
	//get list by letters in alphabetical order [A,B,C,...,'']
	var categories = [];
	var catItemsArray = [];
	
	for(var i = 0; i < catalog[0][1].length;i++){
		var str = catalog[0][1][i][1].toString();
		var firstLetter = str.substring(0,1);
		
		if(categories.indexOf(firstLetter) == -1){
			categories.push(firstLetter);
			
			
			var categoryObjects = [];
			for(var i2 = 0; i2 < catalog[0][1].length;i2++){
				var str2 = catalog[0][1][i2][1].toString();
				//console.log('info: ', str2);
				if(str2.substring(0,1) == firstLetter){
					categoryObjects.push(str2);
				}
			}
			catItemsArray.push(categoryObjects);
		}
		
	}
	categories.sort();
	catItemsArray.sort();
	
	//get percentages
	var percentage = [];
	for(var i3 = 0; i3 < catItemsArray.length;i3++){
		var pct = Math.ceil(catItemsArray[i3].length / 100 * 75);
		percentage.push(pct);
	}
	
	args.push(categories);
	args.push(catItemsArray);
	args.push(percentage);
	
	//console.log('args[0] categories: '+ args[0]);//categories
	//console.log('args[1] items: '+ args[1]);//items in category
	//console.log('args[2] percentage: '+ args[2]);//pass percentage to unlock
	
	
	return args;
}
