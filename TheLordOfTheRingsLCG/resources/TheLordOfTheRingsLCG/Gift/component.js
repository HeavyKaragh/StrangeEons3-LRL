const Card = 'Gift' ; 
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
	diy.faceStyle = FaceStyle.PLAIN_BACK ;
	diy.bleedMargin = 9 ;
	
	diy.customPortraitHandling = true ;
	createPortrait('Portrait',diy) ;
	createPortrait('Collection',diy) ;
	createPortrait('Sphere',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface(diy,editor,sheet){debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls') ;
	
	var bindings = new Bindings(editor,diy) ;
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;

	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,FRONT) ;
	Title_panel.place(Name_control,'hfill') ;
	Main_tab.place(Title_panel,'hfill') ;
		
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle(@LRL-Effect) ;
	let Trait_control = new uiParagraphLabeled('Trait',bindings,FRONT,'line') ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'big') ;
	let Flavour_control = new uiParagraphLabeled('Flavour',bindings,FRONT,'medium') ;
	Effect_panel.place(
		Trait_control,'hfill'
		, Rules_control,'br hfill'
		, Flavour_control,'br hfill'
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;

	Main_tab.addToEditor(editor,@LRL-Main) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;

	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle(@LRL-Template) ;
	list = new Array('Neutral','Leadership','Lore','Spirit','Tactics') ;
	if(advancedControls) list = list.concat( new Array('Baggins','Fellowship','Mastery','Custom')) ;
	let Template_control = new uiListIcon('Template',list,bindings,FRONT) ;
	Template_panel.place(Template_control,'hfill') ;
	Template_tab.place(Template_panel,'hfill') ;
	
	if(advancedControls){
		let CustomSphere_panel = new TypeGrid() ;
		CustomSphere_panel.setTitle(@LRL-CustomSphere) ;
		let CustomTint_control = new uiTint('Custom',bindings, FRONT) ;
		let SpherePortrait_control = new uiPortrait('Sphere',diy) ;
//		let BodyIconPortrait_control = new uiPortrait('BodyIcon',diy) ;
//		let BodyIconTransparency_control = new uiTransparency('BodyIcon',bindings,FRONT) ;
		CustomSphere_panel.place(
			CustomTint_control,'hfill'
			, SpherePortrait_control ,'br hfill' 
//			, BodyIconPortrait_control,'br hfill' 
//			, @LRL-uiTransparency,'br',BodyIconTransparency_control,'hfill'
		) ;
		Template_tab.place(CustomSphere_panel,'br hfill') ;
	}
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle(@LRL-Cutting) ;
	let ShowCut_control = new uiButtonText('ShowCut',diy,bindings,FRONT) ;
	Cutting_panel.place(ShowCut_control,'hfill') ;
	if(advancedControls){
		let ShowBleeding_control = new uiButtonText('ShowBleeding',diy,bindings,FRONT) ;
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
	let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber',bindings,FRONT,999) ;
	let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,FRONT) ;
	let Collection_control = new uiCollectionList(bindings,FRONT) ;
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

function createFrontPainter(diy,sheet){
// TEMPLATE
	CustomColour_tinter = new createTinter('Custom-Colour',diy) ;

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Option_writer = new createTextBox('Option',diy,sheet) ;
	Type_writer = new createTextBox('Type',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	Subtype_writer = new createTextBox('Subtype',diy,sheet) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
	updateExternalPortrait('Sphere',diy) ;
	updateExternalPortrait('BodyIcon',diy) ;
}

function paintFront(g,diy,sheet){ 
	
// PORTRAIT
	paintPortrait('Portrait',diy,g,sheet) ;

// TEMPLATE
	paintTemplate(diy,g,sheet) ; // this will draw the selected $Template
	if($Template=='Custom') paintCustomColour(diy,g,sheet) ; // colorized "pearls"

// ICONS
	paintIcon('Collection',diy,g,sheet) ;
	if($Template=='Custom') paintPortrait('Sphere',diy,g,sheet) ;

// TEXTS
	writeName(diy,g) ;
	writeBody(['Trait','Rules','Flavour'],diy,g) ;

	writeType(diy,g) ;
	writeOption('OptionLeft',diy,g,sheet) ;
	writeOption('OptionRight',diy,g,sheet) ;

	writeArtist(diy,g,sheet) ;
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
