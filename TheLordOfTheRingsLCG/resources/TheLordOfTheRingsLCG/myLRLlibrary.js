/* VERSION CONTROL */
var LRLVersion = 10;
//10: 2024 rewrite

/* CONSTANTS AND VARIABLES */
const GAME = 'LRL';
var GAMEOBJECT = Eons.namedObjects.LRL;
var ResourcesPath = 'TheLordOfTheRingsLCG/';
// "PathCard" is the path to the component specific files
// in the Strange Eons virtual file system.
var PathCard = ResourcesPath + Card + '/';
var PathText = ResourcesPath + 'text/';
var PathUi = ResourcesPath + 'ui/';
var PathIcon = ResourcesPath + 'icon/';
var PathImage = ResourcesPath + 'image/';
var PathNumber = ResourcesPath + 'number/';
var PathNumberTintable = ResourcesPath + 'numberTint/';
var IconSize = $LRL-uiIconSize;

function updateToPreferences(key, diy) {
    debug(3, '\n\tupdateToPreferences: ' + key);
    /*
    Used to overwrite values on component creation or loading if 
    $LRL-UpdateToPreferences option is enabled in user preferences.
    Looks for $LRL-key value, if not available, keep $key value.
    $key values are kept too if the $LRL-value is an empty string ('')
    or 'KeepValue'.
    */
    //importClass(ca.cgjennings.apps.arkham.AbstractStrangeEonsEditor) ;

    debug(5, '\tLRL-UpdateToPreferences: ' + $LRL-UpdateToPreferences);
    let output = '';
    if (diy.settings.getBoolean('LRL-UpdateToPreferences', false)) {
        let value = diy.settings.get('LRL-' + key, '');
        if ((value != '') // used to avoid overwriting texts
            &&
            (value != 'KeepValue') // used to avoid overwriting lists 
        ) {
            diy.settings.set(key, value);
            debug(4, '\tUpdated: ' + value);
        }
    }
}

function uiEncountersetList(bindings, sides) {
    debug(3, '\n\tuiEncountersetList');
    if (sides == null) sides = BOTH;

    let control = new comboBox(GAMEOBJECT.EncountersetCombo, null);
    bindings.add('Encounterset', control, sides);

    return control;
}

function uiOtherEncountersetList(key, bindings, sides) {
    debug(3, '\n\tuiOtherEncountersetList');
    if (sides == null) sides = BOTH;

    let control = new comboBox(GAMEOBJECT.EncountersetCombo, null);
    bindings.add(key, control, sides);

    return control;
}

function uiCollectionList(bindings, sides) {
    debug(3, '\n\tuiCollectionList');
    if (sides == null) sides = BOTH;

    let control = new comboBox(GAMEOBJECT.CollectionCombo, null);
    bindings.add('Collection', control, sides);

    return control;
}

function uiTitleUnique(diy, bindings, sides) {
    debug(2, '\n\tuiTitleUnique');
    /*
    Creates the component title/name control and precedes it with Title-unique
    icon control.
    */
    let grid = new TypeGrid();

    let Unique_control = new uiButtonIcon('Title-unique', diy, bindings, sides);
    let Title_control = uiTitle(diy, bindings, sides);
    grid.place(Unique_control, '', Title_control, 'hfill');

    return grid;
}

function uiTitleByEncounterset(diy, bindings, sides) {
    debug(2, '\n\tuiTitleByEncounterset');
    /*
    Creates the component title/name control that can use the text of the
    selected Encounterset_control.
    */
    let grid = new TypeGrid();

    let ByEncounterset_control = new uiButtonText('ByEncounterset', diy, bindings, sides);
    let Title_control = uiTitle(diy, bindings, sides);
    grid.place(Title_control, 'hfill', ByEncounterset_control, '');

    return grid;
}

function uiTitleByGroup(diy, bindings, sides) {
    debug(2, '\n\tuiNameByGroup');
    /*
    Creates the component title/name control that can use the text of the
    selected Group_control.
    */
    let grid = new TypeGrid();

    let ByGroup_control = new uiButtonText('ByGroup', diy, bindings, sides);
    let Title_control = uiTitle(diy, bindings, sides);
    grid.place(Title_control, 'hfill', ByGroup_control, '');

    return grid;
}

function uiCampaignPart(diy, bindings, sides) {
    debug(2, '\n\tuiCampaign');
    /*
    Creates the component Campaign control that can use the text of the
    selected Collection and select an optional "part x" sufix.
    To be used with writeCampaignPart(diy,g).
    */
    let grid = new TypeGrid();

    let ByCollection_control = new uiButtonText('ByCollection', diy, bindings, sides);
    let text_control = uiText('Campaign', bindings, sides);
    let part_control = new uiListText('CampaignPart', ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], bindings, sides)
    grid.place(
    	text_control, 'hfill'
    	, ByCollection_control, ''
    	, '<html><b>'+@LRL-Part+':'
    	, '', part_control, ''
    );

    return grid;
}

