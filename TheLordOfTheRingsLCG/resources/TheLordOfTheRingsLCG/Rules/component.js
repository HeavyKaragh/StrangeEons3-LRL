// alineación e iconos y decoración

/* COMPONENT CONFIGURATION */
const Card = 'Rules';
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
    Title_panel.place(
        Title_control, 'hfill'
        , Group_control, 'br hfill'
        , PageNumber_control, '', @LRL-Of, '', PageTotal_control, ''
    );
    Main_tab.place(Title_panel, 'hfill');

    // TEXTBOX PANEL
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);
    let StoryFront_control = new uiParagraphLabeled('StoryFront', bindings, FRONT, 'medium');
    let TextFront_control = new uiParagraphLabeled('TextFront', bindings, FRONT, 'big');
    let FlavourFront_control = new uiParagraphLabeled('FlavourFront', bindings, FRONT, 'medium');
    TextBox_panel.place(
        StoryFront_control, 'hfill'
        , TextFront_control, 'br hfill'
        , FlavourFront_control, 'br hfill'
    );
    Main_tab.place(TextBox_panel, 'br hfill');

    Main_tab.addToEditor(editor, @LRL-Main);

    // MAINBACK TAB
    var MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;

    // TEXTBOXBACK PANEL
    let TextBoxBack_panel = new TypeGrid();
    TextBoxBack_panel.setTitle(@LRL-TextBoxBack);
    let StoryBack_control = new uiParagraphLabeled('StoryBack', bindings, FRONT, 'medium');
    let TextBack_control = new uiParagraphLabeled('TextBack', bindings, FRONT, 'big');
    let FlavourBack_control = new uiParagraphLabeled('FlavourBack', bindings, FRONT, 'medium');
    TextBoxBack_panel.place(
        StoryBack_control, 'hfill'
        , TextBack_control, 'br hfill'
        , FlavourBack_control, 'br hfill'
    );
    MainBack_tab.place(TextBoxBack_panel, 'br hfill');

    // MAINBACK TAB CLOSE
    MainBack_tab.addToEditor(editor, @LRL-MainBack);

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
    PortraitBack_panel.place(
        ArtistBack_control, 'hfill', 
        PortraitBack_control, 'br hfill', 
        PortraitLayoutBack_control, 'br', 
        PortraitMirrorBack_control, 'hfill'
    );
    Portrait_tab.place(PortraitBack_panel, 'hfill');

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
    Collection_panel.place(
        Collection_control, 'hfill', 
        CollectionInfo_control, 'br hfill', 
        CollectionPortrait_control, 'br hfill'
    );
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
    updateExternalPortrait('Encounterset', diy);
    updateExternalPortrait('Encounterset1', diy);
    updateExternalPortrait('Encounterset2', diy);
    updateExternalPortrait('Encounterset3', diy);
    updateExternalPortrait('Encounterset4', diy);
    updateExternalPortrait('Encounterset5', diy);
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
        let list = new Array('Encounterset', 'Encounterset1', 'Encounterset2', 'Encounterset3', 'Encounterset4', 'Encounterset5');
        let selector = 0;
        for (let index = 0; index < list.length; index++)
            if (diy.settings.get(list[index]) != 'EmptyIcon') selector = index + 1;
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

        if (diy.settings.get('Encounterset', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset', diy), ESregion);
        if (diy.settings.get('Encounterset1', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset1', diy), ES1region);
        if (diy.settings.get('Encounterset2', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset2', diy), ES2region);
        if (diy.settings.get('Encounterset3', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset3', diy), ES3region);
        if (diy.settings.get('Encounterset4', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset4', diy), ES4region);
        if (diy.settings.get('Encounterset5', 'EmptyIcon') != 'EmptyIcon') sheet.paintImage(g, getIcon('Encounterset5', diy), ES5region);

        //		switch( Number( adapterSelector ) ){
        //		case 6:
        //			paintIcon('Encounterset',diy,g,sheet) ;
        //			paintIcon('Encounterset1',diy,g,sheet) ;
        //			paintIcon('Encounterset2',diy,g,sheet) ;
        //			paintIcon('Encounterset3',diy,g,sheet) ;
        //			paintIcon('Encounterset4',diy,g,sheet) ;
        //			paintIcon('Encounterset5',diy,g,sheet) ;
        //			break ;
        //		case 5: 
        //			sheet.paintImage(g,getIcon('Encounterset'),diy.settings.getRegion('EncountersetM1')) ;
        //			sheet.paintImage(g,getIcon('Encounterset1'),diy.settings.getRegion('EncountersetM2')) ;
        //			sheet.paintImage(g,getIcon('Encounterset2'),diy.settings.getRegion('EncountersetM3')) ;
        //			sheet.paintImage(g,getIcon('Encounterset3'),diy.settings.getRegion('EncountersetM4')) ;
        //			sheet.paintImage(g,getIcon('Encounterset4'),diy.settings.getRegion('EncountersetM5')) ;
        //			break ;
        //		case 4: 
        //			sheet.paintImage(g,getIcon('Encounterset'),diy.settings.getRegion('Encounterset1-portrait-clip-region')) ;
        //			sheet.paintImage(g,getIcon('Encounterset1'),diy.settings.getRegion('Encounterset2-portrait-clip-region')) ;
        //			sheet.paintImage(g,getIcon('Encounterset2'),diy.settings.getRegion('Encounterset3-portrait-clip-region')) ;
        //			sheet.paintImage(g,getIcon('Encounterset3'),diy.settings.getRegion('Encounterset4-portrait-clip-region')) ;
        //			break ;
        //		case 3: 
        //			sheet.paintImage(g,getIcon('Encounterset'),diy.settings.getRegion('EncountersetM2')) ;
        //			sheet.paintImage(g,getIcon('Encounterset1'),diy.settings.getRegion('EncountersetM3')) ;
        //			sheet.paintImage(g,getIcon('Encounterset2'),diy.settings.getRegion('EncountersetM4')) ;
        //			break ;
        //		case 2:
        //			sheet.paintImage(g,getIcon('Encounterset'),diy.settings.getRegion('Encounterset2-portrait-clip-region')) ;
        //			sheet.paintImage(g,getIcon('Encounterset1'),diy.settings.getRegion('Encounterset3-portrait-clip-region')) ;
        //			break ;
        //		case 1: 
        //			sheet.paintImage(g,getIcon('Encounterset'),diy.settings.getRegion('EncountersetM3')) ;
        //			break ;
        //		default:
        //			break ;
        //		}
    }

    // TEXTS
    if ($Template-layout != 'Plain') {
        writeTextOutlined($Title, Title_writer, diy.settings.getRegion('Title'), getStroke('Title', diy), diy, g, sheet);
    }

    writeParagraph(['StoryFront', 'TextFront', 'FlavourFront'], Body_writer, diy.settings.getRegion('BodyFront-'+$Template-layout, diy.settings.getRegion('BodyFront')), diy, g);

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
    debug(5,'PortraitBack-layout: '+$PortraitBack-layout);
    writeParagraph(
        ['StoryBack', 'RulesBack', 'FlavourBack'], Body_writer,
        diy.settings.getRegion('BodyBack-'+$PortraitBack-layout), diy, g
    );

    writeLine(diy.settings.get('$CollectionInfo', '') + $CollectionInfo, Bottom_writer, diy.settings.getRegion('CollectionInfo'), g);
    if ($PortraitBack-layout != 'None') {
        writeLine(formatArtist('ArtistBack', diy), Bottom_writer, diy.settings.getRegion('ArtistBack'), g);
    } else {
        writeLine(diy.settings.get('Copyright-format', '') + $Copyright, Bottom_writer, diy.settings.getRegion('Copyright'), g);
    }
    writePage(diy, g, sheet);
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
