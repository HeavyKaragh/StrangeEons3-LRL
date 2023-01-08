const Card = 'Occurrence';
// corregir tama\u00f1o icono de conjunto
// comprobar si texto complexocurrence es necesario
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
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE TAB
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,FRONT) ;
	Title_panel.place(Name_control,'hfill') ;
	Main_tab.place(Title_panel,'hfill') ;
	
	// EFFECT TAB
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle(@LRL-Effect) ;
	let Story_control = new uiParagraphLabeled('Story',bindings,FRONT,'medium') ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'big') ;
	let Flavour_control = new uiParagraphLabeled('Flavour',bindings,FRONT,'small') ;
	let Success_control = new uiParagraphLabeled('Success',bindings,FRONT,'small') ;
	let Failure_control = new uiParagraphLabeled('Failure',bindings,FRONT,'small') ;
	Effect_panel.place(
		Story_control,'hfill' 
		, Rules_control,'br hfill' 
		, Failure_control,'br hfill'
		, Flavour_control,'br hfill' 
		, Success_control,'br hfill' 
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;
	
	Main_tab.addToEditor(editor,@LRL-Main) ;
	
// ENCOUNTER SET TAB
	var Set_tab = new TypeGrid() ;
	Set_tab.editorTabScrolling = true ;
	
	// ENCOUNTER SET PANEL
	let Set_panel = new TypeGrid() ;
	Set_panel.setTitle(@LRL-Set) ;
	let Set_control = new uiSetList(bindings,FRONT) ;
	Set_panel.place(
		Set_control,'hfill'
	) ;
	list = new Array('Standard','Gold','Red','Green','Blue','Purple') ;
	let Difficulty_control = new uiListIconLabeled('Difficulty',list,bindings,FRONT) ;
	Set_panel.place(Difficulty_control,'hfill') ;
	
	let SetPortrait_control = new uiPortrait('Set',diy) ;
	Set_panel.place(SetPortrait_control,'br hfill') ;
	Set_tab.place(Set_panel,'br hfill') ;
	
	Set_tab.addToEditor(editor,@LRL-Set) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle(@LRL-Template) ;
	
	list = new Array('Standard','Complex') ;
	let Template_control = new uiListIcon('Template',list,bindings,FRONT) ;
	Template_panel.place(Template_control,'hfill') ;
	Template_tab.place(Template_panel,'br hfill') ;

	// REGION PANEL
	let Region_panel = new TypeGrid() ;
	Region_panel.setTitle(@LRL-Region) ;
	list = new Array('Red','Green','Blue','Yellow','Brown','Purple','White','Black','Empty') ;
	Region_control = new uiListIcon('Region',list,bindings,BACK) ;
	Region_panel.place(Region_control,'hfill') ;
	Template_tab.place(Region_panel,'br hfill') ;
	
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

function createFrontPainter(diy,sheet){ debug(1,'\ncreateFrontPainter') ;
// TEMPLATE
	Difficulty_tinter = new createTinter('Difficulty',diy) ;

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Option_writer = new createTextBox('Option',diy,sheet) ;
	Type_writer = new createTextBox('Type',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
	updateExternalPortrait('Set',diy) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ;
// TEMPLATE
	Region_tinter = new createTinter('Region',diy) ;
}

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
	let image ;

// PORTRAIT
	paintPortrait('Portrait',diy,g,sheet) ;

// TEMPLATE
	paintTemplate(diy,g,sheet) ;

	switch($Difficulty ) {
	case 'Standard' : break ;
	case 'Custom' :
		tint = diy.settings.getTint('Difficulty') ; //mover a listener
		Difficulty_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		image = Difficulty_tinter.getTintedImage() ;
		sheet.paintImage(g,image,'Difficulty-region') ;
		break ;
	default :
		tint = diy.settings.getTint($Difficulty) ;
		Difficulty_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		image = Difficulty_tinter.getTintedImage() ;
		sheet.paintImage(g,image,'Difficulty-region') ;
		break ;
	}

// ICONS
	paintIcon('Collection',diy,g,sheet) ;
	paintIcon('Set',diy,g,sheet) ;

// TEXTS
	writeName(diy,g) ;
//	if($Set!='Empty') region = diy.settings.getRegion('Name') ;
//	else region = diy.settings.getRegion('Full-Name') ;
//	writeLine($Name,Name_writer,region,g) ;
	
	writeParagraph( 
		['Story'],Body_writer,
		diy.settings.getRegion('Story'),diy,g
	) ;
	if($Template=='Complex') {
		writeParagraph( 
			['Rules','Flavour'],Body_writer,
			diy.settings.getRegion('Complex-Body'),diy,g
		) ;
		writeParagraph( 
			['Success'],Body_writer,
			diy.settings.getRegion('Success'),diy,g
		) ;
		writeParagraph( 
			['Failure'],Body_writer,
			diy.settings.getRegion('Failure'),diy,g 
		) ;
	}else writeBody(['Rules','Flavour'],diy,g) ;
	
	if(diy.settings.get('Template ')=='Complex'){
		if(diy.settings.get('Type','')=='') text = #LRL-OccurrenceComplex ;
		else text = $Type ;
		writeLine(text,Type_writer,diy.settings.getRegion('Type'),g) ;
	}else writeType(diy,g) ;
	
	writeArtist(diy,g,sheet) ;
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
	writeCollectionNumber(diy,g,sheet) ;

	paintCut(diy,g,sheet) ;
}

function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
// TEMPLATE
	sheet.paintTemplateImage(g) ;
	
	let tint ;
	let image ;
	switch($Region ){
	case 'Empty' : break ;
	case 'Custom' :
		tint = diy.settings.getTint('Region') ;
		Region_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		image = Region_tinter.getTintedImage() ;
		sheet.paintImage(g,image,'Template-region') ;
		break;
	default :
		image = ImageUtils.get(PathCard+$Region+'.jp2') ;
		sheet.paintImage(g,image,'Template-region') ;
		break;
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
	GameLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	

	testDIYScript('LRL') ;
}else{
	useLibrary('res://TheLordOfTheRingsLCG/library.js') ;
}
