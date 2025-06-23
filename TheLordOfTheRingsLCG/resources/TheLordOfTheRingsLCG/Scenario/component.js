// separar tipo para tercera edad?

/* COMPONENT CONFIGURATION */
const Card = 'Scenario';
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
    createPortrait('EncounterSet1', diy);
    createPortrait('EncounterSet2', diy);
    createPortrait('EncounterSet3', diy);
    createPortrait('EncounterSet4', diy);
    createPortrait('EncounterSet5', diy);
    $PortraitListCount = getPortraitCount();
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls');
    if ($Template == 'Custom') advancedControls = true;
    var bindings = new Bindings(editor, diy);

    // MAIN TAB
    let MainFront_tab = new TypeGrid();
    MainFront_tab.editorTabScrolling = true;
    
        // TITLE PANEL
        let Title_panel = new TypeGrid();
        Title_panel.setTitle(@LRL-Title);
        let Title_control = uiTitleByEncounterSet(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        MainFront_tab.place(Title_panel, 'hfill');
    
        // CAMPAIGN PANEL
        let Campaign_panel = new TypeGrid();
        Campaign_panel.setTitle(@LRL-Campaign);
        let Campaign_control = new uiCampaignPart(diy, bindings, FRONT);
        Campaign_panel.place(Campaign_control, 'hfill');
        MainFront_tab.place(Campaign_panel, 'br hfill');
    
        // TEXT BOX PANEL
        let TextBox_panel = new TypeGrid();
        TextBox_panel.setTitle(@LRL-TextBoxFront);
        let Story_control = new uiParagraphLabeled('Story', bindings, FRONT, 'medium');
        let Text_control = new uiParagraphLabeled('Text', bindings, FRONT, 'big');
        let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
        TextBox_panel.place(Story_control, 'hfill', Text_control, 'br hfill', Flavour_control, 'br hfill');
        MainFront_tab.place(TextBox_panel, 'br hfill');
    
        // OTHER EFFECT PANEL
        let OtherEffect_panel = new TypeGrid();
        OtherEffect_panel.setTitle(@LRL-OtherEffect);
        let OptionLeft_control = new uiTextLabeled('OptionLeft', bindings, FRONT);
        let OptionRight_control = new uiTextLabeled('OptionRight', bindings, FRONT);
        OtherEffect_panel.place(OptionRight_control, 'hfill', OptionLeft_control, 'br hfill');
        MainFront_tab.place(OtherEffect_panel, 'br hfill');
    
        // MAIN TAB CLOSE
        MainFront_tab.addToEditor(editor, @LRL-MainFront);

    // MAIN BACK TAB
    var MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;
    
        // TEXT BOX BACK PANEL
        let TextBoxBack_panel = new TypeGrid();
        TextBoxBack_panel.setTitle(@LRL-TextBoxBack);
        let StoryBack_control = new uiParagraphLabeled('StoryBack', bindings, BACK, 'medium');
        let TextBack_control = new uiParagraphLabeled('TextBack', bindings, BACK, 'big');
        let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, BACK, 'medium');
        TextBoxBack_panel.place(StoryBack_control, 'hfill', TextBack_control, 'br hfill', FlavourBack_control, 'br hfill');
        MainBack_tab.place(TextBoxBack_panel, 'br hfill');
    
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
    
        // ADDITIONAL SET 1 PANEL
        let EncounterSet1_panel = new TypeGrid();
        EncounterSet1_panel.setTitle(@LRL-EncounterSet1);
        let EncounterSet1_control = new uiOtherEncounterSetList('EncounterSet1', bindings, FRONT);
        let EncounterSet1Portrait_control = new uiPortrait('EncounterSet1', diy);
        EncounterSet1_panel.place(EncounterSet1_control, 'hfill', EncounterSet1Portrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet1_panel, 'br hfill');
    
        // ADDITIONAL SET 2 PANEL
        let EncounterSet2_panel = new TypeGrid();
        EncounterSet2_panel.setTitle(@LRL-EncounterSet2);
        let EncounterSet2_control = new uiOtherEncounterSetList('EncounterSet2', bindings, FRONT);
        let EncounterSet2Portrait_control = new uiPortrait('EncounterSet2', diy);
        EncounterSet2_panel.place(EncounterSet2_control, 'hfill', EncounterSet2Portrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet2_panel, 'br hfill');
    
        // ADDITIONAL SET 3 PANEL
        let EncounterSet3_panel = new TypeGrid();
        EncounterSet3_panel.setTitle(@LRL-EncounterSet3);
        let EncounterSet3_control = new uiOtherEncounterSetList('EncounterSet3', bindings, FRONT);
        let EncounterSet3Portrait_control = new uiPortrait('EncounterSet3', diy);
        EncounterSet3_panel.place(EncounterSet3_control, 'hfill', EncounterSet3Portrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet3_panel, 'br hfill');
    
        // ADDITIONAL SET 4 PANEL
        let EncounterSet4_panel = new TypeGrid();
        EncounterSet4_panel.setTitle(@LRL-EncounterSet4);
        let EncounterSet4_control = new uiOtherEncounterSetList('EncounterSet4', bindings, FRONT);
        let EncounterSet4Portrait_control = new uiPortrait('EncounterSet4', diy);
        EncounterSet4_panel.place(EncounterSet4_control, 'hfill', EncounterSet4Portrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet4_panel, 'br hfill');
    
        // ADDITIONAL SET 5 PANEL
        let EncounterSet5_panel = new TypeGrid();
        EncounterSet5_panel.setTitle(@LRL-EncounterSet5);
        let EncounterSet5_control = new uiOtherEncounterSetList('EncounterSet5', bindings, FRONT);
        let EncounterSet5Portrait_control = new uiPortrait('EncounterSet5', diy);
        EncounterSet5_panel.place(EncounterSet5_control, 'hfill', EncounterSet5Portrait_control, 'br hfill');
        EncounterSet_tab.place(EncounterSet5_panel, 'br hfill');
    
        // ENCOUNTER SET TAB CLOSE
        EncounterSet_tab.addToEditor(editor, @LRL-EncounterSet);

    // TEMPLATE TAB
    if (advancedControls) {
        let Template_tab = new TypeGrid();
        Template_tab.editorTabScrolling = true;
    
        // TEMPLATE PANEL
        let Template_panel = new TypeGrid();
        Template_panel.setTitle(@LRL-Template);
    
        let list = new Array('Standard', 'CustomColour');
        let Template_control = new uiListIcon('Template', list, bindings, BOTH);
        Template_panel.place(Template_control, 'hfill');
        Template_tab.place(Template_panel, 'hfill');

        // CUSTOM COLOUR PANEL
        let CustomColour_panel = new TypeGrid();
        CustomColour_panel.setTitle(@LRL-CustomColour);
        let CustomColour_control = new uiTint('CustomColour', bindings, BOTH);
        CustomColour_panel.place(CustomColour_control, 'hfill');
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
        let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, FRONT);
        let Collection_control = new uiCollectionList(bindings, FRONT);
        let CollectionPortrait_control = new uiPortrait('Collection', diy);
        Collection_panel.place(Collection_control, 'hfill', CollectionInfo_control, 'br hfill', CollectionPortrait_control, 'br hfill');
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
    debug(1, 'createFrontPainter');

    // TEMPLATE
    CustomColour_tinter = new createTinter('CustomColour', diy);
    Adapter_tinter = new createTinter('CustomColour', diy);

    Title_writer = new createWriter('Title', diy, sheet);
    Campaign_writer = new createWriter('Campaign', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);

    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('EncounterSet', diy);
    updateExternalPortrait('EncounterSet1', diy);
    updateExternalPortrait('EncounterSet2', diy);
    updateExternalPortrait('EncounterSet3', diy);
    updateExternalPortrait('EncounterSet4', diy);
    updateExternalPortrait('EncounterSet5', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');

    // TEMPLATE
    CustomColourBack_tinter = new createTinter('CustomColour', diy);
    CustomColourBack_tinter.setImage(diy.settings.getImageResource('CustomColourBack-tintable'));
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    /* PORTRAIT */
    paintPortrait('Portrait', diy, g, sheet);

    /* TEMPLATE */
    sheet.paintTemplateImage(g);
    if ($Template == 'CustomColour') {
        paintCustomColour(diy, g, sheet);
    } else {
        sheet.paintImage(g, 'Standard-overlay', 'Template-region');
    }

    /* ICONS */
    paintIcon('Collection', diy, g, sheet);
    paintIconLRL('EncounterSet', diy, g, sheet);
    var adapterList = new Array('EncounterSet1', 'EncounterSet2', 'EncounterSet3', 'EncounterSet4', 'EncounterSet5');
    paintAdapter(adapterList, diy, g, sheet);
    if ($Template == 'CustomColour') paintAdapterTinted(adapterList, diy, g, sheet);
    paintIcon('EncounterSet1', diy, g, sheet);
    paintIcon('EncounterSet2', diy, g, sheet);
    paintIcon('EncounterSet3', diy, g, sheet);
    paintIcon('EncounterSet4', diy, g, sheet);
    paintIcon('EncounterSet5', diy, g, sheet);

    /* TEXT */
    writeTitleByEncounterSet(diy, g);
    writeCampaignPart(diy, g);
    writeBody(['Story', 'Text', 'Flavour'], diy, g);

    writeOption('OptionLeft', diy, g, sheet);
    writeOption('OptionRight', diy, g, sheet);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeType(diy, g);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    /* TEMPLATE */
    sheet.paintTemplateImage(g);
    if ($Template == 'CustomColour') paintCustomColourBack(diy, g, sheet);

    /* ICON */
    paintIcon('Collection', diy, g, sheet);

    /* TEXT */
    writeBodyBack(['StoryBack', 'TextBack', 'FlavourBack'], diy, g);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
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