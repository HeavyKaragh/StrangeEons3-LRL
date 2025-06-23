//añadir setup standard

/* COMPONENT CONFIGURATION */
const Card = 'Setup';
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
    createPortrait('EncounterSet', diy);
    createPortrait('Collection', diy);
    $PortraitListCount = getPortraitCount();
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls');
    var bindings = new Bindings(editor, diy);

    // MAIN FRONT TAB
    let MainFront_tab = new TypeGrid();
    MainFront_tab.editorTabScrolling = true;
    
        // TITLE PANEL
        let Title_panel = new TypeGrid();
        Title_panel.setTitle(@LRL-Title);
        let Title_control = uiTitle(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        MainFront_tab.place(Title_panel, 'hfill');
    
        // TEXT BOX PANEL
        let TextBoxFront_panel = new TypeGrid();
        TextBoxFront_panel.setTitle(@LRL-TextBoxFront);
        let Text_control = new uiParagraphLabeled('Text', bindings, FRONT, 'big');
        let Condition_control = new uiParagraphLabeled('Condition', bindings, FRONT, 'small');
        let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
        TextBoxFront_panel.place(Text_control, 'hfill', Condition_control, 'br hfill', Flavour_control, 'br hfill');
        MainFront_tab.place(TextBoxFront_panel, 'br hfill');
    
        // MAIN FRONT TAB CLOSE
        MainFront_tab.addToEditor(editor, @LRL-MainFront);

    // MAIN BACK TAB
    let MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;
    
        // TEXT BOX BACK PANEL
        let TextBoxBack_panel = new TypeGrid();
        TextBoxBack_panel.setTitle(@LRL-TextBoxBack);
        let TextBack_control = new uiParagraphLabeled('TextBack', bindings, BACK, 'big');
        let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, BACK, 'medium');
        TextBoxBack_panel.place(TextBack_control, 'hfill', FlavourBack_control, 'br hfill');
        MainBack_tab.place(TextBoxBack_panel, 'hfill');
    
        // MAIN BACK TAB CLOSE
        MainBack_tab.addToEditor(editor, @LRL-MainBack);

    // ENCOUNTER SET TAB
    var EncounterSet_tab = new TypeGrid();
    EncounterSet_tab.editorTabScrolling = true;
    
        // ENCOUNTER SET PANEL
        let EncounterSet_panel = new TypeGrid();
        EncounterSet_panel.setTitle(@LRL-EncounterSet);
        let EncounterSet_control = new uiEncounterSetList(bindings, FRONT);
        let EncounterSetNumber_control = new uiEncounterSetNumber(bindings, FRONT);
        EncounterSet_panel.place(EncounterSet_control, 'hfill', EncounterSetNumber_control, 'br');
        let EncounterSetPortrait_control = new uiPortrait('EncounterSet', diy);
        EncounterSet_panel.place(EncounterSetPortrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet_panel, 'br hfill');
    
        // ENCOUNTER SET TAB CLOSE
        EncounterSet_tab.addToEditor(editor, @LRL-EncounterSet);

    // PORTRAIT TAB
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;
    
        // PORTRAIT PANEL
        let Portrait_panel = new TypeGrid();
        Portrait_panel.setTitle(@LRL-Portrait);
        let Artist_control = new uiTextLabeled('Artist', bindings, FRONT);
        let Portrait_control = new uiPortrait('Portrait', diy);
        let PortraitMirror_control = new uiPortraitMirror('Portrait', Portrait_control);
        Portrait_panel.place(Artist_control, 'hfill', Portrait_control, 'br hfill', PortraitMirror_control, 'br hfill');
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
        Collection_panel.place(Collection_control, 'hfill', CollectionNumber_control, 'br', CollectionInfo_control, 'hfill', CollectionPortrait_control, 'br hfill');
        Collection_tab.place(Collection_panel, 'hfill');
    
        // OTHER CONTROLS PANEL
        let OtherControls_panel = new TypeGrid();
        OtherControls_panel.setTitle(@LRL-OtherControls);
        let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
        OtherControls_panel.place(Copyright_control, 'hfill');
        if (advancedControls) {
            let Type_control = new uiTextLabeled('Type', bindings, BACK);
            OtherControls_panel.place(Type_control, 'br hfill');
        }
        Collection_tab.place(OtherControls_panel, 'br hfill');
    
        // COLLECTION TAB CLOSE
        Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');

    // STATS
    EncounterSetNumber_writer = new createWriter('EncounterSetNumber', diy, sheet);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('EncounterSet', diy);
    updateExternalPortrait('Collection', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
    debug(1, 'createBackPainter');

    Type_writer = new createWriter('Type', diy, sheet);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    sheet.paintTemplateImage(g);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    paintIconLRL('EncounterSet', diy, g, sheet);

    // TEXTS
    writeTitle(diy, g);
    writeBody(['Text', 'Condition', 'Flavour'], diy, g);

    writeEncounterSetNumber(diy, g);

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
    sheet.paintTemplateImage(g);

    // ICONS

    // TEXTS
    writeBodyBack(['TextBack', 'FlavourBack'], diy, g);
    writeType(diy, g);
}

function onRead(diy, ois) {
    debug(1, '\nonRead');

    if (diy.settings.get('VersionHistory', '') == '') {
        debug(0, 'VersionHistory nonexistent.');
        $VersionHistory = diy.version;
    }
    let LastVersion = String($VersionHistory).split(',');
    LastVersion = LastVersion[LastVersion.length - 1];
    if (LastVersion != Number(SEVersion + LRLVersion + CardVersion)) {
        debug(4, 'VersionHistory updated.');
        $VersionHistory = $VersionHistory + ',' + SEVersion + LRLVersion + CardVersion;
    }

    readPortraits(diy, ois);

    if (true) onReadOldComponent(diy);

    if (diy.settings.getBoolean('LRL-PreferencesUpdate', false)) loadPreferences(diy);
}

function onWrite(diy, oos) {
    debug(1, '\nonWrite');

    for (let index in PortraitList) {
        oos.writeObject(PortraitList[index]);
    }
    debug(5, 'PortraitList length: ' + PortraitList.length);
}

function onClear(diy) {
    debug(1, '\nonClear');

    for (let index in GAMEOBJECT.LocalizableList) {
        diy.settings.reset(GAMEOBJECT.LocalizableList[index]);
    }
}

if (sourcefile == 'Quickscript') {
    Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings');
    Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-Icons/resources/TheLordOfTheRingsLCG/LRL-I.settings');
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
    Eons.namedObjects.LRL = new gameObject();
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/mySElibrary.js');
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/myLRLlibrary.js');
    GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game');
    GameLanguage.addStrings('project:TheLordOfTheRingsLCG-Icons/resources/TheLordOfTheRingsLCG/text/icons.properties');
    InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface');
    InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-Icons/resources/TheLordOfTheRingsLCG/text/icons');
    testDIYScript('LRL');
} else {
    useLibrary('res://TheLordOfTheRingsLCG/mySElibrary.js');
    useLibrary('res://TheLordOfTheRingsLCG/myLRLlibrary.js');
}