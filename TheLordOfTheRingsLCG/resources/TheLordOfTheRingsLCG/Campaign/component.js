/* COMPONENT CONFIGURATION */
const Card = 'Campaign';
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
    createPortrait('EncounterSet', diy);
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
        let Title_control = uiTitleByEncounterSet(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        Main_tab.place(Title_panel, 'hfill');
    
        // CAMPAIGN PANEL
        let Campaign_panel = new TypeGrid();
        Campaign_panel.setTitle(@LRL-Campaign);
        let Campaign_control = new uiCampaignPart(diy, bindings, FRONT);
        Campaign_panel.place(Campaign_control, 'hfill');
        Main_tab.place(Campaign_panel, 'br hfill');
    
        // TEXT BOX PANEL
        let TextBox_panel = new TypeGrid();
        TextBox_panel.setTitle(@LRL-TextBox);
        let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
        let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
        TextBox_panel.place(Effect_control, 'hfill', Flavour_control, 'br hfill');
        Main_tab.place(TextBox_panel, 'br hfill');
    
        // MAIN TAB CLOSE
        Main_tab.addToEditor(editor, @LRL-MainFront);

    // MAIN BACK TAB
    var MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;
    
        // TEXT BOX BACK PANEL
        let TextBoxBack_panel = new TypeGrid();
        TextBoxBack_panel.setTitle(@LRL-TextBox);
        let EffectBack_control = new uiParagraphLabeled('EffectBack', bindings, BACK, 'huge');
        let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, BACK, 'medium');
        TextBoxBack_panel.place(EffectBack_control, 'hfill', FlavourBack_control, 'br hfill');
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
        let EncounterSetPortrait_control = new uiPortrait('EncounterSet', diy);
        EncounterSet_panel.place(EncounterSet_control, 'hfill', EncounterSetPortrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet_panel, 'hfill');
    
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
        let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber', bindings, BOTH, 999);
        let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, BOTH);
        let Collection_control = new uiCollectionList(bindings, BOTH);
        let CollectionPortrait_control = new uiPortrait('Collection', diy);
        Collection_panel.place(Collection_control, 'hfill', CollectionNumber_control, 'br', CollectionInfo_control, 'hfill', CollectionPortrait_control, 'br hfill');
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

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Campaign_writer = new createWriter('Campaign', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('EncounterSet', diy);
    updateExternalPortrait('Collection', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    sheet.paintTemplateImage(g);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    paintIcon('EncounterSet', diy, g, sheet);

    // TEXTS
    writeTitleByEncounterSet(diy, g);
    writeCampaignPart(diy, g);
    writeBody(['Effect', 'Flavour'], diy, g);

    writeType(diy, g);
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
    paintIcon('Collection', diy, g, sheet);

    // TEXTS
    let region = diy.settings.getRegion('BodyBack');
    if (($OptionLeftBack != '') || ($OptionRightBack != '')) {
        region = getArray('BodyBack-region', diy);
        region[3] = Number(region[3]) - 6;
        region = new Region([Number(region[0]), Number(region[1]), Number(region[2]), Number(region[3])]);
    }
    writeParagraph(['EffectBack', 'FlavourBack'], Body_writer, region, diy, g);

    writeOption('OptionLeftBack', diy, g, sheet);
    writeOption('OptionRightBack', diy, g, sheet);

    writeArtistBack(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
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