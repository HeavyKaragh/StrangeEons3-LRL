const Card = 'Scenario';
const CardVersion = 1 ;
// 1: rewrite using new 2021 library

function create( diy ){ debug(1,'\ncreate') ;
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
	loadSettings( diy ) ;
	loadExample( diy ) ;
	loadPreferences( diy ) ; 
	
	diy.frontTemplateKey = 'Template' ;
	diy.backTemplateKey = 'TemplateBack' ;
	diy.faceStyle = FaceStyle.TWO_FACES ;
	diy.bleedMargin = 9 ;

	diy.customPortraitHandling = true ;
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'EncounterSet' , diy ) ;
	createPortrait( 'EncounterSet1' , diy ) ;
	createPortrait( 'EncounterSet2' , diy ) ;
	createPortrait( 'EncounterSet3' , diy ) ;
	createPortrait( 'EncounterSet4' , diy ) ;
	createPortrait( 'EncounterSet5' , diy ) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean( 'LRL-AdvancedControls' ) ;
	if( $Template == 'Custom' ) advancedControls = true ;

	var bindings = new Bindings( editor , diy ) ;

// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT] ) ;
	let Cycle_control = new uiText( 'Cycle' , bindings , [FRONT] ) ;
	Title_panel.place(
		Name_control , 'hfill'
		, @LRL-Cycle , 'br' , Cycle_control , 'hfill'
	) ;
	Main_tab.place( Title_panel , 'hfill' ) ;
	
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Story_control = new uiParagraphLabeled( 'Story' , bindings , [FRONT] , 'medium' ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [FRONT] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [FRONT] , 'medium' ) ;
	Effect_panel.place(
		Story_control , 'hfill'
		, Rules_control , 'br hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	// OTHER PANEL
	let OtherEffect_panel = new TypeGrid() ;
	OtherEffect_panel.setTitle( @LRL-panel-OtherEffect ) ;
	let OptionLeft_control = new uiText( 'OptionLeft' , bindings , [ FRONT ] ) ;
	let OptionRight_control = new uiText( 'OptionRight' , bindings , [ FRONT ] ) ;
	OtherEffect_panel.place(
		@LRL-OptionLeft , '' , OptionLeft_control , 'tab hfill'
		, @LRL-OptionRight , 'br' , OptionRight_control , 'tab hfill'
	) ;
	Main_tab.place( OtherEffect_panel , 'br hfill' ) ;
	
	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// RULES BACK TAB
	var MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;

	// EFFECT PANEL
	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle( @LRL-panel-Effect ) ;
	let StoryBack_control = new uiParagraphLabeled( 'StoryBack' , bindings , [BACK] , 'medium' ) ;
	let RulesBack_control = new uiParagraphLabeled( 'RulesBack' , bindings , [BACK] , 'big' ) ;
	let FlavourBack_control = new uiParagraphLabeled( 'FlavourBack' , bindings , [BACK] , 'medium' ) ;
	EffectBack_panel.place(
		StoryBack_control , 'br hfill'
		, RulesBack_control , 'br hfill'
		, FlavourBack_control  , 'br hfill' 
	) ;
	MainBack_tab.place( EffectBack_panel , 'br hfill' ) ;
	
	MainBack_tab.addToEditor( editor , @LRL-tab-MainBack ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new TypeGrid() ;
	EncounterSet_tab.editorTabScrolling = true ;
	
	// ENCOUNTER SET PANEL
	let EncounterSet_panel = new TypeGrid() ;
	EncounterSet_panel.setTitle( @LRL-panel-EncounterSet ) ;
	let EncounterSet_control = new uiEncounterSetList( 'EncounterSet' , bindings , [FRONT] ) ;
	let EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_panel.place( 
		EncounterSet_control , 'hfill' 
		, EncounterSetPortrait_control , 'br hfill' 
	) ;
	EncounterSet_tab.place( EncounterSet_panel , 'hfill' ) ;
	
	// ADDITIONAL SET 1 PANEL
	let EncounterSet1_panel = new TypeGrid() ;
	EncounterSet1_panel.setTitle( @LRL-panel-EncounterSet1 ) ;
	let EncounterSet1_control = new uiEncounterSetList( 'EncounterSet1' , bindings , [FRONT] ) ;
	let EncounterSet1Portrait_control = new uiPortrait( 'EncounterSet1' , diy ) ;
	EncounterSet1_panel.place(
		EncounterSet1_control , 'hfill' ,
		EncounterSet1Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet1_panel , 'br hfill' ) ;

	// ADDITIONAL SET 2 PANEL
	let EncounterSet2_panel = new TypeGrid() ;
	EncounterSet2_panel.setTitle( @LRL-panel-EncounterSet2 ) ;
	let EncounterSet2_control = new uiEncounterSetList( 'EncounterSet2' , bindings , [FRONT] ) ;
	let EncounterSet2Portrait_control = new uiPortrait( 'EncounterSet2' , diy ) ;
	EncounterSet2_panel.place(
		EncounterSet2_control , 'hfill' ,
		EncounterSet2Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet2_panel , 'br hfill' ) ;
	
	// ADDITIONAL SET 3 PANEL
	let EncounterSet3_panel = new TypeGrid() ;
	EncounterSet3_panel.setTitle( @LRL-panel-EncounterSet3 ) ;
	let EncounterSet3_control = new uiEncounterSetList( 'EncounterSet3' , bindings , [FRONT] ) ;
	let EncounterSet3Portrait_control = new uiPortrait( 'EncounterSet3' , diy ) ;
	EncounterSet3_panel.place(
		EncounterSet3_control , 'hfill' ,
		EncounterSet3Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet3_panel , 'br hfill' ) ;
	
	// ADDITIONAL SET 4 PANEL
	let EncounterSet4_panel = new TypeGrid() ;
	EncounterSet4_panel.setTitle( @LRL-panel-EncounterSet4 ) ;
	let EncounterSet4_control = new uiEncounterSetList( 'EncounterSet4' , bindings , [FRONT] ) ;
	let EncounterSet4Portrait_control = new uiPortrait( 'EncounterSet4' , diy ) ;
	EncounterSet4_panel.place(
		EncounterSet4_control , 'hfill' ,
		EncounterSet4Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet4_panel , 'br hfill' ) ;
	
	// ADDITIONAL SET 5 PANEL
	let EncounterSet5_panel = new TypeGrid() ;
	EncounterSet5_panel.setTitle( @LRL-panel-EncounterSet5 ) ;
	let EncounterSet5_control = new uiEncounterSetList( 'EncounterSet5' , bindings , [FRONT] ) ;
	let EncounterSet5Portrait_control = new uiPortrait( 'EncounterSet5' , diy ) ;
	EncounterSet5_panel.place(
		EncounterSet5_control , 'hfill' ,
		EncounterSet5Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet5_panel , 'br hfill' ) ;
	
	EncounterSet_tab.addToEditor( editor , @LRL-tab-EncounterSet ) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	if( advancedControls ){
		let Template_panel = new TypeGrid() ;
		Template_panel.setTitle( @LRL-panel-Template ) ;
		
		let templateList = new Array( 'Standard' , 'Custom' ) ;
		let Template_control = new uiIconList( 'Template' , templateList , bindings , [ FRONT ] ) ;
		Template_panel.place( Template_control , 'hfill' ) ;
		Template_tab.place( Template_panel , 'hfill' ) ;
	}
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls == true ){
		let ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT] ) ;
		Cutting_panel.place( ShowBleeding_control ,'' ) ;
	}
	Template_tab.place( Cutting_panel , 'br hfill' ) ;
	
	Template_tab.addToEditor( editor , @LRL-tab-Template ) ;
	
