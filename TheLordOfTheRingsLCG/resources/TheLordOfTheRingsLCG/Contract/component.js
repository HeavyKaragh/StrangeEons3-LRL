const Card = 'Contract' ; 
const CardVersion = 1 ;
// 1: new card using 2021 library

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
	createPortrait( 'Portrait',diy) ;
	createPortrait( 'PortraitBack',diy) ;
	createPortrait( 'Collection',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean( 'LRL-AdvancedControls' ) ;

	var bindings = new Bindings( editor , diy ) ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT,BACK] ) ;
	Title_panel.place( Name_control , 'hfill' ) ;
	Main_tab.place( Title_panel , 'hfill' ) ;
	
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [FRONT] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [FRONT] , 'medium' ) ;
	Effect_panel.place(
		Rules_control , 'hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	if( advancedControls == true ){
		let OtherEffect_panel = new TypeGrid() ;
		OtherEffect_panel.setTitle( @LRL-panel-OtherEffect ) ;
		let OptionLeft_control = new uiText( 'OptionLeft' , bindings , [FRONT] ) ;
		let OptionRight_control = new uiText( 'OptionRight' , bindings , [FRONT] ) ;
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
	let RulesBack_control = new uiParagraphLabeled( 'RulesBack' , bindings , [BACK] , 'big' ) ;
	let FlavourBack_control = new uiParagraphLabeled( 'FlavourBack' , bindings , [BACK] , 'medium' ) ;
	EffectBack_panel.place(
		RulesBack_control , 'hfill'
		, FlavourBack_control , 'br hfill'
	) ;
	MainBack_tab.place( EffectBack_panel , 'br hfill' ) ;

	if( advancedControls == true ){
		let OtherEffectBack_panel = new TypeGrid() ;
		OtherEffectBack_panel.setTitle( @LRL-panel-OtherEffect ) ;
		let OptionLeftBack_control = new uiText( 'OptionLeftBack' , bindings , [BACK] ) ;
		let OptionRightBack_control = new uiText( 'OptionRightBack' , bindings , [BACK] ) ;
		OtherEffectBack_panel.place(
			@LRL-OptionLeft , '' , OptionLeftBack_control , 'tab hfill'
			, @LRL-OptionRight , 'br' , OptionRightBack_control , 'tab hfill'
		) ;
		MainBack_tab.place( OtherEffectBack_panel , 'br hfill' ) ;
	}
	
	MainBack_tab.addToEditor( editor , @LRL-tab-MainBack ) ;
		
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;

	let list = new Array( 'Neutral' , 'DoubleSided' ) ;
	let Template_control = new uiIconList( 'Template' , list , bindings , [FRONT,BACK] ) ;
	Template_panel.place( Template_control , 'hfill' ) ;
	Template_tab.place( Template_panel , 'hfill' ) ;
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls == true ){
		let ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [FRONT,BACK] ) ;
		Cutting_panel.place( ShowBleeding_control ,'' ) ;
	}
	Template_tab.place( Cutting_panel , 'br hfill' ) ;
	
	Template_tab.addToEditor( editor , @LRL-tab-Template ) ;
	
