function updateIconSetting(icon,diy){
	switch(icon){
	case COLLECTION: item = 'Collection'; break;
	case ENCOUNTERSET: item = 'EncounterSet'; break;
	case ENCOUNTERSET1: item = 'EncounterSet1'; break;
	case ENCOUNTERSET2: item = 'EncounterSet2'; break;
	case ENCOUNTERSET3: item = 'EncounterSet3'; break;
	case ENCOUNTERSET4: item = 'EncounterSet4'; break;
	case ENCOUNTERSET5: item = 'EncounterSet5'; break;
	default: throw new Error ('INVALID ICON: '+PortraitList[icon]);
	}
	debug('onRead: '+item+': in: '+diy.settings.get(item,''));
	switch(String(diy.settings.get(item,''))){
	case 'CustomSet': case 'CustomCollection':  case 'UseCustom':
		diy.settings.set(item,'CustomIcon'); 
		break;
	case 'EmptySet': case 'EmptyCollection': 
		diy.settings.set(item,'EmptyIcon'); 
		break;
	case 'StrangeEonsSet': case 'StrangeEonsCollection': 
		diy.settings.set(item,'StrangeEonsIcon'); 
		break;
	case '': 
		diy.settings.set(item,'EmptyIcon'); 
		break;
	}
	debug('onRead: '+item+': out: '+$(item));
}

function replaceTags(text){
	text = String(text).replace(/<tr>/g,'<t>');
	text = String(text).replace(/<\/tr>/g,'</t>');
	return text;
}

function removeOldSettings(diy){
    if(String($LRL-dontDelete) != 'yes'){
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
    		'UsedSets-EncounterSet4','UsedSets-EncounterSet5'
    	);
    	for( let index = 0; index < resetList.length ; index++ ){
    		if(protectList.indexOf(resetList[index]) == -1){
    			diy.settings.reset(resetList[index]);
    		}
    	}
    }
}

function traslateSetting(diy,oldSetting,newSetting,defaultValue,preserveNewSetting){
    debug(5,'\ntraslateSetting');
    debug(1,'\toldSetting: '+oldSetting+': '+diy.settings.get(oldSetting,'empty'));
    debug(1,'\tnewSetting: '+newSetting+': '+diy.settings.get(newSetting,'empty'));
    if(defaultValue === null) defaultValue = '';
    debug(1,'\tdefaultValue: '+defaultValue);
    //if(preserveNewSetting === null) preserveNewSetting = false;
    //debug(1,'\tpreserveNewSetting: '+preserveNewSetting);
    
    diy.settings.set(newSetting,diy.settings.get(oldSetting,defaultValue));    
/*    
    if(preserveNewSetting === true){
        if(diy.settings.get(newSetting,null) === null){
            debug(1,'\t'+newSetting+' undefined');    
            diy.settings.set(newSetting,diy.settings.get(oldSetting,defaultValue));
        }else{
            debug(1,'\t'+newSetting+' preserved');    
        }
    }else{
        diy.settings.set(newSetting,diy.settings.get(oldSetting,defaultValue));    
    }
*/
}

function checkStatOnMinus(diy,stat){
    debug(0,'\tcheckStatOnMinus:'+stat);
    if(diy.settings.get(stat,null) == 'minus'){
        debug(0,'\t\tChange from minus to -');
        diy.settings.set(stat,'-');
    }
}

