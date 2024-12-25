/* DON'T change the order of these lists or icons and templates won't be read in the correct order*/
const EncounterSetIDs = new Array(
	'CustomIcon','EmptyIcon','PassageThroughMirkwood','SpidersOfMirkwood','DolGuldurOrcs','JourneyDownTheAnduin',
	'SauronsReach','Wilderlands','EscapeFromDolGuldur','HuntForGollum','ConflictAtTheCarrock','AJourneyToRhosgobel',
	'TheHillsOfEmynMuil','TheDeadMarshes','ReturnToMirkwood','EmptyIcon','IntoThePit','TheSeventhLevel','FlightFromMoria',
	'PlunderingGoblins','TwistsAndTurns','DeepsOfMoria','HazardsOfThePit','MistyMountains','GoblinsOfTheDeep','RedhornGate','RoadToRivendell',
	'TheWatcherInTheWater','TheLongDark','FoundationsOfStone','ShadowAndFlame','EmptyIcon','WeMustAwayEreBreakOfDay',
	'WesternLands','OverTheMistyMountainsGrim','MistyMountainGoblins','TheGreatGoblin','DungeonsDeepAndCavernsDim','EmptyIcon',
	'TheMassingAtOsgiliath','TheBattleOfLakeTown','EmptyIcon','PerilInPelargir','StreetsOfGondor','Brigands','IntoIthilien',
	'BroodingForest','CreaturesOfTheForest','Southrons','TheSiegeOfCairAndros','MordorElite','RavagingOrcs','EmptyIcon','FliesAndSpiders',
	'TheLonelyMountain','TheBattleOfFiveArmies','WilderlandsHobbit','EmptyIcon','TheStewardsFear','TheDruadanForest','EncounterAtAmonDin',
	'TheAssaultOnOsgiliath','TheBloodOfGondor','TheMorgulVale','EmptyIcon'
);
const DividerListIDs = new Array('Leadership','Lore','Spirit','Tactics','Neutral','Standard');
const SphereListIDs = new Array('Leadership','Lore','Spirit','Tactics','Neutral','Baggins');
//
function replaceTags(text){
	text = String(text).replace(/<tr>/g,'<t>');
	text = String(text).replace(/<\/tr>/g,'</t>');
	text = String(text).replace(/<uq>/g,'<uni>');
	text = String(text).replace(/<rle>/g,'<lea>');
	text = String(text).replace(/<rlo>/g,'<lor>');
	text = String(text).replace(/<rsp>/g,'<spi>');
	text = String(text).replace(/<rta>/g,'<tac>');
	text = String(text).replace(/<ss>/g,'<sha>');
	return text;
}
function updateAdditionalIcon(string){
	debug('updateAdditionalIcon: in: '+string);
	string = string.replace(/LotR\/icons\//i,'');
	string = string.replace(/.png/i,'');
	if(string == ''){string = 'EmptyIcon';}
	if(string == 'MassingAtOsgiliath'){string = 'TheMassingAtOsgiliath';}
	if(EncounterSetIDs.indexOf(string) == -1){string = 'EmptyIcon';}
	debug('updateAdditionalIcon: out: '+string);
	return string;
}
function updateOldStat(stat){
	debug('updateOldStat: in: '+stat);
	stat = removeTags(stat);
	stat = stat.replace(/ /g,'');
	switch(String(stat)){
	case '-': stat = 'minus'; break;
	case 'X': case 'x': stat = 'X'; break;
	}
	debug('updateOldStat: out: '+stat);
	return stat;
}
function removeOldSettings(diy){if(String($LRL-dontDelete) != 'yes'){
	var resetList = diy.settings.getKeySet();
	resetList = String(resetList).replace(/\[/g,'');
	resetList = String(resetList).replace(/\]/g,'');
	resetList = String(resetList).replace(/, /g,',');
	resetList = String(resetList).split(',');
	resetList = resetList.sort();
	var protectList = new Array(
		'Template','Difficulty',
		'Name','NameBack','Collection','EncounterSet','EncounterSet1',
		'EncounterSet2','EncounterSet3','EncounterSet4','EncounterSet5',
		'Adventure','Artist','ArtistBack','Attack','Rules','RulesBack',
		'Body','BodyBack','Collection','CollectionInfo','Sphere',
		'CollectionNumber','Copyright','Condition','ConditionBack',
		'Cycle','Defense','EncounterSetNumber','EncounterSetTotal',
		'Engagement','Flavour','FlavourBack','GameName','HitPoints',
		'Keyword','KeywordBack','OptionLeft','OptionRight','Progress',
		'ResourceCost','Shadow','Stage','Story','StoryBack','Subtype',
		'Threat','ThreatCost','Trait','Type','Willpower','Unique','game',
		'UsedSets-EncounterSet1','UsedSets-EncounterSet2','UsedSets-EncounterSet3',
		'UsedSets-EncounterSet4','UsedSets-EncounterSet5','ObjectiveType'
	);
	for( let index = 0; index < resetList.length ; index++ ){
		if(protectList.indexOf(resetList[index]) == -1){
			diy.settings.reset(resetList[index]);
		}
	}
}}
function onReadV2(diy,ois){
	diy.extensionName = 'TheLordOfTheRingsLCG.seext';
	diy.bleedMargin = 0;
	diy.portraitKey = Card+'-Portrait'; 
	$game = 'LRL';
	$Name = diy.name;
	$Name = String($Name).replace('<uq>','<uni>');
	$Name = String($Name).replace('<image \'res://LotR/templates/Unique.png\' 0.26>','<uni>');
	$OptionRight=$VictoryPoints;
	$Artist = String($Artist).replace('Illus. ','');
	$Artist = String($Artist).replace('Illus.','');
	$Artist = String($Artist).replace('Ilus. ','');
	$Artist = String($Artist).replace('Ilus.','');
	$Artist = removeTags($Artist);
	$Copyright=$Company;
	$Collection = 'StrangeEonsIcon';
	$CollectionInfo=$CardNumber;
	$CollectionNumber = '0';
	if(String($CollectionInfo).search("Expansionsymb") != -1){
		let string = $CollectionInfo;
		string = string.substring(string.search("Expansionsymb")+String("Expansionsymb").length);
		string = string.substring(0,string.search(/.png/i));
		debug('getCollection: CollectionInfo in: '+string);
		switch(String(string)){
		case 'Core': $Collection = 'CoreSet'; break;
		case 'POD': $Collection = 'TheMassingAtOsgiliath'; break;
		case 'Core': $Collection = 'CoreSet'; break;
		case '_Hobbit1': $Collection = 'OverHillAndUnderHill'; break;
		default: $Collection = string; break;
		}
		debug('getCollection: Collection out: '+$Collection);
		string = $CollectionInfo;
		string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
		while(string.search(' ') == 0){string = string.replace(' ','');}
		if(Number(string) == NaN){
			$CollectionInfo = string;
			$CollectionNumber = '0';
		}else{
			$CollectionInfo = '';
			$CollectionNumber = string;
		}
		debug('getCollection: CollectionInfo out: '+$CollectionInfo);
		debug('getCollection: CollectionNumber out: '+$CollectionNumber);
	}
	switch(Card){
	case 'Ally': case 'Attachment': case 'Event': case 'Hero': case 'Treasure':
		$Template=SphereListIDs[Number($SphereNr)-1];	
		debug('SphereNr: '+$SphereNr);
		debug('Template: '+$Template);
		break;
	case 'Enemy': case 'Location': case 'Treachery': case 'Objective': case 'ObjectiveAlly':
		$Template='Standard';
		break;
	case 'Divider':
		$Template=SphereListIDs[Number($PicNr)-1];	
		break;
	case 'Quest':
		$Template='Standard';
		if($CustomEncounterIcon != ''){
			$Quest-EncounterSet-portrait-template = $CustomEncounterIcon;
		}
		$EncounterSet1 = updateAdditionalIcon($ScenarioFront1);
		$EncounterSet2 = updateAdditionalIcon($ScenarioFront2);
		$EncounterSet3 = updateAdditionalIcon($ScenarioFront3);
		$EncounterSet4 = updateAdditionalIcon($ScenarioFront4);
		$EncounterSet5 = updateAdditionalIcon($ScenarioFront5);
	}
	switch(Card){
	case 'Enemy': case 'Location': case 'Treachery': case 'Quest':
	case 'Objective': case 'ObjectiveAlly': case 'Divider': case 'Treasure':
		if($CustomEncounterIcon != ''){
			diy.settings.set(Card+'-EncounterSet-portrait-template',$CustomEncounterIcon);
		}
		$EncounterSet = EncounterSetIDs[Number($EncounterSetNumber)-1];
		if($EncounterSet == ''){$EncounterSet = 'EmptyIcon';}
	}
	switch(Card){
	case 'Enemy':
		$Engagement = updateOldStat($EngagementCost);
		debug('Engagement: '+$EngagementCost+' > '+$Engagement);
		break;
	case 'Ally': case 'Attachment': case 'Event': case 'Treasure':
		let oldRC = $ResourceCost;
		$ResourceCost = updateOldStat($ResourceCost);
		debug('ResourceCost: '+oldRC+' > '+$ResourceCost);
		break;
	case 'Hero':
		let oldTC = $ThreatCost;
		$ThreatCost = updateOldStat($ThreatCost);
		debug('ThreatCost: '+oldTC+' > '+$ThreatCost);
		break;
	case 'Quest':
		let oldStage = $Stage;
		$Stage = updateOldStat($Stage);
		debug('Stage: '+oldStage+' > '+$Stage);
	}
	switch(Card){
	case 'Enemy': case 'Location':
		if(diy.settings.get('ThreatStrength','') != ''){$Threat = $ThreatStrength;}
		let oldThreat = $Threat;
		$Threat = updateOldStat(oldThreat);
		debug('Threat: '+oldThreat+' > '+$Threat);
		break;
	case 'Ally': case 'Hero': case 'ObjectiveAlly':
		$Willpower = updateOldStat($WillpowerStrength);
		debug('Willpower: '+$WillpowerStrength+' > '+$Willpower);
		break;
	case 'Quest': case 'Location':
		$Progress = updateOldStat($RequiredProgress);
		debug('Progress: '+$RequiredProgress+' > '+$Progress);
	}
	switch(Card){ case 'Enemy': case 'Ally': case 'Hero': case 'ObjectiveAlly':
		$Attack = updateOldStat($AttackStrength);
		debug('Attack: '+$AttackStrength+' > '+$Attack);
		$Defense = updateOldStat($DefenseStrength);
		debug('Defense: '+$DefenseStrength+' > '+$Defense);
		let oldHP = $HitPoints;
		$HitPoints = updateOldStat($HitPoints);
		debug('HitPoints: '+oldHP+' > '+$HitPoints);
	}
	switch(Card){
	case 'Quest': case 'Objective': case 'ObjectiveAlly':
		$Adventure = diy.settings.get('Scenario','');
		debug('Adventure: '+$Scenario+' > '+$Adventure);
		break;
	}
	switch(Card){
	case 'Objective': case 'ObjectiveAlly':
	case 'Enemy': case 'Location': case 'Treachery':
		debug('EncounterSetNumber: in: '+$NumberInEncounterSet);
		$EncounterSetNumber = diy.settings.get('NumberInEncounterSet','0');
		debug('EncounterSetNumber: out: '+$EncounterSetNumber);
		break;
	}
	if(Card == 'Quest'){
		$Rules = replaceTags($TextFront);
		debug('Rules: '+$TextFront+' > '+$Rules);
		$RulesBack = replaceTags($TextBack);
		debug('Rules: '+$TextBack+' > '+$Rules);
	}else{
		$Rules = replaceTags($Text);
		debug('Rules: '+$Text+' > '+$Rules);
	}
	switch(Card){
	case 'Ally': case 'Attachment': case 'Event': case 'Hero': case 'Treasure':
	case 'Enemy': case 'Location': case 'Treachery': case 'Objective': case 'ObjectiveAlly':
		$Type = '';
	}
	removeOldSettings(diy);
}