function uiScenario(diy, bindings, sides) {
    debug(2, '\n\tuiScenario');
    /*
    Creates the component Scenario control that can use the text of the
    selected Encounter Set.
    */
    let grid = new TypeGrid();

    let ByEncounterset_control = new uiButtonText('ByEncounterset', diy, bindings, sides);
    let text_control = uiText('Scenario', bindings, sides);
    grid.place(text_control, 'hfill', ByEncounterset_control, '');

    return grid;
}

function writeCampaign(diy, g) {
    debug(2, '\n\twriteCampaign');
    let text = formatText('Campaign', diy);
    let format = diy.settings.get('Campaign-format', '')
    let region = diy.settings.getRegion('Campaign')
    let byCollection = diy.settings.getBoolean('ByCollection', false)
    
    if (byCollection) {
    	let collection = $Collection;
        switch (collection) {
        case 'CustomIcon':
        case 'EmptyIcon':
            break;
        default:
            text = #('LRL-' + collection);
        }
    }
    text = format + text;

    debug(5, '\tText: ' + text);
    writeLine(text, Campaign_writer, region, g);
}

function writeScenario(diy, g) {
    debug(2, '\n\twriteScenario');
    let text = formatText('Scenario', diy);
    let format = diy.settings.get('Scenario-format', '')
    let region = diy.settings.getRegion('Scenario');
    let byEncounterset = diy.settings.getBoolean('ByEncounterset', false);

    if (byEncounterset) {
    	let encounterset = $Encounterset;
        switch (encounterset) {
        case 'CustomIcon':
        case 'EmptyIcon':
            break;
        default:
            text = #('LRL-' + encounterset);
        }
    }
    text = format + text;

    debug(5, '\tText: ' + text);
    writeLine(text, Scenario_writer, region, g);
}

function writeTraits(diy, g) {
    debug(2, '\n\twriteTraits');
    let text = diy.settings.get('Traits', '');
    let format = diy.settings.get('Traits-format', '');
    let region = diy.settings.getRegion('Traits');

    text = format + text;

    debug(5, '\tText: ' + text);
    Traits_writer.setMarkupText(text);
    updateNameTags(Traits_writer, diy);
    Traits_writer.draw(g, region);
    //writeLine(text, Traits_writer, region, g);
}

function writeType(diy, g) {
    debug(2, '\n\twriteType');
    let text = diy.settings.get('Type', '');
    let format = diy.settings.get('Type-format', '');
    let region = diy.settings.getRegion('Type');

    if (text == '') {
        text = #('LRL-' + Card + '-' + $Template);
        if (text == "[MISSING: LRL-" + Card + "-" + $Template + "]") text = #('LRL-' + Card);
    }
    text = format + text;

    debug(5, '\tText: ' + text);
    writeLine(text, Type_writer, region, g);
}

function writeSubtype(diy, g) {
    debug(2, '\n\twriteSubtype');
    let text = diy.settings.get('Subtype', '');
    let format = diy.settings.get('Subtype-format', '')
    let region = diy.settings.getRegion($Template + '-Subtype', diy.settings.getRegion('Subtype'));

    if (text == '') {
        text = #('LRL-' + $Template);
        if (text == "[MISSING: LRL-" + $Template + "]") text = #('LRL-' + Card);
    }
    text = format + text;

    debug(5, '\tText: ' + text);
    writeLine(text, Subtype_writer, region, g);
}

function writeEncountersetNumber(diy, g) {
    debug(2, '\n\twriteEncountersetNumber');
    let text;
    let number = diy.settings.get('EncountersetNumber', 0);
    let region = getRegionTemplate('EncountersetNumber', diy);
    let format = diy.settings.get('EncountersetNumber-format', '')

    if (number > 0) {
        let total = diy.settings.get('EncountersetTotal', 0);
        if (total > 0) {
            let separator = diy.settings.get('EncountersetNumber-of', '');
            if (separator == '') separator = #LRL-EncountersetNumber-of;
            text = number + separator + total;
        } else text = number;
    } else text = '---'; // if 0
    text = format + text;

    debug(5, '\tText: ' + text);
    writeLine(text, EncountersetNumber_writer, region, g);
}

function formatTitle(diy, g) {
    debug(2, '\n\tformatTitle');
    let output;

    let text = diy.settings.get('Title', '');
    debug(4, '\n\tTitle: '+text);
    let format = diy.settings.get('Title-format', '')
    debug(4, '\n\tFormat: '+format);
    let unique = diy.settings.getBoolean('Title-unique', false);
    debug(4, '\n\tUnique: '+unique);

    if (unique) {
    	unique = diy.settings.get('Title-unique-format', '<lrs><u+2006></lrs> ');
    	debug(5, '\n\tUnique format: '+unique);
    	text = unique + text;
    }
	output = format + text;
    
    debug(4, '\tOutput: ' + output);
    return output;
}

