// alineación e iconos y decoración

/* COMPONENT CONFIGURATION */
const Card = 'RulesCard';
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
    createPortrait('PortraitBack', diy);
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
        let Title_control = uiTitle(diy, bindings, FRONT);
        let Group_control = new uiTextLabeled('Group', bindings, FRONT);
        let PageNumber_control = new uiSpinnerLabeled('PageNumber', bindings, FRONT, 98);
        let PageTotal_control = new uiSpinner('PageTotal', bindings, FRONT, 98);
        Title_panel.place(Title_control, 'hfill', Group_control, 'br hfill', PageNumber_control, '', @LRL-Of, '', PageTotal_control, '');
        Main_tab.place(Title_panel, 'hfill');
        
        // TEXT BOX PANEL
        let TextBox_panel = new TypeGrid();
        TextBox_panel.setTitle(@LRL-TextBox);
        let Story_control = new uiParagraphLabeled('Story', bindings, FRONT, 'medium');
        let Text_control = new uiParagraphLabeled('Text', bindings, FRONT, 'big');
        let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
        TextBox_panel.place(Story_control, 'hfill', Text_control, 'br hfill', Flavour_control, 'br hfill');
        Main_tab.place(TextBox_panel, 'br hfill');
        
        // MAIN TAB CLOSE
        Main_tab.addToEditor(editor, @LRL-Main);

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
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;
    
        // LAYOUT PANEL
        let TemplateLayout_panel = new TypeGrid();
        TemplateLayout_panel.setTitle(@LRL-Layout);
        let list = new Array('Plain', 'Title', 'Sets');
        let TemplateLayout_control = new uiCyclerLabeled('Template-layout', list, bindings, FRONT);
        TemplateLayout_panel.place(TemplateLayout_control, 'hfill');
        Template_tab.place(TemplateLayout_panel, 'hfill');
    
        // TEMPLATE TAB CLOSE
        Template_tab.addToEditor(editor, @LRL-Template);

    // PORTRAIT TAB
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;
    
        // PORTRAIT PANEL
        let PortraitBack_panel = new TypeGrid();
        PortraitBack_panel.setTitle(@LRL-PortraitBack);
        let ArtistBack_control = new uiTextLabeled('ArtistBack', bindings, BACK);
        let PortraitBack_control = new uiPortrait('PortraitBack', diy);
        let PortraitMirrorBack_control = new uiPortraitMirror('PortraitBack', PortraitBack_control);
        list = new Array('None', 'Medium', 'Small');
        let PortraitLayoutBack_control = new uiCyclerLabeled('PortraitBack-layout', list, bindings, BACK);
        PortraitBack_panel.place(ArtistBack_control, 'hfill', PortraitBack_control, 'br hfill', PortraitLayoutBack_control, 'br', PortraitMirrorBack_control, 'hfill');
        Portrait_tab.place(PortraitBack_panel, 'hfill');
    
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
        Collection_tab.place(OtherControls_panel, 'br hfill');
    
        // COLLECTION TAB CLOSE
        Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, 'createFrontPainter');

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Page_writer = new createWriter('Page', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // PORTRAIT
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

    // PORTRAIT
    updateExternalPortrait('PortraitBack', diy);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // TEMPLATE
    sheet.paintTemplateImage(g);

    // ICONS
    paintIcon('Collection', diy, g, sheet);

    if ($Template-layout == 'Sets') {
        let list = new Array('EncounterSet', 'EncounterSet1', 'EncounterSet2', 'EncounterSet3', 'EncounterSet4', 'EncounterSet5');
        let selector = 0;
        for (let index = 0; index < list.length; index++) if (diy.settings.get(list[index]) != 'EmptyIcon') selector = index + 1;
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
            ESregion[0] = Number(ESregion[0]) + Number($Adapter-corrector);
            ES1region[0] = Number(ES1region[0]) + Number($Adapter-corrector);
            ES2region[0] = Number(ES2region[0]) + Number($Adapter-corrector);
            ES3region[0] = Number(ES3region[0]) + Number($Adapter-corrector);
            ES4region[0] = Number(ES4region[0]) + Number($Adapter-corrector);
            ES5region[0] = Number(ES5region[0]) + Number($Adapter-corrector);
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

        //      switch( Number( adapterSelector ) ){
        //      case 6:
        //          paintIcon('EncounterSet',diy,g,sheet) ;
        //          paintIcon('EncounterSet1',diy,g,sheet) ;
        //          paintIcon('EncounterSet2',diy,g,sheet) ;
        //          paintIcon('EncounterSet3',diy,g,sheet) ;
        //          paintIcon('EncounterSet4',diy,g,sheet) ;
        //          paintIcon('EncounterSet5',diy,g,sheet) ;
        //          break ;
        //      case 5: 
        //          sheet.paintImage(g,getIcon('EncounterSet'),diy.settings.getRegion('EncounterSetM1')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet1'),diy.settings.getRegion('EncounterSetM2')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet2'),diy.settings.getRegion('EncounterSetM3')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet3'),diy.settings.getRegion('EncounterSetM4')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet4'),diy.settings.getRegion('EncounterSetM5')) ;
        //          break ;
        //      case 4: 
        //          sheet.paintImage(g,getIcon('EncounterSet'),diy.settings.getRegion('EncounterSet1-portrait-clip-region')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet1'),diy.settings.getRegion('EncounterSet2-portrait-clip-region')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet2'),diy.settings.getRegion('EncounterSet3-portrait-clip-region')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet3'),diy.settings.getRegion('EncounterSet4-portrait-clip-region')) ;
        //          break ;
        //      case 3: 
        //          sheet.paintImage(g,getIcon('EncounterSet'),diy.settings.getRegion('EncounterSetM2')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet1'),diy.settings.getRegion('EncounterSetM3')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet2'),diy.settings.getRegion('EncounterSetM4')) ;
        //          break ;
        //      case 2:
        //          sheet.paintImage(g,getIcon('EncounterSet'),diy.settings.getRegion('EncounterSet2-portrait-clip-region')) ;
        //          sheet.paintImage(g,getIcon('EncounterSet1'),diy.settings.getRegion('EncounterSet3-portrait-clip-region')) ;
        //          break ;
        //      case 1: 
        //          sheet.paintImage(g,getIcon('EncounterSet'),diy.settings.getRegion('EncounterSetM3')) ;
        //          break ;
        //      default:
        //          break ;
        //      }
    }

    // TEXTS
    if ($Template-layout != 'Plain') {
        writeTextOutlined($Title, Title_writer, diy.settings.getRegion('Title'), getStroke('Title', diy), diy, g, sheet);
    }

    writeParagraph(['Story', 'Text', 'Flavour'], Body_writer, diy.settings.getRegion('Body-' + $Template-layout, diy.settings.getRegion('Body')), diy, g);

    writeLine(diy.settings.get('Copyright-format', '') + $Copyright, Bottom_writer, diy.settings.getRegion('Copyright'), g);
    writeLine(diy.settings.get('$CollectionInfo', '') + $CollectionInfo, Bottom_writer, diy.settings.getRegion('CollectionInfo'), g);
    writePage(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    // TEMPLATE
    sheet.paintTemplateImage(g);

    // PORTRAIT
    switch ($PortraitBack-layout) {
    case 'Small':
        paintPortrait('PortraitBack', diy, g, sheet);
        sheet.paintImage(g, 'PortraitBack-overlay-small', 'Template');
        break;
    case 'Medium':
        paintPortrait('PortraitBack', diy, g, sheet);
        sheet.paintImage(g, 'PortraitBack-overlay', 'Template');
        break;
    default:
        break;
    }

    // ICONS
    paintIcon('Collection', diy, g, sheet);

    // TEXT
    debug(5, 'PortraitBack-layout: ' + $PortraitBack-layout);
    writeParagraph(['StoryBack', 'TextBack', 'FlavourBack'], Body_writer, diy.settings.getRegion('BodyBack-' + $PortraitBack-layout), diy, g);

    writeLine(diy.settings.get('$CollectionInfo', '') + $CollectionInfo, Bottom_writer, diy.settings.getRegion('CollectionInfo'), g);
    if ($PortraitBack-layout != 'None') {
        writeLine(formatArtist('ArtistBack', diy), Bottom_writer, diy.settings.getRegion('ArtistBack'), g);
    } else {
        writeLine(diy.settings.get('Copyright-format', '') + $Copyright, Bottom_writer, diy.settings.getRegion('Copyright'), g);
    }
    writePage(diy, g, sheet);
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