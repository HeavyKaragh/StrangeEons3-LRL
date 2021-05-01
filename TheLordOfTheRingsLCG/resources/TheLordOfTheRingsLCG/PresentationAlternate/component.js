const Card = 'PresentationAlternate';
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
	createPortrait( 'Portrait',diy) ;
	createPortrait( 'Collection',diy) ;
	createPortrait( 'GameName',diy) ;
	createPortrait( 'Name',diy) ;
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
	let Name_control = uiNameParagraph( diy , bindings , [FRONT] ) ; 
	Title_panel.place( Name_control , 'hfill' ) ;
	Main_tab.place( Title_panel , 'hfill' ) ;

	// EFFECT PANEL
	let Story_control = new uiParagraphLabeled( 'Story' , bindings , [BACK] , 'big' ) ;
	let Description_control = new uiParagraphLabeled( 'Description' , bindings , [BACK] , 'huge' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [BACK] , 'medium' ) ;
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	Effect_panel.place(
		Story_control , 'hfill'
		, Description_control , 'br hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;

	list = new Array( 'Standard' , 'Nightmare' ) ;
	if( advancedControls ) list = list.concat( new Array('Collection','Custom') ) ;
	let Template_control = new uiIconList( 'Template' , list , bindings , [FRONT,BACK] ) ;
	Template_panel.place( Template_control , 'hfill' ) ;
	if( advancedControls ){
		CustomTint_control = new uiTint( 'Custom' , bindings ) ;
		CustomTint_control.title = @LRL-uiTint-TemplateTint ;
		CustomOutsideTint_control = new uiTint( 'Custom-outside' , bindings ) ;
		CustomOutsideTint_control.title = @LRL-uiTint-TemplateTextTint ;
		Template_panel.place(
			CustomTint_control , 'br hfill'
			, CustomOutsideTint_control , 'br hfill'
		) ;
	}
	Template_tab.place( Template_panel , 'hfill' ) ;
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [FRONT,BACK] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls ){
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
	let Artist_control = new uiText( 'Artist' , bindings , [FRONT] ) ;
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
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [BACK] ) ;
	let Collection_control = new uiCollectionList( bindings , [BACK] ) ;
	let CollectionPortrait_control = new uiPortrait( 'Collection',diy) ;
	Collection_panel.place(
		Collection_control , 'hfill' 
		, @LRL-Information , '' , CollectionInfo_control , 'hfill' 
		, CollectionPortrait_control , 'br hfill'
	) ;
	Collection_tab.place( Collection_panel , 'hfill' ) ;
	
	// COPYRIGHT PANEL
	let Copyright_panel = new TypeGrid() ;
	Copyright_panel.setTitle( @LRL-panel-Copyright ) ;
	let Copyright_control = new uiText( 'Copyright' , bindings , [BACK] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	// OTHER PANEL
	if( advancedControls == true ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;	
		let GameName_control = new uiParagraphLabeled( 'GameName' , bindings , [FRONT] , 'medium' ) ;
		let Type_control = new uiText( 'Type' , bindings , [BACK] ) ;
		let GameNamePortrait_control = new uiPortrait( 'GameName',diy) ;
		let NamePortrait_control = new uiPortrait( 'Name',diy) ;
		Other_panel.place(
			@LRL-Type , '' , Type_control , 'tab hfill'
			, GameName_control , 'br hfill'
			, GameNamePortrait_control , 'br hfill'
			, NamePortrait_control , 'br hfill'
		) ;
		Collection_tab.place( Other_panel , 'br hfill' ) ;
	}
	
	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ;
}

function createFrontPainter( diy , sheet ){ debug(1,'\ncreateFrontPainter') ;
// TEMPLATE
	Custom_tinter = new createTinter( 'Custom',diy) ;
	CustomOutside_tinter = new createTinter( 'Custom-outside',diy) ;
	
// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	
	updateExternalPortrait( 'Portrait',diy) ;
	updateExternalPortrait( 'GameName',diy) ;
	updateExternalPortrait( 'Name',diy) ;
}

function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ;
// TEMPLATE
	CustomBack_tinter = new createTinter( 'CustomBack',diy) ;
	
// TEXT
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Page_writer = new createTextBox( 'Page' , diy , sheet ) ;
	
	updateExternalPortrait( 'Collection',diy) ;
	updateExternalPortrait( 'BackgroundBack',diy) ;
}

function paintFront( g, diy, sheet ){ debug(1,'\npaintFront') ;
// PORTRAIT
	paintPortrait( 'Portrait' , diy , g , sheet ) ;

// TEMPLATE
	if( ($Template=='Custom') || ($Template=='Collection') ){
		let tint ; let tintOut ;
		if( ($Template=='Custom') || ($Collection == 'Empty') || ($Collection == 'Custom') ){
			tint = diy.settings.getTint( 'Custom' ) ;
			tintOut = diy.settings.getTint( 'Custom-outside' ) ;
		}else{
			tint = diy.settings.getTint( $Collection ) ;
			tintOut = diy.settings.getTint( $Collection+'-outside' ) ;
		}
		Custom_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
		CustomOutside_tinter.setFactors( tintOut[0] , tintOut[1] , tintOut[2] ) ;
		sheet.paintImage( g , Custom_tinter.getTintedImage() , 'Template-region' ) ;
		sheet.paintImage( g , CustomOutside_tinter.getTintedImage() , 'Template-region' ) ;
	}
	paintTemplate( diy , g ,sheet ) ;

// TEXTS
	paintPortrait( 'Name' , diy , g ,sheet ) ;
	writeTextShadowed('Name',Name_writer,diy,g,sheet) ;
	
	paintPortrait( 'GameName' , diy , g , sheet ) ;
	writeTextShadowed('GameName',Name_writer,diy,g,sheet) ;

	paintCut( diy , g ,sheet ) ;
}

function paintBack( g, diy, sheet ){ debug(1,'\npaintBack') ;
// TEMPLATE
	if( ($Template=='Custom') || ($Template=='Collection') ){
		let tint ; let tintOut ;
		if( ($Template=='Custom') || ($Collection == 'Empty') || ($Collection == 'Custom') ){
			tintOut = diy.settings.getTint( 'Custom-outside' ) ;
		}else tintOut = diy.settings.getTint( $Collection+'-outside' ) ;
		
		CustomBack_tinter.setFactors( tintOut[0] , tintOut[1] , tintOut[2] ) ;
		sheet.paintImage( g , CustomBack_tinter.getTintedImage() , 'Template-region' ) ;
	}
	paintTemplate( diy , g ,sheet ) ;

// ICONS
	paintIcon( 'Collection' , diy , g ,sheet ) ;

// TEXTS
	writeParagraph( 
		[ 'Story' , 'Description' , 'Flavour' ] , Body_writer , 
		 diy.settings.getRegion( 'Body' ) , diy , g 
	) ;
	
	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	
	writeType( diy , g ) ;

	paintCut( diy , g ,sheet ) ;
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
