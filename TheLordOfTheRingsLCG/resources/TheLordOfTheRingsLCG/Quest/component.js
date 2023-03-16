const Card = 'Quest';
// cambiar StageLetter a imagen? y a\u00f1adir selector de letra
const CardVersion = 1 ;
// 1: rewrite using new 2021 library

function create(diy){ debug(1,'\ncreate') ;
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings(diy) ;
	loadExample(diy) ;
	loadPreferences(diy) ; 
	
	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'TemplateBack' ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 9 ;

	diy.customPortraitHandling = true ;
	createPortrait('Portrait',diy) ;
	createPortrait('PortraitBack',diy) ;
	createPortrait('Collection',diy) ;
	createPortrait('Set',diy) ;
	createPortrait('Set1',diy) ;
	createPortrait('Set2',diy) ;
	createPortrait('Set3',diy) ;
	createPortrait('Set4',diy) ;
	createPortrait('Set5',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface(diy,editor,sheet){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls') ;
	if($Template=='Custom') advancedControls = true ;

	var bindings = new Bindings(editor,diy) ;
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,BOTH) ;
	Title_panel.place( Name_control,'hfill' ) ;
	Main_tab.place(Title_panel,'hfill') ;

	// QUEST PANEL
	let Quest_panel = new TypeGrid() ;
	Quest_panel.setTitle(@LRL-Quest) ;
	let Scenario_control = new uiText('Scenario',bindings,BOTH) ;
	let Stage_control = new uiSpinnerLabeled('Stage',bindings, BOTH,9) ;
	Quest_panel.place( Scenario_control,'hfill' , Stage_control,'' ) ;
	Main_tab.place(Quest_panel,'br hfill') ;
	
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle(@LRL-Effect) ;
	let Story_control = new uiParagraphLabeled('Story',bindings,FRONT,'medium') ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'big') ;
	let Condition_control = new uiParagraphLabeled('Condition',bindings,FRONT,'small') ;
	Effect_panel.place(
		Story_control,'hfill'
		, Rules_control,'br hfill'
		, Condition_control,'br hfill'
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;
	
	// OTHER PANEL
	let OtherEffect_panel = new TypeGrid() ;
	OtherEffect_panel.setTitle(@LRL-OtherEffect) ;
	let OptionRight_control = new uiTextLabeled('OptionRight',bindings,FRONT) ;
	OtherEffect_panel.place(OptionRight_control,'br hfill') ;
	Main_tab.place(OtherEffect_panel,'br hfill') ;

	Main_tab.addToEditor(editor,@LRL-Main) ;
	
// MAIN BACK TAB
	let MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let TitleBack_panel = new TypeGrid() ;
	TitleBack_panel.setTitle(@LRL-Title) ;
	let NameBack_control = new uiText('NameBack',bindings,BACK) ;
	TitleBack_panel.place(NameBack_control,'hfill') ;
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
	MainBack_tab.place(TitleBack_panel,'hfill') ;

	// STATS PANEL	
	let Stats_panel = new TypeGrid() ;
	Stats_panel.setTitle(@LRL-Stats) ;
	let Progress_control = new uiStat('Progress',bindings,BACK,19,['x','-']) ;
	Stats_panel.place(uiIcon('Progress'),'',Progress_control,'') ;
	MainBack_tab.place(Stats_panel,'br hfill') ;
	
	// EFFECT PANEL	
	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle(@LRL-Effect) ;
	let StoryBack_control = new uiParagraphLabeled('StoryBack',bindings,BACK,'medium') ;
	let RulesBack_control = new uiParagraphLabeled('RulesBack',bindings,BACK,'big') ;
	let ConditionBack_control = new uiParagraphLabeled('ConditionBack',bindings,BACK,'small') ;
	EffectBack_panel.place(
		StoryBack_control,'hfill'
		, RulesBack_control,'br hfill'
		, ConditionBack_control,'br hfill'
	) ;
	MainBack_tab.place(EffectBack_panel,'br hfill') ;
	
	// OTHER PANEL
	let OtherEffectBack_panel = new TypeGrid() ;
	OtherEffectBack_panel.setTitle(@LRL-OtherEffect) ;
	let OptionRightBack_control = new uiTextLabeled('OptionRightBack',bindings,BACK) ;
	OtherEffectBack_panel.place(OptionRightBack_control,'hfill') ;
	MainBack_tab.place(OtherEffectBack_panel,'br hfill') ;
	
	MainBack_tab.addToEditor(editor,@LRL-MainBack) ;
	
// ENCOUNTER SET TAB
	var Set_tab = new TypeGrid() ;
	Set_tab.editorTabScrolling = true ;
	
	// ENCOUNTER SET PANEL
	let Set_panel = new TypeGrid() ;
	Set_panel.setTitle(@LRL-Set) ;
	let Set_control = new uiSetList(bindings,BOTH) ;
	Set_panel.place(Set_control,'hfill') ;
	if(advancedControls){
		list = new Array('Standard','Gold','Red','Green','Blue','Magenta') ;
		let Difficulty_control = new uiListIconLabeled('Difficulty',list,bindings,FRONT) ;
		Set_panel.place(Difficulty_control,'hfill') ;
	}
	let SetPortrait_control = new uiPortrait('Set',diy) ;
	Set_panel.place(SetPortrait_control,'br hfill') ;
	Set_tab.place(Set_panel,'hfill') ;
	
	// ADDITIONAL SET 1 PANEL
	let Set1_panel = new TypeGrid() ;
	Set1_panel.setTitle(@LRL-Set1) ;
	let Set1_control = new uiOtherSetList('Set1',bindings,FRONT) ;
	let Set1Portrait_control = new uiPortrait('Set1',diy) ;
	Set1_panel.place(
		Set1_control,'hfill' ,
		Set1Portrait_control,'br hfill'
	) ;
	Set_tab.place(Set1_panel,'br hfill') ;

	// ADDITIONAL SET 2 PANEL
	let Set2_panel = new TypeGrid() ;
	Set2_panel.setTitle(@LRL-Set2) ;
	let Set2_control = new uiOtherSetList('Set2',bindings,FRONT) ;
	let Set2Portrait_control = new uiPortrait('Set2',diy) ;
	Set2_panel.place(
		Set2_control,'hfill' ,
		Set2Portrait_control,'br hfill'
	) ;
	Set_tab.place(Set2_panel,'br hfill') ;
	
	// ADDITIONAL SET 3 PANEL
	let Set3_panel = new TypeGrid() ;
	Set3_panel.setTitle(@LRL-Set3) ;
	let Set3_control = new uiOtherSetList('Set3',bindings,FRONT) ;
	let Set3Portrait_control = new uiPortrait('Set3',diy) ;
	Set3_panel.place(
		Set3_control,'hfill' ,
		Set3Portrait_control,'br hfill'
	) ;
	Set_tab.place(Set3_panel,'br hfill') ;
	
	// ADDITIONAL SET 4 PANEL
	let Set4_panel = new TypeGrid() ;
	Set4_panel.setTitle(@LRL-Set4) ;
	let Set4_control = new uiOtherSetList('Set4',bindings,FRONT) ;
	let Set4Portrait_control = new uiPortrait('Set4',diy) ;
	Set4_panel.place(
		Set4_control,'hfill' ,
		Set4Portrait_control,'br hfill'
	) ;
	Set_tab.place(Set4_panel,'br hfill') ;
	
	// ADDITIONAL SET 5 PANEL
	let Set5_panel = new TypeGrid() ;
	Set5_panel.setTitle(@LRL-Set5) ;
	let Set5_control = new uiOtherSetList('Set5',bindings,FRONT) ;
	let Set5Portrait_control = new uiPortrait('Set5',diy) ;
	Set5_panel.place(
		Set5_control,'hfill' ,
		Set5Portrait_control,'br hfill'
	) ;
	Set_tab.place(Set5_panel,'br hfill') ;
	
	Set_tab.addToEditor(editor,@LRL-Set) ;

// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	if(advancedControls){
		let Template_panel = new TypeGrid() ;
		Template_panel.setTitle(@LRL-Template) ;
		list = new Array('Standard','Nightmare') ;
		let Template_control = new uiListIcon('Template',list,bindings,BOTH) ;
		Template_panel.place(Template_control,'hfill') ;
		Template_tab.place(Template_panel,'hfill') ;
	}
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle(@LRL-Cutting) ;
	let ShowCut_control = new uiButtonText('ShowCut',diy,bindings,BOTH) ;
	Cutting_panel.place(ShowCut_control,'hfill') ;
	if(advancedControls){
		let ShowBleeding_control = new uiButtonText('ShowBleeding',diy,bindings,BOTH) ;
		Cutting_panel.place(ShowBleeding_control ,'') ;
	}
	Template_tab.place(Cutting_panel,'br hfill') ;
	
	Template_tab.addToEditor(editor,@LRL-Template) ;
	
// PORTRAIT TAB
	let Portrait_tab = new TypeGrid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	// PORTRAIT PANEL
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle(@LRL-Portrait) ;
	let Artist_control = new uiTextLabeled('Artist',bindings,FRONT) ;
	let Portrait_control = new uiPortrait('Portrait',diy) ;
	let PortraitTint_control = new uiButtonText('PortraitTint',diy,bindings,BOTH) ;
	list = ['None','Black','Custom'] ;
	let PortraitShadow_control = new uiCyclerLabeled('PortraitShadow',list,bindings,BOTH) ;
	let PortraitMirror_control = new uiPortraitMirror('Portrait',Portrait_control) ;
	Portrait_panel.place(
		Artist_control,'hfill' 
		, Portrait_control,'br hfill' 
		, PortraitTint_control,'br'
		, PortraitShadow_control,'' 
		, PortraitMirror_control,'hfill'
	) ;
	Portrait_tab.place(Portrait_panel,'hfill') ;
	
	// PORTRAIT BACK PANEL
	let PortraitBack_panel = new TypeGrid() ;
	PortraitBack_panel.setTitle(@LRL-PortraitBack) ;
	let PortraitShare_control = new uiButtonText('PortraitShare',diy,bindings,BACK) ;
	let ArtistBack_control = new uiTextLabeled('ArtistBack',bindings,BACK) ;
	let PortraitBack_control = new uiPortrait('PortraitBack',diy) ;
	list = ['None','Black','Custom'] ;
	let PortraitBackShadow_control = new uiCyclerLabeled('PortraitBackShadow',list,bindings,BOTH	);
	let PortraitBackMirror_control = new uiPortraitMirror('PortraitBack',PortraitBack_control) ;
	PortraitBack_panel.place(
		PortraitShare_control,'' 
		, ArtistBack_control,'hfill' 
		, PortraitBack_control,'br hfill' 
		, PortraitBackShadow_control,'' 
		, PortraitBackMirror_control,'hfill'
	) ;
	Portrait_tab.place(PortraitBack_panel,'br hfill') ;
	
	Portrait_tab.addToEditor(editor,@LRL-Portrait) ;
		
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle(@LRL-Collection) ;
	let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber',bindings,BOTH,999) ;
	let CollectionNumberHide_control = new uiButtonText('CollectionNumberHide',diy,bindings,FRONT) ;
	let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,BOTH) ;
	let Collection_control = new uiCollectionList(bindings,BOTH) ;
	let CollectionPortrait_control = new uiPortrait('Collection',diy) ;
	Collection_panel.place(
		Collection_control,'hfill' 
		, CollectionNumber_control,'br',CollectionNumberHide_control,''
		, CollectionInfo_control,'hfill' 
		, CollectionPortrait_control,'br hfill'
	) ;
	Collection_tab.place(Collection_panel,'hfill') ;
	
	// OTHER PANEL
	let Other_panel = new TypeGrid() ;
	Other_panel.setTitle(@LRL-Other) ;
	let Copyright_control = new uiTextLabeled('Copyright',bindings,FRONT) ;
	Other_panel.place(Copyright_control,'hfill') ;
