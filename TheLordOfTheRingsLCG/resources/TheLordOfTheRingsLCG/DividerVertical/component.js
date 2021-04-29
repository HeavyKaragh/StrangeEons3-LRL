const Card = 'DividerVertical' ;
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
	createPortrait( 'Group' , diy ) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean( 'LRL-AdvancedControls' ) ;

	var bindings = new Bindings( editor , diy ) ;
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT,BACK] ) ;
	Title_panel.place( Name_control , 'hfill' ) ;
	Main_tab.place( Title_panel , 'hfill' ) ;

	// GROUP ICON PANEL
	let Group_panel = new TypeGrid() ;
	Group_panel.setTitle( @LRL-panel-Group ) ;
	list = GO.DefaultIconList.concat( GO.FullIconList ) ; // this icon list includes collection, set and others
	let Group_control = new uiIconList( 'Group' , list , bindings , [FRONT,BACK] ) ;
	let GroupPortrait_control = new uiPortrait( 'Group' , diy ) ;
	Group_panel.place(
		Group_control , 'hfill' ,
		GroupPortrait_control , 'br hfill'
	) ;
	Main_tab.place( Group_panel , 'br hfill' ) ;

	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;
	list = new Array( 'Encounter' , 'Player' ) ;
	let Template_control = new uiIconList( 'Template' , list , bindings , [FRONT,BACK] ) ;
	list = new Array( 'Title' , 'Left' , 'LeftMiddle' , 'RightMiddle' , 'Right' ) ;
	let IconLayout_control = new uiCycler( 'Layout' , list , bindings , [FRONT,BACK] );
	let IconSwap_control = new uiButtonText( 'IconSwap' , diy , bindings , [BACK] ) ;
	Template_panel.place( 
		Template_control , 'hfill' ,
		@LRL-uiIconList-IconLayout, 'br' , IconLayout_control , 'hfill' , IconSwap_control , ''
	) ;
	if( advancedControls ){
		list = new Array( 'Collection' , 'Custom' ) ;
		let TintBy_control = new uiCycler( 'TintBy' , list , bindings , [FRONT,BACK] ) ;
		let CustomTint_control = new uiTint( 'Custom' , bindings, [FRONT,BACK] ) ;
		Template_panel.place(
			@LRL-uiCycler-TintBy, 'br' 
			, TintBy_control , 'hfill' 
			, CustomTint_control , 'br hfill' 
		) ;
	}
	Template_tab.place( Template_panel , 'hfill' ) ;
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	list = new Array( 'CutNo' , 'Cut' , 'CutBig' ) ;
	let ShowCut_control = new uiCycler( 'ShowCut' , list , bindings , [FRONT,BACK] );
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
	//let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT,BACK] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT,BACK] ) ;
	let CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'hfill' 
		//, @LRL-Information , '' , CollectionInfo_control , 'hfill' 
		, CollectionPortrait_control , 'br hfill'
	) ;
	Collection_tab.place( Collection_panel , 'hfill' ) ;

	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ;
}

function createFrontPainter( diy, sheet ){ debug(1,'\ncreateFrontPainter') ;

// TEMPLATE
	Custom_tinter = new createTinter( 'Custom' , diy ) ;

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'Group' , diy ) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ; }

function paintCommon( layout , diy , g , sheet ){ debug(2,'\npaintCommon') ;
	debug( 5 , 'Side: '+sheet.getSheetIndex() ) ;
	debug( 5 , 'Layout: '+layout ) ;

// PORTRAIT
	paintPortrait( 'Portrait' , diy , g , sheet ) ;
	
// TEMPLATE
	let tint ;
	if( ($TintBy == 'Custom') || ($Collection == 'Empty') || ($Collection == 'Custom') ) tint = diy.settings.getTint( 'Custom' ) ;
	else tint = diy.settings.getTint( $Collection ) ;
	
	Custom_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
	sheet.paintImage( g , Custom_tinter.getTintedImage() , 'Template-region' ) ;
	
	paintTemplate( diy , g , sheet ) ;
	sheet.paintImage( g , $Template+'-'+layout , 'Template-region' ) ; // Group icon decoration
	
// TEXT
	if( layout == 'Title' ) writeName( diy , g ) ;
	writeArtist( diy , g , sheet ) ;
	
	if( diy.settings.getBoolean( 'ShowBleeding' ) ){
		debug( 4 , '\tShowBleeding' ) ;
		sheet.paintImage( g , 'Template-bleeding' , 'Template-region' ) ;
	}
	if( $ShowCut != 'CutNo' ){
		debug( 4 , '\tShowCut' ) ;
		if( $ShowCut == 'Cut' ) sheet.paintImage( g , 'Template-cut-'+layout , 'Template-region' ) ;
		if( $ShowCut == 'CutBig' ) sheet.paintImage( g , 'Template-cutBig-'+layout , 'Template-region' ) ;
	}
}

function paintFront( g , diy , sheet ){ debug(1,'\npaintFront') ;
	let layout = $Layout ;

	paintCommon( layout , diy , g , sheet ) ;

	switch( layout ){
	case 'Title' :
		sheet.paintImage( g , getIcon( 'Group' , diy ) , 'Group-Title-region' ) ;
		sheet.paintImage( g , getIcon( 'Collection' , diy ) , 'Collection-Title-region' ) ;
		break ;
	default :
		sheet.paintImage( g , getIcon( 'Group' , diy ) , 'Group-'+layout ) ;
	}
	
}

function paintBack( g , diy , sheet ){ debug(1,'\npaintBack') ;
	let layout = $Layout ;
	switch( layout ){
	case 'Title' : layout = 'Title' ; break ;
	case 'Left' : layout = 'Right' ; break ;
	case 'LeftMiddle' : layout = 'RightMiddle' ; break ;
	case 'Right' : layout = 'Left' ; break ;
	case 'RightMiddle' : layout = 'LeftMiddle' ; break ;
	}

	paintCommon( layout , diy , g , sheet ) ;
	
	switch( layout ){
	case 'Title' :
		let groupRegion= 'Group-Title-region' ;
		let collectionRegion = 'Collection-Title-region' ;
		if( diy.settings.getBoolean( 'IconSwap' , false ) ){
			groupRegion = 'Collection-Title-region' ;
			collectionRegion = 'Group-Title-region' ;
		}
		sheet.paintImage( g , getIcon( 'Group' , diy ) , groupRegion ) ;
		sheet.paintImage( g , getIcon( 'Collection' , diy ) , collectionRegion ) ;
		break ;
	default :
		sheet.paintImage( g , getIcon( 'Group' , diy ) , 'Group-'+layout ) ;
	}

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
