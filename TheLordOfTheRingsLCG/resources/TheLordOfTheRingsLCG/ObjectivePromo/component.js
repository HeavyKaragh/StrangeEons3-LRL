//corregir plantilla ring
//añadir nightmare

/* COMPONENT CONFIGURATION */
const Card = 'ObjectivePromo';
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

    // TITLE PANEL
    let Title_panel = new TypeGrid();
    Title_panel.setTitle(@LRL-Title);
    let Title_control = uiTitleUnique(diy, bindings, FRONT);
    Title_panel.place(Title_control, 'hfill');
    Main_tab.place(Title_panel, 'hfill');

    // SCENARIO PANEL
    let Scenario_panel = new TypeGrid();
    Scenario_panel.setTitle(@LRL-Scenario);
    let Scenario_control = new uiText('Scenario', bindings, BOTH);
    Scenario_panel.place(Scenario_control, 'hfill');
    Main_tab.place(Scenario_panel, 'br hfill');

    // TEXTBOX PANEL
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);
    let Traits_control = new uiParagraphLabeled('Traits', bindings, FRONT, 'line');
    let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
    let Shadow_control = new uiParagraphLabeled('Shadow', bindings, FRONT, 'medium');
    let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
    TextBox_panel.place(
        Traits_control, 'hfill'
        , Effect_control, 'br hfill'
        , Shadow_control, 'br hfill'
        , Flavour_control, 'br hfill'
    );
    Main_tab.place(TextBox_panel, 'br hfill');

    // OTHER EFFECT PANEL
    let OtherEffect_panel = new TypeGrid();
    OtherEffect_panel.setTitle(@LRL-OtherEffect);
    let OptionRight_control = new uiTextLabeled('OptionRight', bindings, FRONT);
    OtherEffect_panel.place(OptionRight_control, 'hfill');
    if (advancedControls){
	    let OptionLeft_control = new uiTextLabeled('OptionLeft', bindings, FRONT);
	    let OptionSpecial_control = new uiListIconLabeled('OptionSpecial', GAMEOBJECT.OptionSpecialList, bindings, FRONT);
	    OtherEffect_panel.place(
	        OptionLeft_control, 'br hfill'
	        , OptionSpecial_control, 'br hfill'
	    );
	}
    Main_tab.place(OtherEffect_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // ENCOUNTERSET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

    // ENCOUNTERSET PANEL
    let Encounterset_panel = new TypeGrid();
    Encounterset_panel.setTitle(@LRL-Encounterset);
    let Encounterset_control = new uiEncountersetList(bindings, FRONT);
    let EncountersetNumber_control = new uiEncountersetNumber(bindings);
    Encounterset_panel.place(
        Encounterset_control, 'hfill'
        , EncountersetNumber_control, 'br'
    );
    if (advancedControls) {
        list = new Array('Standard', 'Gold', 'Red', 'Green', 'Blue', 'Purple');
        let Difficulty_control = new uiListIconLabeled('Difficulty', list, bindings, FRONT);
        Encounterset_panel.place(Difficulty_control, 'hfill');
    }
    let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
    Encounterset_panel.place(EncountersetPortrait_control, 'br hfill');
    Encounterset_tab.place(Encounterset_panel, 'hfill');

    // ENCOUNTERSET TAB CLOSE
    Encounterset_tab.addToEditor(editor, @LRL-Encounterset);

    // TEMPLATE TAB
    if (advancedControls) {
	    let Template_tab = new TypeGrid();
	    Template_tab.editorTabScrolling = true;

 	    // TEMPLATE PANEL
        let Template_panel = new TypeGrid();
        Template_panel.setTitle(@LRL-Template);
        list = new Array('Standard', 'Burden', 'Ring');
        let Template_control = new uiListIcon('Template', list, bindings, FRONT);
        let CustomColour_control = new uiTint('CustomColour', bindings, FRONT);
        Template_panel.place(
        	Template_control, 'hfill'
        	, CustomColour_control, 'br hfill'
		);
        Template_tab.place(Template_panel, 'hfill');

	    // TEMPLATEBACK PANEL
	    let TemplateBack_panel = new TypeGrid();
	    TemplateBack_panel.setTitle(@LRL-TemplateBack);
 		list = new Array('Encounter', 'Player');
    	let TemplateBack_control = new uiListIcon('TemplateBack', list, bindings, BACK);
	    TemplateBack_panel.place(TemplateBack_control, 'hfill');
		Template_tab.place(TemplateBack_panel, 'br hfill');
	
	    // TEMPLATE TAB CLOSE
    	Template_tab.addToEditor(editor, @LRL-Template);
	}

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
        let Subtype_control = new uiTextLabeled('Subtype', bindings, FRONT);
        OtherControls_panel.place(
            Type_control, 'br hfill'
            , Subtype_control, 'br hfill'
        );
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
    Ring_tinter = new createTinter('Ring', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Scenario_writer = new createWriter('Scenario', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Subtype_writer = new createWriter('Subtype', diy, sheet);
    EncountersetNumber_writer = new createWriter('EncountersetNumber', diy, sheet);
    Scenario_writer = new createWriter('Scenario', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Encounterset', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function paintFront(g, diy, sheet) {
    debug(1, 'paintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    if ($Template == 'Ring') {
       // Ring_tinter.setImage(diy.settings.getImageResource('Ring-tintable'));
        tint = diy.settings.getTint('CustomColour');
        Ring_tinter.setFactors(tint[0], tint[1], tint[2]);
        sheet.paintImage(g, Ring_tinter.getTintedImage(), 'Template');
        paintTemplate(diy, g, sheet);
    } else {
        paintTemplate(diy, g, sheet);
        if ($Template == 'Standard') paintDifficulty(diy, g, sheet);
    }

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    if ($Template != 'Ring') paintIcon('Encounterset', diy, g, sheet);
    paintIcon('OptionSpecial', diy, g, sheet);

    // TEXTS
    writeTitle(diy, g);
    if ($Template == 'Burden') Body_writer.setPageShape(diy.settings.getCupShape('Burden-Body-shape'));
    else Body_writer.setPageShape(PageShape.RECTANGLE_SHAPE);
    writeBody(['Traits', 'Effect', 'Shadow', 'Flavour'], diy, g);

    if ($Template != 'Ring') writeScenario(diy, g);
    if ($Template == 'Standard') writeEncountersetNumber(diy, g);

    writeType(diy, g);
    if ($Template == 'Burden') writeSubtype(diy, g);
    writeOption('OptionLeft', diy, g, sheet);
    writeOption('OptionRight', diy, g, sheet);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    // TEMPLATE
    paintTemplateBack(diy, g, sheet);
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