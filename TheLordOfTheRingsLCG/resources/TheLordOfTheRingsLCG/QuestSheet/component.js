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

    var bindings = new Bindings(editor, diy);

    // MAINLEFT TAB
    let MainLeft_tab = new TypeGrid();
    MainLeft_tab.editorTabScrolling = true;

    // TITLE PANEL
    let Title_panel = new TypeGrid();
    Title_panel.setTitle(@LRL-Title);
    let Title_control = uiTitleParagraph(diy, bindings, FRONT);
    Title_panel.place(Title_control, 'hfill');
    MainLeft_tab.place(Title_panel, 'hfill');

    // TEXTLEFT PANEL
    let TextLeft_panel = new TypeGrid();
    TextLeft_panel.setTitle(@LRL-TextLeft);
    let StoryLeft_control = new uiParagraphLabeled('StoryLeft', bindings, FRONT, 'medium');
    let TextLeft_control = new uiParagraphLabeled('TextLeft', bindings, FRONT, 'big');
    let FlavourLeft_control = new uiParagraphLabeled('FlavourLeft', bindings, FRONT, 'medium');
    TextLeft_panel.place(
        StoryLeft_control, 'hfill'
        , TextLeft_control, 'br hfill'
        , FlavourLeft_control, 'br hfill'
    );
    MainLeft_tab.place(TextLeft_panel, 'br hfill');

    // MAINLEFT TAB CLOSE
    MainLeft_tab.addToEditor(editor, @LRL-MainLeft);

    // MAINRIGHT TAB
    let MainRight_tab = new TypeGrid();
    MainRight_tab.editorTabScrolling = true;

    // TEXTRIGHT PANEL
    let TextRight_panel = new TypeGrid();
    TextRight_panel.setTitle(@LRL-TextRight);
    let StoryRight_control = new uiParagraphLabeled('StoryRight', bindings, FRONT, 'medium');
    let TextRight_control = new uiParagraphLabeled('TextRight', bindings, FRONT, 'big');
    let FlavourRight_control = new uiParagraphLabeled('FlavourRight', bindings, FRONT, 'medium');
    TextRight_panel.place(
        StoryRight_control, 'hfill'
        , TextRight_control, 'br hfill'
        , FlavourRight_control, 'br hfill'
    );
    MainRight_tab.place(TextRight_panel, 'hfill');

    // MAINRIGHT TAB CLOSE
    MainRight_tab.addToEditor(editor, @LRL-MainRight);

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

    // MAIN TAB CLOSE
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
    Portrait_panel.place(
        Artist_control, 'hfill', 
        Portrait_control, 'br hfill', 
        PortraitLayout_control, 'br', 
        PortraitMirror_control, 'hfill'
    );
    Portrait_tab.place(Portrait_panel, 'hfill');

    Portrait_tab.addToEditor(editor, @LRL-Portrait);

    // ENCOUNTER SET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

    // ENCOUNTER SET PANEL
    let Encounterset_panel = new TypeGrid();
    Encounterset_panel.setTitle(@LRL-Encounterset);
    let Encounterset_control = new uiEncountersetList(bindings, FRONT);
    let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
    Encounterset_panel.place(
        Encounterset_control, 'hfill', EncountersetPortrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset_panel, 'hfill');

    // ADDITIONAL SET 1 PANEL
    let Encounterset1_panel = new TypeGrid();
    Encounterset1_panel.setTitle(@LRL-Encounterset1);
    let Encounterset1_control = new uiOtherEncountersetList('Encounterset1', bindings, FRONT);
    let Encounterset1Portrait_control = new uiPortrait('Encounterset1', diy);
    Encounterset1_panel.place(
        Encounterset1_control, 'hfill',
        Encounterset1Portrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset1_panel, 'br hfill');

    // ADDITIONAL SET 2 PANEL
    let Encounterset2_panel = new TypeGrid();
    Encounterset2_panel.setTitle(@LRL-Encounterset2);
    let Encounterset2_control = new uiOtherEncountersetList('Encounterset2', bindings, FRONT);
    let Encounterset2Portrait_control = new uiPortrait('Encounterset2', diy);
    Encounterset2_panel.place(
        Encounterset2_control, 'hfill',
        Encounterset2Portrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset2_panel, 'br hfill');

    // ADDITIONAL SET 3 PANEL
    let Encounterset3_panel = new TypeGrid();
    Encounterset3_panel.setTitle(@LRL-Encounterset3);
    let Encounterset3_control = new uiOtherEncountersetList('Encounterset3', bindings, FRONT);
    let Encounterset3Portrait_control = new uiPortrait('Encounterset3', diy);
    Encounterset3_panel.place(
        Encounterset3_control, 'hfill',
        Encounterset3Portrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset3_panel, 'br hfill');

    // ADDITIONAL SET 4 PANEL
    let Encounterset4_panel = new TypeGrid();
    Encounterset4_panel.setTitle(@LRL-Encounterset4);
    let Encounterset4_control = new uiOtherEncountersetList('Encounterset4', bindings, FRONT);
    let Encounterset4Portrait_control = new uiPortrait('Encounterset4', diy);
    Encounterset4_panel.place(
        Encounterset4_control, 'hfill',
        Encounterset4Portrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset4_panel, 'br hfill');

    // ADDITIONAL SET 5 PANEL
    let Encounterset5_panel = new TypeGrid();
    Encounterset5_panel.setTitle(@LRL-Encounterset5);
    let Encounterset5_control = new uiOtherEncountersetList('Encounterset5', bindings, FRONT);
    let Encounterset5Portrait_control = new uiPortrait('Encounterset5', diy);
    Encounterset5_panel.place(
        Encounterset5_control, 'hfill',
        Encounterset5Portrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset5_panel, 'br hfill');

    Encounterset_tab.addToEditor(editor, @LRL-Encounterset);

    // COLLECTION TAB
    let Collection_tab = new TypeGrid();
    Collection_tab.editorTabScrolling = true;

    // COLLECTION PANEL
    let Collection_panel = new TypeGrid();
    Collection_panel.setTitle(@LRL-Collection);
    let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, FRONT);
    let Collection_control = new uiCollectionList(bindings, FRONT);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill'
        , CollectionInfo_control, 'br hfill'
        , CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

    // OTHER CONTROLS PANEL
    let OtherControls_panel = new TypeGrid();
    OtherControls_panel.setTitle(@LRL-OtherControls);
    let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
    let PageNumber_control = new uiSpinnerLabeled('PageNumber', bindings, FRONT, 98);
    OtherControls_panel.place(
        Copyright_control, 'hfill'
        , PageNumber_control, ''
    );
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
        let list = new Array('Encounterset', 'Encounterset1', 'Encounterset2', 'Encounterset3', 'Encounterset4', 'Encounterset5');
        let selector = 0;
        for (let index = 0; index < list.length; index++)
            if (diy.settings.get(list[index]) != 'Empty') selector = index + 1;
        paintAdapter(list, diy, g, sheet);

        let ESregion = getArray('Encounterset-portrait-clip-region', diy);
        let ES1region = getArray('Encounterset1-portrait-clip-region', diy);
        let ES2region = getArray('Encounterset2-portrait-clip-region', diy);
        let ES3region = getArray('Encounterset3-portrait-clip-region', diy);
        let ES4region = getArray('Encounterset4-portrait-clip-region', diy);
        let ES5region = getArray('Encounterset5-portrait-clip-region', diy);
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

        if (diy.settings.get('Encounterset', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset', diy), ESregion);
        if (diy.settings.get('Encounterset1', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset1', diy), ES1region);
        if (diy.settings.get('Encounterset2', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset2', diy), ES2region);
        if (diy.settings.get('Encounterset3', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset3', diy), ES3region);
        if (diy.settings.get('Encounterset4', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset4', diy), ES4region);
        if (diy.settings.get('Encounterset5', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset5', diy), ES5region);
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
