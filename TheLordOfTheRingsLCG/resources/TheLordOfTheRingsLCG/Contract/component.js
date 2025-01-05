/* COMPONENT CONFIGURATION */
const Card = 'Contract';
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
    createPortrait('PortraitBack', diy);
    createPortrait('Collection', diy);
    $PortraitListCount = getPortraitCount();
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls');
    var bindings = new Bindings(editor, diy);

    // MAIN TAB
    let Main_tab = new TypeGrid();
    Main_tab.editorTabScrolling = true;

    // TITLE PANEL
    let Title_panel = new TypeGrid();
    Title_panel.setTitle(@LRL-Title);
    let Title_control = uiTitle(diy, bindings, BOTH);
    Title_panel.place(Title_control, 'hfill');
    Main_tab.place(Title_panel, 'hfill');

    // TEXTBOX PANEL
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);
    let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
    let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
    TextBox_panel.place(
        Effect_control, 'hfill'
        , Flavour_control, 'br hfill'
    );
    Main_tab.place(TextBox_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // MAINBACK TAB
    var MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;

    // TEXTBOXBACK PANEL
    let TextBoxBack_panel = new TypeGrid();
    TextBoxBack_panel.setTitle(@LRL-TextBoxBack);
    let EffectBack_control = new uiParagraphLabeled('EffectBack', bindings, BACK, 'big');
    let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, BACK, 'medium');
    TextBoxBack_panel.place(
        EffectBack_control, 'hfill'
        , FlavourBack_control, 'br hfill'
    );
    MainBack_tab.place(TextBoxBack_panel, 'hfill');

    // MAINBACK TAB CLOSE
    MainBack_tab.addToEditor(editor, @LRL-MainBack);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

    // TEMPLATE PANEL
    let Template_panel = new TypeGrid();
    Template_panel.setTitle(@LRL-Template);
    let list = new Array('SingleSided', 'DoubleSided');
    let Template_control = new uiListIcon('Template', list, bindings, BOTH);
    Template_panel.place(Template_control, 'hfill');
    Template_tab.place(Template_panel, 'hfill');

    // TEMPLATE TAB CLOSE
    Template_tab.addToEditor(editor, @LRL-Template);

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

    // PORTRAIT PANEL	
    let PortraitBack_panel = new TypeGrid();
    PortraitBack_panel.setTitle(@LRL-PortraitBack);
    let ArtistBack_control = new uiTextLabeled('ArtistBack', bindings, BACK);
    let PortraitBack_control = new uiPortrait('PortraitBack', diy);
    let PortraitBackShare_control = new uiButtonText('PortraitBack-share', diy, bindings, BACK);
    let PortraitBackMirror_control = new uiPortraitMirror('PortraitBack', PortraitBack_control);
    PortraitBack_panel.place(
        PortraitBackShare_control, ''
        , ArtistBack_control, 'hfill'
        , PortraitBack_control, 'br hfill'
        , PortraitBackMirror_control, 'br hfill'
    );
    Portrait_tab.place(PortraitBack_panel, 'br hfill');

    // PORTRAIT TAB CLOSE
    Portrait_tab.addToEditor(editor, @LRL-Portrait);

    // COLLECTION TAB
    let Collection_tab = new TypeGrid();
    Collection_tab.editorTabScrolling = true;

    // COLLECTION PANEL
    let Collection_panel = new TypeGrid();
    Collection_panel.setTitle(@LRL-Collection);
    let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber', bindings, BOTH, 999);
    let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, BOTH);
    let Collection_control = new uiCollectionList(bindings, BOTH);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill'
        , CollectionNumber_control, 'br'
        , CollectionInfo_control, 'hfill'
        , CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

    // OTHER PANEL
    let OtherControls_panel = new TypeGrid();
    OtherControls_panel.setTitle(@LRL-OtherControls);
    let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
    OtherControls_panel.place(Copyright_control, 'hfill');
    if (advancedControls) {
        let Type_control = new uiTextLabeled('Type', bindings, FRONT);
        let SideFront_control = new uiTextLabeled('SideFront', bindings, FRONT);
        let SideBack_control = new uiTextLabeled('SideBack', bindings, BACK);
        OtherControls_panel.place(
            Type_control, 'br hfill'
            , SideFront_control, 'br hfill'
            , SideBack_control, 'br hfill'
        );
    }
    Collection_tab.place(OtherControls_panel, 'br hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Side_writer = new createWriter('Side', diy, sheet);

	// PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');

    // PORTRAIT
    updateExternalPortrait('PortraitBack', diy);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    sheet.paintTemplateImage(g);
    if ($Template == 'DoubleSided') sheet.paintImage(g, 'Side-decoration', 'Template');

    // ICONS
    paintIcon('Collection', diy, g, sheet);

    // TEXTS
    writeTitle(diy, g);
    writeBody(['Effect', 'Flavour'], diy, g);

    if ($Template == 'DoubleSided') writeSide(diy, g, sheet);

    writeType(diy, g);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    if ($Template != 'DoubleSided') sheet.paintTemplateImage(g);
    else {
        // PORTRAIT
        if (diy.settings.getBoolean('PortraitBack-share')) paintPortrait('Portrait', diy, g, sheet);
        else paintPortrait('PortraitBack', diy, g, sheet);

        // TEMPLATE
        sheet.paintImage(g, 'Neutral-template', 'Template');
        sheet.paintImage(g, 'Side-decoration', 'Template');

        // ICONS
        paintIcon('Collection', diy, g, sheet);

        // TEXTS
        writeTitle(diy, g);
        writeBody(['EffectBack', 'FlavourBack'], diy, g);

        writeSide(diy, g, sheet);

        writeType(diy, g);

        if (diy.settings.getBoolean('PortraitBack-share')) writeArtist(diy, g, sheet);
        else writeArtistBack(diy, g, sheet);
        writeCopyright(diy, g, sheet);
        writeCollectionInfo(diy, g, sheet);
        writeCollectionNumber(diy, g, sheet);
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