//	if(advancedControls){
//		let Other_panel = new TypeGrid() ;
//		Other_panel.setTitle(@LRL-Other) ;	
//		list = new Array( 
//			'a','b','c','d','e','f','g','h','i','j' 
//			, 'k','l','m','n','o','p','q','r','s','t' 
//			, 'u','v','w','x','y','z'
//		) ;
//
//		let StageLetter_control = new uiTextList('StageLetter',bindings,BOTH,list) ;
//		let StageLetterBack_control = new uiTextList('StageLetterBack',bindings,BOTH,list) ;
//		let StageBack_control = new uiTextList('SideBack',bindings,BOTH,list) ;
//		Other_panel.place(
//			@LRL-StageLetter,'',StageLetter_control,'tab hfill'
//			, @LRL-StageLetterBack,'br',StageLetterBack_control,'tab hfill'
//		) ;
//	}
	Collection_tab.place(Other_panel,'br hfill') ;

	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ; 
}

function createFrontPainter(diy,sheet){ debug(1,'createFrontPainter') ;
// TEMPLATE
	Difficulty_tinter = new createTinter('Difficulty',diy) ;
	
	PortraitShadow_tinter = new createTinter('Portrait-shadow',diy) ;

// STATS
	Stage_tinter = new createTinter('Stage',diy) ;

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Scenario_writer = new createTextBox('Scenario',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Option_writer = new createTextBox('Option',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	SetNumber_writer = new createTextBox('SetNumber',diy,sheet) ;
	
	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
	updateExternalPortrait('Set',diy) ;
	updateExternalPortrait('Set1',diy) ;
	updateExternalPortrait('Set2',diy) ;
	updateExternalPortrait('Set3',diy) ;
	updateExternalPortrait('Set4',diy) ;
	updateExternalPortrait('Set5',diy) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ;
// STATS
	Progress_tinter = new createTinter('Progress',diy) ;

// TEXT
	updateExternalPortrait('PortraitBack',diy) ;
}

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
	
// PORTRAIT
	if(diy.settings.getBoolean('PortraitTint') ){
		sheet.paintImage(g,ImageUtils.get(PathImage+'white1x1.png'),'Template') ;
		index = portraitIndexOf('Portrait') ;
		let imageTinted = PortraitList[index].getImage() ;
		let imagePanX = PortraitList[index].getPanX() ;
		let imagePanY = PortraitList[index].getPanY() ;
		let imageRotation = PortraitList[index].getRotation() ;
		let imageScale = PortraitList[index].getScale() ;
		
		if($Template=='Nightmare') imageTinted = createRedishImage(imageTinted) ;
		else imageTinted = createSepiaImage(imageTinted) ;

		let region = getArray('Portrait-portrait-clip-region',diy) ;
		let AT = java.awt.geom.AffineTransform;	
		let transform =	AT.getTranslateInstance(
			Number(region[0])+(Number(region[2])/2)+imagePanX-((imageTinted.width*imageScale)/2),
			Number(region[1])+(Number(region[3])/2)+imagePanY-((imageTinted.height*imageScale)/2)
		);
		transform.concatenate(AT.getScaleInstance(imageScale,imageScale));
		transform.concatenate(AT.getRotateInstance(-imageRotation * Math.PI/180,imageTinted.width/2,imageTinted.height/2));
		g.drawImage(imageTinted,transform,null) ;
	}else paintPortrait('Portrait',diy,g,sheet) ;

//	switch(String($PortraitShadow)){
//	case 'None' : break ;
//	case 'Black' :
//		sheet.paintImage(g,'Portrait-shadow','Template') ;
//		break ;
//	case 'PortraitTint' :
//		if(diy.settings.getBoolean('PortraitTint') ){
//			if($Template=='Nightmare') sheet.paintImage(g,createRedishImage(diy.settings.getImageResource('Portrait-shadow-tintable') ),'Template') ;
//			else sheet.paintImage(g,createSepiaImage(diy.settings.getImageResource('Portrait-shadow-tintable') ),'Template') ;
//		}else{ sheet.paintImage(g,'Portrait-shadow','Template') ; }
//		break ;
//	case 'Custom' :
//		hsb = diy.settings.getTint('Portrait-shadow') ;
//		PortraitShadow_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		sheet.paintImage(g,PortraitShadow_tinter.getTintedImage(),'Template') ;
//		break ;
//	}
	
// TEMPLATE
	paintTemplate(diy,g,sheet) ;
	let list = new Array('Set1','Set2','Set3','Set4','Set5') ;
	paintAdapter(list,diy,g,sheet) ; 
//	let adapterSelector = 0;
//	for( let index=0 ; index<adapterList.length ; index++ ) if($(adapterList[index])!='Empty') adapterSelector=index+1 ;
//	sheet.paintImage(g,ImageUtils.get(PathCard+$Template+'-Adapter-'+adapterSelector+'.jp2'),'Template') ;
	if($Template=='Standard') paintDifficulty(diy,g,sheet) ;

// ICONS
	paintIcon('Collection',diy,g,sheet) ;
	paintIcon('Set',diy,g,sheet) ;
	paintIcon('Set1',diy,g,sheet) ;
	paintIcon('Set2',diy,g,sheet) ;
	paintIcon('Set3',diy,g,sheet) ;
	paintIcon('Set4',diy,g,sheet) ;
	paintIcon('Set5',diy,g,sheet) ;

// STATS
	Stage_tinter.setImage( ImageUtils.get(PathNumberTintable+$Stage+'a.png')) ;
	sheet.paintImage(g,Stage_tinter.getTintedImage(),'Stage') ;
	
// TEXTS
	writeName(diy,g) ;
	writeScenario(diy,g) ;
	if ($OptionRight!=''){
		writeOption('OptionRight',diy,g,sheet) ;
		Body_writer.setPageShape(diy.settings.getCupShape('Option-Body-shape')) ;
	}else{ Body_writer.setPageShape(PageShape.RECTANGLE_SHAPE) ; }
	writeBody(['Story','Rules','Condition'],diy,g) ;

	writeArtist(diy,g,sheet) ;
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
	if(diy.settings.getBoolean('CollectionNumberHide') ){
		writeTextOutlined( 
			diy.settings.get('CollectionNumber-format','')+'---',Bottom_writer,
			diy.settings.getRegion('CollectionNumber'),getStroke('Bottom-stroke',diy),
			diy,g,sheet
		) ;
	}else writeCollectionNumber(diy,g,sheet) ;
	
	paintCut(diy,g,sheet) ;
}

function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
// PORTRAIT
	if(diy.settings.getBoolean('PortraitShare') ) paintPortrait('Portrait',diy,g,sheet) ;
	else paintPortrait('PortraitBack',diy,g,sheet) ;

	switch($PortraitBackShadow){
	case 'Black' :
		sheet.paintImage(g,'Portrait-shadow','Template') ;
		break ;
	case 'Custom' :
		tint = diy.settings.getTint('Portrait-shadow') ;
		PortraitShadow_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		sheet.paintImage(g,PortraitShadow_tinter.getTintedImage(),'Template') ;
		break ;
	}

// TEMPLATE
	if($Template=='Nightmare') sheet.paintImage(g,'Nightmare-template','Template') ; 
	else sheet.paintTemplateImage(g) ;

// ICONS
	paintIcon('Collection',diy,g,sheet) ;
	paintIcon('Set',diy,g,sheet) ;

// STATS
	Stage_tinter.setImage( ImageUtils.get(PathNumberTintable+$Stage+'b.png')) ;
	sheet.paintImage(g,Stage_tinter.getTintedImage(),'Stage') ;
	paintStatTinted('Progress',Progress_tinter,diy,g,sheet) ;
	
// TEXTS
	if($NameBack=='') writeName(diy,g) ;
	else writeLine($NameBack,Name_writer,diy.settings.getRegion('Name'),g) ;

	if($GroupBack=='') writeGroup(diy,g) ;
	else writeLine($GroupBack,Group_writer,diy.settings.getRegion('Group'),g) ;
	
	if ($OptionRightBack!=''){
		writeOption('OptionRightBack',diy,g,sheet) ;
		Body_writer.setPageShape(diy.settings.getCupShape('Option-Body-shape')) ;
	}else{ Body_writer.setPageShape(PageShape.RECTANGLE_SHAPE) ; }
	writeBody(['StoryBack','RulesBack','ConditionBack'],diy,g) ;

	if(diy.settings.getBoolean('PortraitShare') ) writeArtist(diy,g,sheet) ;
	else{
		switch($ArtistBack ){
		case 'no' : text = '' ; break ;
		case '' : 
			if(diy.settings.get('LRL-IllustratorUnknown','')!='') text = $LRL-IllustratorUnknown ; 
			else text = #LRL-IllustratorUnknown ; 
			break ;
		default : 
			if(diy.settings.get('LRL-IllustratorShort','')!='') text = $LRL-IllustratorShort+' '+$ArtistBack ;
			else text = #LRL-IllustratorShort+' '+$ArtistBack ;
		}
		writeTextOutlined( 
			diy.settings.get('Artist-format','')+text,Bottom_writer,
			diy.settings.getRegion('Artist'),getStroke('Bottom-stroke',diy),
			diy,g,sheet
		) ;
	}
	
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
	writeCollectionNumber(diy,g,sheet) ;

	paintCut(diy,g,sheet) ;
}

if(sourcefile=='Quickscript'){
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings') ;
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings') ;

	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js') ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/library.js') ;
	GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game') ;
	GameLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	

	testDIYScript('LRL') ;
}else{
	useLibrary('res://TheLordOfTheRingsLCG/library.js') ;
}