function writeTitle(diy, g) {
    debug(2, '\n\twriteTitle');
    /*
    Draws $key on the component template in the $key-region.
    */
    let text = formatTitle(diy, g);
    let region = diy.settings.getRegion('Title');
    writeLine(text, Title_writer, region, g);
}

function writeTitleRotated(diy, g) {
    debug(2, '\n\twriteTitleRotated');
    // usar nuevo drawtitlerotated
    /*
    Draws $key rotated on the component template in the $key-region.
    */
    let text = formatTitle(diy, g);
    Title_writer.markupText = text;
    let region = diy.settings.getRegion('Title');

    let oldTransform = g.getTransform();
    g.rotate(-Math.PI / 2, 0, 0); // quitar 0s
    let newRegion = region.clone();
    let x = region.getX();
    let y = region.getY();
    let w = region.getWidth();
    let h = region.getHeight();
    newRegion.setRect(-h-y, x, h, w);
    Title_writer.draw(g, newRegion);
    g.setTransform(oldTransform);
}

function writeTextByEncounterset(key, writer, region, diy, g) {
    debug(2, '\n\twriteTextByEncounterset');
    /*
    Writes text or #$Encounterset in the text-region.
    */
    let byEncounterset = diy.settings.getBoolean('ByEncounterset', false)
    debug(5, '\tByEncounterset: ' + byEncounterset);

    if (byEncounterset) {
	    let encounterset = $Encounterset;
	    debug(5, '\tEncounterset: ' + encounterset);
        switch (encounterset) {
        	case null:
            case 'CustomIcon':
            case 'EmptyIcon':
                break;
            default:
                text = #('LRL-' + encounterset);
			    let format = diy.settings.get(key + '-format', '');
			    let formatEnd = diy.settings.get(key + '-formatEnd', '');
			    text = format + text + formatEnd;
        }
    }else{
    	text = formatText(key, diy);
    }
    
	writeLine(text, writer, region, g);
}

function writeTitleByEncounterset(diy, g) {
    debug(2, '\n\twriteTitleByEncounterset');
    /*
    Writes $name or #set in the $name-region.
    */
    let region = diy.settings.getRegion('Title');
    writeTextByEncounterset('Title', Title_writer, region, diy, g);
}

function writeTextByCollection(key, writer, region, diy, g) {
    debug(2, '\n\twriteTextByCollection: '+key);
    /*
    Writes $name or #collection in the $name-region.
    */
    let byCollection = diy.settings.getBoolean('ByCollection', false)
    debug(5, '\tByCollection: ' + byCollection);

    if (byCollection) {
	    let collection = $Collection;
	    debug(5, '\tCollection: ' + collection);
        switch (collection) {
        	case null:
            case 'CustomIcon':
            case 'EmptyIcon':
                break;
            default:
                text = #('LRL-' + collection);
			    let format = diy.settings.get(key + '-format', '');
			    let formatEnd = diy.settings.get(key + '-formatEnd', '');
			    text = format + text + formatEnd;
        }
    }else{
    	text = formatText(key, diy);
    }
    
    let region = diy.settings.getRegion(key);
	writeLine(text, writer, region, g);
}

function writeTextShadowedByIcon(key, icon, writer, diy, g, sheet) {
    debug(3, '\n\twriteTextShadowedByIcon');
    // This function passes several times a stroke filter on a text.
    // It uses $key-shadow-* for configuration.
    importClass(ca.cgjennings.graphics.filters.StrokeFilter);

    let region = diy.settings.getRegion($Template + '-' + key, diy.settings.getRegion(key));
    let colour = diy.settings.getColour(key + '-shadow-colour', new Colour(0x4f0f0f0f, true));
    let passes = diy.settings.get(key + '-shadow-passes', 6);
    let width = diy.settings.getFloat(key + '-shadow-width', 2);
    if (sheet.isHighResolutionRendering()) width = width * 2;

    let stroke = new StrokeFilter(colour, width, StrokeFilter.Position.OUTSIDE);

    let newRegion = diy.settings.get($Template + '-' + key + '-region', diy.settings.get(key + '-region'))
    newRegion = String(region).split(',');
    let w = Number(newRegion[2]);
    let h = Number(newRegion[3]);

    let textImage = sheet.createTemporaryImage(w, h, true);
    let gi = sheet.createGraphics(textImage, true, true);

	let text = diy.settings.get(key, '');
	
 	if(diy.settings.getBoolean('By'+icon, false)){
       switch (icon) {
            case 'CustomIcon':
            case 'EmptyIcon':
                break;
            default:
                text = #('LRL-' + diy.settings.get(icon, ''));
        }
 	}

    let format = diy.settings.get(key + '-format', '');
    let formatEnd = diy.settings.get(key + '-formatEnd', '');

    let output = format + text + formatEnd;

    writer.markupText = output;
    writer.draw(gi, new Region([2, 2, w-4, h-4]));

    while (passes > 0) {
        textImage = stroke.filter(textImage, null);
        passes--;
    }

    sheet.paintImage(g, textImage, region);
}

