// color de la carta no funciona

/* COMPONENT CONFIGURATION */
const Card = 'PresentationExtra';
const CardVersion = 1;
// 1: rewrite using new 2023 library

function create(diy) {
    debug(1, '\ncreate');
    diy.extensionName = 'TheLordOfTheRingsLCG.seext';
    diy.version = SEVersion + LRLVersion + CardVersion;
    $VersionHistory = diy.version;

    loadSettings(diy);
    loadExample(diy);

    diy.frontTemplateKey = 'Template';
    diy.backTemplateKey = 'TemplateBack';
    diy.faceStyle = FaceStyle.TWO_FACES;
    diy.bleedMargin = 9;

    diy.customPortraitHandling = true;
    createPortrait('Collection', diy);
    createPortrait('Overlay', diy);
    createPortrait('OverlayBack', diy);
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
    
        // LAYOUT PANEL
        let Layout_panel = new TypeGrid();
        Layout_panel.setTitle(@LRL-Layout);
        list = new Array('None', 'Title');
        Layout_control = new uiCyclerLabeled('Layout', list, bindings, BOTH);
        Layout_panel.place(Layout_control, 'br hfill');
        Template_tab.place(Layout_panel, 'br hfill');
    
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
    
        //    // OVERLAY PANEL
        //    if (advancedControls) {
        //        let Overlay_panel = new TypeGrid();
        //        Overlay_panel.setTitle(@LRL-Overlay);
        //        let Overlay_control = new uiPortrait('Overlay', diy);
        //        let OverlayBack_control = new uiPortrait('OverlayBack', diy);
        //        Overlay_panel.place(
        //            Overlay_control, 'br hfill', OverlayBack_control, 'br hfill'
        //        );
        //        Template_tab.place(Overlay_panel, 'br hfill');
        //    }

    Template_tab.addToEditor(editor, @LRL-Template);

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
        let PageNumber_control = new uiSpinner('PageNumber', bindings, BACK, 98);
        let PageTotal_control = new uiSpinnerLabeled('PageTotal', bindings, BACK, 98);
        OtherControls_panel.place(Copyright_control, 'hfill', PageNumber_control, 'br', @LRL-Of, '', PageTotal_control, '');
        if (advancedControls) {
            let Group_control = new uiParagraphLabeled('Group', bindings, FRONT, 'small');
            let PageInbox_control = new uiButtonText('Page-inBox', diy, bindings, BACK);
            OtherControls_panel.place(PageInbox_control, '', Group_control, 'br hfill');
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
    Body_writer = new createWriter('Body', diy, sheet);
    Page_writer = new createWriter('Page', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // PORTRAIT
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('Overlay', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');

    // PORTRAIT
    updateExternalPortrait('OverlayBack', diy);
}

function paintCommon(diy, g, sheet) {
    debug(2, '\npaintCommon');
    let side = sheet.getSheetIndex();
    debug(5, 'Side: ' + side);

    // TEMPLATE
    // In this component, $Template is used only to select the background colour,
    // that should match the one used in Presentation card
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
    sheet.paintTemplateImage(g); // this will draw the actual template

    // ICONS
    let image;
    let region;
    let item = $Collection; // get the icon name contained inside $key
    if (side == FRONT) region = diy.settings.getRegion('Collection-portrait-clip');
    else region = diy.settings.getRegion('Collection-back-portrait-clip');
    switch (item) {
    case 'EmptyIcon':
        break;
    case 'CustomIcon':
        //PortraitList[portraitIndexOf(key)].paint(g,sheet.getRenderTarget()) ;
        image = PortraitList[portraitIndexOf('Collection')].getImage();
        sheet.paintImage(g, image, region);
        break;
    default:
        image = ImageUtils.get(PathIcon + item + '.png');
        sheet.paintImage(g, image, region);
    }

    // TEXTS
    let format;
    if (side == FRONT) region = diy.settings.getRegion('CollectionInfo');
    else region = diy.settings.getRegion('CollectionInfo-back');
    if (side == FRONT) format = $CollectionInfo-format;
    else format = $CollectionInfo-back-format;
    writeTextOutlined(format + $CollectionInfo, Bottom_writer, region, getStroke('Bottom', diy), diy, g, sheet);
    writeCopyright(diy, g, sheet);

    // PAGE
    if (diy.settings.getBoolean('Page-inBox')) {
        if ($PageNumber > 0) {
            let text;
            let format;

            if (diy.settings.getBoolean('Page-inBox')) format = diy.settings.get('Page-inBox-format', '');
            else format = diy.settings.get('Page-format', '');

            let page = diy.settings.get('LRL-Page', '') if (page == '') page = #LRL-Page;

            let number = Number($PageNumber) + sheet.getSheetIndex();

            if ($PageTotal > 0) {
                let pageOf = diy.settings.get('LRL-PageOf', '');
                if (pageOf == '') pageOf = #LRL-PageOf;
                text = format + page + number + pageOf + $PageTotal;
            } else text = format + page + number;

            writeLine(text, Body_writer, diy.settings.getRegion('Page-inBox'), g);
        }
    } else writePage(diy, g, sheet);

}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');
    paintCommon(diy, g, sheet);

    // TEMPLATE
    //    paintPortrait('Overlay', diy, g, sheet);

    // TEXTS
    // NAME
    if ($Layout != 'None') {
        writeTextOutlined(diy.settings.get('Title-format', '') + $Title, Title_writer, diy.settings.getRegion('Title'), getStroke('Title', diy), diy, g, sheet);
    }

    // BODY
    let region;
    if ($Layout == 'None') region = diy.settings.getRegion('Body');
    else region = diy.settings.getRegion($Layout + '-Body');

    writeParagraph(['Story', 'Text', 'Flavour'], Body_writer, region, diy, g);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    paintCommon(diy, g, sheet);

    // TEMPLATE
    //    paintPortrait('OverlayBack', diy, g, sheet);

    // TEXT
    writeParagraph(['StoryBack', 'TextBack', 'FlavourBack'], Body_writer, diy.settings.getRegion('Body'), diy, g);
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