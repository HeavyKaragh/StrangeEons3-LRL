/* COMPONENT CONFIGURATION */
const Card = 'PresentationExtra';
const CardVersion = 1 ;
// 1: rewrite using new 2021 library

function create(diy){ debug(1,'\ncreate') ;
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings(diy) ;
	loadExample(diy) ;
	
	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'TemplateBack' ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 9 ;

	diy.customPortraitHandling = true ;
	createPortrait('Collection',diy) ;
	createPortrait('Overlay',diy) ;
	createPortrait('OverlayBack',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface(diy,editor,sheet){ debug(1,'\ncreateInterface') ;
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
	let Story_control = new uiParagraphLabeled('Story',bindings,FRONT,'big') ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'huge') ;
	let Flavour_control = new uiParagraphLabeled('Flavour',bindings,FRONT,'medium') ;
	Effect_panel.place(
		Story_control,'hfill' 
		, Rules_control,'br hfill' 
		, Flavour_control ,'br hfill' 
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;
	
	Main_tab.addToEditor(editor,@LRL-Main) ;
		
// RULES BACK TAB
	var MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;

	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle(@LRL-Effect) ;
	let StoryBack_control = new uiParagraphLabeled('StoryBack',bindings,BACK,'big') ;
	let RulesBack_control = new uiParagraphLabeled('RulesBack',bindings,BACK,'huge') ;
	let FlavourBack_control = new uiParagraphLabeled('FlavourBack',bindings,BACK,'medium') ;
	EffectBack_panel.place(
		StoryBack_control,'hfill' 
		, RulesBack_control,'br hfill' 
		, FlavourBack_control ,'br hfill' 
	) ;
	MainBack_tab.place(EffectBack_panel,'br hfill') ;
	
	MainBack_tab.addToEditor(editor,@LRL-MainBack) ;
	
// ENCOUNTER SET TAB

// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle(@LRL-Template) ;
	list = new Array('Blue','Green','Purple','Red','Brown','Yellow') ;
	if(advancedControls) list = list.concat( new Array('Custom')) ;
	let Template_control = new uiListIcon('Template',list,bindings,FRONT) ;
	list = new Array('None','Title') ;
	TemplateLayout_control = new uiCyclerLabeled('TemplateLayout',list,bindings,BOTH) ;
	Template_panel.place(
		Template_control,'hfill'
		, TemplateLayout_control,'hfill'
	) ;
	if(advancedControls){
		let CustomTint_control = new uiTint('Custom',bindings, FRONT) ;
		Template_panel.place(CustomTint_control,'br hfill') ;
	}
	Template_tab.place(Template_panel,'hfill') ;
	
	// OVERLAY PANEL
	if(advancedControls){
		let Overlay_panel = new TypeGrid() ;
		Overlay_panel.setTitle(@LRL-Overlay) ;
		let Overlay_control = new uiPortrait('Overlay',diy) ;
		let OverlayBack_control = new uiPortrait('OverlayBack',diy) ;
		Overlay_panel.place(
			Overlay_control,'br hfill'
			, OverlayBack_control,'br hfill'
		) ;
		Template_tab.place(Overlay_panel,'br hfill') ;
	}

	Template_tab.addToEditor(editor,@LRL-Template) ;
	
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
	
// PORTRAIT TAB
	
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle(@LRL-Collection) ;
	let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,BOTH) ;
	let Collection_control = new uiCollectionList(bindings,BOTH) ;
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
	let PageNumber_control = new uiSpinnerLabeled('PageNumber',bindings,BACK,98) ;
	let PageTotal_control = new uiSpinnerLabeled('PageTotal',bindings,BACK,98) ;
	Other_panel.place(
		Copyright_control,'hfill'
		, PageNumber_control,'br' 
		, PageTotal_control,'' 
	) ;
	if(advancedControls){
		let Group_control = new uiParagraphLabeled('Group',bindings,FRONT,'small') ;
		let PageIn_control = new uiButtonText('PageIn',diy,bindings,BACK) ;
		Other_panel.place(
			PageIn_control,''
			, Group_control,'br hfill'
		) ;
	}
	Collection_tab.place(Other_panel,'br hfill') ;
	
	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ; 
}

function createFrontPainter(diy,sheet){ debug(1,'\ncreateFrontPainter') ;

// TEMPLATE
	Custom_tinter = new createTinter('Custom',diy) ;

// PORTRAIT

// STATS

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Page_writer = new createTextBox('Page',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	
	updateExternalPortrait('Collection',diy) ;
	updateExternalPortrait('Overlay',diy) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ;
// STATS

// TEXT

	updateExternalPortrait('OverlayBack',diy) ;
}

function paintCommon(diy,g,sheet){ debug(2,'\npaintCommon') ;
	let side = sheet.getSheetIndex() ;
	debug(5,'Side: '+side) ;
	
// TEMPLATE

	// In this component, $Template is used only to select the background colour,
	// that should match the one used in Presentation card
	if($Template=='Custom'){
		let tint = diy.settings.getTint('Custom') ;
		Custom_tinter.setFactors(tint[0],tint[1],tint[2]) ; // mover a listener
		sheet.paintImage(g,Custom_tinter.getTintedImage(),'Template') ;
	}else paintTemplate(diy,g,sheet) ;

	sheet.paintTemplateImage(g) ; // this will draw the actual template

// ICONS
	let image ;
	let region ;
	let item = $Collection ; // get the icon name contained inside $key
	if(side==FRONT) region = diy.settings.getRegion('Collection-portrait-clip') ;
	else region = diy.settings.getRegion('Collection-back-portrait-clip') ;
	switch(item){
	case 'Empty' : break ;
	case 'Custom' :
		//PortraitList[portraitIndexOf(key)].paint(g,sheet.getRenderTarget()) ;
		image = PortraitList[portraitIndexOf('Collection')].getImage() ;
		sheet.paintImage(g,image,region) ;
		break ;
	default :
		image = ImageUtils.get(PathIcon+item+'.png') ;
		sheet.paintImage(g,image ,region) ;
	}

// TEXTS
	let format ;
	if(side==FRONT) region = diy.settings.getRegion('CollectionInfo') ;
	else region = diy.settings.getRegion('CollectionInfo-back') ;
	if(side==FRONT) format = $CollectionInfo-format ;
	else format = $CollectionInfo-back-format ;
	writeTextOutlined( 
		format+$CollectionInfo,Bottom_writer,
		region,getStroke('Bottom',diy),
		diy,g,sheet
	) ;
	writeCopyright(diy,g,sheet) ;
	
	// PAGE
	if(diy.settings.getBoolean('PageIn') ){ 
		if($PageNumber>0){
			let text ;
			let format ;
			
			if(diy.settings.getBoolean('PageIn') ) format = diy.settings.get('PageIn-format','') ;
			else format = diy.settings.get('Page-format','') ; 
	
			let page = diy.settings.get('LRL-Page','')
			if(page=='') page = #LRL-Page ;
			
			let number = Number($PageNumber)+sheet.getSheetIndex() ;
			
			if($PageTotal>0){
				let pageOf = diy.settings.get('LRL-PageOf','') ;
				if(pageOf=='') pageOf = #LRL-PageOf ;
				text = format+page+number+pageOf+$PageTotal ;
			}else text = format+page+number ;
				
			writeLine(text,Body_writer,diy.settings.getRegion('PageIn'),g) ;
		}
	}else writePage(diy,g,sheet) ;

	paintCut(diy,g,sheet) ;
}
function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
	paintCommon(diy,g,sheet) ;

// TEMPLATE
	paintPortrait('Overlay',diy,g,sheet) ;

// TEXTS
	// NAME
	if($TemplateLayout!='None'){
		writeTextOutlined( 
			diy.settings.get('Name-format','')+$Name,Name_writer,
			diy.settings.getRegion('Name'),getStroke('Name',diy) ,
			diy,g,sheet
		) ;
	}
	
	// BODY
	let region ;
	if($TemplateLayout=='None') region = diy.settings.getRegion('Body') ;
	else region = diy.settings.getRegion($TemplateLayout+'-Body') ;

	writeParagraph(
		['Story','Rules','Flavour'],Body_writer,
		region,diy,g
	) ;	

	
}

function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
	paintCommon(diy,g,sheet) ;
	
// TEMPLATE
	paintPortrait('OverlayBack',diy,g,sheet) ;
	
// TEXT
	writeParagraph( 
		['StoryBack','RulesBack','FlavourBack'],Body_writer,
		diy.settings.getRegion('Body'),diy,g
	) ;
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
