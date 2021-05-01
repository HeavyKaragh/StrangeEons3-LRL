const Card = 'Event' ; 
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
	createPortrait( 'Portrait',diy) ;
	createPortrait( 'Collection',diy) ;
	createPortrait( 'Sphere',diy) ;
	createPortrait( 'BodyIcon',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean( 'LRL-AdvancedControls' ) ;
	if( $Template == 'Custom' ) advancedControls = true ;

	var bindings = new Bindings( editor , diy ) ;
	let list ;

// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT] ) ;
	Title_panel.place( Name_control , 'hfill' ) ;
	Main_tab.place( Title_panel , 'hfill' ) ;
	
	// STATS PANEL
	let Stats_panel = new TypeGrid() ;
	Stats_panel.setTitle( @LRL-panel-Stats ) ;
	let ResourceCost_control = new uiStatIcon( 'ResourceCost' , bindings , [FRONT] ) ;
	Stats_panel.place( ResourceCost_control , '' ) ;
	Main_tab.place( Stats_panel , 'br hfill' ) ;
	
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Trait_control = new uiParagraphLabeled( 'Trait' , bindings , [FRONT] , 'line' ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [FRONT] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [FRONT] , 'medium' ) ;
	Effect_panel.place(
		Trait_control , 'hfill'
		, Rules_control , 'br hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	// OTHER PANEL
	let OtherEffect_panel = new TypeGrid() ;
	OtherEffect_panel.setTitle( @LRL-panel-OtherEffect ) ;
	let OptionLeft_control = new uiText( 'OptionLeft' , bindings , [FRONT] ) ;
	let OptionRight_control = new uiText( 'OptionRight' , bindings , [FRONT] ) ;
	OtherEffect_panel.place(
		@LRL-OptionLeft , '' , OptionLeft_control , 'tab hfill'
		, @LRL-OptionRight , 'br' , OptionRight_control , 'tab hfill'
	) ;
	Main_tab.place( OtherEffect_panel , 'br hfill' ) ;

	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;
	list = new Array( 'Neutral' , 'Leadership' , 'Lore' , 'Spirit' , 'Tactics' ) ;
	if( advancedControls ) list = list.concat( new Array( 'Baggins' , 'Fellowship' , 'Mastery' , 'Custom' , 'Boon' ) ) ;
	let Template_control = new uiIconList( 'Template' , list , bindings , [ FRONT ] ) ;
	Template_panel.place( Template_control , 'hfill' ) ;
	Template_tab.place( Template_panel , 'hfill' ) ;
	
	if( advancedControls == true ){
		let CustomSphere_panel = new TypeGrid() ;
		CustomSphere_panel.setTitle( @LRL-panel-CustomSphere ) ;
		let CustomTint_control = new uiTint( 'Custom' , bindings, [ FRONT ] ) ;
		let SpherePortrait_control = new uiPortrait( 'Sphere',diy) ;
		let BodyIconPortrait_control = new uiPortrait( 'BodyIcon',diy) ;
		let BodyIconTransparency_control = new uiTransparency( 'BodyIcon' , bindings , [ FRONT ] ) ;
		CustomSphere_panel.place(
			CustomTint_control , 'hfill'
			, SpherePortrait_control ,'br hfill' 
			, BodyIconPortrait_control , 'br hfill' 
			, BodyIconTransparency_control , 'br hfill'
		) ;
		Template_tab.place( CustomSphere_panel , 'br hfill' ) ;
	}
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [ FRONT ] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls == true ){
		let ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [ FRONT ] ) ;
		Cutting_panel.place( ShowBleeding_control ,'' ) ;
	}
	Template_tab.place( Cutting_panel , 'br hfill' ) ;
	
	Template_tab.addToEditor( editor , @LRL-tab-Template ) ;
	
// PORTRAIT TAB
	let Portrait_tab = new TypeGrid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle( @LRL-panel-Portrait ) ;
	let Artist_control = new uiText( 'Artist' , bindings , [ FRONT ] ) ;
	let Portrait_control = new uiPortrait( 'Portrait',diy) ;
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
	let CollectionNumber_control = new uiSpinner( 'CollectionNumber' , bindings , [FRONT] , 999 ) ;
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT] ) ;
	let CollectionPortrait_control = new uiPortrait( 'Collection',diy) ;
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
	let Copyright_control = new uiText( 'Copyright' , bindings , [FRONT] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	// OTHER PANEL
	if( advancedControls ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;	
		let Type_control = new uiText( 'Type' , bindings , [FRONT] ) ;
		let Subtype_control = new uiText( 'Subtype' , bindings , [FRONT] ) ;
		Other_panel.place(
			@LRL-Type , '' , Type_control , 'tab hfill'
			, @LRL-Subtype , 'br' , Subtype_control , 'tab hfill'		
		) ;
		Collection_tab.place( Other_panel , 'br hfill' ) ;
	}
	
	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'createFrontPainter') ;
	
// TEMPLATE
	CustomBody_tinter = new createTinter( 'Custom-Body',diy) ;
	CustomBodyIcon_tinter = new createTinter( '',diy) ;
	CustomColour_tinter = new createTinter( 'Custom-Colour',diy) ;

// STATS
	ResourceCost_tinter = new createTinter( 'ResourceCost',diy) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Subtype_writer = new createTextBox( 'Subtype' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait',diy) ;
	updateExternalPortrait( 'Collection',diy) ;
	updateExternalPortrait( 'Sphere',diy) ;
	updateExternalPortrait( 'BodyIcon',diy) ;
}

function paintFront( g , diy , sheet ){ debug(1,'paintFront') ;

// PORTRAIT
	paintPortrait( 'Portrait' , diy , g , sheet ) ;

// TEMPLATE
	if( $Template == 'Custom' ) paintCustomBody( diy , g , sheet ) ; // colorized text box
	paintTemplate( diy , g , sheet ) ; // this will draw the selected $Template
	if( $Template == 'Custom' ) paintCustomColour( diy , g , sheet ) ; // colorized "pearls"

// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;
	if( $Template == 'Custom' ) paintPortrait( 'Sphere' , diy , g , sheet ) ;

// STATS
	paintStatTinted( 'ResourceCost' , ResourceCost_tinter , diy , g , sheet ) ;

// TEXTS
	writeNameRotated( diy , g ) ;
	writeBody( [ 'Trait' , 'Rules' , 'Flavour' ] , diy , g ) ;

	writeType( diy , g ) ;
	if( $Template == 'Boon' ) writeSubtype( diy , g ) ; 
	writeOptionLeft( diy , g , sheet ) ;
	writeOptionRight( diy , g , sheet ) ;
	
	writeArtist( diy , g , sheet ) ;
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
