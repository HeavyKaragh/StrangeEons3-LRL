const Card = 'Scenario';
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

// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiName(diy,bindings,FRONT) ;
	let Group_control = new uiTextLabeled('Group',bindings,FRONT) ;
	Title_panel.place(
		Name_control,'hfill'
		,Group_control,'br hfill'
	) ;
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
	
	// OTHER PANEL
	let OtherEffect_panel = new TypeGrid() ;
	OtherEffect_panel.setTitle(@LRL-OtherEffect) ;
	let OptionLeft_control = new uiTextLabeled('OptionLeft',bindings,FRONT) ;
	let OptionRight_control = new uiTextLabeled('OptionRight',bindings,FRONT) ;
	OtherEffect_panel.place(
		OptionLeft_control,'hfill'
		, OptionRight_control,'br hfill'
	) ;
	Main_tab.place(OtherEffect_panel,'br hfill') ;
	
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
	if(advancedControls){
		let Template_panel = new TypeGrid() ;
		Template_panel.setTitle(@LRL-Template) ;
		
		let list = new Array('Standard','Custom') ;
		let Template_control = new uiListIcon('Template',list,bindings,FRONT) ;
		Template_panel.place(Template_control,'hfill') ;
		Template_tab.place(Template_panel,'hfill') ;
	}
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle(@LRL-Cutting) ;
	let ShowCut_control = new uiButtonText('ShowCut',diy,bindings,BOTH) ;
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
	Other_panel.place(Copyright_control,'hfill') ;
	if(advancedControls){
		let Type_control = new uiTextLabeled('Type',bindings,FRONT) ;
		Other_panel.place( Type_control,'br hfill' ) ;
	}
	Collection_tab.place(Other_panel,'br hfill') ;

	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ; 
}

function createFrontPainter(diy,sheet){ debug(1,'createFrontPainter') ;
// TEMPLATE
	Custom_tinter = new createTinter('Custom',diy) ;
	Adapter_tinter = new createTinter('Custom',diy) ;
	
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Group_writer = new createTextBox('Group',diy,sheet) ;
	Body_writer = new createTextBox('Body',diy,sheet) ;
	Option_writer = new createTextBox('Option',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;
	Type_writer = new createTextBox('Type',diy,sheet) ;
	
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
// TEMPLATE
	CustomBack_tinter = new createTinter('Custom',diy) ;
	CustomBack_tinter.setImage(diy.settings.getImageResource('CustomBack-tintable')) ;
}

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
/* PORTRAIT */
	paintPortrait('Portrait',diy,g,sheet) ;
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* ICONS */
	paintIcon('Collection',diy,g,sheet) ;
	paintIcon('Set',diy,g,sheet) ;
	var adapterList = new Array(
		'Set1','Set2',
		'Set3','Set4','Set5');
	var adapterSelector = 0;
	for(let index=0;index<adapterList.length;index++){
		if($(adapterList[index])!='Empty'){adapterSelector=index+1;}
	}
	sheet.paintImage(g,'Adapter-'+adapterSelector,'Template-region');
	paintIcon('Set1',diy,g,sheet) ;
	paintIcon('Set2',diy,g,sheet) ;
	paintIcon('Set3',diy,g,sheet) ;
	paintIcon('Set4',diy,g,sheet) ;
	paintIcon('Set5',diy,g,sheet) ;
/* TEXT */
	writeName(diy,g) ;
	writeGroup(diy,g) ;
	writeBody(['Story','Rules','Flavour'],diy,g) ;
	
	writeOption('OptionLeft',diy,g,sheet) ;
	writeOption('OptionRight',diy,g,sheet) ;
	
	writeArtist(diy,g,sheet) ;
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
	writeType(diy,g) ;
/*FINISH*/
	paintCut(diy,g,sheet) ;
}
function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	paintIcon('Collection',diy,g,sheet) ;
/* TEXT */
	writeParagraph( 
		['StoryBack','RulesBack','FlavourBack'],Body_writer, 
		diy.settings.getRegion('BodyBack'),diy,g
	) ;
	writeCopyright(diy,g,sheet) ;
	writeCollectionInfo(diy,g,sheet) ;
/*FINISH*/
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
