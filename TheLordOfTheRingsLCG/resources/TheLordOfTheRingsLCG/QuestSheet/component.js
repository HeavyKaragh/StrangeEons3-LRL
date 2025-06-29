// alineación e iconos y decoración

/* COMPONENT CONFIGURATION */
const Card = 'QuestSheet';
// cambiar StageLetter a imagen? y a\u00f1adir selector de letra
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
    diy.faceStyle = FaceStyle.ONE_FACE;
    diy.bleedMargin = 0;

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

    var bindings = new Bindings(editor, diy);

    // MAIN TAB
    let Main_tab = new TypeGrid();
    Main_tab.editorTabScrolling = true;
    
        // TITLE PANEL
        let Title_panel = new TypeGrid();
        Title_panel.setTitle(@LRL-Title);
        let Title_control = uiTitleParagraph(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        Main_tab.place(Title_panel, 'hfill');
    
        // TEXT LEFT PANEL
        let TextLeft_panel = new TypeGrid();
        TextLeft_panel.setTitle(@LRL-TextLeft);
        let StoryLeft_control = new uiParagraphLabeled('StoryLeft', bindings, FRONT, 'medium');
        let TextLeft_control = new uiParagraphLabeled('TextLeft', bindings, FRONT, 'big');
        let FlavourLeft_control = new uiParagraphLabeled('FlavourLeft', bindings, FRONT, 'medium');
        TextLeft_panel.place(StoryLeft_control, 'hfill', TextLeft_control, 'br hfill', FlavourLeft_control, 'br hfill');
        Main_tab.place(TextLeft_panel, 'br hfill');
    
        // TEXT RIGHT PANEL
        let TextRight_panel = new TypeGrid();
        TextRight_panel.setTitle(@LRL-TextRight);
        let StoryRight_control = new uiParagraphLabeled('StoryRight', bindings, FRONT, 'medium');
        let TextRight_control = new uiParagraphLabeled('TextRight', bindings, FRONT, 'big');
        let FlavourRight_control = new uiParagraphLabeled('FlavourRight', bindings, FRONT, 'medium');
        TextRight_panel.place(StoryRight_control, 'hfill', TextRight_control, 'br hfill', FlavourRight_control, 'br hfill');
        Main_tab.place(TextRight_panel, 'br hfill');
    
        // MAIN TAB CLOSE
        Main_tab.addToEditor(editor, @LRL-Main);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;
    
        // LAYOUT PANEL
        let Layout_panel = new TypeGrid();
        Layout_panel.setTitle(@LRL-Layout);
        let list = new Array('Plain', 'Logo', 'Title', 'Sets');
        let TemplateLayout_control = new uiCyclerLabeled('Template-layout', list, bindings, FRONT);
        Layout_panel.place(TemplateLayout_control, 'hfill');
        Template_tab.place(Layout_panel, 'hfill');
    
        // TEMPLATE TINT
        let TemplateTint_control = new uiTint('Template', bindings, FRONT);
        Template_tab.place(TemplateTint_control, 'br hfill');
    
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
        list = new Array('None', 'Medium', 'Small');
        let PortraitLayout_control = new uiCyclerLabeled('Portrait-layout', list, bindings, FRONT);
        Portrait_panel.place(Artist_control, 'hfill', Portrait_control, 'br hfill', PortraitLayout_control, 'br', PortraitMirror_control, 'hfill');
        Portrait_tab.place(Portrait_panel, 'hfill');
    
        // PORTRAIT PANEL CLOSE
        Portrait_tab.addToEditor(editor, @LRL-Portrait);

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
        let PageNumber_control = new uiSpinnerLabeled('PageNumber', bindings, FRONT, 98);
        OtherControls_panel.place(Copyright_control, 'hfill', PageNumber_control, '');
        if (advancedControls) {
            let Group_control = new uiParagraphLabeled('Group', bindings, FRONT, 'medium');
            OtherControls_panel.place(Group_control, 'br hfill');
        }
        Collection_tab.place(OtherControls_panel, 'br hfill');
    
        // COLLECTION TAB CLOSE
        Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');
    
    // TEMPLATE
    Template_tinter = new createTinter('Template', diy);
    Page_tinter = new createTinter('Page', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Group_writer = new createWriter('Group', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');
    
    // TEMPLATE
    sheet.paintTemplateImage(g);

    let tint = diy.settings.getTint('Template');
    Template_tinter.setFactors(tint[0], tint[1], tint[2]);
    let image = Template_tinter.getTintedImage();
    sheet.paintImage(g, image, 'Template-region');

    // PORTRAIT
    switch ($Portrait-layout) {
    case 'Medium':
        paintPortrait('Portrait', diy, g, sheet);
        sheet.paintImage(g, 'Portrait-overlay', 'Template-region');
        break;
    case 'Small':
        paintPortrait('Portrait', diy, g, sheet);
        sheet.paintImage(g, 'Portrait-overlay-small', 'Template-region');
        break;
    }

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    sheet.paintImage(g, getIcon('Collection', diy), 'CollectionBis-portrait-clip-region');

    if ($Template-layout == 'Sets') {
        let list = new Array('EncounterSet', 'EncounterSet1', 'EncounterSet2', 'EncounterSet3', 'EncounterSet4', 'EncounterSet5');
        let selector = 0;
        for (let index = 0; index < list.length; index++) if (diy.settings.get(list[index]) != 'Empty') selector = index + 1;
        paintAdapter(list, diy, g, sheet);

        let ESregion = getArray('EncounterSet-portrait-clip-region', diy);
        let ES1region = getArray('EncounterSet1-portrait-clip-region', diy);
        let ES2region = getArray('EncounterSet2-portrait-clip-region', diy);
        let ES3region = getArray('EncounterSet3-portrait-clip-region', diy);
        let ES4region = getArray('EncounterSet4-portrait-clip-region', diy);
        let ES5region = getArray('EncounterSet5-portrait-clip-region', diy);
        switch (selector) {
        case 0:
            break;
        case 1:
        case 3:
        case 5:
            ESregion[0] = Number(ESregion[0]) + Number($adapter-corrector);
            ES1region[0] = Number(ES1region[0]) + Number($adapter-corrector);
            ES2region[0] = Number(ES2region[0]) + Number($adapter-corrector);
            ES3region[0] = Number(ES3region[0]) + Number($adapter-corrector);
            ES4region[0] = Number(ES4region[0]) + Number($adapter-corrector);
            ES5region[0] = Number(ES5region[0]) + Number($adapter-corrector);
        case 2:
        case 4:
        case 6:
            ESregion = new Region([Number(ESregion[0]), Number(ESregion[1]), Number(ESregion[2]), Number(ESregion[3])]);
            ES1region = new Region([Number(ES1region[0]), Number(ES1region[1]), Number(ES1region[2]), Number(ES1region[3])]);
            ES2region = new Region([Number(ES2region[0]), Number(ES2region[1]), Number(ES2region[2]), Number(ES2region[3])]);
            ES3region = new Region([Number(ES3region[0]), Number(ES3region[1]), Number(ES3region[2]), Number(ES3region[3])]);
            ES4region = new Region([Number(ES4region[0]), Number(ES4region[1]), Number(ES4region[2]), Number(ES4region[3])]);
            ES5region = new Region([Number(ES5region[0]), Number(ES5region[1]), Number(ES5region[2]), Number(ES5region[3])]);
        }

        if (diy.settings.get('EncounterSet', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('EncounterSet', diy), ESregion);
        if (diy.settings.get('EncounterSet1', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('EncounterSet1', diy), ES1region);
        if (diy.settings.get('EncounterSet2', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('EncounterSet2', diy), ES2region);
        if (diy.settings.get('EncounterSet3', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('EncounterSet3', diy), ES3region);
        if (diy.settings.get('EncounterSet4', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('EncounterSet4', diy), ES4region);
        if (diy.settings.get('EncounterSet5', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('EncounterSet5', diy), ES5region);
    }

    // TEXTS

    if (($Template-layout == 'Sets') || ($Template-layout == 'Title')) {
        writeTextOutlined($Title, Title_writer, diy.settings.getRegion('Title'), getStroke('Title', diy), diy, g, sheet);
    }

    if ($Template-layout != 'Plain') {
        if ($Group != '') {
            writeTextOutlined($Group, Group_writer, diy.settings.getRegion('Group'), getStroke('Group', diy), diy, g, sheet);
        } else paintGameLogo(diy, g, sheet);
    }

    let region;
    if ($Portrait-layout == 'Medium') {
        region = getArray($Template-layout + '-Body-region', diy);
        let portraitRegion = getArray('Portrait-portrait-clip-region', diy);
        region[3] = portraitRegion[1] - region[1] - 10;
        region = new Region([Number(region[0]), Number(region[1]), Number(region[2]), Number(region[3])]);
    } else {
        region = diy.settings.getRegion($Template-layout + '-Body', diy.settings.getRegion('Body'));
    }
    writeParagraph(['StoryLeft', 'TextLeft', 'FlavourLeft'], Body_writer, region, diy, g);

    if ($Portrait-layout != 'None') {
        region = getArray('BodyRight-region', diy);
        let portraitRegion = getArray('Portrait-portrait-clip-region', diy);
        region[3] = portraitRegion[1] - region[1] - 10;
        region = new Region([Number(region[0]), Number(region[1]), Number(region[2]), Number(region[3])]);
    } else {
        region = diy.settings.getRegion('BodyRight');
    }
    writeParagraph(['StoryRight', 'TextRight', 'FlavourRight'], Body_writer, region, diy, g);

    tint = diy.settings.getTint('Template');
    Template_tinter.setFactors(tint[0], tint[1], tint[2]);
    sheet.paintImage(g, Template_tinter.getTintedImage(), 'Template-region');
    if (Number($PageNumber) > 0) {
        Page_tinter.setImage(ImageUtils.get(PathNumberTintable + $PageNumber + '.png'));
        if (isOdd($PageNumber)) region = diy.settings.getRegion('Odd-Page');
        else region = diy.settings.getRegion('Page');
        sheet.paintImage(g, Page_tinter.getTintedImage(), region);
    }
    if ($Portrait-layout != 'None') writeArtist(diy, g, sheet);
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