const Card = 'Campaign' ;
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
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean( 'LRL-AdvancedControls' ) ;

	var bindings = new Bindings( editor , diy ) ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT] ) ;
	Title_panel.place( Name_control , 'hfill' ) ;
	Main_tab.place( Title_panel , 'hfill' ) ;
	
	// CYCLE PANEL
	let Cycle_panel = new TypeGrid() ;
	Cycle_panel.setTitle( @LRL-panel-Cycle ) ;
	let Cycle_control = new uiText( 'Cycle' , bindings , [FRONT] ) ;
	Cycle_panel.place( Cycle_control , 'hfill' ) ;
	Main_tab.place( Cycle_panel , 'br hfill' ) ;
	
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [ FRONT ] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [ FRONT ] , 'medium' ) ;
	Effect_panel.place(
		Rules_control , 'hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	if( advancedControls == true ){
		let OtherEffect_panel = new TypeGrid() ;
		OtherEffect_panel.setTitle( @LRL-panel-OtherEffect ) ;
		let OptionLeft_control = new uiText( 'OptionLeft' , bindings , [ FRONT ] ) ;
		let OptionRight_control = new uiText( 'OptionRight' , bindings , [ FRONT ] ) ;
		OtherEffect_panel.place(
			@LRL-OptionLeft , '' , OptionLeft_control , 'tab hfill'
			, @LRL-OptionRight , 'br' , OptionRight_control , 'tab hfill'
		) ;
		Main_tab.place( OtherEffect_panel , 'br hfill' ) ;
	}

	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// MAIN BACK TAB
	var MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;
	
	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle( @LRL-panel-Effect ) ;
	let RulesBack_control = new uiParagraphLabeled( 'RulesBack' , bindings , [ BACK ] , 'huge' ) ;
	let FlavourBack_control = new uiParagraphLabeled( 'FlavourBack' , bindings , [ BACK ] , 'medium' ) ;
	EffectBack_panel.place(
		RulesBack_control , 'hfill'
		, FlavourBack_control , 'br hfill'
	) ;
	MainBack_tab.place( EffectBack_panel , 'br hfill' ) ;

	if( advancedControls == true ){
		let OtherEffectBack_panel = new TypeGrid() ;
		OtherEffectBack_panel.setTitle( @LRL-panel-OtherEffect ) ;
		let OptionLeftBack_control = new uiText( 'OptionLeftBack' , bindings , [ BACK ] ) ;
		let OptionRightBack_control = new uiText( 'OptionRightBack' , bindings , [ BACK ] ) ;
		OtherEffectBack_panel.place(
			@LRL-OptionLeft , '' , OptionLeftBack_control , 'tab hfill'
			, @LRL-OptionRight , 'br' , OptionRightBack_control , 'tab hfill'
		) ;
		MainBack_tab.place( OtherEffectBack_panel , 'br hfill' ) ;
	}
	
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
		EncounterSet_control , 'hfill' ,
		EncounterSetPortrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet_panel , 'br hfill' ) ;
	
	EncounterSet_tab.addToEditor( editor , @LRL-tab-EncounterSet ) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [ FRONT , BACK ] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls == true ){
		let ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [ FRONT , BACK ] ) ;
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
	let Artist_control = new uiText( 'Artist' , bindings , [ FRONT ] ) ;
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
	let CollectionNumber_control = new uiSpinner( 'CollectionNumber' , bindings , [FRONT,BACK] , 999 ) ;
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT,BACK] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT,BACK] ) ;
	let CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'hfill' 
		, @LRL-Number , 'br' , CollectionNumber_control , '' 
		, @LRL-Information , '' , CollectionInfo_control , 'hfill' 
		, CollectionPortrait_control , 'br hfill'
	) ;
	Collection_tab.place( Collection_panel , 'hfill' ) ;
		
	// COPYRIGHT PANEL
	let Copyright_panel = new TypeGrid() ;
	Copyright_panel.setTitle( @LRL-panel-Copyright ) ;
	let Copyright_control = new uiText( 'Copyright' , bindings , [ FRONT , BACK ] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	// OTHER PANEL
	if( advancedControls == true ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;	
		let Type_control = new uiText( 'Type' , bindings , [ FRONT ] ) ;
		Other_panel.place( @LRL-Type , '' , Type_control , 'tab hfill' ) ;
		Collection_tab.place( Other_panel , 'br hfill' ) ;
	}
	
	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'\ncreateFrontPainter') ;
	
// TEMPLATE

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Cycle_writer = new createTextBox( 'Cycle' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'EncounterSet' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
}

function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ; }

function paintFront( g , diy , sheet ){ debug(1,'\npaintFront') ;
// PORTRAIT
	paintPortrait( 'Portrait' , diy , g , sheet ) ;

// TEMPLATE
	sheet.paintTemplateImage( g ) ;

// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet' , diy , g , sheet ) ;
	
// STATS

// TEXTS
	writeName( diy , g ) ;
	writeCycle( diy , g ) ;
	writeBody( [ 'Rules' , 'Flavour' ] , diy , g ) ;
	
	writeType( diy , g ) ;
	writeOptionLeft( diy , g , sheet ) ;
	writeOptionRight( diy , g , sheet ) ;

	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	writeCollectionNumber( diy , g , sheet ) ;
	
	paintCut( diy , g , sheet ) ;
}

function paintBack( g, diy, sheet ){ debug(1,'\npaintBack') ;
	
	// TEMPLATE
	sheet.paintTemplateImage( g ) ;

	// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;

	// TEXTS
	let region = diy.settings.getRegion( 'BodyBack' ) ;
	if( ($OptionLeftBack != '') || ($OptionRightBack != '') ){
		region = settingToArray( 'BodyBack-region' , diy ) ;
		region[3] = Number(region[3])-6 ;
		region = new Region([Number(region[0]),Number(region[1]),Number(region[2]),Number(region[3])] ) ;
	}
	writeParagraph( 
		[ 'RulesBack' , 'FlavourBack' ] , Body_writer , 
		region , diy , g
	) ;
	
	writeOptionLeftBack( diy , g , sheet ) ;
	writeOptionRightBack( diy , g , sheet ) ;

	writeArtistBack( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	writeCollectionNumber( diy , g , sheet ) ;
	
	paintCut( diy , g , sheet ) ;
}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
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
