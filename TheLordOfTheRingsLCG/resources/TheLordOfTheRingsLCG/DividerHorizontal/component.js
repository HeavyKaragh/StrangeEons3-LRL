//añadir paint cut
// crear plantilla nightmare
//corregir deco iconos en player


/* COMPONENT CONFIGURATION */
const Card = 'DividerHorizontal';
const CardVersion = 1;
// 1: rewrite using new 2023 library

function create(diy) {
    debug(1, '\ncreate');
    diy.extensionName = 'TheLordOfTheRingsLCG.seext';
    diy.version = SELibraryVersion + LRLLibraryVersion + CardVersion;
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
    let Title_control = uiTitle(diy, bindings, BOTH);
    Title_panel.place(Title_control, 'hfill');
    Main_tab.place(Title_panel, 'hfill');

    // GROUP ICON PANEL
    let Group_panel = new TypeGrid();
    Group_panel.setTitle(@LRL-Group);
    list = GAMEOBJECT.DefaultIconList.concat(GAMEOBJECT.FullIconList); // this icon list includes collection, set and others
    let Group_control = new uiListIcon('Group', list, bindings, BOTH);
    let GroupPortrait_control = new uiPortrait('Group', diy);
    Group_panel.place(
        Group_control, 'hfill', GroupPortrait_control, 'br hfill'
    );
    Main_tab.place(Group_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

    // TEMPLATE PANEL
    let Template_panel = new TypeGrid();
    Template_panel.setTitle(@LRL-Template);
    list = new Array('Encounter', 'Nightmare', 'Player');
    let Template_control = new uiListIcon('Template', list, bindings, BOTH);
    Template_panel.place(Template_control, 'hfill');
    Template_tab.place(Template_panel, 'hfill');

    // LAYOUT PANEL
    let Layout_panel = new TypeGrid();
    Layout_panel.setTitle(@LRL-Layout);
    list = new Array('Title', 'Left', 'LeftMiddle', 'RightMiddle', 'Right');
    let LayoutIcons_control = new uiCyclerLabeled('Layout-icons', list, bindings, BOTH);
    let LayoutIconswap_control = new uiButtonText('Layout-iconSwap', diy, bindings, BACK);
    Layout_panel.place(
        LayoutIcons_control, '', LayoutIconswap_control, ''
    );
    Template_tab.place(Layout_panel, 'br hfill');

    let CustomColour_panel = new TypeGrid();
    CustomColour_panel.setTitle(@LRL-CustomColour);
    list = new Array('Collection', 'CustomColour');
    let ColourBy_control = new uiCyclerLabeled('ColourBy', list, bindings, BOTH);
    let CustomColour_control = new uiTint('CustomColour', bindings, BOTH);
    CustomColour_panel.place(
        ColourBy_control, 'hfill', CustomColour_control, 'br hfill'
    );
    Template_tab.place(CustomColour_panel, 'br hfill');

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
        Artist_control, 'hfill', Portrait_control, 'br hfill', PortraitMirror_control, 'br hfill'

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
    //let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,BOTH) ;
    let Collection_control = new uiCollectionList(bindings, FRONT);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill', CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

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
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Group', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function paintCommon(layout, diy, g, sheet) {
    debug(2, '\npaintCommon');
//    debug(5, 'Side: ' + sheet.getSheetIndex());
    debug(5, 'Layout: ' + layout);

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    let tint;
    if (($ColourBy == 'CustomColour') ||
        ($Collection == 'EmptyIcon') ||
        ($Collection == 'CustomIcon'))
        tint = diy.settings.getTint('CustomColour');
    else tint = diy.settings.getTint($Collection+'-inside');

    CustomColour_tinter.setFactors(tint[0], tint[1], tint[2]);
    sheet.paintImage(g, CustomColour_tinter.getTintedImage(), 'Template-region');

    paintTemplate(diy, g, sheet);
    sheet.paintImage(g, $Template + '-' + layout, 'Template-region'); // Group icon decoration

    // TEXT
    writeArtist(diy, g, sheet);

    if (diy.settings.getBoolean('ShowBleeding')) {
        debug(4, '\tShowBleeding');
        sheet.paintImage(g, 'Template-bleeding', 'Template-region');
    }
    if ($ShowCut != 'CutNo') {
        debug(4, '\tShowCut');
        if ($ShowCut == 'Cut') sheet.paintImage(g, 'Template-cut-' + layout, 'Template-region');
        if ($ShowCut == 'CutBig') sheet.paintImage(g, 'Template-cutBig-' + layout, 'Template-region');
    }

}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');
    let layout = String($Layout-icons);

    paintCommon(layout, diy, g, sheet);

    if (layout == 'Title') writeTitle(diy, g);

    if (layout == 'Title') {
        paintIconLRL('Group', diy, g, sheet);
        paintIcon('Collection', diy, g, sheet);
    } else {
        sheet.paintImage(g, getIconLRL('Group', diy), 'Group-' + layout);
    }
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    let layout = String($Layout-icons + 'Back');

    paintCommon(layout, diy, g, sheet);
    if (layout == 'TitleBack') {
        writeLine(formatText('Title', diy), Title_writer, diy.settings.getRegion('TitleBack'), g);
    }

    if (layout == 'TitleBack') {
        let groupRegion = 'Group-TitleBack';
        let collectionRegion = 'Collection-TitleBack';
        if (diy.settings.getBoolean('Layout-iconSwap')) {
            groupRegion = 'Collection-TitleBack';
            collectionRegion = 'Group-TitleBack';
        }
        sheet.paintImage(g, getIconLRL('Group', diy), groupRegion);
        sheet.paintImage(g, getIcon('Collection', diy), collectionRegion);
    } else {
        sheet.paintImage(g, getIconLRL('Group', diy), 'Group-' + layout);
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