//añadir pesadilla
// añadir paintdifficulty

/* COMPONENT CONFIGURATION */
const Card = 'SideQuest';
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

        // TITLE PANEL
        let Title_panel = new TypeGrid();
        Title_panel.setTitle(@LRL-Title);
        let Title_control = uiTitle(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        Main_tab.place(Title_panel, 'hfill');
    
        // STATS PANEL
        let Stats_panel = new TypeGrid();
        Stats_panel.setTitle(@LRL-Stats);
        if (advancedControls) let limit = 99;
        else limit = 19;
        let Progress_control = new uiStatIcon('Progress', bindings, FRONT, limit, ['X', '-']);
        Stats_panel.place(Progress_control, '');
        Main_tab.place(Stats_panel, 'br hfill');
    
        // TEXT BOX PANEL
        let TextBox_panel = new TypeGrid();
        TextBox_panel.setTitle(@LRL-TextBox);
        let Story_control = new uiParagraphLabeled('Story', bindings, FRONT, 'small');
        let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
        let Condition_control = new uiParagraphLabeled('Condition', bindings, FRONT, 'small');
        TextBox_panel.place(Story_control, 'hfill', Effect_control, 'br hfill', Condition_control, 'br hfill');
        Main_tab.place(TextBox_panel, 'br hfill');
    
        // OTHER EFFECT PANEL
        let OtherEffect_panel = new TypeGrid();
        OtherEffect_panel.setTitle(@LRL-OtherEffect);
        let OptionRight_control = new uiTextLabeled('OptionRight', bindings, FRONT);
        OtherEffect_panel.place(OptionRight_control, 'hfill');
        Main_tab.place(OtherEffect_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // ENCOUNTER SET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

        // ENCOUNTER SET PANEL
        let Encounterset_panel = new TypeGrid();
        Encounterset_panel.setTitle(@LRL-Encounterset);
        let Encounterset_control = new uiEncountersetList(bindings, FRONT);
        let EncountersetNumber_control = new uiEncountersetNumber(bindings);
        Encounterset_panel.place(Encounterset_control, 'hfill', EncountersetNumber_control, 'br');
        if (advancedControls) {
            list = new Array('Standard', 'Gold', 'Red', 'Green', 'Blue', 'Purple');
            let Difficulty_control = new uiListIconLabeled('Difficulty', list, bindings, FRONT);
            Encounterset_panel.place(Difficulty_control, 'hfill');
        }
        let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
        Encounterset_panel.place(EncountersetPortrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset_panel, 'br hfill');
    
    // ENCOUNTER SET TAB CLOSE
    Encounterset_tab.addToEditor(editor, @LRL-Encounterset);

    // TEMPLATE TAB
    if (advancedControls) {
        let Template_tab = new TypeGrid();
        Template_tab.editorTabScrolling = true;

        // TEMPLATE PANEL
        let Template_panel = new TypeGrid();
        Template_panel.setTitle(@LRL-Template);
        list = new Array('Standard', 'Nightmare');
        let Template_control = new uiListIcon('Template', list, bindings, FRONT);
        Template_panel.place(Template_control, 'hfill');
        Template_tab.place(Template_panel, 'hfill');

        // TEMPLATE BACK PANEL
        let TemplateBack_panel = new TypeGrid();
        TemplateBack_panel.setTitle(@LRL-TemplateBack);
        list = new Array('EncounterHorizontal', 'PlayerHorizontal');
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
        list = new Array('None', 'Black');
        if (advancedControls) list = list.concat(new Array('CustomColour'));
        let PortraitShadow_control = new uiCyclerLabeled('Portrait-shadow', list, bindings, FRONT);
        let PortraitMirror_control = new uiPortraitMirror('Portrait', Portrait_control);
        Portrait_panel.place(Artist_control, 'hfill', Portrait_control, 'br hfill', PortraitMirror_control, 'br hfill', PortraitShadow_control, '');
        if (advancedControls) {
            let PortraitShadowTint_control = new uiTint('Portrait-shadow', bindings, FRONT);
            Portrait_panel.place(PortraitShadowTint_control, 'br hfill');
        }
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
        Collection_tab.place(OtherControls_panel, 'br hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');

    // TEMPLATE
    Difficulty_tinter = new createTinter('Difficulty', diy);

    // STATS
    Progress_tinter = new createTinter('Progress', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    EncountersetNumber_writer = new createWriter('EncountersetNumber', diy, sheet);

    // PORTRAIT
    PortraitShadow_tinter = new createTinter('Portrait-shadow', diy);
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Encounterset', diy);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);
    paintPortraitShadow('Portrait', PortraitShadow_tinter, diy, g, sheet);

    // TEMPLATE
    paintTemplate(diy, g, sheet);
    paintDifficulty(diy, g, sheet);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    paintIconLRL('Encounterset', diy, g, sheet);

    // STATS
    paintStatTinted('Progress', Progress_tinter, diy, g, sheet);

    // TEXTS
    writeTitle(diy, g);
    if ($OptionRight != '') {
        writeOption('OptionRight', diy, g, sheet);
        Body_writer.setPageShape(diy.settings.getCupShape('Option-Body-shape'));
    } else Body_writer.setPageShape(PageShape.RECTANGLE_SHAPE);

    writeBody(['Story', 'Effect', 'Condition'], diy, g);

    writeEncountersetNumber(diy, g);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    paintTemplateBack(diy, g, sheet);
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