/* COMPONENT CONFIGURATION */
const Card = 'Rules';
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

	var bindings = new Bindings(editor,diy) ;

// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
		
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,FRONT) ;
	let Group_control = new uiText('Group',bindings,FRONT) ;
	let PageNumber_control = new uiSpinnerLabeled('PageNumber',bindings, FRONT,98) ;
	let PageTotal_control = new uiSpinnerLabeled('PageTotal',bindings, FRONT,98) ;
	Title_panel.place(
		Name_control,'hfill'
		, @LRL-Group,'br',Group_control,'hfill'
		, PageNumber_control,''
		, PageTotal_control,''
	) ;
	Main_tab.place(Title_panel,'hfill') ;

	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle(@LRL-Effect) ;
	let Story_control = new uiParagraphLabeled('Story',bindings,FRONT,'medium') ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'big') ;
	let Flavour_control = new uiParagraphLabeled('Flavour',bindings,FRONT,'medium') ;
	Effect_panel.place(
		Story_control,'br hfill'
		, Rules_control,'br hfill'
		, Flavour_control,'br hfill'
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;
	
	Main_tab.addToEditor(editor,@LRL-Main) ;
		
// RULES BACK TAB
	var MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;

	// EFFECT PANEL
	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle(@LRL-Effect) ;
	let StoryBack_control = new uiParagraphLabeled('StoryBack',bindings,BACK,'medium') ;
	let RulesBack_control = new uiParagraphLabeled('RulesBack',bindings,BACK,'big') ;
	let FlavourBack_control = new uiParagraphLabeled('FlavourBack',bindings,BACK,'medium') ;
	EffectBack_panel.place(
		StoryBack_control,'br hfill'
		, RulesBack_control,'br hfill'
		, FlavourBack_control ,'br hfill' 
	) ;
	MainBack_tab.place(EffectBack_panel,'br hfill') ;
	
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
		Set_control,'hfill' 
		, SetPortrait_control,'br hfill' 
	) ;
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
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle(@LRL-Template) ;
	
	// LAYOUT PANEL
	let TemplateLayout_panel = new TypeGrid() ;
	TemplateLayout_panel.setTitle(@LRL-Layout) ;
	let list = new Array('Plain','Title','Sets') ;
	let TemplateLayout_control = new uiCyclerLabeled('TemplateLayout',list,bindings,FRONT );
	TemplateLayout_panel.place(TemplateLayout_control,'hfill') ;
	Template_tab.place(TemplateLayout_panel,'hfill') ;
	
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
	let PortraitBack_panel = new TypeGrid() ;
	PortraitBack_panel.setTitle(@LRL-PortraitBack) ;
	let ArtistBack_control = new uiTextLabeled('ArtistBack',bindings,BACK) ;
	let PortraitBack_control = new uiPortrait('PortraitBack',diy) ;
	let PortraitMirrorBack_control = new uiPortraitMirror('PortraitBack',PortraitBack_control) ;
	list = new Array('None','Medium','Small') ;
	let PortraitLayoutBack_control = new uiCyclerLabeled('PortraitBackLayout',list,bindings	, BACK) ;
	PortraitBack_panel.place(
		ArtistBack_control,'hfill' 
		, PortraitBack_control,'br hfill' 
		, PortraitLayoutBack_control,'br hfill'
		, PortraitMirrorBack_control,''
	) ;
	Portrait_tab.place(PortraitBack_panel,'hfill') ;

	Portrait_tab.addToEditor(editor,@LRL-Portrait) ;
	
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle(@LRL-Collection) ;
	let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,FRONT) ;
	let Collection_control = new uiCollectionList(bindings,FRONT) ;
	let CollectionPortrait_control = new uiPortrait('Collection',diy) ;
	Collection_panel.place(
		Collection_control,'hfill' 
		, CollectionInfo_control,'hfill' 
		, CollectionPortrait_control,'br hfill'
	) ;
	Collection_tab.place(Collection_panel,'hfill') ;
	
	// OTHER PANEL
	let Other_panel = new TypeGrid() ;
	Other_panel.setTitle(@LRL-Other) ;
	let Copyright_control = new uiTextLabeled('Copyright',bindings,FRONT) ;
	Other_panel.place(
		Copyright_control,'hfill'
	) ;
	Collection_tab.place(Other_panel,'br hfill') ;

	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ; 
}

