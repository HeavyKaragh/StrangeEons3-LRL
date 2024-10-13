/* COMPONENT CONFIGURATION */
const Card = 'Attachment';
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
    createPortrait('SphereIcon', diy);
    createPortrait('BodyIcon', diy);
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

    // STATS PANEL
    let Stats_panel = new TypeGrid();
    Stats_panel.setTitle(@LRL-Stats);
    if (advancedControls) let limit = 99;
    else limit = 9;
    let ResourceCost_control = new uiStatIcon('ResourceCost', bindings, FRONT, limit, ['X', '-']);
    Stats_panel.place(ResourceCost_control, '');
    Main_tab.place(Stats_panel, 'br hfill');

    // TEXTBOX PANEL
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);
    let Traits_control = new uiParagraphLabeled('Traits', bindings, FRONT, 'line');
    let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
    let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
    TextBox_panel.place(
        Traits_control, 'hfill'
        , Effect_control, 'br hfill'
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
	    OtherEffect_panel.place(OptionLeft_control, 'br hfill');
	}
    Main_tab.place(OtherEffect_panel, 'br hfill');

	// MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

    // SPHERE PANEL
    let Sphere_panel = new TypeGrid();
    Sphere_panel.setTitle(@LRL-Sphere);
    list = new Array('Neutral', 'Leadership', 'Lore', 'Spirit', 'Tactics');
    if (advancedControls) list = list.concat(new Array('Boon', 'Baggins', 'Fellowship', 'CustomSphere', 'Mastery'));
    let Sphere_control = new uiListIcon('Template', list, bindings, FRONT);
    Sphere_panel.place(Sphere_control, 'hfill');
	Template_tab.place(Sphere_panel, 'hfill');

    // CUSTOMSPHERE PANEL
    if (advancedControls) {
        let CustomSphere_panel = new TypeGrid();
        CustomSphere_panel.setTitle(@LRL-CustomSphere);
        let CustomSphere_control = new uiTint('CustomSphere', bindings, FRONT);
        let SphereIcon_control = new uiPortrait('SphereIcon', diy);
        let BodyIcon_control = new uiPortrait('BodyIcon', diy);
        let BodyIconTransparency_control = new uiTransparency('BodyIcon', bindings, FRONT);
        let BodyIconTinted_control = new uiButtonText('BodyIcon-tinted', diy, bindings, FRONT)
       CustomSphere_panel.place(
            CustomSphere_control, 'hfill'
            , SphereIcon_control, 'br hfill'
            , BodyIcon_control, 'br hfill'
            , BodyIconTransparency_control, 'br hfill'
            , BodyIconTinted_control, ''
        );
	    Template_tab.place(CustomSphere_panel, 'br hfill');
	}
	
    // TEMPLATEBACK PANEL
    if (advancedControls) {
         let TemplateBack_panel = new TypeGrid();
        TemplateBack_panel.setTitle(@LRL-TemplateBack);
        list = new Array('Player', 'Encounter');
        let TemplateBack_control = new uiListIcon('TemplateBack', list, bindings, BACK);
        TemplateBack_panel.place(TemplateBack_control, 'hfill');
        Template_tab.place(TemplateBack_panel, 'br hfill');
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
    Body_tinter = new createTinter('Body', diy);
    BodyIcon_tinter = new createTinter('BodyIcon', diy);
    Pearl_tinter = new createTinter('Pearl', diy);

    // STATS
    ResourceCost_tinter = new createTinter('ResourceCost', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Traits_writer = new createWriter('Traits', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Subtype_writer = new createWriter('Subtype', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('SphereIcon', diy);
    updateExternalPortrait('BodyIcon', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    if ($Template == 'CustomSphere') paintCustomSphereBody(diy, g, sheet);
    paintTemplate(diy, g, sheet);
    if ($Template == 'CustomSphere') paintCustomSpherePearl(diy, g, sheet);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    if ($Template == 'CustomSphere') paintPortrait('SphereIcon', diy, g, sheet);

    // STATS
    paintStatTinted('ResourceCost', ResourceCost_tinter, diy, g, sheet);

    // TEXTS
    writeTitle(diy, g);
    writeTraits(diy, g, sheet);
    writeBody(['Effect', 'Flavour'], diy, g);

    writeType(diy, g);
    if ($Template == 'Boon') writeSubtype(diy, g);
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
