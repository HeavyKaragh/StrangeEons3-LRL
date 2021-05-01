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
	createPortrait('EncounterSet',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls' ) ;

	var bindings = new Bindings( editor , diy ) ;
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE TAB
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT] ) ;
	Title_panel.place( Name_control , 'hfill' ) ;
	Main_tab.place( Title_panel , 'hfill' ) ;
	
	// EFFECT TAB
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Story_control = new uiParagraphLabeled('Story' , bindings , [FRONT] , 'medium' ) ;
	let Rules_control = new uiParagraphLabeled('Rules' , bindings , [FRONT] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled('Flavour' , bindings , [FRONT] , 'small' ) ;
	let Success_control = new uiParagraphLabeled('Success' , bindings , [FRONT] , 'small' ) ;
	let Failure_control = new uiParagraphLabeled('Failure' , bindings , [FRONT] , 'small' ) ;
	Effect_panel.place(
		Story_control , 'hfill' 
		, Rules_control , 'br hfill' 
		, Failure_control , 'br hfill'
		, Flavour_control , 'br hfill' 
		, Success_control , 'br hfill' 
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new TypeGrid() ;
	EncounterSet_tab.editorTabScrolling = true ;
	
	// ENCOUNTER SET PANEL
	let EncounterSet_panel = new TypeGrid() ;
	EncounterSet_panel.setTitle( @LRL-panel-EncounterSet ) ;
	let EncounterSet_control = new uiEncounterSetList('EncounterSet' , bindings , [FRONT] ) ;
	EncounterSet_panel.place(
		EncounterSet_control , 'hfill'
	) ;
	list = new Array('Standard' , 'Gold' , 'Red' , 'Green' , 'Blue' , 'Purple' ) ;
	let Difficulty_control = new uiIconList('Difficulty' , list , bindings , [FRONT] ) ;
	EncounterSet_panel.place( @LRL-Difficulty, '' , Difficulty_control , 'hfill' ) ;
	
	let EncounterSetPortrait_control = new uiPortrait('EncounterSet',diy) ;
	EncounterSet_panel.place( EncounterSetPortrait_control , 'br hfill' ) ;
	EncounterSet_tab.place( EncounterSet_panel , 'br hfill' ) ;
	
	EncounterSet_tab.addToEditor( editor , @LRL-tab-EncounterSet ) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;
	
	list = new Array('Standard' , 'Complex' ) ;
	let Template_control = new uiIconList('Template' , list , bindings , [FRONT] ) ;
	Template_panel.place( Template_control , 'hfill' ) ;
	Template_tab.place( Template_panel , 'br hfill' ) ;

	// REGION PANEL
	let Region_panel = new TypeGrid() ;
	Region_panel.setTitle( @LRL-panel-Region ) ;
	list = new Array('Red' , 'Green' , 'Blue' , 'Yellow' , 'Brown' , 'Purple' , 'White' , 'Black' , 'Empty' ) ;
	Region_control = new uiIconList('Region' , list , bindings , [BACK] ) ;
	Region_panel.place( Region_control , 'hfill' ) ;
	Template_tab.place( Region_panel , 'br hfill' ) ;
	
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
	let PortraitMirror_control = new uiPortraitMirror('Portrait' , Portrait_control ) ;
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

	// OTHER PANEL
	if( advancedControls ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;	
		let Type_control = new uiText('Type' , bindings , [FRONT] ) ;
		Other_panel.place( @LRL-Type , '' , Type_control , 'tab hfill' ) ;
		Collection_tab.place( Other_panel , 'br hfill' ) ;
	}

	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'\ncreateFrontPainter') ;
// TEMPLATE
	Difficulty_tinter = new createTinter('Difficulty',diy) ;

// TEXT
	Name_writer = new createTextBox('Name' , diy , sheet ) ;
	Body_writer = new createTextBox('Body' , diy , sheet ) ;
	Option_writer = new createTextBox('Option' , diy , sheet ) ;
	Type_writer = new createTextBox('Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox('Bottom' , diy , sheet ) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
	updateExternalPortrait('EncounterSet',diy) ;
}

function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ;
// TEMPLATE
	Region_tinter = new createTinter('Region',diy) ;
}

function paintFront( g , diy , sheet ){ debug(1,'\npaintFront') ;
	let image ;

// PORTRAIT
	paintPortrait('Portrait' , diy , g , sheet ) ;

// TEMPLATE
	paintTemplate( diy , g , sheet ) ;

	switch( $Difficulty ) {
	case 'Standard' : break ;
	case 'Custom' :
		hsb = diy.settings.getTint('Difficulty' ) ; //mover a listener
		Difficulty_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		image = Difficulty_tinter.getTintedImage() ;
		sheet.paintImage( g , image , 'Difficulty-region' ) ;
		break ;
	default :
		hsb = diy.settings.getTint( $Difficulty ) ;
		Difficulty_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		image = Difficulty_tinter.getTintedImage() ;
		sheet.paintImage( g , image , 'Difficulty-region' ) ;
		break ;
	}

// ICONS
	paintIcon('Collection' , diy , g , sheet ) ;
	paintIcon('EncounterSet' , diy , g , sheet ) ;

// TEXTS
	writeName( diy , g ) ;
//	if( $EncounterSet != 'Empty' ) region = diy.settings.getRegion('Name' ) ;
//	else region = diy.settings.getRegion('Full-Name' ) ;
//	writeLine( $Name , Name_writer , region , g ) ;
	
	writeParagraph(  
		[ 'Story' ] , Body_writer ,
		diy.settings.getRegion('Story' ) , diy , g
	) ;
	if( $Template == 'Complex' ) {
		writeParagraph(  
			[ 'Rules' , 'Flavour' ] , Body_writer ,
			diy.settings.getRegion('Complex-Body' ) , diy , g
		) ;
		writeParagraph(  
			[ 'Success' ] , Body_writer ,
			diy.settings.getRegion('Success' ) , diy , g
		) ;
		writeParagraph(  
			[ 'Failure' ] , Body_writer ,
			diy.settings.getRegion('Failure' ) , diy , g 
		) ;
	}else writeBody( [ 'Rules' , 'Flavour' ] , diy , g ) ;
	
	if( diy.settings.get('Template ' ) == 'Complex' ){
		if(  diy.settings.get('Type' , '' ) == '' ) text = #LRL-OccurrenceComplex ;
		else text = $Type ;
		writeLine( text , Type_writer , diy.settings.getRegion('Type' ) , g ) ;
	}else writeType( diy , g ) ;
	
	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	writeCollectionNumber( diy , g , sheet ) ;

	paintCut( diy , g , sheet ) ;
}

function paintBack( g, diy, sheet ){ debug(1,'\npaintBack') ;
// TEMPLATE
	sheet.paintTemplateImage( g ) ;
	
	let hsb ;
	let image ;
	switch( $Region ){
	case 'Empty' : break ;
	case 'Custom' :
		hsb = diy.settings.getTint('Region' ) ;
		Region_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		image = Region_tinter.getTintedImage() ;
		sheet.paintImage( g , image , 'Template-region' ) ;
		break;
	default :
		image = ImageUtils.get( PathCard+$Region+'.jp2' ) ;
		sheet.paintImage( g , image , 'Template-region' ) ;
		break;
	}
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
