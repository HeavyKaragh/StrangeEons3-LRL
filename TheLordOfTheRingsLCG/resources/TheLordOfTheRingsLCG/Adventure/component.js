// modificar fondo de la plantilla a más difuminado, más claro, y menos saturado
/* COMPONENT CONFIGURATION */
const Card = 'Adventure';
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
    createPortrait('Encounterset1', diy);
    createPortrait('Encounterset2', diy);
    createPortrait('Encounterset3', diy);
    createPortrait('Encounterset4', diy);
    createPortrait('Encounterset5', diy);
    $PortraitListCount = getPortraitCount();
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls');
    if ($Template == 'CustomColour') advancedControls = true;
    var bindings = new Bindings(editor, diy);

    // MAIN TAB
    let MainFront_tab = new TypeGrid();
    MainFront_tab.editorTabScrolling = true;

        // TITLE PANEL
        let Title_panel = new TypeGrid();
        Title_panel.setTitle(@LRL-Title);
        let Title_control = uiTitle(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        MainFront_tab.place(Title_panel, 'hfill');
    
        // GRAND ADVENTURE PANEL
        let GrandAdventure_panel = new TypeGrid();
        GrandAdventure_panel.setTitle(@LRL-GrandAdventure);
        let GrandAdventure_control = new uiText('GrandAdventure', bindings, FRONT);
        GrandAdventure_panel.place(GrandAdventure_control, 'hfill');
        MainFront_tab.place(GrandAdventure_panel, 'br hfill');
    
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
        let StoryBack_control = new uiParagraphLabeled('StoryBack', bindings, FRONT, 'medium');
        let TextBack_control = new uiParagraphLabeled('TextBack', bindings, FRONT, 'big');
        let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, FRONT, 'medium');
        TextBoxBack_panel.place(StoryBack_control, 'hfill', TextBack_control, 'br hfill', FlavourBack_control, 'br hfill');
        MainBack_tab.place(TextBoxBack_panel, 'br hfill');

    // MAIN BACK TAB CLOSE
    MainBack_tab.addToEditor(editor, @LRL-MainBack);

    // ENCOUNTER SET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

        // ENCOUNTER SET PANEL
        let Encounterset_panel = new TypeGrid();
        Encounterset_panel.setTitle(@LRL-Encounterset);
        let Encounterset_control = new uiEncountersetList(bindings, FRONT);
        let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
        Encounterset_panel.place(Encounterset_control, 'hfill', EncountersetPortrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset_panel, 'hfill');
    
        // ADDITIONAL SET 1 PANEL
        let Encounterset1_panel = new TypeGrid();
        Encounterset1_panel.setTitle(@LRL-Encounterset1);
        let Encounterset1_control = new uiOtherEncountersetList('Encounterset1', bindings, FRONT);
        let Encounterset1Portrait_control = new uiPortrait('Encounterset1', diy);
        Encounterset1_panel.place(Encounterset1_control, 'hfill', Encounterset1Portrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset1_panel, 'br hfill');
    
        // ADDITIONAL SET 2 PANEL
        let Encounterset2_panel = new TypeGrid();
        Encounterset2_panel.setTitle(@LRL-Encounterset2);
        let Encounterset2_control = new uiOtherEncountersetList('Encounterset2', bindings, FRONT);
        let Encounterset2Portrait_control = new uiPortrait('Encounterset2', diy);
        Encounterset2_panel.place(Encounterset2_control, 'hfill', Encounterset2Portrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset2_panel, 'br hfill');
    
        // ADDITIONAL SET 3 PANEL
        let Encounterset3_panel = new TypeGrid();
        Encounterset3_panel.setTitle(@LRL-Encounterset3);
        let Encounterset3_control = new uiOtherEncountersetList('Encounterset3', bindings, FRONT);
        let Encounterset3Portrait_control = new uiPortrait('Encounterset3', diy);
        Encounterset3_panel.place(Encounterset3_control, 'hfill', Encounterset3Portrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset3_panel, 'br hfill');
    
        // ADDITIONAL SET 4 PANEL
        let Encounterset4_panel = new TypeGrid();
        Encounterset4_panel.setTitle(@LRL-Encounterset4);
        let Encounterset4_control = new uiOtherEncountersetList('Encounterset4', bindings, FRONT);
        let Encounterset4Portrait_control = new uiPortrait('Encounterset4', diy);
        Encounterset4_panel.place(Encounterset4_control, 'hfill', Encounterset4Portrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset4_panel, 'br hfill');
    
        // ADDITIONAL SET 5 PANEL
        let Encounterset5_panel = new TypeGrid();
        Encounterset5_panel.setTitle(@LRL-Encounterset5);
        let Encounterset5_control = new uiOtherEncountersetList('Encounterset5', bindings, FRONT);
        let Encounterset5Portrait_control = new uiPortrait('Encounterset5', diy);
        Encounterset5_panel.place(Encounterset5_control, 'hfill', Encounterset5Portrait_control, 'br hfill');
        Encounterset_tab.place(Encounterset5_panel, 'br hfill');
    
    // ENCOUNTER SET TAB CLOSE
    Encounterset_tab.addToEditor(editor, @LRL-Encounterset);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

        // TEMPLATE PANEL
        let Template_panel = new TypeGrid();
        Template_panel.setTitle(@LRL-Template);
    
        let list = new Array('Standard', 'Initial', 'Main', 'Epic');
        if (advancedControls) {
            list = list.concat(new Array('CustomColour'));
        }
        let Template_control = new uiListIcon('Template', list, bindings, BOTH);
        Template_panel.place(Template_control, 'hfill');
        Template_tab.place(Template_panel, 'hfill');
    
        if (advancedControls) {
            // CUSTOMCOLOUR PANEL
            let CustomColour_panel = new TypeGrid();
            CustomColour_panel.setTitle(@LRL-CustomColour);
            let CustomColour_control = new uiTint('CustomColour', bindings, BOTH);
            CustomColour_panel.place(CustomColour_control, 'hfill');
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
        let Artist_control = new uiTextLabeled('Artist', bindings, FRONT);
        let Portrait_control = new uiPortrait('Portrait', diy);
        let PortraitMirror_control = new uiPortraitMirror('Portrait', Portrait_control);
        Portrait_panel.place(Artist_control, 'hfill', Portrait_control, 'br hfill', PortraitMirror_control, 'br hfill');
        Portrait_tab.place(Portrait_panel, 'hfill');

    Portrait_tab.addToEditor(editor, @LRL-Portrait);

    // COLLECTION TAB
    let Collection_tab = new TypeGrid();
    Collection_tab.editorTabScrolling = true;

        // COLLECTION PANEL
        let Collection_panel = new TypeGrid();
        Collection_panel.setTitle(@LRL-Collection);
        let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, BOTH);
        let Collection_control = new uiCollectionList(bindings, BOTH);
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
    GrandAdventure_writer = new createWriter('GrandAdventure', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);

    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Encounterset', diy);
    updateExternalPortrait('Encounterset1', diy);
    updateExternalPortrait('Encounterset2', diy);
    updateExternalPortrait('Encounterset3', diy);
    updateExternalPortrait('Encounterset4', diy);
    updateExternalPortrait('Encounterset5', diy);
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
    if ($GrandAdventure != '') {
        sheet.paintImage(g, 'GrandAdventure-decoration', 'Template-region');
    }
    switch ($Template) {
    case 'Initial':
    case 'Main':
    case 'Epic':
        tint = diy.settings.getTint($Template + '-tint');
        CustomColour_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
        image = CustomColour_tinter.getTintedImage();
        sheet.paintImage(g, image, 'Template-region');
        break;
    case 'CustomColour':
        paintCustomColour(diy, g, sheet);
        break;
    case 'Standard':
    default:
        sheet.paintImage(g, 'Standard-overlay', 'Template-region');
    }

    /* ICONS */
    paintIcon('Collection', diy, g, sheet);
    paintIconLRL('Encounterset', diy, g, sheet);
    var adapterList = new Array('Encounterset1', 'Encounterset2', 'Encounterset3', 'Encounterset4', 'Encounterset5');
    paintAdapter(adapterList, diy, g, sheet);
    if ($Template == 'CustomColour') paintAdapterTinted(adapterList, diy, g, sheet);
    paintIcon('Encounterset1', diy, g, sheet);
    paintIcon('Encounterset2', diy, g, sheet);
    paintIcon('Encounterset3', diy, g, sheet);
    paintIcon('Encounterset4', diy, g, sheet);
    paintIcon('Encounterset5', diy, g, sheet);

    /* TEXT */
    writeTitleByEncounterset(diy, g);
    if ($GrandAdventure != '') {
        writeLine(formatText('GrandAdventure', diy), GrandAdventure_writer, diy.settings.getRegion('GrandAdventure'), g);
    }
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
    switch ($Template) {
    case 'Initial':
    case 'Main':
    case 'Epic':
        tint = diy.settings.getTint($Template + '-tint');
        CustomColourBack_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
        image = CustomColourBack_tinter.getTintedImage();
        sheet.paintImage(g, image, 'Template-region');
        break;
    case 'CustomColour':
        paintCustomColourBack(diy, g, sheet);
        break;
    case 'Standard':
    default:
    }

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