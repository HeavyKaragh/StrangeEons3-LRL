//Quitar EncounterDeco de la plantilla


/* COMPONENT CONFIGURATION */
const Card = 'Occurrence';
// corregir tama\u00f1o icono de conjunto
// comprobar si texto complexocurrence es necesario
const CardVersion = 1;
// 1: rewrite using new 2023 library

function create(diy) {
    debug(1, '\ncreate');
    diy.extensionName = 'TheLordOfTheRingsLCG.seext';
    diy.version = SEVersion + LRLVersion + CardVersion;
    $VersionHistory = diy.version;

    loadSettings(diy);
    loadExample(diy);
    loadPreferences(diy);

    diy.frontTemplateKey = 'Template';
    diy.backTemplateKey = 'TemplateBack';
    diy.faceStyle = FaceStyle.TWO_FACES;
    diy.bleedMargin = 9;

    diy.customPortraitHandling = true;
    createPortrait('Portrait', diy);
    createPortrait('Collection', diy);
    createPortrait('Encounterset', diy);
    $PortraitListCount = getPortraitCount();
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls');
    var bindings = new Bindings(editor, diy);
    let list;

    // MAIN TAB
    let Main_tab = new TypeGrid();
    Main_tab.editorTabScrolling = true;

    // TITLE TAB
    let Title_panel = new TypeGrid();
    Title_panel.setTitle(@LRL-Title);
    let Title_control = uiTitle(diy, bindings, FRONT);
    Title_panel.place(Title_control, 'hfill');
    Main_tab.place(Title_panel, 'hfill');

    // EFFECT PANEL
    let Effect_panel = new TypeGrid();
    Effect_panel.setTitle(@LRL-Effect);
    let Story_control = new uiParagraphLabeled('Story', bindings, FRONT, 'medium');
    let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'medium');
    let Occurrence1_control = new uiParagraphLabeled('Occurrence1', bindings, FRONT, 'small');
    let Occurrence2_control = new uiParagraphLabeled('Occurrence2', bindings, FRONT, 'small');
    Effect_panel.place(
        Story_control, 'hfill'
        , Effect_control, 'br hfill'
        , Occurrence1_control, 'br hfill'
        , Occurrence2_control, 'br hfill'
    );
    Main_tab.place(Effect_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // ENCOUNTERSET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

    // ENCOUNTERSET PANEL
    let Encounterset_panel = new TypeGrid();
    Encounterset_panel.setTitle(@LRL-Encounterset);
    let Encounterset_control = new uiEncountersetList(bindings, FRONT);
    list = new Array('Standard', 'Gold', 'Red', 'Green', 'Blue', 'Purple');
    let Difficulty_control = new uiListIconLabeled('Difficulty', list, bindings, FRONT);
    let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
    Encounterset_panel.place(
        Encounterset_control, 'hfill'
     	, Difficulty_control, 'br hfill'
     	, EncountersetPortrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset_panel, 'br hfill');

    // ENCOUNTERSET TAB CLOSE
    Encounterset_tab.addToEditor(editor, @LRL-Encounterset);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

    // TEMPLATE PANEL
    let Template_panel = new TypeGrid();
    Template_panel.setTitle(@LRL-Template);

    list = new Array('Standard', 'Complex', 'Dual');
    let Template_control = new uiListIcon('Template', list, bindings, FRONT);
    Template_panel.place(Template_control, 'hfill');
    Template_tab.place(Template_panel, 'br hfill');

    // REGION PANEL
    let Region_panel = new TypeGrid();
    Region_panel.setTitle(@LRL-Region);
    list = new Array('Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Brown', 'White', 'Black', 'None');
    if (advancedControls) {
    	list = list.concat(new Array('Custom'));
    }
    Region_control = new uiListIcon('Region', list, bindings, BACK);
    Region_panel.place(Region_control, 'hfill');
    Template_tab.place(Region_panel, 'br hfill');
    // CUSTOMREGION PANEL
    if (advancedControls) {
        let CustomRegion_panel = new TypeGrid();
        CustomRegion_panel.setTitle(@LRL-CustomRegion);

        let CustomRegion_control = new uiTint('CustomRegion', bindings, BACK);
        CustomRegion_panel.place(
            CustomRegion_control, 'br hfill'
        );
	    Template_tab.place(CustomRegion_panel, 'br hfill');
    }

    // TEMPLATE TAB CLOSE
    Template_tab.addToEditor(editor, @LRL-Template);

    // PORTRAIT TAB
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;

    // PORTRAIT PANEL
    let Portrait_panel = new TypeGrid();
    Portrait_panel.setTitle(@LRL-Portrait);
    let Artist_control = new uiTextLabeled('Artist', bindings, FRONT);
    let Portrait_control = new uiPortrait('Portrait', diy);
    let PortraitMirror_control = new uiPortraitMirror('Portrait', Portrait_control);
    Portrait_panel.place(
        Artist_control, 'hfill'
        , Portrait_control, 'br hfill'
        , PortraitMirror_control, 'br hfill'
    );
    Portrait_tab.place(Portrait_panel, 'hfill');

    // PORTRAIT TAB CLOSE
    Portrait_tab.addToEditor(editor, @LRL-Portrait);

    // COLLECTION TAB
    let Collection_tab = new TypeGrid();
    Collection_tab.editorTabScrolling = true;

    // COLLECTION PANEL
    let Collection_panel = new TypeGrid();
    Collection_panel.setTitle(@LRL-Collection);
    let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber', bindings, FRONT, 999);
    let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, FRONT);
    let Collection_control = new uiCollectionList(bindings, FRONT);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill'
        , CollectionNumber_control, 'br'
        , CollectionInfo_control, 'hfill'
        , CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

    // OTHER CONTROLS PANEL
    let OtherControls_panel = new TypeGrid();
    OtherControls_panel.setTitle(@LRL-OtherControls);
    let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
    OtherControls_panel.place(Copyright_control, 'hfill');
    if (advancedControls) {
        let Type_control = new uiTextLabeled('Type', bindings, FRONT);
        OtherControls_panel.place(Type_control, 'br hfill');
    }
    Collection_tab.place(OtherControls_panel, 'br hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');
    
    // TEMPLATE
    Difficulty_tinter = new createTinter('Difficulty', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

	// PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Encounterset', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
    
    // TEMPLATE
    Region_tinter = new createTinter('Region', diy);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    paintTemplate(diy, g, sheet);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
	if($Encounterset != 'EmptyIcon'){
	    sheet.paintImage(g, 'Encounterset-decoration');
	    paintDifficulty(diy, g, sheet);
	    paintIcon('Encounterset', diy, g, sheet);
	}

    // TEXTS
    if($Encounterset!='EmptyIcon') {
   	    writeTitle(diy, g);
    }else{
    	writeLine(
    		formatTitle(diy, g), 
    		Title_writer, 
    		diy.settings.getRegion('Title-EmptyIcon'), g
    	) ;
	}

    writeParagraph(
        ['Story'], Body_writer,
        diy.settings.getRegion('Story'), diy, g
    );
    switch ($Template) {
        case 'Complex':
            writeParagraph(
                ['Effect'], Body_writer,
                diy.settings.getRegion('Complex-Body'), diy, g
            );
            let text = diy.settings.get('Occurrence1', '');
            let format = diy.settings.get('Success-format', '');
            let formatEnd = diy.settings.get('Success-formatEnd', '');
            text = format + text + formatEnd;
            Body_writer.setMarkupText(text);
            updateNameTags(Body_writer, diy);
            Body_writer.draw(g, diy.settings.getRegion('Success'));
            text = diy.settings.get('Occurrence2', '');
            format = diy.settings.get('Failure-format', '');
            formatEnd = diy.settings.get('Failure-formatEnd', '');
            text = format + text + formatEnd;
            Body_writer.setMarkupText(text);
            updateNameTags(Body_writer, diy);
            Body_writer.draw(g, diy.settings.getRegion('Failure'));
            break;
        case 'Dual':
            writeParagraph(
                ['Effect'], Body_writer,
                diy.settings.getRegion('Dual-Body'), diy, g
            );
            text = diy.settings.get('Occurrence1', '');
            format = diy.settings.get('Choice1-format', '');
            formatEnd = diy.settings.get('Choice1-formatEnd', '');
            text = format + text + formatEnd;
            Body_writer.setMarkupText(text);
            updateNameTags(Body_writer, diy);
            Body_writer.draw(g, diy.settings.getRegion('Choice1'));
            text = diy.settings.get('Occurrence2', '');
            format = diy.settings.get('Choice2-format', '');
            formatEnd = diy.settings.get('Choice2-formatEnd', '');
            text = format + text + formatEnd;
            Body_writer.setMarkupText(text);
            updateNameTags(Body_writer, diy);
            Body_writer.draw(g, diy.settings.getRegion('Choice2'));
            break;
        default:
            writeBody(['Effect'], diy, g);
    }

	writeType(diy, g);
//    switch ($Template) {
//    	case 'Complex':
//	        if ($Type == '') text = #LRL-ComplexOccurrence;
//	        else text = $Type;
//	        writeLine(text, Type_writer, diy.settings.getRegion('Type'), g);
//			break;
//    	default: writeType(diy, g);
//    }

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    
    // TEMPLATE
    sheet.paintTemplateImage(g);
    //i don't use paintTemplate because there are no variations 

	switch ($Region){
		case null:
		case 'None':
			break;
		case 'Custom':
            debug(5, '\tCustomRegion tint: ' + $CustomRegion-tint);
            let tint = diy.settings.getTint('CustomRegion-tint'); //mover a listener
            Region_tinter.setFactors(tint[0], tint[1], tint[2]);
            sheet.paintImage(g, Region_tinter.getTintedImage(), 'Template');
            break;
		default:
        	if (diy.settings.get('Region-'+$Region)){
	    		sheet.paintImage(g, 'Region-'+$Region, 'Template');
        	}else{
            	if (diy.settings.getTint($Region + '-tint') == null) {
	                debug(0, '\tError: Tint not defined.');
	                debug(0, '\tTint: ' + diy.settings.get($Region + '-tint'));
	                break;
	            }
	            debug(5, '\tTint: ' + diy.settings.get($Region + '-tint'));
	            tint = diy.settings.getTint($Region + '-tint');
	            Region_tinter.setFactors(tint[0], tint[1], tint[2]);
	            sheet.paintImage(g, Region_tinter.getTintedImage(), 'Template');
	        }
	} 
}

