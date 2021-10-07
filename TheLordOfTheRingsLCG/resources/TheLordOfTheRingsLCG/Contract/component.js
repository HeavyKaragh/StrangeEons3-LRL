const Card = 'Contract' ; 
const CardVersion = 1 ;
// 1: new card using 2021 library

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
	$PortraitListCount = getPortraitCount() ;
}

function createInterface(diy,editor,sheet){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls') ;

	var bindings = new Bindings(editor,diy) ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,BOTH) ;
	Title_panel.place(Name_control,'hfill') ;
	Main_tab.place(Title_panel,'hfill') ;
	
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle(@LRL-Effect) ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'big') ;
	let Flavour_control = new uiParagraphLabeled('Flavour',bindings,FRONT,'medium') ;
	Effect_panel.place(
		Rules_control,'hfill'
		, Flavour_control,'br hfill'
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;
	
	if(advancedControls){
		let OtherEffect_panel = new TypeGrid() ;
		OtherEffect_panel.setTitle(@LRL-OtherEffect) ;
		let OptionLeft_control = new uiTextLabeled('OptionLeft',bindings,FRONT) ;
		let OptionRight_control = new uiTextLabeled('OptionRight',bindings,FRONT) ;
		OtherEffect_panel.place(
			OptionLeft_control,'hfill'
			, OptionRight_control,'br hfill'
		) ;
		Main_tab.place(OtherEffect_panel,'br hfill') ;
	}

	Main_tab.addToEditor(editor,@LRL-Main) ;
	
// MAIN BACK TAB
	var MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;
	
	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle(@LRL-Effect) ;
	let RulesBack_control = new uiParagraphLabeled('RulesBack',bindings,BACK,'big') ;
	let FlavourBack_control = new uiParagraphLabeled('FlavourBack',bindings,BACK,'medium') ;
	EffectBack_panel.place(
		RulesBack_control,'hfill'
		, FlavourBack_control,'br hfill'
	) ;
	MainBack_tab.place(EffectBack_panel,'br hfill') ;

	if(advancedControls){
		let OtherEffectBack_panel = new TypeGrid() ;
		OtherEffectBack_panel.setTitle(@LRL-OtherEffect) ;
		let OptionLeftBack_control = new uiTextLabeled('OptionLeftBack',bindings,BACK) ;
		let OptionRightBack_control = new uiTextLabeled('OptionRightBack',bindings,BACK) ;
		OtherEffectBack_panel.place(
			OptionLeftBack_control,'hfill'
			, OptionRightBack_control,'br hfill'
		) ;
		MainBack_tab.place(OtherEffectBack_panel,'br hfill') ;
	}
	
	MainBack_tab.addToEditor(editor,@LRL-MainBack) ;
		
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle(@LRL-Template) ;

	let list = new Array('Neutral','DoubleSided') ;
	let Template_control = new uiListIcon('Template',list,bindings,BOTH) ;
	Template_panel.place(Template_control,'hfill') ;
	Template_tab.place(Template_panel,'hfill') ;
	
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
	
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle(@LRL-Portrait) ;
	let Artist_control = new uiTextLabeled('Artist',bindings,BOTH) ;
	let Portrait_control = new uiPortrait('Portrait',diy) ;
	let PortraitMirror_control = new uiPortraitMirror('Portrait',Portrait_control) ;
	Portrait_panel.place(
		Artist_control,'hfill' 
		, Portrait_control,'br hfill' 
		, PortraitMirror_control,'br hfill' 
	) ;
	Portrait_tab.place(Portrait_panel,'hfill') ;
	
	let PortraitBack_panel = new TypeGrid() ;
	PortraitBack_panel.setTitle(@LRL-PortraitBack) ;
	let ArtistBack_control = new uiTextLabeled('ArtistBack',bindings,BACK) ;
	let PortraitBack_control = new uiPortrait('PortraitBack',diy) ;
	let PortraitShare_control = new uiButtonText('PortraitShare',diy,bindings,BACK) ;
	let PortraitBackMirror_control = new uiPortraitMirror('PortraitBack',PortraitBack_control) ;
	PortraitBack_panel.place(
		PortraitShare_control,'',ArtistBack_control,'hfill',
		PortraitBack_control,'br hfill' ,
		PortraitBackMirror_control,'br hfill'
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
	let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,BOTH) ;
	let Collection_control = new uiCollectionList(bindings,BOTH) ;
	let CollectionPortrait_control = new uiPortrait('Collection',diy) ;
	Collection_panel.place(
		Collection_control,'hfill' 
		, CollectionNumber_control,'br' 
		, CollectionInfo_control,'hfill' 
		, CollectionPortrait_control,'br hfill'
	) ;
	Collection_tab.place(Collection_panel,'hfill') ;
	
	// OTHER PANEL
	let Other_panel = new TypeGrid() ;
	Other_panel.setTitle(@LRL-Other) ;
	let Copyright_control = new uiTextLabeled('Copyright',bindings,FRONT) ;
	Other_panel.place(Copyright_control,'hfill') ;
	if(advancedControls){
		let Type_control = new uiTextLabeled('Type',bindings,FRONT) ;
		let SideFront_control = new uiTextLabeled('SideFront',bindings,FRONT) ;
		let SideBack_control = new uiTextLabeled('SideBack',bindings,BACK) ;
		Other_panel.place(
			Type_control,'br hfill'
			, SideFront_control,'br hfill'
			, SideBack_control,'br hfill'
		) ;
	}
	Collection_tab.place(Other_panel,'br hfill') ;
	
	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ; 
}

