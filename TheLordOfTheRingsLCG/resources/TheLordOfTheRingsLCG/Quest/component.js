// cambiar StageLetter a imagen? y a\u00f1adir selector de letra
// añadir difficulty

/* COMPONENT CONFIGURATION */
const Card = 'Quest';
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
    createPortrait('PortraitFront', diy);
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
    if ($Template == 'Nightmare') advancedControls = true;
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

    // SCENARIO PANEL
    let Scenario_panel = new TypeGrid();
    Scenario_panel.setTitle(@LRL-Scenario);
    let Scenario_control = new uiScenario(diy, bindings, BOTH);
    if (advancedControls) let limit = 99;
    else limit = 9;
    let Stage_control = new uiSpinnerLabeled('Stage', bindings, BOTH, limit);
    Scenario_panel.place(Scenario_control, 'hfill', Stage_control, '');
    Main_tab.place(Scenario_panel, 'br hfill');

    // TEXTBOX PANEL
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);
    let Story_control = new uiParagraphLabeled('Story', bindings, FRONT, 'small');
    let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
    let Condition_control = new uiParagraphLabeled('Condition', bindings, FRONT, 'small');
    TextBox_panel.place(
        Story_control, 'hfill'
        , Effect_control, 'br hfill'
        , Condition_control, 'br hfill'
    );
    Main_tab.place(TextBox_panel, 'br hfill');

    // OTHER PANEL
    if (advancedControls) {
	    let OtherEffect_panel = new TypeGrid();
	    OtherEffect_panel.setTitle(@LRL-OtherEffect);
	    let OptionRight_control = new uiTextLabeled('OptionRight', bindings, FRONT);
	    OtherEffect_panel.place(OptionRight_control, 'br hfill');
	    Main_tab.place(OtherEffect_panel, 'br hfill');
	}

    // MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);

    // MAINBACK TAB
    let MainBack_tab = new TypeGrid();
    MainBack_tab.editorTabScrolling = true;

    // TITLE PANEL
    let TitleBack_panel = new TypeGrid();
    TitleBack_panel.setTitle(@LRL-Title);
    let TitleBack_control = new uiText('TitleBack', bindings, BACK);
    let TitleBackShare_control = new uiButtonText('TitleBack-share', diy, bindings, BACK);
    TitleBack_panel.place(
    	TitleBack_control, 'hfill'
    	, TitleBackShare_control, ''
    );
    //	if(advancedControls){
    //		let GroupBack_control = new uiText('GroupBack',bindings,BACK) ;
    //		let StageBack_control = new uiSpinner('StageBack',bindings, BACK,9) ;
    //		list = new Array( 
    //			'a','b','c','d','e','f','g','h','i','j' 
    //			, 'k','l','m','n','o','p','q','r','s','t' 
    //			, 'u','v','w','x','y','z'
    //		) ;
    //		let SideBack_control = new uiListText('SideBack',bindings,BACK,list) ;
    //		TitleBack_panel.place(
    //			@LRL-Group,'br',GroupBack_control,'hfill'
    //			, @LRL-Stage,'',StageBack_control,'' 
    //			, @LRL-Side,'',SideBack_control,'' 
    //		) ;
    //	}
    MainBack_tab.place(TitleBack_panel, 'hfill');

    // STATS PANEL	
    let Stats_panel = new TypeGrid();
    Stats_panel.setTitle(@LRL-Stats);
    if (advancedControls) limit = 99;
    else limit = 19;
    let Progress_control = new uiStat('Progress', bindings, BACK, limit, ['X', '-']);
    Stats_panel.place(uiIcon('Progress'), '', Progress_control, '');
    MainBack_tab.place(Stats_panel, 'br hfill');

    // TEXTBOXBACK PANEL
    let TextBoxBack_panel = new TypeGrid();
    TextBoxBack_panel.setTitle(@LRL-TextBoxBack);
    let StoryBack_control = new uiParagraphLabeled('StoryBack', bindings, FRONT, 'small');
    let EffectBack_control = new uiParagraphLabeled('EffectBack', bindings, FRONT, 'big');
    let ConditionBack_control = new uiParagraphLabeled('ConditionBack', bindings, FRONT, 'small');
    TextBoxBack_panel.place(
        StoryBack_control, 'hfill'
        , EffectBack_control, 'br hfill'
        , ConditionBack_control, 'br hfill'
    );
    MainBack_tab.place(TextBoxBack_panel, 'br hfill');

    // OTHER EFFECT PANEL
    let OtherEffectBack_panel = new TypeGrid();
    OtherEffectBack_panel.setTitle(@LRL-OtherEffect);
    let OptionRightBack_control = new uiTextLabeled('OptionRightBack', bindings, BACK);
    OtherEffectBack_panel.place(OptionRightBack_control, 'hfill');
    MainBack_tab.place(OtherEffectBack_panel, 'br hfill');

    // MAINBACK TAB CLOSE
    MainBack_tab.addToEditor(editor, @LRL-MainBack);

    // ENCOUNTER SET TAB
    var Encounterset_tab = new TypeGrid();
    Encounterset_tab.editorTabScrolling = true;

    // ENCOUNTER SET PANEL
    let Encounterset_panel = new TypeGrid();
    Encounterset_panel.setTitle(@LRL-Encounterset);
    let Encounterset_control = new uiEncountersetList(bindings, BOTH);
    Encounterset_panel.place(Encounterset_control, 'hfill');
    if (advancedControls) {
        list = new Array('Standard', 'Gold', 'Red', 'Green', 'Blue', 'Purple');
        let Difficulty_control = new uiListIconLabeled('Difficulty', list, bindings, FRONT);
        Encounterset_panel.place(Difficulty_control, 'hfill');
    }
    let EncountersetPortrait_control = new uiPortrait('Encounterset', diy);
    Encounterset_panel.place(EncountersetPortrait_control, 'br hfill');
    Encounterset_tab.place(Encounterset_panel, 'hfill');

    // ADDITIONAL SET 1 PANEL
    let Encounterset1_panel = new TypeGrid();
    Encounterset1_panel.setTitle(@LRL-Encounterset1);
    let Encounterset1_control = new uiOtherEncountersetList('Encounterset1', bindings, FRONT);
    let Encounterset1Portrait_control = new uiPortrait('Encounterset1', diy);
    Encounterset1_panel.place(
        Encounterset1_control, 'hfill'
        , Encounterset1Portrait_control, 'br hfill'
    );
    Encounterset_tab.place(Encounterset1_panel, 'br hfill');

    // ADDITIONAL SET 2 PANEL
    let Encounterset2_panel = new TypeGrid();
    Encounterset2_panel.setTitle(@LRL-Encounterset2);
    let Encounterset2_control = new uiOtherEncountersetList('Encounterset2', bindings, FRONT);
    let Encounterset2Portrait_control = new uiPortrait('Encounterset2', diy);
    Encounterset2_panel.place(
        Encounterset2_control, 'hfill'
        , Encounterset2Portrait_control, 'br hfill'
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
    if (advancedControls) {
        let Template_tab = new TypeGrid();
        Template_tab.editorTabScrolling = true;

        // TEMPLATE PANEL
        let Template_panel = new TypeGrid();
        Template_panel.setTitle(@LRL-Template);
        list = new Array('Standard', 'Nightmare');
        let Template_control = new uiListIcon('Template', list, bindings, BOTH);
        Template_panel.place(Template_control, 'hfill');
        Template_tab.place(Template_panel, 'hfill');

        // TEMPLATE TAB CLOSE
    	Template_tab.addToEditor(editor, @LRL-Template);
    }

    // PORTRAIT TAB
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;

    // PORTRAIT PANEL
    let PortraitFront_panel = new TypeGrid();
    PortraitFront_panel.setTitle(@LRL-PortraitFront);
    let Artist_control = new uiTextLabeled('Artist', bindings, FRONT);
    let PortraitFront_control = new uiPortrait('PortraitFront', diy);
    let PortraitFrontMirror_control = new uiPortraitMirror('PortraitFront', PortraitFront_control);

   	if (advancedControls) {
	    let PortraitFrontTint_control = new uiButtonText('PortraitFront-tinted', diy, bindings, FRONT);
	    list = new Array('None', 'PortraitTint', 'Black');
	    if (advancedControls) list = list.concat(new Array('CustomColour'));
	    let PortraitFrontShadow_control = new uiCyclerLabeled('PortraitFront-shadow', list, bindings, FRONT);
	    let PortraitFrontShadowTint_control = new uiTint('PortraitFront-shadow', bindings, FRONT);
	    PortraitFront_panel.place(
	        Artist_control, 'hfill', 
	        PortraitFront_control, 'br hfill',
	        PortraitFrontMirror_control, 'br hfill',
	        PortraitFrontTint_control, '',
	        PortraitFrontShadow_control, '', 
	        PortraitFrontShadowTint_control, 'br'
	    );
	}else{
	    PortraitFront_panel.place(
	        Artist_control, 'hfill', 
	        PortraitFront_control, 'br hfill',
	        PortraitFrontMirror_control, 'br hfill'
	    );
	}

    Portrait_tab.place(PortraitFront_panel, 'hfill');

    // PORTRAIT BACK PANEL
    let PortraitBack_panel = new TypeGrid();
    PortraitBack_panel.setTitle(@LRL-PortraitBack);
    let PortraitShare_control = new uiButtonText('PortraitBack-share', diy, bindings, BACK);
    let ArtistBack_control = new uiTextLabeled('ArtistBack', bindings, BACK);
    let PortraitBack_control = new uiPortrait('PortraitBack', diy);
    let PortraitBackMirror_control = new uiPortraitMirror('PortraitBack', PortraitBack_control);

    if (advancedControls) {
	    list = new Array('None', 'Black');
	    if (advancedControls) list = list.concat(new Array('CustomColour'));
	    let PortraitBackShadow_control = new uiCyclerLabeled('PortraitBack-shadow', list, bindings, FRONT);
	    let PortraitBackShadowTint_control = new uiTint('PortraitBack-shadow', bindings, FRONT);
 	    PortraitBack_panel.place(
            PortraitShare_control, '', 
	        ArtistBack_control, 'hfill', 
	        PortraitBack_control, 'br hfill',
    	    PortraitBackMirror_control, 'br hfill',
	        PortraitBackShadow_control, '', 
	        PortraitBackShadowTint_control, 'br'
	    );
	}else{
	    PortraitBack_panel.place(
	        PortraitShare_control, '', 
	        ArtistBack_control, 'hfill', 
	        PortraitBack_control, 'br hfill',
	        PortraitBackMirror_control, 'br hfill'
	    );
	}
    Portrait_tab.place(PortraitBack_panel, 'br hfill');

    Portrait_tab.addToEditor(editor, @LRL-Portrait);

    // COLLECTION TAB
    let Collection_tab = new TypeGrid();
    Collection_tab.editorTabScrolling = true;

    // COLLECTION PANEL
    let Collection_panel = new TypeGrid();
    Collection_panel.setTitle(@LRL-Collection);
    let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber', bindings, BOTH, 999);
    let CollectionNumberHide_control = new uiButtonText('CollectionNumber-hide', diy, bindings, FRONT);
    let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, BOTH);
    let Collection_control = new uiCollectionList(bindings, BOTH);
    let CollectionPortrait_control = new uiPortrait('Collection', diy);
    Collection_panel.place(
        Collection_control, 'hfill', CollectionNumber_control, 'br', CollectionNumberHide_control, '', CollectionInfo_control, 'hfill', CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

    // OTHER CONTROLS PANEL
    let OtherControls_panel = new TypeGrid();
    OtherControls_panel.setTitle(@LRL-OtherControls);
    let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
    OtherControls_panel.place(Copyright_control, 'hfill');
    if (advancedControls) {
		list = new Array( 
			'a','b','c','d','e','f','g','h','i','j' 
			, 'k','l','m','n','o','p','q','r','s','t' 
			, 'u','v','w','x','y','z'
		) ;

		let StageLetter_control = new uiListTextLabeled('Stage-letter',list,bindings,FRONT) ;
		let StageBackLetter_control = new uiListTextLabeled('StageBack-letter',list,bindings,BACK) ;
		OtherControls_panel.place(
			StageLetter_control, 'br hfill'
			,StageBackLetter_control, 'br hfill'
		) ;
    }
    Collection_tab.place(OtherControls_panel, 'br hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
}

function createFrontPainter(diy, sheet) {
    debug(1, 'createFrontPainter');
    
    // TEMPLATE
    Difficulty_tinter = new createTinter('Difficulty', diy);


    // STATS
    Stage_tinter = new createTinter('Stage', diy);

    // TEXT
    Title_writer = new createWriter('Title', diy, sheet);
    Scenario_writer = new createWriter('Scenario', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);
    EncountersetNumber_writer = new createWriter('EncountersetNumber', diy, sheet);

	// PORTRAITS
    PortraitShadow_tinter = new createTinter('Portrait-shadow', diy);
    updateExternalPortrait('PortraitFront', diy);
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
    
    // STATS
    Progress_tinter = new createTinter('Progress', diy);

    // PORTRAITS
    updateExternalPortrait('PortraitBack', diy);
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');

    // PORTRAIT
    if (diy.settings.getBoolean('PortraitFront-tinted',true)) {
        sheet.paintImage(g, ImageUtils.get(PathImage + 'white1x1.png'), 'Template');
        index = portraitIndexOf('PortraitFront');
        let imageTinted = PortraitList[index].getImage();
        let imagePanX = PortraitList[index].getPanX();
        let imagePanY = PortraitList[index].getPanY();
        let imageRotation = PortraitList[index].getRotation();
        let imageScale = PortraitList[index].getScale();

        if ($Template == 'Nightmare') imageTinted = createRedishImage(imageTinted);
        else imageTinted = createSepiaImage(imageTinted);

        let region = getArray('PortraitFront-portrait-clip-region', diy);
        let AT = java.awt.geom.AffineTransform;
        let transform = AT.getTranslateInstance(
            Number(region[0]) + (Number(region[2]) / 2) + imagePanX-((imageTinted.width * imageScale) / 2),
            Number(region[1]) + (Number(region[3]) / 2) + imagePanY-((imageTinted.height * imageScale) / 2)
        );
        transform.concatenate(AT.getScaleInstance(imageScale, imageScale));
        transform.concatenate(AT.getRotateInstance(-imageRotation * Math.PI / 180, imageTinted.width / 2, imageTinted.height / 2));
        g.drawImage(imageTinted, transform, null);
    } else paintPortrait('PortraitFront', diy, g, sheet);

	paintPortraitShadow('PortraitFront', PortraitShadow_tinter, diy, g, sheet) ;

    // TEMPLATE
    paintTemplate(diy, g, sheet);
    let list = new Array('Encounterset1', 'Encounterset2', 'Encounterset3', 'Encounterset4', 'Encounterset5');
    paintAdapter(list, diy, g, sheet);
    //	let adapterSelector = 0;
    //	for( let index=0 ; index<adapterList.length ; index++ ) if($(adapterList[index])!='Empty') adapterSelector=index+1 ;
    //	sheet.paintImage(g,ImageUtils.get(PathCard+$Template+'-Adapter-'+adapterSelector+'.jp2'),'Template') ;
    if ($Template == 'Standard') paintDifficulty(diy, g, sheet);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    paintIconLRL('Encounterset', diy, g, sheet);
    paintIcon('Encounterset1', diy, g, sheet);
    paintIcon('Encounterset2', diy, g, sheet);
    paintIcon('Encounterset3', diy, g, sheet);
    paintIcon('Encounterset4', diy, g, sheet);
    paintIcon('Encounterset5', diy, g, sheet);

    // STATS
    Stage_tinter.setImage(ImageUtils.get(PathNumberTintable + $Stage + 'a.png'));
    sheet.paintImage(g, Stage_tinter.getTintedImage(), 'Stage');

    // TEXTS
    writeTitle(diy, g);
    writeScenario(diy, g);
    if ($OptionRight != '') {
        writeOption('OptionRight', diy, g, sheet);
        Body_writer.setPageShape(diy.settings.getCupShape('Option-Body-shape'));
    } else {
        Body_writer.setPageShape(PageShape.RECTANGLE_SHAPE);
    }
    writeBody(['Story', 'Effect', 'Condition'], diy, g);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    if (diy.settings.getBoolean('CollectionNumber-hide', false)) {
        writeTextOutlined(
            diy.settings.get('CollectionNumber-format', '') + '---', Bottom_writer,
            diy.settings.getRegion('CollectionNumber'), getStroke('Bottom-stroke', diy),
            diy, g, sheet
        );
    } else writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    // PORTRAIT
    if (diy.settings.getBoolean('PortraitBack-share')) {
    	paintPortrait('PortraitFront', diy, g, sheet);
    }else {
	    paintPortrait('PortraitBack', diy, g, sheet);
	}
	paintPortraitShadow('PortraitBack',PortraitShadow_tinter, diy, g, sheet) ;

    // TEMPLATE
    if ($Template == 'Nightmare') sheet.paintImage(g, 'Nightmare-template', 'Template');
    else sheet.paintTemplateImage(g);

    // ICONS
    paintIcon('Collection', diy, g, sheet);
    paintIconLRL('Encounterset', diy, g, sheet);

    // STATS
    Stage_tinter.setImage(ImageUtils.get(PathNumberTintable + $Stage + 'b.png'));
    sheet.paintImage(g, Stage_tinter.getTintedImage(), 'Stage');
    paintStatTinted('Progress', Progress_tinter, diy, g, sheet);

    // TEXTS
    if (diy.settings.getBoolean('TitleBack-share',false) == true) writeTitle(diy, g);
    else writeLine($TitleBack, Title_writer, diy.settings.getRegion('Title'), g);

    if (diy.settings.get('ScenarioBack','') == '') writeScenario(diy, g);
    else writeLine($ScenarioBack, Scenario_writer, diy.settings.getRegion('Scenario'), g);

    if ($OptionRightBack != '') {
        writeOption('OptionRightBack', diy, g, sheet);
        Body_writer.setPageShape(diy.settings.getCupShape('Option-Body-shape'));
    } else {
        Body_writer.setPageShape(PageShape.RECTANGLE_SHAPE);
    }
    writeBody(['StoryBack', 'EffectBack', 'ConditionBack'], diy, g);

    if (diy.settings.getBoolean('PortraitBack-share')) writeArtist(diy, g, sheet);
    else {
        switch ($ArtistBack) {
            case 'no':
                text = '';
                break;
            case '':
                if (diy.settings.get('LRL-Artist-abreviation', '') != '') text = $LRL-Artist-unknown;
                else text = #LRL-Artist-unknown;
                break;
            default:
                if (diy.settings.get('LRL-Artist-abreviation', '') != '') text = $LRL-Artist-abreviation + ' ' + $ArtistBack;
                else text = #LRL-Artist-abreviation + ' ' + $ArtistBack;
        }
        writeTextOutlined(
            diy.settings.get('Artist-format', '') + text, Bottom_writer,
            diy.settings.getRegion('Artist'), getStroke('Bottom-stroke', diy),
            diy, g, sheet
        );
    }

    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function onRead(diy, ois) {
    debug(1, '\nonRead');
    /*
    This is one of the main functions on scripted components.
    This function is called by Strange Eons on component file loading.
    When using custom portrait handling, Portraits must be loaded
    explicitly.
    */
    if (diy.settings.get('VersionHistory', '') == '') {
        debug(0, 'VersionHistory nonexistent.');
        $VersionHistory = diy.version;
    }
    let LastVersion = String($VersionHistory).split(',');
    LastVersion = LastVersion[LastVersion.length-1];
    if (LastVersion != Number(SEVersion + LRLVersion + CardVersion)) {
        debug(4, 'VersionHistory updated.');
        $VersionHistory = $VersionHistory + ',' + SEVersion + LRLVersion + CardVersion;
    }

    try {
        portrait = ois.readObject();
    } catch (err) {
        portrait = null;
    }
    while (portrait != null) {
        let index = PortraitList.length;
        debug(5, 'PortraitList length: '+PortraitList.length);
        PortraitList[index] = portrait;
        try {
            portrait = ois.readObject();
        } catch (err) {
            portrait = null;
        }
    }
    if (diy.settings.getBoolean('LRL-PreferencesUpdate', false)) loadPreferences(diy);
}

function onWrite(diy, oos) {
    debug(1, '\nonWrite');
    /*
    This is one of the main functions on scripted components.
    This function is called by Strange Eons on component file save.
    When using custom portrait handling, Portraits must be saved
    explicitly.
    */
    for (let index in PortraitList) {
        oos.writeObject(PortraitList[index]);
    }
    debug(5, 'PortraitList length: '+PortraitList.length);
}

function onClear(diy) {
    debug(1, '\nonClear');
    /*
    This is one of the main functions on scripted components.
    This function is called by the Strange Eons user interface on
    Edit>Clear menu. Should be used only to initialize the component
    settings and controls.
    In my code, I use the Localizable list defined in the game object
    to clear all the text of the card.
    */
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