function checkBaseKey(portrait, diy){
    debug(5,'\ncheckBaseKey');
    let baseKey = String(portrait.getBaseKey());
    let key = '';
    debug(1,'\tBaseKey: '+baseKey);
    
    switch(baseKey){
    case 'Sphere':
    case 'CustomSphere': 
    case Card+'-CustomSphere':
    case Card+'-Template-CustomSphere':
        key = 'SphereIcon';
        break;
    case 'RulesCard-Portrait': 
    case 'RulesCard-Collection': 
        key = baseKey.replace('RulesCard-','');
        break;
    case 'RulesCard-EncounterSet': 
    case 'RulesCard-EncounterSet1': 
    case 'RulesCard-EncounterSet2':
    case 'RulesCard-EncounterSet3': 
    case 'RulesCard-EncounterSet4':
    case 'RulesCard-EncounterSet5':
        key = baseKey.replace('RulesCard-EncounterSet','Encounterset');
        break;
    case 'Set-Portrait': 
    case 'Set-Collection': 
        key = baseKey.replace('Set-','');
        break;
    case 'Set-EncounterSet': 
    case 'Set-EncounterSet1': 
    case 'Set-EncounterSet2':
    case 'Set-EncounterSet3': 
    case 'Set-EncounterSet4':
    case 'Set-EncounterSet5':
        key = baseKey.replace('Set-EncounterSet','Encounterset');
        break;
    case 'Pack-Portrait': 
    case 'Pack-Collection':
        key = baseKey.replace('Pack-','');
        break;
    case 'UsedSets-EncounterSet1': 
    case 'UsedSets-EncounterSet2':
    case 'UsedSets-EncounterSet3': 
    case 'UsedSets-EncounterSet4':
    case 'UsedSets-EncounterSet5':
        key = baseKey.replace('UsedSets-EncounterSet','Encounterset');
        break;
    case 'EncounterSet1': 
    case 'EncounterSet2':
    case 'EncounterSet3': 
    case 'EncounterSet4':
    case 'EncounterSet5':
        key = baseKey.replace('EncounterSet','Encounterset');
        break;
    case Card+'-Portrait': 
    case Card+'-PortraitBack':
    case Card+'-Collection': 
    case Card+'-BodyIcon':
        key = baseKey.replace(Card+'-','');
        break;
    case Card+'-EncounterSet': 
    case Card+'-EncounterSet1': 
    case Card+'-EncounterSet2':
    case Card+'-EncounterSet3': 
    case Card+'-EncounterSet4':
    case Card+'-EncounterSet5':
        key = baseKey.replace(Card+'-EncounterSet','Encounterset');
        break;
    case Card+'-UsedSets-EncounterSet1': 
    case Card+'-UsedSets-EncounterSet2':
    case Card+'-UsedSets-EncounterSet3': 
    case Card+'-UsedSets-EncounterSet4':
    case Card+'-UsedSets-EncounterSet5':
        key = baseKey.replace(Card+'-UsedSets-','Encounterset');
        break;
    default:
        key = baseKey;
    }

    if(baseKey != key){
        debug(3,'\tUpdate portrait BaseKey: '+key);
        portrait = new DefaultPortrait( key, portrait );
    }
    
    return portrait;   
}


