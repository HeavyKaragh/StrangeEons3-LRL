const Card = 'Presence';
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
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls' ) ;
	if( diy.settings.getBoolean('TraitIn' ) ) advancedControls = true ;
	if( $PortraitShadow == 'Custom' ) advancedControls = true ;
	
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
	
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Trait_control = new uiParagraphLabeled('Trait' , bindings , [FRONT] , 'line' ) ;
	let Rules_control = new uiParagraphLabeled('Rules' , bindings , [FRONT] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled('Flavour' , bindings , [FRONT] , 'small' ) ;
	Effect_panel.place(
		Trait_control , 'hfill'
		, Rules_control , 'br hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;

// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;

	// LAYOUT PANEL
	if( advancedControls ){
		let Layout_panel = new TypeGrid() ; 
		Layout_panel.setTitle( @LRL-panel-Layout ) ;
		let TraitIn_control = new uiButtonText('TraitIn' , diy , bindings , [FRONT] ) ;
		Layout_panel.place( TraitIn_control , 'hfill' ) ;
		Template_tab.place( Layout_panel , 'hfill' ) ;
	}

	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText('ShowCut' , diy , bindings , [FRONT] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls ){
		let ShowBleeding_control = new uiButtonText('ShowBleeding' , diy , bindings , [FRONT] ) ;
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
	let Artist_control = new uiText('Artist' , bindings , [FRONT] ) ;
	let Portrait_control = new uiPortrait('Portrait',diy) ;
	list = new Array('None' , 'Black' ) ;
	if( advancedControls ) list = list.concat( new Array('Custom' ) ) ;
	let PortraitShadow_control = new uiCycler('PortraitShadow' , list , bindings , [FRONT] );
	let PortraitMirror_control = new uiPortraitMirror('Portrait' , Portrait_control ) ;
	Portrait_panel.place(
		@LRL-Artist , '' , Artist_control , 'hfill' 
		, Portrait_control , 'br hfill' 
		, @LRL-PortraitShadow , 'br' , PortraitShadow_control , '' ,	PortraitMirror_control , 'hfill'
	) ;
	if( advancedControls ){
		let PortraitShadowTint_control = new uiTint('Portrait-shadow' , bindings, [FRONT] ) ;
		Portrait_panel.place( PortraitShadowTint_control , 'br hfill' ) ;
	}
	Portrait_tab.place( Portrait_panel , 'hfill' ) ;
	
	Portrait_tab.addToEditor( editor , @LRL-tab-Portrait ) ;
	
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle( @LRL-panel-Collection ) ;
	let CollectionNumber_control = new uiSpinner('CollectionNumber' , bindings , [FRONT] , 999 ) ;
	let CollectionInfo_control = new uiText('CollectionInfo' , bindings , [FRONT] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT] ) ;
	let CollectionPortrait_control = new uiPortrait('Collection',diy) ;
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
	let Copyright_control = new uiText('Copyright' , bindings , [FRONT] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;
	
	bindings.bind() ;
}

function createFrontPainter( diy, sheet ){
	PortraitShadow_tinter = new createTinter('Portrait-shadow',diy) ;
// TEMPLATE

// TEXT
	Name_writer = new createTextBox('Name' , diy , sheet ) ;
	Body_writer = new createTextBox('Body' , diy , sheet ) ;
	TraitOut_writer = new createTextBox('TraitOut' , diy , sheet ) ;
	Type_writer = new createTextBox('Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox('Bottom' , diy , sheet ) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
}

function paintFront( g , diy , sheet ){ 
	
// PORTRAIT
	paintPortrait('Portrait' , diy , g , sheet ) ;

// TEMPLATE
	sheet.paintTemplateImage( g ) ;

// ICONS
	paintIcon('Collection' , diy , g , sheet ) ;

// TEXTS
	writeName( diy , g ) ;
	if( diy.settings.getBoolean('TraitIn') ) writeBody( [ 'Trait' , 'Rules' , 'Flavour' ] , diy , g ) ;
	else{
		if( diy.settings.get('Trait' , '' ) != '' ){
			sheet.paintImage( g , 'TraitOut-decoration' , 'Template-region' ) ;
			let text = diy.settings.get('TraitOut-format','')+$Trait ;
			let region = diy.settings.getRegion('TraitOut') ;
			writeLine( text , TraitOut_writer , region , g ) ;
		}
		writeBody( [ 'Rules' , 'Flavour' ] , diy , g ) ;
	}

	writeType( diy , g ) ;

	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	writeCollectionNumber( diy , g , sheet ) ;

	paintCut( diy , g , sheet ) ;
}

if( sourcefile == 'Quickscript' ){
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings' ) ;
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings' ) ;

	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js' ) ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/library.js' ) ;
	GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game' ) ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface' ) ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons' ) ;	

	testDIYScript('LRL' ) ;
}else{
	useLibrary('res://TheLordOfTheRingsLCG/library.js' ) ;
}
