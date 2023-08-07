//Añadir Encounterdeco nightmare
//Corregir decoracion nightmare

/* COMPONENT CONFIGURATION */
const Card = 'DividerDeck';
const CardVersion = 1;
// 1: rewrite using new 2023 library

function create(diy) {
    debug(1, '\ncreate');
    diy.extensionName = 'TheLordOfTheRingsLCG.seext';
    diy.version = SELibraryVersion + LRLLibraryVersion + CardVersion;
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
    createPortrait('Group', diy);
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

    // TITLE PANEL
    let Title_panel = new TypeGrid();
    Title_panel.setTitle(@LRL-Title);
    
    let Title_control = new uiTitleParagraph(diy, bindings, BOTH)
    let ByGroup_control = new uiButtonText('ByGroup', diy, bindings, BOTH);
    Title_panel.place(
    	Title_control, 'hfill'
    	, ByGroup_control, 'br, hfill'
    );
    Main_tab.place(Title_panel, 'hfill');

    // GROUP ICON PANEL
    let Group_panel = new TypeGrid();
    Group_panel.setTitle(@LRL-Group);
    list = GAMEOBJECT.DefaultIconList.concat(GAMEOBJECT.FullIconList); // this icon list includes collection, set and others
    let Group_control = new uiListIcon('Group', list, bindings, BOTH);
    let GroupPortrait_control = new uiPortrait('Group', diy);
    Group_panel.place(
        Group_control, 'hfill'
        , GroupPortrait_control, 'br hfill'
    );
    Main_tab.place(Group_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // TEMPLATE TAB
    if (advancedControls) {
	    let Template_tab = new TypeGrid();
	    Template_tab.editorTabScrolling = true;

    	// TEMPLATE PANEL
	    let Template_panel = new TypeGrid();
	    Template_panel.setTitle(@LRL-Template);
	    list = new Array('Standard', 'Nightmare', 'CustomColour');
	    let Template_control = new uiListIcon('Template', list, bindings, BOTH);
	    Template_panel.place(Template_control, 'hfill');
	    Template_tab.place(Template_panel, 'hfill');
	    
	    // CUSTOMCOLOUR PANEL
 	   	let CustomColour_panel = new TypeGrid();
 	   	CustomColour_panel.setTitle(@LRL-CustomColour);
	    list = new Array('Collection', 'CustomColour');
        let ColourBy_control = new uiCyclerLabeled('ColourBy', list, bindings, BOTH);
        let CustomColourInside_control = new uiTint('CustomColour-inside', bindings, BOTH);
       	let CustomColourOutside_control = new uiTint('CustomColour-outside', bindings, BOTH);
        CustomColour_panel.place(
            ColourBy_control, 'hfill'
            , CustomColourInside_control, 'br hfill'
       		, CustomColourOutside_control, 'br hfill'
        );
        Template_tab.place(CustomColour_panel, 'br hfill');
	    
		// TEMPLATE TAB CLOSE
	    Template_tab.addToEditor(editor, @LRL-Template);
    }

    // PORTRAIT TAB
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;

    // PORTRAIT PANEL
    let Portrait_panel = new TypeGrid();
    Portrait_panel.setTitle(@LRL-Portrait);
    let Artist_control = new uiTextLabeled('Artist', bindings, BOTH);
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
    //let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,BOTH) ;
    let Collection_control = new uiCollectionList(bindings, BOTH);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill'
        , CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');

    // TEMPLATE
    CustomColourInside_tinter = new createTinter('CustomColour-inside', diy);
    CustomColourOutside_tinter = new createTinter('CustomColour-outside', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // PORTRAIT
	updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Group', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function paintCommon(diy, g, sheet) {
    debug(2, '\npaintCommon');
    debug(5, 'Side: ' + sheet.getSheetIndex());

    function paintIconDecoratedThis(key, diy, g, sheet) {
        debug(3, '\n\tpaintIconDecoratedThis: ' + key);
        /*
        Paints $icon on the component template adding an image as background.
        */
        debug(5, '\tSide: ' + sheet.getSheetIndex());

        let side = '';
        if (sheet.getSheetIndex() == BACK) side = 'Back';
        // when drawing back side, get correct settings

        let item = diy.settings.get(key);
        if(String(item) != 'EmptyIcon'){
		    //usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
	        let decoration = diy.settings.get(key + '-decoration', '');
	        if (decoration != '') {
	            debug(5, '\tDecoration: ' + decoration);
	            decoration = diy.settings.getImageResource(key + '-decoration');
	        } else throw new Error('\tERROR: ' + key + '-decoration: UNDEFINED');
	
	        let decorationRegion = diy.settings.get(key + side + '-decoration-region', '');
	        if (decorationRegion != '') {
	            debug(5, '\tRegion: ' + decorationRegion);
	            decorationRegion = diy.settings.getRegion(key + side + '-decoration-region');
	        } else throw new Error('\tERROR: ' + key + side + '-decoration-region: UNDEFINED');
     		sheet.paintImage(g, decoration, decorationRegion);
	        paintIconLRL(key, diy, g, sheet);
        }
    }

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    if ($Template == 'CustomColour'){
        let tintIn;
        let tintOut;
	    if (($ColourBy == 'CustomColour') 
	    || ($Collection == 'EmptyIcon') 
	    || ($Collection == 'CustomIcon')) {
	        tintIn = diy.settings.getTint('CustomColour-inside');
            tintOut = diy.settings.getTint('CustomColour-outside');
        } else {
            tintIn = diy.settings.getTint($Collection + '-inside');
            tintOut = diy.settings.getTint($Collection + '-outside');
        }
        CustomColourInside_tinter.setFactors(tintIn[0], tintIn[1], tintIn[2]);
        CustomColourOutside_tinter.setFactors(tintOut[0], tintOut[1], tintOut[2]);
        sheet.paintImage(g, CustomColourInside_tinter.getTintedImage(), 'Template-region');
        sheet.paintImage(g, CustomColourOutside_tinter.getTintedImage(), 'Template-region');
    }
    paintTemplate(diy, g, sheet);

    // ICONS
    paintIconDecoratedThis('Group', diy, g, sheet);
    paintIconDecoratedThis('Collection', diy, g, sheet);

    // TEXT
	writeTextShadowedByIcon('Title', 'Group', Title_writer, diy, g, sheet);
	
 	if(diy.settings.getBoolean('ByGroup', false)){
       switch ($Group) {
            case 'CustomIcon':
            case 'EmptyIcon':
                break;
            default:
                $Name = #('LRL-' + $Group);
        }
 	}

    writeArtist(diy, g, sheet);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');
    paintCommon(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    paintCommon(diy, g, sheet);
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
