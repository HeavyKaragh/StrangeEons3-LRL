const Card = 'QuestSheet';
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
	diy.faceStyle = FaceStyle.ONE_FACE ;
	diy.bleedMargin = 0 ;
	
	diy.customPortraitHandling = true ;
	createPortrait('Portrait',diy) ;
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
	let Name_control = uiNameParagraph(diy,bindings,FRONT) ; 
	Title_panel.place(Name_control,'hfill') ;
	Main_tab.place(Title_panel,'hfill') ;

	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle(@LRL-Effect) ;
	let Story_control = new uiParagraphLabeled('Story',bindings,FRONT,'medium') ;
	let Rules_control = new uiParagraphLabeled('Rules',bindings,FRONT,'big') ;
	let Flavour_control = new uiParagraphLabeled('Flavour',bindings,FRONT,'medium') ;
	Effect_panel.place(
		Story_control,'hfill'
		, Rules_control,'br hfill'
		, Flavour_control,'br hfill'
	) ;
	Main_tab.place(Effect_panel,'br hfill') ;

	Main_tab.addToEditor(editor,@LRL-Main) ;
	
// MAIN RIGHT TAB
	let MainRight_tab = new TypeGrid() ;
	MainRight_tab.editorTabScrolling = true ;
	
	// EFFECT PANEL
	let EffectRight_panel = new TypeGrid() ;
	EffectRight_panel.setTitle(@LRL-Effect) ;
	let StoryRight_control = new uiParagraphLabeled('StoryRight',bindings,FRONT,'medium') ;
	let RulesRight_control = new uiParagraphLabeled('RulesRight',bindings,FRONT,'big') ;
	let FlavourRight_control = new uiParagraphLabeled('FlavourRight',bindings,FRONT,'medium') ;
	EffectRight_panel.place(
		StoryRight_control,'hfill'
		, RulesRight_control,'br hfill'
		, FlavourRight_control,'br hfill'
	) ;
	MainRight_tab.place(EffectRight_panel,'br hfill') ;
	
	MainRight_tab.addToEditor(editor,@LRL-MainRight) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// LAYOUT PANEL
	let TemplateLayout_panel = new TypeGrid() ;
	TemplateLayout_panel.setTitle(@LRL-Layout) ;
	let list = new Array('Plain','Logo','Title','Sets') ;
	let TemplateLayout_control = new uiCyclerLabeled('TemplateLayout',list,bindings,FRONT ) ;
	TemplateLayout_panel.place(TemplateLayout_control,'hfill') ;
	Template_tab.place(TemplateLayout_panel,'hfill') ;
	
	// TEMPLATE TINT
	let TemplateTint_control = new uiTint('Template',bindings, FRONT) ;
	Template_tab.place(TemplateTint_control,'br hfill') ;
	
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
	list = new Array('None','Medium','Small') ;
	let PortraitLayout_control = new uiCyclerLabeled('PortraitLayout',list,bindings,FRONT) ;
	Portrait_panel.place(
		Artist_control,'hfill' 
		, Portrait_control,'br hfill' 
		, PortraitLayout_control,'br hfill'
		, PortraitMirror_control,''
	) ;
	Portrait_tab.place(Portrait_panel,'hfill') ;

	Portrait_tab.addToEditor(editor,@LRL-Portrait) ;
	
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
	let PageNumber_control = new uiSpinnerLabeled('PageNumber',bindings, FRONT,98) ;
	Other_panel.place(
		Copyright_control,'hfill'
		, PageNumber_control,''
	) ;
	if(advancedControls){
		let Group_control = new uiParagraphLabeled('Group',bindings,FRONT,'medium') ;
		Other_panel.place(Group_control,'br hfill') ;
	}
	Collection_tab.place(Other_panel,'br hfill') ;
	
	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ; 
}