function onReadOldComponent(diy){
    debug(5,'\nonReadOldComponent: SE3');
    debug(1,'\tComponent: '+Card);
    debug(1,'\tTemplate: '+diy.settings.get('Template','empty'));
    debug(1,'\tDifficulty: '+diy.settings.get('Difficulty','empty'));
    
    loadSettings(diy);
   
    diy.faceStyle = FaceStyle.TWO_FACES;
    diy.frontTemplateKey = 'Template';
    diy.backTemplateKey = 'TemplateBack';
    diy.bleedMargin = 9;


    for (let index in PortraitList) {
        PortraitList[index] = checkBaseKey(PortraitList[index], diy);
    }
    
    debug(0,'\tCreate new portraits');
    switch(String(Card)){
    case 'Presentation':
        diy.settings.set('Group-portrait-template','TheLordOfTheRingsLCG/icon/StrangeEons.png');
        diy.settings.set('Group-portrait-clip-region','50,38,313,130');
        createPortrait('Group', diy);
        diy.settings.set('Title-portrait-template','TheLordOfTheRingsLCG/icon/StrangeEons.png');
        diy.settings.set('Title-portrait-clip-region','50,423,313,102');
        createPortrait('Title', diy);
        diy.settings.set('BackgroundFront-portrait-template','TheLordOfTheRingsLCG/icon/StrangeEons.png');
        diy.settings.set('BackgroundFront-portrait-clip-region','0,0,413,563');
        createPortrait('BackgroundFront', diy);
        diy.settings.set('BackgroundBack-portrait-template','TheLordOfTheRingsLCG/icon/StrangeEons.png');
        diy.settings.set('BackgroundBack-portrait-clip-region','0,0,413,563');
        createPortrait('BackgroundBack', diy);
        $PortraitListCount = getPortraitCount();
        break;
    }
        $PortraitListCount = getPortraitCount();

    debug(0,'\tCheck Template');
    switch(String(Card)){
    case 'Ally': 
    case 'Attachment': 
    case 'Event': 
    case 'Hero': 
    case 'SideQuestPlayer':
    case 'Gift':
        if(diy.settings.get('Sphere',null) != null){
            debug(0,'WARNING: SE2 component: Sphere: '+diy.settings.get('Sphere'));
            traslateSetting(diy,'Sphere','Template','Neutral',true);
            traslateSetting(diy,'Sphere-tint','CustomSphere-tint','0.5,0.5,0.5',true);
        }else{
            if(diy.settings.get('Template',null) == null){
                debug(0,'WARNING: Template undefined');
                diy.settings.set('Template','Neutral');
            }
        }
        traslateSetting(diy,'Template-CustomSphere-tintable-tint','CustomSphere-tint','0.5,0.5,0.5',true);
        traslateSetting(diy,'Template-tint','CustomSphere-tint','0.5,0.5,0.5',true);
        break;
    case 'Enemy':
    case 'Location':
    case 'Objective':
    case 'ObjectiveAlly':
    case 'SideQuest':
    case 'Treachery':
        switch(diy.settings.get('Template',null)){
        case 'Easy': diy.settings.set('Template','Gold'); break;
        case 'Custom': diy.settings.set('Template','CustomDifficulty'); break;
        case null:
            debug(0,'WARNING: Template undefined');
            diy.settings.set('Template','Standard');
        }
        traslateSetting(diy,'Template-CustomDifficulty-tintable-tint','CustomDifficulty-tint','0.5,0.5,0.5',true);
        traslateSetting(diy,'Template-tint','CustomDifficulty-tint','0.5,0.5,0.5',true);
        if( diy.settings.get('OptionSpecial',null) == null ) diy.settings.set('OptionSpecial','EmptyIcon');
        break;
    case 'Quest':
        traslateSetting(diy,'Adventure','Scenario','',true);
        traslateSetting(diy,'AdventureBack','ScenarioBack','',true);
        break;
    case 'RulesCard':
        traslateSetting(diy,'TextFront','Rules','',true);
        traslateSetting(diy,'TextBack','RulesBack','',true);
        traslateSetting(diy,'FlavourFront','Flavour','',true);
        traslateSetting(diy,'StoryFront','Story','',true);
        if( diy.settings.get('PageNumber',null) == null ) diy.settings.set('PageNumber','0');
        if( diy.settings.get('PageTotal',null) == null ) diy.settings.set('PageTotal','0');
        break;
    case 'Presentation':
        traslateSetting(diy,'Game','Group','',true);
        if( diy.settings.get('CustomColour-tint',null) == null ) diy.settings.set('CustomColour-tint','0.5,0.5,0.5');
        if( diy.settings.get('PageNumber',null) == null ) diy.settings.set('PageNumber','0');
        if( diy.settings.get('PageTotal',null) == null ) diy.settings.set('PageTotal','0');
        break;
    }

    checkStatOnMinus(diy,'Attack');
    checkStatOnMinus(diy,'Defense');
    checkStatOnMinus(diy,'Engagement');
    checkStatOnMinus(diy,'HitPoints');
    checkStatOnMinus(diy,'Progress');
    checkStatOnMinus(diy,'ThreatCost');
    checkStatOnMinus(diy,'Threat');
    checkStatOnMinus(diy,'Willpower');

    traslateSetting(diy,'Name','Title','',true);
    traslateSetting(diy,'Trait','Traits','',true);
    traslateSetting(diy,'Rules','Effect','',true);
    traslateSetting(diy,'RulesBack','EffectBack','',true);
    traslateSetting(diy,'EncounterSet','Encounterset','StrangeEons',true);
    traslateSetting(diy,'EncounterSet1','Encounterset1','StrangeEons',true);
    traslateSetting(diy,'EncounterSet2','Encounterset2','StrangeEons',true);
    traslateSetting(diy,'EncounterSet3','Encounterset3','StrangeEons',true);
    traslateSetting(diy,'EncounterSet4','Encounterset4','StrangeEons',true);
    traslateSetting(diy,'EncounterSet5','Encounterset5','StrangeEons',true);
    
    if( diy.settings.get('Collection','') == 'empty' ) diy.settings.set('Collection','EmptyIcon');
    if( diy.settings.get('Collection','') == 'StrangeEonsIcon' ) diy.settings.set('Collection','StrangeEons');
    if( diy.settings.get('Encounterset','') == 'empty' ) diy.settings.set('Encounterset','EmptyIcon');
    if( diy.settings.get('Encounterset','') == 'StrangeEonsIcon' ) diy.settings.set('Encounterset','StrangeEons');
}
