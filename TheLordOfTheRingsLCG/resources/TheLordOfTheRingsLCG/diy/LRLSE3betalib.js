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

function updatePortraitBaseKey(diy){
    debug(1,'updatePortraitBaseKey');

    for (let index in PortraitList) {
        var baseKey = String(PortraitList[index].getBaseKey());
        debug(1,'Index:'+index+'; BaseKey: '+baseKey);

        switch(baseKey){
            case 'Sphere':
            case 'CustomSphere': 
            case Card+'-CustomSphere':
            case Card+'-Template-CustomSphere':
                key = 'SphereIcon';
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
                key = baseKey.replace('UsedSets-','');
                break;
            case Card+'-Portrait': 
            case Card+'-PortraitBack':
            case Card+'-Collection': 
            case Card+'-EncounterSet': 
            case Card+'-BodyIcon':
            case Card+'-EncounterSet1': 
            case Card+'-EncounterSet2':
            case Card+'-EncounterSet3': 
            case Card+'-EncounterSet4':
            case Card+'-EncounterSet5':
                key = baseKey.replace(Card+'-','');
                break;
            case Card+'-UsedSets-EncounterSet1': 
            case Card+'-UsedSets-EncounterSet2':
            case Card+'-UsedSets-EncounterSet3': 
            case Card+'-UsedSets-EncounterSet4':
            case Card+'-UsedSets-EncounterSet5':
                key = baseKey.replace(Card+'-UsedSets-','');
                break;
            default:
                key = baseKey;
            }
        if(baseKey != key){
            debug(1,'Update portrait BaseKey: '+key);
            diy.settings.set(key+'-portrait-template','')
//            PortraitList[index].setBaseKey(key)
            PortraitList[index] = DefaultPortrait(
                PortraitList[index],
                key
            );
            PortraitList[index].installDefault();
        //  PortraitList[PortraitList.indexOf(key)].setPanX(portrait.getPanX()-14);
        //  PortraitList[PortraitList.indexOf(key)].setPanY(portrait.getPanY()+14);
        //  PortraitList[PortraitList.indexOf(key)].setScale(portrait.getScale()+0.05);
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

function onReadS3beta(diy){
    debug(5,'\nonReadS3beta');
    debug(1,'\tComponent: '+Card);
    debug(1,'\tTemplate: '+diy.settings.get('Template','empty'));
    debug(1,'\tDifficulty: '+diy.settings.get('Difficulty','empty'));
    
    loadSettings(diy);
   
    diy.faceStyle = FaceStyle.TWO_FACES;
    diy.frontTemplateKey = 'Template';
    diy.backTemplateKey = 'TemplateBack';
    diy.bleedMargin = 9;

//    updatePortraitBaseKey(diy)
    
//            portrait = ois.readObject();
//            PortraitList[index] = DefaultPortrait(
//                updatePortraitBaseKey(diy),
//                portrait
//            );
//            PortraitList[index].installDefault();
//            index = PortraitList.length;
//            debug(5, 'PortraitList index: '+index);
//            PortraitList[index] = portrait;


    debug(0,'Check Template');
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
    case 'Quest':
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
        break;
    }

    function checkStatOnMinus(diy,stat){
        debug(0,'checkStatOnMinus:'+stat);
        if(diy.settings.get(stat,null) == 'minus'){
            debug(0,'\tChange from minus to -');
            diy.settings.set(stat,'-');
        }
    }
    
    checkStatOnMinus(diy,'Attack')
    checkStatOnMinus(diy,'Defense')
    checkStatOnMinus(diy,'Engagement')
    checkStatOnMinus(diy,'HitPoints')
    checkStatOnMinus(diy,'Progress')
    checkStatOnMinus(diy,'ThreatCost')
    checkStatOnMinus(diy,'Threat')
    checkStatOnMinus(diy,'Willpower')

    traslateSetting(diy,'Name','Title','',true);
    traslateSetting(diy,'Trait','Traits','',true);
    traslateSetting(diy,'Rules','Effect','',true);
    //if( diy.settings.get('Type',null) == null ) $Type = '';
}
