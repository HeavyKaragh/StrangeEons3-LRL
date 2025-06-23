//no funciona portrait para gamename y titulo

/* COMPONENT CONFIGURATION */
const Card = 'Presentation';
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
    createPortrait('Group', diy);
    createPortrait('Title', diy);
    createPortrait('Background', diy);
    createPortrait('BackgroundBack', diy);
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
        let Title_control = uiTitleParagraph(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        Main_tab.place(Title_panel, 'hfill');
    
        // TEXT BOX PANEL
        let TextBox_panel = new TypeGrid();
        TextBox_panel.setTitle(@LRL-TextBox);
        let Story_control = new uiParagraphLabeled('Story', bindings, BACK, 'medium');
        let Text_control = new uiParagraphLabeled('Text', bindings, BACK, 'big');
        let Flavour_control = new uiParagraphLabeled('Flavour', bindings, BACK, 'medium');
        TextBox_panel.place(Story_control, 'hfill', Text_control, 'br hfill', Flavour_control, 'br hfill');
        Main_tab.place(TextBox_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

        // TEMPLATE PANEL
        let Template_panel = new TypeGrid();
        Template_panel.setTitle(@LRL-Template);
    
        list = new Array('Standard', 'Nightmare');
        if (advancedControls) list = list.concat(new Array('CustomColour'));
        let Template_control = new uiListIcon('Template', list, bindings, BOTH);
        bindings.add('TemplateBack', Template_control, BOTH);
        Template_panel.place(Template_control, 'hfill');
        Template_tab.place(Template_panel, 'hfill');
    
        // CUSTOM COLOUR PANEL
        if (advancedControls) {
            let CustomColour_panel = new TypeGrid();
            CustomColour_panel.setTitle(@LRL-CustomColour);
            list = new Array('Collection', 'CustomColour');
            let ColourBy_control = new uiCyclerLabeled('ColourBy', list, bindings, BOTH);
            let CustomColour_control = new uiTint('CustomColour', bindings, BOTH);
            CustomColour_panel.place(ColourBy_control, 'hfill', CustomColour_control, 'br hfill');
            Template_tab.place(CustomColour_panel, 'br hfill');
        }

    // TEMPLATE TAB CLOSE
    Template_tab.addToEditor(editor, @LRL-Template);

    // PORTRAIT TAB
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;

        // PORTRAIT PANEL
        let Portrait_panel = new TypeGrid();
        Portrait_panel.setTitle(@LRL-Portrait);
        let Artist_control = new uiTextLabeled('Artist', bindings, BACK);
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
        let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, BACK);
        let Collection_control = new uiCollectionList(bindings, BACK);
        let CollectionPortrait_control = new uiPortrait('Collection', diy);
        Collection_panel.place(Collection_control, 'hfill', CollectionInfo_control, 'br hfill', CollectionPortrait_control, 'br hfill');
        Collection_tab.place(Collection_panel, 'hfill');
    
        // OTHER CONTROLS PANEL
        let OtherControls_panel = new TypeGrid();
        OtherControls_panel.setTitle(@LRL-OtherControls);
        let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
        let PageNumber_control = new uiSpinnerLabeled('PageNumber', bindings, BACK, 98);
        let PageTotal_control = new uiSpinner('PageTotal', bindings, BACK, 98);
        let PageInbox_control = new uiButtonText('Page-inBox', diy, bindings, BACK);
        OtherControls_panel.place(Copyright_control, 'hfill', PageNumber_control, 'br', @LRL-Of, '', PageTotal_control, '', PageInbox_control, '');
        if (advancedControls) {
            let Type_control = new uiTextLabeled('Type', bindings, FRONT);
            let Group_control = new uiParagraphLabeled('Group', bindings, FRONT, 'medium');
            let GroupPortrait_control = new uiPortrait('Group', diy);
            let TitlePortrait_control = new uiPortrait('Title', diy);
            OtherControls_panel.place(Type_control, 'br hfill', Group_control, 'br hfill', GroupPortrait_control, 'br hfill', TitlePortrait_control, 'br hfill');
        }
        Collection_tab.place(OtherControls_panel, 'br hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');

    // TEMPLATE
    CustomColour_tinter = new createTinter('CustomColour', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Group', diy);
    updateExternalPortrait('Title', diy);
    updateExternalPortrait('Background', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');

    // TEMPLATE
    CustomColourBack_tinter = new createTinter('CustomColourBack', diy);

    // TEXT
    Body_writer = new createWriter('Body', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Page_writer = new createWriter('Page', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('BackgroundBack', diy);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    if ($Template == 'CustomColour') {
        let tintIn;
        if (($ColourBy == 'CustomColour') || ($Collection == 'EmptyIcon') || ($Collection == 'CustomIcon')) {
            tintIn = diy.settings.getTint('CustomColour');
        } else {
            tintIn = diy.settings.getTint($Collection + '-inside');
        }
        CustomColour_tinter.setFactors(tintIn[0], tintIn[1], tintIn[2]);
        sheet.paintImage(g, CustomColour_tinter.getTintedImage(), 'Template-region');
    }
    paintTemplate(diy, g, sheet);

    //    paintPortrait('Background', diy, g, sheet);

    // TEXTS
    //    paintPortrait('Name', diy, g, sheet);
    writeTextShadowed('Title', Title_writer, diy, g, sheet);

    //    paintPortrait('Group', diy, g, sheet);
    writeTextShadowed('Group', Title_writer, diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    // TEMPLATE
    if ($Template == 'CustomColour') {
        let tintIn;
        if (($ColourBy == 'CustomColour') || ($Collection == 'EmptyIcon') || ($Collection == 'CustomIcon')) {
            tintIn = diy.settings.getTint('CustomColour');
        } else {
            tintIn = diy.settings.getTint($Collection + '-inside');
        }
        CustomColour_tinter.setFactors(tintIn[0], tintIn[1], tintIn[2]);
        sheet.paintImage(g, CustomColour_tinter.getTintedImage(), 'Template-region');
    }
    paintTemplateBackShared(diy, g, sheet);
    //    paintPortrait('BackgroundBack', diy, g, sheet);

    // ICONS
    if (diy.settings.getBoolean('Page-inBox')) paintIcon('Collection', diy, g, sheet);
    else if (Number($PageNumber) == 0) paintIcon('Collection', diy, g, sheet);

    // TEXTS
    writeBody(['Story', 'Text', 'Flavour'], diy, g);
    if ($Template == 'Nightmare') writeType(diy, g);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    if (diy.settings.getBoolean('Page-inBox')) writeCollectionInfo(diy, g, sheet);
    else if (Number($PageNumber) == 0) writeCollectionInfo(diy, g, sheet);

    if ($PageNumber > 0) {
        let text;
        let format;

        if (diy.settings.getBoolean('Page-inBox')) format = diy.settings.get('Page-inBox-format', '');
        else format = diy.settings.get('Page-format', '');

        let page = diy.settings.get('LRL-Page', '') if (page == '') page = #LRL-Page;

        let number = Number($PageNumber);

        if ($PageTotal > 0) {
            let pageOf = diy.settings.get('LRL-Page-of', '');
            if (pageOf == '') pageOf = #LRL-Page-of;
            text = format + page + number + pageOf + $PageTotal;
        } else text = format + page + number;

        if (diy.settings.getBoolean('Page-inBox')) writeLine(text, Body_writer, diy.settings.getRegion('Page-inBox'), g);
        else {
            sheet.paintImage(g, 'Page-decoration');
            writeLine(text, Page_writer, diy.settings.getRegion('Page'), g);
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