// PORTRAIT TAB
	let Portrait_tab = new TypeGrid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle( @LRL-panel-Portrait ) ;
	let Artist_control = new uiText( 'Artist' , bindings , [FRONT,BACK] ) ;
	let Portrait_control = new uiPortrait( 'Portrait',diy) ;
	let PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	Portrait_panel.place(
		@LRL-Artist , '' , Artist_control , 'hfill' 
		, Portrait_control , 'br hfill' 
		, PortraitMirror_control , 'br hfill' 
	) ;
	Portrait_tab.place( Portrait_panel , 'hfill' ) ;
	
	let PortraitBack_panel = new TypeGrid() ;
	PortraitBack_panel.setTitle( @LRL-panel-PortraitBack ) ;
	let ArtistBack_control = new uiText( 'ArtistBack' , bindings , [BACK] ) ;
	let PortraitBack_control = new uiPortrait( 'PortraitBack',diy) ;
	let PortraitShare_control = new uiButtonText( 'PortraitShare' , diy , bindings , [BACK] ) ;
	let PortraitBackMirror_control = new uiPortraitMirror( 'PortraitBack' , PortraitBack_control ) ;
	PortraitBack_panel.place(
		PortraitShare_control , '' , @LRL-Artist , '' , ArtistBack_control , 'hfill' ,
		PortraitBack_control , 'br hfill' ,
		PortraitBackMirror_control , 'br hfill'
	) ;
	Portrait_tab.place( PortraitBack_panel , 'br hfill' ) ;
	
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
	let Copyright_control = new uiText( 'Copyright' , bindings , [FRONT,BACK] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	// OTHER PANEL
	if( advancedControls == true ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;	
		let Type_control = new uiText( 'Type' , bindings , [FRONT,BACK] ) ;
		let SideA_control = new uiText( 'SideA' , bindings , [FRONT] ) ;
		let SideB_control = new uiText( 'SideB' , bindings , [BACK] ) ;
		Other_panel.place(
			@LRL-Type , '' , Type_control , 'tab hfill'
			, @LRL-Side , 'br' , SideA_control , 'tab hfill'
			, @LRL-SideBack , 'br' , SideB_control , 'tab hfill'
		) ;
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
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Side_writer = new createTextBox( 'Side' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait',diy) ;
	updateExternalPortrait( 'Collection',diy) ;
}

function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ;
	updateExternalPortrait( 'PortraitBack',diy) ;
}

function writeSide( diy , g , sheet ){ debug(1,'\npaintFront') ;
	let text ;
	if( sheet.getSheetIndex() == FRONT ){
		text = #LRL-SideA ;
		if( $SideA != '' ) text = $SideA ;
	}else{
		text = #LRL-SideB ;
		if( $SideB != '' ) text = $SideB ;
	}
	text = diy.settings.get( 'Side-format' , '' )+text ;
	writeLine( text , Side_writer , diy.settings.getRegion( 'Side' ) , g ) ;
}

function paintFront( g , diy , sheet ){ debug(1,'\npaintFront') ;
	
// PORTRAIT
	paintPortrait( 'Portrait' , diy , g , sheet ) ;

// TEMPLATE
	sheet.paintTemplateImage( g ) ;
	if( $Template == 'DoubleSided' ) sheet.paintImage( g , 'Side-decoration' , 'Template' ) ;
	
// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;

// STATS

// TEXTS
	writeName( diy , g ) ;
	writeBody( [ 'Rules' , 'Flavour' ] , diy , g ) ;
	
	if( $Template == 'DoubleSided' ) writeSide( diy , g , sheet ) ;

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
	
	if( $Template != 'DoubleSided' ) sheet.paintTemplateImage( g ) ;
	else{
		// PORTRAIT
		if( diy.settings.getBoolean( 'PortraitShare' ) ) paintPortrait( 'Portrait' , diy , g , sheet ) ;
		else paintPortrait( 'PortraitBack' , diy , g , sheet ) ;

		// TEMPLATE
		sheet.paintImage( g , 'Neutral-template' , 'Template' ) ;
		sheet.paintImage( g , 'Side-decoration' , 'Template' ) ;
	
		// ICONS
		paintIcon( 'Collection' , diy , g , sheet ) ;

		// TEXTS
		writeName( diy , g ) ;
		writeBody( [ 'RulesBack' , 'FlavourBack' ] , diy , g ) ;

		writeSide( diy , g , sheet ) ;
		
		writeType( diy , g ) ;
		writeOptionLeftBack( diy , g , sheet ) ;
		writeOptionRightBack( diy , g , sheet ) ;

		writeArtistBack( diy , g , sheet ) ;
		writeCopyright( diy , g , sheet ) ;
		writeCollectionInfo( diy , g , sheet ) ;
		writeCollectionNumber( diy , g , sheet ) ;
	}
	
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