function writeCampaignPart(diy, g) {
    debug(2, '\n\twriteCampaignPart');
    /*
    Writes $name or #collection in the $name-region.
    */
    let text = diy.settings.get('Campaign', '');
    debug(5, '\tText: ' + text);
    let byCollection = diy.settings.getBoolean('ByCollection', false)
    debug(5, '\tByCollection: ' + byCollection);
    let collection = diy.settings.get('Collection', 'StrangeEons');
    debug(5, '\tCollection: ' + collection);
    let part = diy.settings.get('CampaignPart', '-')
    debug(5, '\tPart: ' + part);
    let format = diy.settings.get('Campaign-format', '')
    let prefix = diy.settings.get('Part-prefix', '')
    let postfix = diy.settings.get('Part-postfix', '')
    let region = diy.settings.getRegion('Campaign');

    if (byCollection) {
        switch (collection) {
            case 'CustomIcon':
            case 'EmptyIcon':
                break;
            default:
                text = #('LRL-' + collection);
        }
    }
    text = format + text;

    if (String(part) != '-') {
        if (prefix == '') prefix = #LRL-Part-prefix;
        if (postfix == '') postfix = #LRL-Part-postfix;
        part = #('LRL-Part-' + part);
        text = text + prefix + part + postfix;
    }

    debug(5, '\tText: ' + text);
    writeLine(text, Campaign_writer, region, g);
}

function formatPage(diy, g, sheet) {
    debug(2, '\n\tformatPage');
    let output;
    let number = Number(diy.settings.get('PageNumber', 0));
    let format = diy.settings.get('Page-format', '');

    if (number > 0) {
        number = number + sheet.getSheetIndex(); // increase by 1 in odd pages
        let page = diy.settings.get('LRL-Page', '')
        if (page == '') page = #LRL-Page;

        let total = diy.settings.get('PageTotal', 0)
        if (total > 0) {
            let pageOf = diy.settings.get('LRL-Page-of', '');
            if (pageOf == '') pageOf = #LRL-Page-of;
            if (pageOf == "[MISSING: LRL-Page-of]") pageOf = '<u+2004>/';
            output = format + page + number + pageOf + total;
        } else output = format + page + number;
    } else output = ''; // if 0

    debug(5, '\tOutput: ' + output);
    return output;
}

function writePage(diy, g, sheet) {
    debug(2, '\n\twritePage');
    let number = Number(diy.settings.get('PageNumber', 0));

    if (number > 0) {
        let region;
        let side = '';
        if (sheet.getSheetIndex() == BACK) side = '-back';
        let decoration = diy.settings.get('Page-decoration', '');

        if (decoration != '') {
            let decoration = diy.settings.getImageResource('Page-decoration');
            region = diy.settings.getRegion('Page' + side + '-decoration', diy.settings.getRegion('Page-decoration'));
            sheet.paintImage(g, decoration, region);
        }

        Page_writer.markupText = formatPage(diy, g, sheet);
        region = diy.settings.getRegion('Page' + side, diy.settings.getRegion('Page'));
        Page_writer.drawAsSingleLine(g, region);
    }
}

function writeOption(key, diy, g, sheet) {
    debug(2, '\n\twriteOption: ' + key);
    let text = diy.settings.get(key, '');
    if (text != '') writeLineDecorated(key, Option_writer, diy, g, sheet);
}

function writeSide(diy, g, sheet) {
    debug(1, '\npaintFront');
    
    let text;
    if (sheet.getSheetIndex() == FRONT) {
        text = #LRL-SideFront;
        if ($SideFront != '') text = $SideFront;
    } else {
        text = #LRL-SideBack;
        if ($SideBack != '') text = $SideBack;
    }
    text = diy.settings.get('Side-format', '') + text;
    writeLine(text, Side_writer, diy.settings.getRegion('Side'), g);
}