function createFrontPainter(diy,sheet){ debug(1,'\ncreateFrontPainter') ;
	
// TEMPLATE

// STATS

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Option_writer = new createTextBox('Option',diy,sheet) ;
	Type_writer = new createTextBox('Type',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	Side_writer = new createTextBox('Side',diy,sheet) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ;
	updateExternalPortrait('PortraitBack',diy) ;
}

function writeSide(diy,g,sheet){ debug(1,'\npaintFront') ;
	let text ;
	if(sheet.getSheetIndex()==0){
		text = #LRL-SideFront ;
		if($SideFront!='') text = $SideFront ;
	}else{
		text = #LRL-SideBack ;
		if($SideBack!='') text = $SideBack ;
	}
	text = diy.settings.get('Side-format','')+text ;
	writeLine(text,Side_writer,diy.settings.getRegion('Side'),g) ;
}

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
	
// PORTRAIT
	paintPortrait('Portrait',diy,g,sheet) ;

// TEMPLATE
	sheet.paintTemplateImage(g) ;
	if($Template=='DoubleSided') sheet.paintImage(g,'Side-decoration','Template') ;
	
// ICONS
	paintIcon('Collection',diy,g,sheet) ;

// STATS

// TEXTS
	writeName(diy,g) ;
	writeBody(['Rules','Flavour'],diy,g) ;
	
	if($Template=='DoubleSided') writeSide(diy,g,sheet) ;

	writeType(diy,g) ;
	writeOption('OptionLeft',diy,g,sheet) ;
	writeOption('OptionRight',diy,g,sheet) ;
	
	writeArtist(diy,g,sheet) ;
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
	writeCollectionNumber(diy,g,sheet) ;

	paintCut(diy,g,sheet) ;
}

function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
	
	if($Template!='DoubleSided') sheet.paintTemplateImage(g) ;
	else{
		// PORTRAIT
		if(diy.settings.getBoolean('PortraitShare') ) paintPortrait('Portrait',diy,g,sheet) ;
		else paintPortrait('PortraitBack',diy,g,sheet) ;

		// TEMPLATE
		sheet.paintImage(g,'Neutral-template','Template') ;
		sheet.paintImage(g,'Side-decoration','Template') ;
	
		// ICONS
		paintIcon('Collection',diy,g,sheet) ;

		// TEXTS
		writeName(diy,g) ;
		writeBody(['RulesBack','FlavourBack'],diy,g) ;

		writeSide(diy,g,sheet) ;
		
		writeType(diy,g) ;
		writeOption('OptionLeftBack',diy,g,sheet) ;
		writeOption('OptionRightBack',diy,g,sheet) ;

		writeArtistBack(diy,g,sheet) ;
		writeCopyright(diy,g,sheet) ;
		writeCollectionInfo(diy,g,sheet) ;
		writeCollectionNumber(diy,g,sheet) ;
	}
	
	paintCut(diy,g,sheet) ;
}

if(sourcefile=='Quickscript'){
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings') ;
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings') ;

	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js') ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/library.js') ;
	GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	

	testDIYScript('LRL') ;
}else{
	useLibrary('res://TheLordOfTheRingsLCG/library.js') ;
}
