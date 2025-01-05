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

function updatePortraitSE2(diy,ois){
    var portrait;
    try{portrait = ois.readObject();}catch(err){portrait = null;}
    while(portrait != null){
        debug(1,'onRead: old portrait: '+portrait.getBaseKey());
        baseKey = String(portrait.getBaseKey());
        switch(String(baseKey)){
        case 'Portrait': case 'PortraitBack':
        case 'Collection': case 'CustomSphere': case 'EncounterSet':
        case 'EncounterSet1': case 'EncounterSet2':
        case 'EncounterSet3': case 'EncounterSet4': case 'EncounterSet5':
            key = baseKey;
            break;
        case 'Pack-Portrait': case 'Pack-Collection':
            key = baseKey.replace('Pack-','');
            break;
        case 'UsedSets-EncounterSet1': case 'UsedSets-EncounterSet2':
        case 'UsedSets-EncounterSet3': case 'UsedSets-EncounterSet4':
        case 'UsedSets-EncounterSet5':
            key = baseKey.replace('UsedSets-','');
            debug(1,'onRead: '+baseKey+': '+$(baseKey));
            break;
        case Card+'-Portrait': case Card+'-PortraitBack':
        case Card+'-Collection': case Card+'-EncounterSet': case Card+'-CustomSphere':
        case Card+'-EncounterSet1': case Card+'-EncounterSet2':
        case Card+'-EncounterSet3': case Card+'-EncounterSet4':
        case Card+'-EncounterSet5':
            key = baseKey.replace(Card+'-','');
            break;
        case Card+'-UsedSets-EncounterSet1': case Card+'-UsedSets-EncounterSet2':
        case Card+'-UsedSets-EncounterSet3': case Card+'-UsedSets-EncounterSet4':
        case Card+'-UsedSets-EncounterSet5':
            key = baseKey.replace(Card+'-UsedSets-','');
            break;
        case 'Sphere':
            key = 'CustomSphere';
            break;
        case Card+'-Template-CustomSphere':
            key = baseKey.replace(Card+'-Template-','');
            break;
        default:
            throw new Error('onRead: portrait load failed: '+portrait.getBaseKey());
        }
        debug(1,'updatePortraitBaseKey: '+Card+'-'+key);
        if((diy.version < 3)&&((key == 'Portrait')||(key == 'PortraitBack'))){
            portrait.setPanX(portrait.getPanX()-14);
            portrait.setPanY(portrait.getPanY()+14);
            portrait.setScale(portrait.getScale()+0.05);
        }
        PortraitList[PortraitList.indexOf(key)] = DefaultPortrait(
            Card+'-'+key,
            portrait
        );
        try{portrait = ois.readObject();}catch(err){portrait = null;}
    }
    for(let i = 0;i<PortraitList.length;i++){
        key = PortraitList[i];
        if(PortraitList[i]==null){
            debug(1,'onRead: old card: create portrait: '+key);
            debug(1,'onRead: old card: portrait '+diy.settings.get(Card+'-'+key+'-portrait-template',''));
            debug(1,'onRead: old card: region: '+diy.settings.get(Card+'-'+key+'-portrait-clip-region',''));
            switch(key){
            case 'Portrait':
            case 'PortraitBack':
                PortraitList[i] = new DefaultPortrait(diy,Card+'-'+key,true);
                PortraitList[i].backgroundFilled = true;
                PortraitList[i].clipping = true;
                break;
            case 'PortraitV': case 'PortraitPromo':
                PortraitList[i] = new DefaultPortrait(PortraitList[PORTRAIT],Card+'-'+key);
                PortraitList[i].backgroundFilled = true;
                break;
            default:
                PortraitList[i] = new DefaultPortrait(diy,Card+'-'+key,false);
                PortraitList[i].backgroundFilled = false;
                PortraitList[i].clipping = true;
            }
            if(diy.settings.get(Card+'-'+key+'-portrait-template','')==''){
                diy.settings.set(
                    Card+'-'+key+'-portrait-template',
                    'TheLordOfTheRingsLCG/image/empty1x1.png'
                );
            }
            if(diy.settings.get(Card+'-'+key+'-portrait-rotation','')==''){
                diy.settings.set(
                    Card+'-'+key+'-portrait-rotation',
                    0
                );
            }
            PortraitList[i].installDefault();
        }
    }
    for(let i = 0;i<PortraitList.length;i++){
        debug('onRead: old card: PortraitList: '+i+': '+PortraitList[i].getBaseKey());
    }
}



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