function createFrontPainter(diy,sheet){ debug(1,'createFrontPainter') ;
// TEMPLATE

// PORTRAIT

// STATS

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Page_writer = new createTextBox('Page',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	
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

// TEXT

	updateExternalPortrait('PortraitBack',diy) ;
}

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;

// TEMPLATE
	sheet.paintTemplateImage(g) ;

// ICONS
	paintIcon('Collection',diy,g,sheet) ;

	if($TemplateLayout=='Sets'){
		let list = new Array('Set','Set1','Set2','Set3','Set4','Set5') ;
		let selector = 0;
		for( let index = 0 ; index<list.length ; index++ ) if(diy.settings.get(list[index])!='Empty') selector=index+1 ;
		paintAdapter(list,diy,g,sheet) ; 

		let ESregion = settingToArray('Set-portrait-clip-region',diy) ;
		let ES1region = settingToArray('Set1-portrait-clip-region',diy) ;
		let ES2region = settingToArray('Set2-portrait-clip-region',diy) ;
		let ES3region = settingToArray('Set3-portrait-clip-region',diy) ;
		let ES4region = settingToArray('Set4-portrait-clip-region',diy) ;
		let ES5region = settingToArray('Set5-portrait-clip-region',diy) ;
		switch( selector ){
		case 0 : break ;
		case 1 : case 3 : case 5 :
			ESregion[0] = Number(ESregion[0])+Number($Adapter-corrector) ;
			ES1region[0] = Number(ES1region[0])+Number($Adapter-corrector) ;
			ES2region[0] = Number(ES2region[0])+Number($Adapter-corrector) ;
			ES3region[0] = Number(ES3region[0])+Number($Adapter-corrector) ;
			ES4region[0] = Number(ES4region[0])+Number($Adapter-corrector) ;
			ES5region[0] = Number(ES5region[0])+Number($Adapter-corrector) ;
		case 2: case 4: case 6: 
			ESregion = new Region([Number(ESregion[0]),Number(ESregion[1]),Number(ESregion[2]),Number(ESregion[3])]) ;
			ES1region = new Region([Number(ES1region[0]),Number(ES1region[1]),Number(ES1region[2]),Number(ES1region[3])]) ;
			ES2region = new Region([Number(ES2region[0]),Number(ES2region[1]),Number(ES2region[2]),Number(ES2region[3])]) ;
			ES3region = new Region([Number(ES3region[0]),Number(ES3region[1]),Number(ES3region[2]),Number(ES3region[3])]) ;
			ES4region = new Region([Number(ES4region[0]),Number(ES4region[1]),Number(ES4region[2]),Number(ES4region[3])]) ;
			ES5region = new Region([Number(ES5region[0]),Number(ES5region[1]),Number(ES5region[2]),Number(ES5region[3])]) ;
		}
		
		if(diy.settings.get('Set','Empty')!='Empty') sheet.paintImage(g,getIcon('Set',diy),ESregion) ;
		if(diy.settings.get('Set1','Empty')!='Empty') sheet.paintImage(g,getIcon('Set1',diy),ES1region) ;
		if(diy.settings.get('Set2','Empty')!='Empty') sheet.paintImage(g,getIcon('Set2',diy),ES2region) ;
		if(diy.settings.get('Set3','Empty')!='Empty') sheet.paintImage(g,getIcon('Set3',diy),ES3region) ;
		if(diy.settings.get('Set4','Empty')!='Empty') sheet.paintImage(g,getIcon('Set4',diy),ES4region) ;
		if(diy.settings.get('Set5','Empty')!='Empty') sheet.paintImage(g,getIcon('Set5',diy),ES5region) ;

//		switch( Number( adapterSelector ) ){
//		case 6:
//			paintIcon('Set',diy,g,sheet) ;
//			paintIcon('Set1',diy,g,sheet) ;
//			paintIcon('Set2',diy,g,sheet) ;
//			paintIcon('Set3',diy,g,sheet) ;
//			paintIcon('Set4',diy,g,sheet) ;
//			paintIcon('Set5',diy,g,sheet) ;
//			break ;
//		case 5: 
//			sheet.paintImage(g,getIcon('Set'),diy.settings.getRegion('SetM1')) ;
//			sheet.paintImage(g,getIcon('Set1'),diy.settings.getRegion('SetM2')) ;
//			sheet.paintImage(g,getIcon('Set2'),diy.settings.getRegion('SetM3')) ;
//			sheet.paintImage(g,getIcon('Set3'),diy.settings.getRegion('SetM4')) ;
//			sheet.paintImage(g,getIcon('Set4'),diy.settings.getRegion('SetM5')) ;
//			break ;
//		case 4: 
//			sheet.paintImage(g,getIcon('Set'),diy.settings.getRegion('Set1-portrait-clip-region')) ;
//			sheet.paintImage(g,getIcon('Set1'),diy.settings.getRegion('Set2-portrait-clip-region')) ;
//			sheet.paintImage(g,getIcon('Set2'),diy.settings.getRegion('Set3-portrait-clip-region')) ;
//			sheet.paintImage(g,getIcon('Set3'),diy.settings.getRegion('Set4-portrait-clip-region')) ;
//			break ;
//		case 3: 
//			sheet.paintImage(g,getIcon('Set'),diy.settings.getRegion('SetM2')) ;
//			sheet.paintImage(g,getIcon('Set1'),diy.settings.getRegion('SetM3')) ;
//			sheet.paintImage(g,getIcon('Set2'),diy.settings.getRegion('SetM4')) ;
//			break ;
//		case 2:
//			sheet.paintImage(g,getIcon('Set'),diy.settings.getRegion('Set2-portrait-clip-region')) ;
//			sheet.paintImage(g,getIcon('Set1'),diy.settings.getRegion('Set3-portrait-clip-region')) ;
//			break ;
//		case 1: 
//			sheet.paintImage(g,getIcon('Set'),diy.settings.getRegion('SetM3')) ;
//			break ;
//		default:
//			break ;
//		}
	}

// TEXTS
	if($TemplateLayout!='Plain'){
		writeTextOutlined($Name,Name_writer,diy.settings.getRegion('Name'),getStroke('Name',diy),diy,g,sheet) ;
	}
	
	writeParagraph( ['Story','Rules','Flavour'],Body_writer, diy.settings.getRegion($TemplateLayout+'-Body',diy.settings.getRegion('Body') ),diy,g) ;

	writeLine(diy.settings.get('Copyright-format','')+$Copyright,Bottom_writer,diy.settings.getRegion('Copyright'),g) ;
	writeLine(diy.settings.get('$CollectionInfo','')+$CollectionInfo,Bottom_writer,diy.settings.getRegion('CollectionInfo'),g) ;
	writePage(diy,g,sheet) ;
	
	paintCut(diy,g,sheet) ;
}

