const Card = 'Campaign' ;
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
	createPortrait('Collection',diy) ;
	createPortrait('Set',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface(diy,editor,sheet){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls') ;

	var bindings = new Bindings(editor,diy) ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,FRONT) ;
	Title_panel.place(Name_control,'hfill') ;
	Main_tab.place(Title_panel,'hfill') ;
	
	// CYCLE PANEL
	let Group_panel = new TypeGrid() ;
	Group_panel.setTitle(@LRL-Group) ;
	let Group_control = new uiText('Group',bindings,FRONT) ;
	Group_panel.place(Group_control,'hfill') ;
	Main_tab.place(Group_panel,'br hfill') ;
	
	// EFFECT PANEL
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
	let RulesBack_control = new uiParagraphLabeled('RulesBack',bindings,BACK,'huge') ;
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
		
// ENCOUNTER SET TAB
	var Set_tab = new TypeGrid() ;
	Set_tab.editorTabScrolling = true ;
	
	// ENCOUNTER SET PANEL
	let Set_panel = new TypeGrid() ;
	Set_panel.setTitle(@LRL-Set) ;
	let Set_control = new uiSetList(bindings,FRONT) ;
	let SetPortrait_control = new uiPortrait('Set',diy) ;
	Set_panel.place(
		Set_control,'hfill' ,
		SetPortrait_control,'br hfill'
	) ;
	Set_tab.place(Set_panel,'br hfill') ;
	
	Set_tab.addToEditor(editor,@LRL-Set) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
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
	let PortraitMirror_control = new uiPortraitMirror('Portrait',Portrait_control) ;
	Portrait_panel.place(
		Artist_control,'hfill' 
		, Portrait_control,'br hfill' 
		, PortraitMirror_control,'br hfill' 
	) ;
	Portrait_tab.place(Portrait_panel,'hfill') ;
	
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
		Other_panel.place( Type_control,'br hfill' ) ;
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
	Group_writer = new createTextBox('Group',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Option_writer = new createTextBox('Option',diy,sheet) ;
	Type_writer = new createTextBox('Type',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Set',diy) ;
	updateExternalPortrait('Collection',diy) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ; }

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
// PORTRAIT
	paintPortrait('Portrait',diy,g,sheet) ;

// TEMPLATE
	sheet.paintTemplateImage(g) ;

// ICONS
	paintIcon('Collection',diy,g,sheet) ;
	paintIcon('Set',diy,g,sheet) ;
	
// STATS

// TEXTS
	writeName(diy,g) ;
	writeGroup(diy,g) ;
	writeBody(['Rules','Flavour'],diy,g) ;
	
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
	
	// TEMPLATE
	sheet.paintTemplateImage(g) ;

	// ICONS
	paintIcon('Collection',diy,g,sheet) ;

	// TEXTS
	let region = diy.settings.getRegion('BodyBack') ;
	if( ($OptionLeftBack!='') || ($OptionRightBack!='') ){
		region = getArray('BodyBack-region',diy) ;
		region[3] = Number(region[3])-6 ;
		region = new Region([Number(region[0]),Number(region[1]),Number(region[2]),Number(region[3])]) ;
	}
	writeParagraph( 
		['RulesBack','FlavourBack'],Body_writer, 
		region,diy,g
	) ;
	
	writeOption('OptionLeftBack',diy,g,sheet) ;
	writeOption('OptionRightBack',diy,g,sheet) ;

	writeArtistBack(diy,g,sheet) ;
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
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	

	testDIYScript('LRL') ;
}else{
	useLibrary('res://TheLordOfTheRingsLCG/library.js') ;
}