// PORTRAIT TAB
	let Portrait_tab = new TypeGrid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	// PORTRAIT PANEL
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle( @LRL-panel-Portrait ) ;
	let Artist_control = new uiText( 'Artist' , bindings , [FRONT] ) ;
	let Portrait_control = new uiPortrait( 'Portrait' , diy ) ;
	let PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	Portrait_panel.place(
		@LRL-Artist , '' , Artist_control , 'hfill' 
		, Portrait_control , 'br hfill' 
		, PortraitMirror_control , 'br hfill'
	) ;
	Portrait_tab.place( Portrait_panel , 'hfill' ) ;

	Portrait_tab.addToEditor( editor , @LRL-tab-Portrait ) ;
	
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle( @LRL-panel-Collection ) ;
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT,BACK] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT,BACK] ) ;
	let CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'hfill' 
		, @LRL-Information , '' , CollectionInfo_control , 'hfill' 
		, CollectionPortrait_control , 'br hfill'
	) ;
	Collection_tab.place( Collection_panel , 'hfill' ) ;
	
	// COPYRIGHT PANEL
	let Copyright_panel = new TypeGrid() ;
	Copyright_panel.setTitle( @LRL-panel-Copyright ) ;
	let Copyright_control = new uiText( 'Copyright' , bindings , [FRONT,BACK] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	// OTHER PANEL
	if( advancedControls == true ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;	
		let Type_control = new uiText( 'Type' , bindings , [FRONT] ) ;
		Other_panel.place( @LRL-Type , '' , Type_control , 'tab hfill' ) ;
		Collection_tab.place( Other_panel , 'br hfill' ) ;
	}

	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'createFrontPainter') ;