function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
// TEMPLATE
	sheet.paintTemplateImage(g) ;
// PORTRAIT
	switch($PortraitBackLayout ){
	case 'Small':
		paintPortrait('PortraitBack',diy,g,sheet) ;
		sheet.paintImage(g,'PortraitBack-Overlay-small','Template') ;
		break;
	case 'Medium':
		paintPortrait('PortraitBack',diy,g,sheet) ;
		sheet.paintImage(g,'PortraitBack-Overlay','Template') ;
		break;
	default: 
		break;
	}
// ICONS
	paintIcon('Collection',diy,g,sheet) ;
// TEXT
	writeParagraph( 
		['StoryBack','RulesBack','FlavourBack'],Body_writer,
		diy.settings.getRegion($PortraitBackLayout+'-BodyBack'),diy,g
	) ;

	writeLine(diy.settings.get('$CollectionInfo','')+$CollectionInfo,Bottom_writer,diy.settings.getRegion('CollectionInfo'),g) ;
	if($PortraitBackLayout!='None'){
		writeLine( formatArtist('ArtistBack',diy),Bottom_writer,diy.settings.getRegion('ArtistBack'),g) ;
	}else{
		writeLine(diy.settings.get('Copyright-format','')+$Copyright,Bottom_writer,diy.settings.getRegion('Copyright'),g) ;
	}
	writePage(diy,g,sheet) ;
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
