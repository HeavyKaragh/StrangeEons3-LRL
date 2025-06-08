/* COMPONENT CONFIGURATION */
const Card = 'AllyPromo';
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

    diy.faceStyle = FaceStyle.TWO_FACES;
    diy.bleedMargin = 9;
    diy.frontTemplateKey = 'Template';
    diy.backTemplateKey = 'TemplateBack';

    diy.customPortraitHandling = true;
    createPortrait('Portrait', diy);
    createPortrait('Collection', diy);
    createPortrait('SphereIcon', diy);
    createPortrait('BodyIcon', diy);
    $PortraitListCount = getPortraitCount();
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls', false);
    var bindings = new Bindings(editor, diy);

    // MAIN TAB
    let Main_tab = new TypeGrid();
    Main_tab.editorTabScrolling = true;

        // TITLE PANEL
        let Title_panel = new TypeGrid();
        Title_panel.setTitle(@LRL-Title);
        let Title_control = uiTitleUnique(diy, bindings, FRONT);
        Title_panel.place(Title_control, 'hfill');
        Main_tab.place(Title_panel, 'hfill');
    
        // STATS PANEL
        let Stats_panel = new TypeGrid();
        Stats_panel.setTitle(@LRL-Stats);
        let limit = 9;
        if (advancedControls) limit = 99;
        let ResourceCost_control = new uiStatIcon('ResourceCost', bindings, FRONT, limit, ['X', '-']);
        let Willpower_control = new uiStatIcon('Willpower', bindings, FRONT, limit, ['X', '-']);
        let Attack_control = new uiStatIcon('Attack', bindings, FRONT, limit, ['X', '-']);
        let Defense_control = new uiStatIcon('Defense', bindings, FRONT, limit, ['X', '-']);
        let HitPoints_control = new uiStatIcon('HitPoints', bindings, FRONT, limit, ['X', '-']);
        Stats_panel.place(Willpower_control, '', Attack_control, '', Defense_control, '', HitPoints_control, 'br', ResourceCost_control, '');
        Main_tab.place(Stats_panel, 'br hfill');
    
        // TEXT BOX PANEL
        let TextBox_panel = new TypeGrid();
        TextBox_panel.setTitle(@LRL-TextBox);
        let Traits_control = new uiParagraphLabeled('Traits', bindings, FRONT, 'line');
        let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
        let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
        TextBox_panel.place(Traits_control, 'hfill', Effect_control, 'br hfill', Flavour_control, 'br hfill');
        Main_tab.place(TextBox_panel, 'br hfill');
    
        // OTHER EFFECT PANEL
        let OtherEffect_panel = new TypeGrid();
        OtherEffect_panel.setTitle(@LRL-OtherEffect);
        let OptionRight_control = new uiTextLabeled('OptionRight', bindings, FRONT);
        OtherEffect_panel.place(OptionRight_control, 'hfill');
        Main_tab.place(OtherEffect_panel, 'br hfill');

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // TEMPLATE TAB
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

        // SPHERE PANEL
        let Sphere_panel = new TypeGrid();
        Sphere_panel.setTitle(@LRL-Sphere);
        list = new Array('Neutral', 'Leadership', 'Lore', 'Spirit', 'Tactics');
        if (advancedControls) list = list.concat(new Array('Baggins', 'Fellowship', 'CustomSphere', 'Mastery'));
        let Sphere_control = new uiListIcon('Template', list, bindings, FRONT);
        Sphere_panel.place(Sphere_control, 'hfill');
        Template_tab.place(Sphere_panel, 'hfill');
    
        // TEXT BOX SIZE PANEL
        let TextBoxSize_panel = new TypeGrid();
        TextBoxSize_panel.setTitle(@LRL-TextBoxSize);
        list = new Array('Small', 'Medium', 'Big');
        let TextBoxSize_control = new uiCycler('TextBox-size', list, bindings, FRONT);
        TextBoxSize_panel.place(TextBoxSize_control, 'hfill');
        Template_tab.place(TextBoxSize_panel, 'br hfill');
    
        // STATS DECORATION PANEL
        let StatsDecoration_panel = new TypeGrid();
        StatsDecoration_panel.setTitle(@LRL-StatsDecoration);
        list = new Array('White', 'Scroll');
        let StatsDecoration_control = new uiCycler('Stats-decoration', list, bindings, FRONT);
        StatsDecoration_panel.place(StatsDecoration_control, 'hfill');
        Template_tab.place(StatsDecoration_panel, 'hfill');
    
        // CUSTOM SPHERE PANEL
        if (advancedControls) {
            let CustomSphere_panel = new TypeGrid();
            CustomSphere_panel.setTitle(@LRL-CustomSphere);
            let CustomSphere_control = new uiTint('CustomSphere', bindings, FRONT);
            let SphereIcon_control = new uiPortrait('SphereIcon', diy);
            let BodyIcon_control = new uiPortrait('BodyIcon', diy);
            let BodyIconTransparency_control = new uiTransparency('BodyIcon', bindings, FRONT);
            let BodyIconTinted_control = new uiButtonText('BodyIcon-tinted', diy, bindings, FRONT) CustomSphere_panel.place(CustomSphere_control, 'hfill', SphereIcon_control, 'br hfill', BodyIcon_control, 'br hfill', BodyIconTransparency_control, 'br hfill', BodyIconTinted_control, '');
            Template_tab.place(CustomSphere_panel, 'br hfill');
        }
    
        // TEMPLATE BACK PANEL
        if (advancedControls) {
            let TemplateBack_panel = new TypeGrid();
            TemplateBack_panel.setTitle(@LRL-TemplateBack);
            list = new Array('Player', 'Encounter');
            let TemplateBack_control = new uiListIcon('TemplateBack', list, bindings, BACK);
            TemplateBack_panel.place(TemplateBack_control, 'hfill');
            Template_tab.place(TemplateBack_panel, 'br hfill');
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
    
        // PORTRAIT TAB CLOSE   
        Portrait_tab.addToEditor(editor, @LRL-Portrait);
    
        // COLLECTION TAB
        let Collection_tab = new TypeGrid();
        Collection_tab.editorTabScrolling = true;
    
        // COLLECTION PANEL
        let Collection_panel = new TypeGrid();
        Collection_panel.setTitle(@LRL-Collection);
        let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber', bindings, FRONT, 999);
        let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, FRONT);
        let Collection_control = new uiCollectionList(bindings, FRONT);
        let CollectionPortrait_control = new uiPortrait('Collection', diy);
        Collection_panel.place(Collection_control, 'hfill', CollectionNumber_control, 'br', CollectionInfo_control, 'hfill', CollectionPortrait_control, 'br hfill');
        Collection_tab.place(Collection_panel, 'hfill');
    
        // OTHER CONTROLS PANEL
        let OtherControls_panel = new TypeGrid();
        OtherControls_panel.setTitle(@LRL-OtherControls);
        let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
        OtherControls_panel.place(Copyright_control, 'hfill');
        if (advancedControls) {
            let Type_control = new uiTextLabeled('Type', bindings, FRONT);
            OtherControls_panel.place(Type_control, 'br hfill');
            // This panel placement would put it beside the
            // previous one if "br" is not used
        }
        Collection_tab.place(OtherControls_panel, 'br hfill');
    
    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Traits_writer = new createWriter('Traits', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // STATS
    ResourceCost_tinter = new createTinter('ResourceCost', diy);
    HitPoints_tinter = new createTinter('HitPoints', diy);
    White_tinter = new createTinter('White', diy);

    // TEMPLATE
    Body_tinter = new createTinter('Body', diy);
    BodyIcon_tinter = new createTinter('BodyIcon', diy);

    // PORTRAIT
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('SphereIcon', diy);
    updateExternalPortrait('BodyIcon', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    if ($Template == 'CustomSphere') {
        let image = diy.settings.getImageResource('Body-' + $TextBox-size + '-tintable') Body_tinter.setImage(image);
        let tint = diy.settings.getTint('CustomSphere-tint');
        Body_tinter.setFactors(tint[0], tint[1], tint[2]); // mover a listener
        image = Body_tinter.getTintedImage();
        sheet.paintImage(g, image, 'Template-region');

        sheet.paintImage(g, 'CustomSphere-' + $TextBox-size + '-template', 'Template');

        debug(2, '\tpaintCustomSphereBodyIcon');
        image = getPortraitImage('BodyIcon'); // get image from portrait
        if (diy.settings.getBoolean('BodyIcon-tinted', true)) {
            debug(5, '\tTinted: ' + $BodyIcon-tinted);
            image = createRedishImage(image); // recolorize image for tinter
            BodyIcon_tinter.setImage(image); // put image into tinter
            BodyIcon_tinter.setFactors(tint[0], tint[1], tint[2]); // modify tinter colour
            image = BodyIcon_tinter.getTintedImage(); // get tinted image
        }
        debug(5, '\tTransparency: ' + $BodyIcon-transparency);
        image = ImageUtilities.alphaComposite(image, Number($BodyIcon-transparency) / 10); // apply transparency
        sheet.paintImage(g, image, 'BodyIcon-' + $TextBox-size + '-portrait-clip-region');

    } else {
        if (diy.settings.get($Template + '-' + $TextBox-size + '-template') != null) {
            debug(5, '\tTemplate: ' + diy.settings.get($Template + '-' + $TextBox-size + '-template'));
            sheet.paintImage(g, $Template + '-' + $TextBox-size + '-template', 'Template');
        } else sheet.paintTemplateImage(g);
    }

    sheet.paintImage(g, 'Stats-' + $Stats-decoration, 'Template');

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    if ($Template == 'CustomSphere') {
        let image = getPortraitImage('SphereIcon');
        let regionKey = getKeyForTemplate('SphereIcon-' + $TextBox-size + '-portrait-clip-region', diy);
        sheet.paintImage(g, image, regionKey);
    }

    // STATS
    image = ImageUtils.get(PathNumberTintable + $ResourceCost + '.png');
    if ($Stats-decoration == 'Scroll') {
        ResourceCost_tinter.setImage(image);
        image = ResourceCost_tinter.getTintedImage();
    } else {
        White_tinter.setImage(image);
        image = White_tinter.getTintedImage();
    }
    sheet.paintImage(g, image, 'ResourceCost-' + $Stats-decoration + '-region');

    image = ImageUtils.get(PathNumberTintable + $HitPoints + '.png');
    HitPoints_tinter.setImage(image);
    image = HitPoints_tinter.getTintedImage();
    region = 'HitPoints-' + $TextBox-size + '-region';
    sheet.paintImage(g, image, region);

    function paintStatBlackOrWhite(key, diy, g, sheet) {
        if ($Stats-decoration == 'Scroll') {
            image = ImageUtils.get(PathNumber + diy.settings.get(key) + '.png');
        } else {
            image = ImageUtils.get(PathNumberTintable + diy.settings.get(key) + '.png');
            White_tinter.setImage(image);
            image = White_tinter.getTintedImage();
        }
        region = key + '-' + $Stats-decoration + '-region';
        sheet.paintImage(g, image, region);
    }

    paintStatBlackOrWhite('Willpower', diy, g, sheet);
    paintStatBlackOrWhite('Attack', diy, g, sheet);
    paintStatBlackOrWhite('Defense', diy, g, sheet);

    // TEXTS
    text = formatTitle(diy, g);
    region = diy.settings.getRegion('Title-' + $TextBox-size, diy.settings.getRegion('Title'));
    writeLine(text, Title_writer, region, g);

    //writeTraits(diy, g, sheet);
    text = diy.settings.get('Traits', '');
    format = diy.settings.get('Traits-format', '');
    text = format + text;
    region = diy.settings.getRegion('Traits-' + $TextBox-size, diy.settings.getRegion('Traits'));
    writeLine(text, Traits_writer, region, g);

    //parts = ['Trait', 'Effect', 'Flavour'];
    parts = ['Effect', 'Flavour'];
    region = diy.settings.getRegion('Body-' + $TextBox-size, diy.settings.getRegion('Body'));
    //Body_writer.setPageShape(diy.settings.getCupShape('Body-'+$TextBox-size+'-shape'));
    writeParagraph(parts, Body_writer, region, diy, g);

    text = diy.settings.get('Type', '');
    format = diy.settings.get('Type-format', '');
    if ($Template == 'Neutral') {
        region = getArray('Type-' + $TextBox-size + '-region', diy);
        regionModifier = getArray('Neutral-Type-region-modifier', diy);
        region = new Region​ (Number(region[0]) + Number(regionModifier[0]), Number(region[1]) + Number(regionModifier[1]), Number(region[2]) + Number(regionModifier[2]), Number(region[3]) + Number(regionModifier[3]));
    } else {
        region = diy.settings.getRegion('Type-' + $TextBox-size, diy.settings.getRegion('Type'));
    }
    if (text == '') {
        text = # ('LRL-' + Card + '-' + $Template);
        if (text == "[MISSING: LRL-" + Card + "-" + $Template + "]") text = # ('LRL-' + Card);
    }
    text = format + text;
    writeLine(text, Type_writer, region, g);

    let text = diy.settings.get('OptionRight', '');
    if (text != '') writeLineDecorated('OptionRight', Option_writer, diy, g, sheet);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');

    // TEMPLATE
    paintTemplateBack(diy, g, sheet);
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