function onRead(diy, ois) {
    debug(1, '\nonRead');

    if (diy.settings.get('VersionHistory', '') == '') {
        debug(0, 'VersionHistory nonexistent.');
        $VersionHistory = diy.version;
    }
    let LastVersion = String($VersionHistory).split(',');
    LastVersion = LastVersion[LastVersion.length-1];
    if (LastVersion != Number(SEVersion + LRLVersion + CardVersion)) {
        debug(4, 'VersionHistory updated.');
        $VersionHistory = $VersionHistory + ',' + SEVersion + LRLVersion + CardVersion;
    }
    
    readPortraits(diy, ois);
    
    if(true) onReadOldComponent(diy);

    if (diy.settings.getBoolean('LRL-PreferencesUpdate', false)) loadPreferences(diy);
}

function onWrite(diy, oos) {
    debug(1, '\nonWrite');

    for (let index in PortraitList) {
        oos.writeObject(PortraitList[index]);
    }
    debug(5, 'PortraitList length: '+PortraitList.length);
}

function onClear(diy) {
    debug(1, '\nonClear');

    for (let index in GAMEOBJECT.LocalizableList) {
        diy.settings.reset(GAMEOBJECT.LocalizableList[index]);
    }
}

if (sourcefile == 'Quickscript') {
    Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings');
    Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings');
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
    Eons.namedObjects.LRL = new gameObject();
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/mySElibrary.js');
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/myLRLlibrary.js');
    GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game');
    GameLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons');
    InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface');
    InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons');
    testDIYScript('LRL');
} else {
    useLibrary('res://TheLordOfTheRingsLCG/mySElibrary.js');
    useLibrary('res://TheLordOfTheRingsLCG/myLRLlibrary.js');
}