function formatArtist(key, diy) {
    debug(2, '\n\tformatArtist');
    let output = '';
    let text = diy.settings.get(key, '');
    debug(2, '\n\t'+key+' : '+text);
    let format = diy.settings.get(key + '-format', '');
    switch (text) {
        case null:
        case '':
            let unknown = diy.settings.get('LRL-Artist-unknown', #LRL-Artist-unknown);
            output = format + unknown;
            break;
        default:
            let illus = diy.settings.get('LRL-Artist-abreviation', #LRL-Artist-abreviation);
            output = format + illus + ' ' + text;
    }

    debug(4, '\tOutput: ' + output);
    return output;
}

function writeArtist(diy, g, sheet) {
    debug(2, '\n\twriteArtist');
    let text = formatArtist('Artist', diy);
    let region = diy.settings.getRegion('Artist');
    let stroke = getStroke('Bottom', diy);
    writeTextOutlined(text, Bottom_writer, region, stroke, diy, g, sheet);
}

function writeArtistBack(diy, g, sheet) {
    debug(2, '\n\twriteArtistBack');
    let text;
    let stroke = getStroke('Bottom', diy);
    let region = diy.settings.getRegion('Artist');
    if (diy.settings.getBoolean('PortraitShare', true)) {
        debug(5, '\tPortrait shared.');
        text = formatArtist('Artist', diy);
    } else text = formatArtist('ArtistBack', diy);
    writeTextOutlined(text, Bottom_writer, region, stroke, diy, g, sheet);
}

function writeCopyright(diy, g, sheet) {
    debug(2, '\n\twriteCopyright');
    let text = formatText('Copyright', diy);
    let region = diy.settings.getRegion('Copyright');
    let stroke = getStroke('Bottom', diy);
    writeTextOutlined(text, Bottom_writer, region, stroke, diy, g, sheet);
}

function writeCollectionInfo(diy, g, sheet) {
    debug(2, '\n\twriteCollectionInfo');
    let text = formatText('CollectionInfo', diy);
    let region = diy.settings.getRegion('CollectionInfo');
    let stroke = getStroke('Bottom', diy);
    writeTextOutlined(text, Bottom_writer, region, stroke, diy, g, sheet);
}

function writeCollectionNumber(diy, g, sheet) {
    debug(2, '\n\twriteCollectionNumber');
    let text = diy.settings.get('CollectionNumber', '0');
    if (text == '0') text = '---';
    let region = diy.settings.getRegion('CollectionNumber');
    let stroke = getStroke('Bottom', diy);
    writeTextOutlined(text, Bottom_writer, region, stroke, diy, g, sheet);
}

function writeBody(parts, diy, g) {
    debug(2, '\n\twriteBody');
    // This looks for $Body-Template-region, and if not found, uses Body-region
    let region = diy.settings.getRegion('Body-'+$Template, diy.settings.getRegion('Body'));

    writeParagraph(parts, Body_writer, region, diy, g);
}

function writeBodyFront(parts, diy, g) {
    debug(2, '\n\twriteBodyFront');
    // This looks for $BodyFront-Template-region, and if not found, uses BodyFront-region
    let region = diy.settings.getRegion('BodyFront-'+$Template, diy.settings.getRegion('BodyFront'));

    writeParagraph(parts, Body_writer, region, diy, g);
}

function writeBodyBack(parts, diy, g) {
    debug(2, '\n\twriteBodyBack');
    // This looks for $BodyBack-Template-region, and if not found, uses BodyBack-region
    let region = diy.settings.getRegion('BodyBack-'+$Template, diy.settings.getRegion('BodyBack'));

    writeParagraph(parts, Body_writer, region, diy, g);
}

//
//function uiOptionSpecial(key,diy,bindings,sides ){ debug(2,'\n\tuiOptionSpecial: '+key) ;
///*
//Creates a toggle button with an icon from the
//plugin ui folder's "key" PNG file.
//Requires passing diy.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	
//	var combo = new Array(
//		ListItem('none',@LRL-None,ImageUtils.createIcon(ImageUtils.get(PathUi+'Empty.png'),IconSize,IconSize ) ) ,
//		ListItem('Sailing',@LRL-Sailing,ImageUtils.createIcon(ImageUtils.get(PathUi+'Sailing.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron',@LRL-EyeOfSauron,ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron2',@LRL-EyeOfSauron+' x2',ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron2.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron3',@LRL-EyeOfSauron+' x3',ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron3.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron4',@LRL-EyeOfSauron+' x4',ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron4.png'),IconSize,IconSize ) )
//	) ;
//
//	bindings.add(key,combo,[ 0,1 ]) ;
//	return combo ;
//}
//
//function getCollections(){ debug(3,'getCollections') ;
///* getCollections()
//	This function returns an array with the available Collections.
//	Check LRL-I settings file for information on how to add new icons
//	to this list.
//*/
//	
//	//var collectionsList = getArray('collectionsList') ;
//
//	var collections = new Array() ;
//	for(
//		let index = 0 ;
//		index < GAMEOBJECT.GameCollectionList.length ;
//		index++
//	){
//		let item = GAMEOBJECT.GameCollectionList[ index ] ;
//		collections = collections.concat(
//			getArray(item+'-Collection-list')
//		) ;
//	}
//	return collections ;
//}
//
//function getSets(){ debug(2,'getSets') ;
///* getSets()
//	This function returns an array with the available Collections.
//	Check LRL-I settings file for information on how to add new icons
//	to this list.
//*/
//
//	var collections = getCollections() ;
//	var sets = new Array() ;
//
//	for(
//		let index = 0 ;
//		index < collections.length ;
//		index++
//	){
//		let item = collections[ index ] ;
//		sets = sets.concat(
//			getArray(item+'-Encounterset-list')
//		) ;
//	}
//
//	return sets;
//}

//function paintSpecialOption(key,diy,g,sheet){ debug(2,'\n\tpaintSpecialOption: '+key) ;
//	let item = diy.settings.get(key,'Empty') ;
//	if(item!='Empty') sheet.paintImage(g,ImageUtils.get(PathIcon+item+'.png'),key+'-region') ;
//}

function paintIconLRL(key, diy, g, sheet) {
    debug(3, '\n\tpaintIconLRL: ' + key);
    /*
    This paints an icon in the component. The icon position to paint is
    determined by the 'key' and the actual image to paint is determined by $key.
    The icon is looked for in the plugin ui folder's, as "key" PNG file.
    It will also look for Nightmare and Draft variants if needed.
    This function is the same as paintIcon in mySElibrary, but adds
    the ability yo invert the colours of the Encounterset icon when
    used in Nightmare templates.
    */
    let image = getIconLRL(key, diy);
    let regionKey = getKeyForTemplate(key + '-portrait-clip-region', diy);
    debug(5, '\n\tRegion: '+regionKey + ' : '+diy.settings.get(regionKey));
    
    sheet.paintImage(g, image, regionKey);
    
    /*añadir código para las variantes*/
    
    
}

function getIconLRL(key, diy) {
    debug(3, '\n\tgetIconLRL: ' + key + ' : ' + diy.settings.get(key));
    let icon = diy.settings.get(key); // get the icon name contained inside $key
    debug(5, '\n\tIcon: '+icon);
    switch (String(icon)) {
        case '':
        case null:
            throw new Error('\t' + key + ' not defined.');
            break;
        case 'EmptyIcon':
            return ImageUtils.get(PathImage + 'empty1x1.png');
            break;
        case 'CustomIcon':
            return PortraitList[portraitIndexOf(key)].getImage();
            break;
        default:
        	let image = ImageUtils.get(PathIcon + icon + '.png');
		    if (((key == 'Encounterset') || (key == 'Group')) 
		    	&& ($Template == 'Nightmare')) {
			    image = ImageUtils.invert(image);
			}
            return image;
    }
}

function paintGameLogo(diy, g, sheet) {
    debug(3, '\n\tpaintLogo');
    let image;
    switch (getLocale()) {
        case 'es':
            image = diy.settings.getImageResource('GameLogo-es');
            break;
        case 'pl':
            image = diy.settings.getImageResource('GameLogo-pl');
            break;
        case 'en':
        default:
            image = diy.settings.getImageResource('GameLogo-en');
            break;
    }
    sheet.paintImage(g, image, 'Template-region');
}

function uiEncountersetNumber(bindings) {
    debug(3, '\n\tuiEncountersetNumber');
    let grid = new Grid();

    let Number_control = new uiSpinner('EncountersetNumber', bindings, FRONT, 99);
    let Total_control = new uiSpinner('EncountersetTotal', bindings, FRONT, 99);

    grid.place(
        '<html><b>' + @LRL-Number + ':', ''
        , Number_control, ''
        , @LRL-Of, ''
        , Total_control, ''
    );
    return grid;
}

function paintDifficulty(diy, g, sheet) {
    debug(2, '\n\tpaintDifficulty: ' + $Difficulty);
    /*
    This function paints the Difficulty decorations.
    */
    switch ($Difficulty) {
    	case null:
        case 'Standard':
            break;
        case 'Custom':
            debug(5, '\tCustomDifficulty tint: ' + $CustomDifficulty-tint);
            let tint = diy.settings.getTint('CustomDifficulty-tint'); //mover a listener
            Difficulty_tinter.setFactors(tint[0], tint[1], tint[2]);
            sheet.paintImage(g, Difficulty_tinter.getTintedImage(), 'Difficulty');
            break;
        default:
        	if (diy.settings.get('Difficulty-'+$Difficulty)){
 	    		sheet.paintImage(g, 'Difficulty-'+$Difficulty, 'Template');
        	}else{
            	if (diy.settings.getTint($Difficulty + '-tint') == null) {
	                debug(0, '\tError: Tint not defined.');
	                debug(0, '\tTint: ' + diy.settings.get($Difficulty + '-tint'));
	                break;
	            }
	            debug(5, '\tTint: ' + diy.settings.get($Difficulty + '-tint'));
	            tint = diy.settings.getTint($Difficulty + '-tint');
	            Difficulty_tinter.setFactors(tint[0], tint[1], tint[2]);
	            sheet.paintImage(g, Difficulty_tinter.getTintedImage(), 'Difficulty');
	        }
            break;
    }
}

function paintCustomSphereBody(diy, g, sheet) {
    debug(2, '\n\tpaintCustomSphereBody');
    /*
    This function paints the tinted text box and custom sphere icon for the rules text.
    CustomBody_tinter must de defined in createFrontPainter.
    CustomBodyIcon_tinter is optional.
    */
    debug(5, '\tTint: ' + $CustomSphere-tint);
    let tint = diy.settings.getTint('CustomSphere-tint');
    Body_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
    let image = Body_tinter.getTintedImage();
    sheet.paintImage(g, image, 'Template-region');

    if (BodyIcon_tinter) {
        debug(2, '\tpaintCustomSphereBodyIcon');
        image = PortraitList[portraitIndexOf('BodyIcon')].getImage(); // get image from portrait
        if (diy.settings.getBoolean('BodyIcon-tinted',true)) {
	        debug(5, '\tTinted: ' + $BodyIcon-tinted);
	        image = createRedishImage(image); // recolorize image for tinter
	        BodyIcon_tinter.setImage(image); // put image into tinter
		    BodyIcon_tinter.setFactors(tint[0], tint[1], tint[2]); // modify tinter colour
	        image = BodyIcon_tinter.getTintedImage(); // get tinted image
	    }
        BodyIcon_tinter.setImage(image); // put image into tinter
        BodyIcon_tinter.setFactors(tint[0], tint[1], tint[2]); // modify tinter colour
        image = BodyIcon_tinter.getTintedImage(); // get tinted image
        debug(5, '\tTransparency: ' + $BodyIcon-transparency);
        image = ImageUtilities.alphaComposite(image, Number($BodyIcon-transparency) / 10); // apply transparency
        sheet.paintImage(g, image, 'BodyIcon-portrait-clip-region');
    }
}

function paintCustomSpherePearl(diy, g, sheet) {
    debug(2, '\n\tpaintCustomSphereDecoration');
    /*
    This function paints the small tinted sphere decorations.
    */
    debug(5, '\tTint: ' + $CustomSphere-tint);
    let tint = diy.settings.getTint('CustomSphere-tint');
    Pearl_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
    let image = Pearl_tinter.getTintedImage();
    sheet.paintImage(g, image, 'Template-region');
}

function paintCustomColour(diy, g, sheet) {
    debug(2, '\n\tpaintCustomColour');
    /*
    This function paints the small tinted sphere decorations.
    */
    debug(5, '\tTint: ' + $CustomColour-tint);
    let tint = diy.settings.getTint('CustomColour-tint');
    CustomColour_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
    let image = CustomColour_tinter.getTintedImage();
    sheet.paintImage(g, image, 'Template-region');
}

function paintCustomColourBack(diy, g, sheet) {
    debug(2, '\n\tpaintCustomColourBack');
    /*
    This function paints the small tinted sphere decorations.
    */
    debug(5, '\tTint: ' + $CustomColour-tint);
    let tint = diy.settings.getTint('CustomColour-tint');
    CustomColourBack_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
    let image = CustomColourBack_tinter.getTintedImage();
    sheet.paintImage(g, image, 'Template-region');
}

function paintAdapter(list, diy, g, sheet) {
    debug(3, '\n\tpaintAdapter');
    let image = null;
    let selector = 0;

    for (let index = 0; index < list.length; index++)
        if (diy.settings.get(list[index]) != 'EmptyIcon') selector = index + 1;
    debug(5, '\tSelector: ' + selector);

    if (diy.settings.get($Template + '-adapter' + selector, null) != null){ 
    	image = $Template + '-adapter' + selector;
    }else{
	    image = 'adapter' + selector; 
    }

    debug(5, '\tImage: ' + image);
    if (image != null) sheet.paintImage(g, image, 'Template-region');
}

function paintAdapterTinted(list, diy, g, sheet) {
	
	//codificar
	
    debug(3, '\n\tpaintAdapterTintable');
    let image = null;
    let selector = 0;

    for (let index = 0; index < list.length; index++)
        if (diy.settings.get(list[index]) != 'EmptyIcon') selector = index + 1;
    debug(5, '\tSelector: ' + selector);

    if (diy.settings.get($Template + '-adapter' + selector + '-tintable', null) != null){ 
    	image = $Template + '-adapter' + selector + '-tintable';
    }else{
	    image = 'adapter' + selector + '-tintable'; 
    }

    debug(5, '\tImage: ' + diy.settings.get(image));
 	Adapter_tinter.setImage(diy.settings.getImageResource(image));
   	let tint = diy.settings.getTint('CustomColour-tint');
   	Adapter_tinter.setFactors(tint[0], tint[1], tint[2]);
   	sheet.paintImage(g, Adapter_tinter.getTintedImage(), 'Template');
}

//function paintDividerCommon(g,diy,sheet){ // obsoleto
///*
//	This function paints all the stuff that is the same in both sides of the component,
//*/
//	paintPortrait('Portrait',g,sheet) ;
//
//// TEMPLATE
//	var hsb;
//	switch(String($Template) ){
//	case 'CustomDifficulty':
//	case 'CustomSphere':
//		hsb = diy.settings.getTint('Template') ;
//		Template_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		break;
//	default:
//		hsb = diy.settings.getTint($Template) ;
//		Template_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//	}
//
//	sheet.paintImage(g,Template_tinter.getTintedImage(),Card+'-template') ;
//
//	switch(String($Template) ){
//	case 'CustomDifficulty':
//		hsb = diy.settings.getTint('Template') ;
//		EncounterDeco_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		sheet.paintImage(g,EncounterDeco_tinter.getTintedImage(),Card+'-template') ;
//		break;
//	case 'Standard':
//	case 'Nightmare':
//	case 'Saga':
//		hsb = diy.settings.getTint($Template) ;
//		EncounterDeco_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		sheet.paintImage(g,EncounterDeco_tinter.getTintedImage(),Card+'-template') ;
//		break;
//	default:
//		if(sheet.getSheetIndex()==1){
//			let templateImage = diy.settings.getImageResource(Card+'-template') ;
//			templateImage = ImageUtils.mirror(templateImage) ;
//			sheet.paintImage(g,templateImage,Card+'-template') ;
//		}else{ sheet.paintTemplateImage(g) ; }
//	}
//
//// ADAPTER
//	var adapterImage = null ;
//
//	var decoType ;
//	switch(String($Template) ){
//	case 'Standard':
//	case 'Nightmare':
//	case 'Saga':
//	case 'CustomDifficulty':
//		decoType = 'Encounter';
//		break;
//	default:
//		decoType = 'Player';
//	}
//
//	EncountersetIcon = getIcon('Encounterset') ;
//	switch(String($IconLayout) ){
//	case 'Left':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-Left.jp2') ;
//		if(sheet.getSheetIndex()==1) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,EncountersetIcon,Card+'-icon-Left') ;
//		else sheet.paintImage(g,EncountersetIcon,Card+'-icon-Right') ;
//		break;
//	case 'LeftMiddle':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-LeftMiddle.jp2') ;
//		if(sheet.getSheetIndex()==1) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,EncountersetIcon,Card+'-icon-LeftMiddle') ;
//		else sheet.paintImage(g,EncountersetIcon,Card+'-icon-RightMiddle') ;
//		break;
//	case 'RightMiddle':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-LeftMiddle.jp2') ;
//		if(sheet.getSheetIndex()==0) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,EncountersetIcon,Card+'-icon-RightMiddle') ;
//		else sheet.paintImage(g,EncountersetIcon,Card+'-icon-LeftMiddle') ;
//		break;
//	case 'Right':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-Left.jp2') ;
//		if(sheet.getSheetIndex()==0) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,EncountersetIcon,Card+'-icon-Right') ;
//		else sheet.paintImage(g,EncountersetIcon,Card+'-icon-Left') ;
//		break;
//	default:
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-Title.jp2') ;
//		if(sheet.getSheetIndex()==1) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//		CollectionIcon = getIcon('Collection') ;
//		if(sheet.getSheetIndex() === 0 ){
//			sheet.paintImage(g,EncountersetIcon,Card+'-icon-TitleLeft') ;
//			sheet.paintImage(g,CollectionIcon,Card+'-icon-TitleRight') ;
//		}else{
//			if(Card=='DividerHorizontal'){
//				regionLeft = diy.settings.getRegion(Card+'-icon-TitleLeft-back') ;
//				regionRight = diy.settings.getRegion(Card+'-icon-TitleRight-back') ;
//			}else{
//				regionLeft = diy.settings.getRegion(Card+'-icon-TitleLeft') ;
//				regionRight = diy.settings.getRegion(Card+'-icon-TitleRight') ;
//			}
//			if(diy.settings.getBoolean('IconSwap',false) === true){
//				sheet.paintImage(g,EncountersetIcon,regionRight) ;
//				sheet.paintImage(g,CollectionIcon,regionLeft) ;
//			}else{
//				sheet.paintImage(g,EncountersetIcon,regionLeft) ;
//				sheet.paintImage(g,CollectionIcon,regionRight) ;
//			}
//		}
//		if((Card=='DividerHorizontal') && (sheet.getSheetIndex()==1) ){
//			Name_writer.markupText = $Name ;
//			Name_writer.drawAsSingleLine(g,diy.settings.getRegion('DividerHorizontal-Name-back')) ;
//		}else{ writeLine('Name',Name_writer,g,diy) ; }
//	}
//
//// ICONS
//	writeTextOutlined('Artist',Artist_writer,getStroke('Bottom',diy),diy,g,sheet) ;
//	paintIcon('Collection',g,sheet) ;
//	paintIcon('Encounterset',g,sheet) ;
//
//}
