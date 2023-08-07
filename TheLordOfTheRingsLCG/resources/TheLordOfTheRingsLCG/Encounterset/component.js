//añadir pesadilla

/* COMPONENT CONFIGURATION */
const Card = 'Encounterset';
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
    createPortrait('Encounterset', diy);
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
    Title_panel.place(Title_control, 'hfill');
    Main_tab.place(Title_panel, 'hfill');

    // TEXTBOX PANEL
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);
    let Story_control = new uiParagraphLabeled('Story', bindings, FRONT, 'small');
    let Text_control = new uiParagraphLabeled('Text', bindings, FRONT, 'big');
    let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'small');
    TextBox_panel.place(
        Story_control, 'hfill'
        , Text_control, 'br hfill'
        , Flavour_control, 'br hfill'
    );
    Main_tab.place(TextBox_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // MAINBACK TAB
    var MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;

    // TEXTBOX PANEL
    let TextBoxBack_panel = new TypeGrid();
    TextBoxBack_panel.setTitle(@LRL-TextBoxBack);
    let StoryBack_control = new uiParagraphLabeled('StoryBack', bindings, BACK, 'small');
    let TextBack_control = new uiParagraphLabeled('TextBack', bindings, BACK, 'big');
    let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, BACK, 'small');
    TextBoxBack_panel.place(
        StoryBack_control, 'hfill'
        , TextBack_control, 'br hfill'
        , FlavourBack_control, 'br hfill'
    );
    MainBack_tab.place(TextBoxBack_panel, 'hfill');

    // MAINBACK TAB CLOSE
    MainBack_tab.addToEditor(editor, @LRL-MainBack);

    // ENCOUNTERSET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

    // ENCOUNTERSET PANEL
    let Encounterset_panel = new TypeGrid();
    Encounterset_panel.setTitle(@LRL-Encounterset);
    let Encounterset_control = new uiEncountersetList(bindings, FRONT);
    let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
    Encounterset_panel.place(
        Encounterset_control, 'hfill'
        , EncountersetPortrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset_panel, 'hfill');

    // ENCOUNTERSET TAB CLOSE
    Encounterset_tab.addToEditor(editor, @LRL-Encounterset);

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
        Artist_control, 'hfill'
        , Portrait_control, 'br hfill'
        , PortraitMirror_control, 'br hfill'
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
    let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, BOTH);
    let Collection_control = new uiCollectionList(bindings, BOTH);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill'
        , CollectionInfo_control, 'br hfill'
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
        OtherControls_panel.place(Type_control, 'br hfill');
    }
    Collection_tab.place(OtherControls_panel, 'br hfill');

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, 'createFrontPainter');
    
    // TEXTS
    Title_writer = new createWriter('Title', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Encounterset', diy);
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
    paintIconLRL('Encounterset', diy, g, sheet);
    
    // TEXT
    writeTitle(diy, g);
    writeBody(['Story', 'Text', 'Flavour'], diy, g);
    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeType(diy, g);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    
    // TEMPLATE
    sheet.paintTemplateImage(g);
    
    // ICONS
    paintIcon('Collection', diy, g, sheet);
    
    // TEXT
    writeParagraph(
        ['StoryBack', 'TextBack', 'FlavourBack'], Body_writer,
        diy.settings.getRegion('BodyBack'), diy, g
    );
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
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