// TEMPLATE
	Custom_tinter = new createTinter( 'Custom' , diy ) ;
	Adapter_tinter = new createTinter( 'Custom' , diy ) ;
	
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Cycle_writer = new createTextBox( 'Cycle' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	
	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
	updateExternalPortrait( 'EncounterSet1' , diy ) ;
	updateExternalPortrait( 'EncounterSet2' , diy ) ;
	updateExternalPortrait( 'EncounterSet3' , diy ) ;
	updateExternalPortrait( 'EncounterSet4' , diy ) ;
	updateExternalPortrait( 'EncounterSet5' , diy ) ;
}

function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ;
// TEMPLATE
	CustomBack_tinter = new createTinter( 'Custom' , diy ) ;
	CustomBack_tinter.setImage( diy.settings.getImageResource( 'CustomBack-tintable' ) ) ;
}

function paintFront( g, diy, sheet ){ debug(1,'\npaintFront') ;
/* PORTRAIT */
	paintPortrait( 'Portrait' , diy , g , sheet ) ;
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* ICONS */
	paintIcon( 'Collection' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet' , diy , g , sheet ) ;
	var adapterList = new Array(
		'EncounterSet1','EncounterSet2',
		'EncounterSet3','EncounterSet4','EncounterSet5' );
	var adapterSelector = 0;
	for(let index=0;index<adapterList.length;index++){
		if($(adapterList[index])!='Empty'){adapterSelector=index+1;}
	}
	sheet.paintImage(g,'Adapter-'+adapterSelector,'Template-region');
	paintIcon( 'EncounterSet1' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet2' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet3' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet4' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet5' , diy , g , sheet ) ;
/* TEXT */
	writeName( diy , g ) ;
	writeCycle( diy , g ) ;
	writeBody( [ 'Story' , 'Rules' , 'Flavour' ] , diy , g ) ;
	
	writeOptionRight( diy , g , sheet ) ;
	writeOptionLeft( diy , g , sheet ) ;
	
	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	writeType( diy , g ) ;
/*FINISH*/
	paintCut( diy , g , sheet ) ;
}
function paintBack( g, diy, sheet ){ debug(1,'\npaintBack') ;
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	paintIcon( 'Collection' , diy , g , sheet ) ;
/* TEXT */
	writeParagraph( 
		[ 'StoryBack' , 'RulesBack' , 'FlavourBack' ] , Body_writer , 
		diy.settings.getRegion( 'BodyBack' ) , diy , g
	) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
/*FINISH*/
	paintCut( diy , g , sheet ) ;
}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-B/resources/TheLordOfTheRingsLCG/LRL-B.settings' ) ;
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings' ) ;

	useLibrary( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js' ) ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/library.js' ) ;
	GameLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game' ) ;
	InterfaceLanguage.addStrings( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface' ) ;
	InterfaceLanguage.addStrings( 'project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons' ) ;	

	testDIYScript( 'LRL' ) ;
}else{
	useLibrary( 'res://TheLordOfTheRingsLCG/library.js' ) ;
}