function createFrontPainter(diy,sheet){ debug(1,'\ncreateFrontPainter') ;
// TEMPLATE
	Template_tinter = new createTinter('Template',diy) ;
	Page_tinter = new createTinter('Page',diy) ;

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Group_writer = new createTextBox('Group',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	
}
function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
// TEMPLATE
	sheet.paintTemplateImage(g) ;
	
	let tint = diy.settings.getTint('Template') ;
	Template_tinter.setFactors(tint[0],tint[1],tint[2]) ;
	let image = Template_tinter.getTintedImage() ;
	sheet.paintImage(g,image,'Template-region') ;
	
// PORTRAIT
	switch($PortraitLayout ){
	case 'Medium' :
		paintPortrait('Portrait',diy,g,sheet) ;
		sheet.paintImage(g,'Portrait-overlay','Template-region') ;
		break ;
	case 'Small' :
		paintPortrait('Portrait',diy,g,sheet) ;
		sheet.paintImage(g,'Portrait-overlay-small','Template-region') ;
		break ;
	}
	
// ICONS
	paintIcon('Collection',diy,g,sheet) ;
	sheet.paintImage(g,getIcon('Collection',diy),'CollectionBis-portrait-clip-region') ;
	
	if($TemplateLayout=='Sets'){
		let list = new Array('Set','Set1','Set2','Set3','Set4','Set5') ;
		let selector = 0;
		for( let index = 0 ; index<list.length ; index++ ) if(diy.settings.get(list[index])!='Empty') selector=index+1 ;
		paintAdapter(list,diy,g,sheet) ; 		
		
		let ESregion = getArray('Set-portrait-clip-region',diy) ;
		let ES1region = getArray('Set1-portrait-clip-region',diy) ;
		let ES2region = getArray('Set2-portrait-clip-region',diy) ;
		let ES3region = getArray('Set3-portrait-clip-region',diy) ;
		let ES4region = getArray('Set4-portrait-clip-region',diy) ;
		let ES5region = getArray('Set5-portrait-clip-region',diy) ;
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
	}
	
// TEXTS
	
	if( ($TemplateLayout=='Sets') || ($TemplateLayout=='Title') ){
		writeTextOutlined($Name,Name_writer,diy.settings.getRegion('Name'),getStroke('Name',diy),diy,g,sheet) ;
	}
	
	if($TemplateLayout!='Plain'){
		if($Group!=''){
			writeTextOutlined($Group,Group_writer,diy.settings.getRegion('Group'),getStroke('Group',diy),diy,g,sheet) ;
		}else paintGameLogo(diy,g,sheet) ;
	}
	
	let region ;
	if($PortraitLayout=='Medium'){
		region = getArray($TemplateLayout+'-Body-region',diy) ;
		let portraitRegion = getArray('Portrait-portrait-clip-region',diy) ;
		region[3] = portraitRegion[1]-region[1]-10 ;
		region = new Region([Number(region[0]),Number(region[1]),Number(region[2]),Number(region[3])]) ;
	}else{
		region = diy.settings.getRegion($TemplateLayout+'-Body',diy.settings.getRegion('Body')) ;
	}
	writeParagraph( ['Story','Rules','Flavour'],Body_writer, region,diy,g) ;
	
	if($PortraitLayout!='None'){
		region = getArray('BodyRight-region',diy) ;
		let portraitRegion = getArray('Portrait-portrait-clip-region',diy) ;
		region[3] = portraitRegion[1]-region[1]-10 ;
		region = new Region([Number(region[0]),Number(region[1]),Number(region[2]),Number(region[3])]) ;
	}else{
		region = diy.settings.getRegion('BodyRight') ;
	}
	writeParagraph( ['StoryRight','RulesRight','FlavourRight'],Body_writer, region,diy,g) ;
	
	tint = diy.settings.getTint('Template') ;
	Template_tinter.setFactors(tint[0],tint[1],tint[2]) ;
	sheet.paintImage(g,Template_tinter.getTintedImage(),'Template-region') ;
	if(Number($PageNumber)>0){
		Page_tinter.setImage(ImageUtils.get(PathNumberTintable+$PageNumber+'.png')) ;
		if(isOdd($PageNumber)) region = diy.settings.getRegion('Odd-Page') ; 
		else region = diy.settings.getRegion('Page') ;
		sheet.paintImage(g,Page_tinter.getTintedImage(),region) ;
	}
	if($PortraitLayout!='None') writeArtist(diy,g,sheet) ;
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
/*FINISH*/
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
