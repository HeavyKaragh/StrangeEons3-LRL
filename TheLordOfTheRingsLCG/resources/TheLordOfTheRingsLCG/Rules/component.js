/* COMPONENT CONFIGURATION */
const Card = 'Rules';
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
	createPortrait( 'PortraitBack',diy) ;
	createPortrait( 'Collection',diy) ;
	createPortrait( 'EncounterSet',diy) ;
	createPortrait( 'EncounterSet1',diy) ;
	createPortrait( 'EncounterSet2',diy) ;
	createPortrait( 'EncounterSet3',diy) ;
	createPortrait( 'EncounterSet4',diy) ;
	createPortrait( 'EncounterSet5',diy) ;
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
	let Adventure_control = new uiText( 'Adventure' , bindings , [FRONT] ) ;
	let PageNumber_control = new uiSpinner( 'PageNumber' , bindings, [FRONT] , 98 ) ;
	let PageTotal_control = new uiSpinner( 'PageTotal' , bindings, [FRONT] , 98 ) ;
	Title_panel.place(
		Name_control , 'hfill'
		, @LRL-Adventure , 'br' , Adventure_control , 'hfill'
		, @LRL-Page, '' , PageNumber_control , ''
		, @LRL-Total,'', PageTotal_control , ''
	) ;
	Main_tab.place( Title_panel , 'hfill' ) ;

	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Story_control = new uiParagraphLabeled( 'Story' , bindings , [FRONT] , 'medium' ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [FRONT] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [FRONT] , 'medium' ) ;
	Effect_panel.place(
		@LRL-Story , 'center' , Story_control , 'br hfill'
		, @LRL-Rules , 'p center' , Rules_control , 'br hfill'
		, @LRL-Flavour, ' p center' , Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
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
		@LRL-Story, 'center' , StoryBack_control , 'br hfill'
		, @LRL-Rules, 'p center' , RulesBack_control , 'br hfill'
		, @LRL-Flavour , 'p center' , FlavourBack_control  , 'br hfill' 
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
	let EncounterSetPortrait_control = new uiPortrait( 'EncounterSet',diy) ;
	EncounterSet_panel.place( 
		EncounterSet_control , 'hfill' 
		, EncounterSetPortrait_control , 'br hfill' 
	) ;
	EncounterSet_tab.place( EncounterSet_panel , 'hfill' ) ;
	
	// ADDITIONAL SET 1 PANEL
	let EncounterSet1_panel = new TypeGrid() ;
	EncounterSet1_panel.setTitle( @LRL-panel-EncounterSet1 ) ;
	let EncounterSet1_control = new uiEncounterSetList( 'EncounterSet1' , bindings , [FRONT] ) ;
	let EncounterSet1Portrait_control = new uiPortrait( 'EncounterSet1',diy) ;
	EncounterSet1_panel.place(
		EncounterSet1_control , 'hfill' ,
		EncounterSet1Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet1_panel , 'br hfill' ) ;

	// ADDITIONAL SET 2 PANEL
	let EncounterSet2_panel = new TypeGrid() ;
	EncounterSet2_panel.setTitle( @LRL-panel-EncounterSet2 ) ;
	let EncounterSet2_control = new uiEncounterSetList( 'EncounterSet2' , bindings , [FRONT] ) ;
	let EncounterSet2Portrait_control = new uiPortrait( 'EncounterSet2',diy) ;
	EncounterSet2_panel.place(
		EncounterSet2_control , 'hfill' ,
		EncounterSet2Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet2_panel , 'br hfill' ) ;
	
	// ADDITIONAL SET 3 PANEL
	let EncounterSet3_panel = new TypeGrid() ;
	EncounterSet3_panel.setTitle( @LRL-panel-EncounterSet3 ) ;
	let EncounterSet3_control = new uiEncounterSetList( 'EncounterSet3' , bindings , [FRONT] ) ;
	let EncounterSet3Portrait_control = new uiPortrait( 'EncounterSet3',diy) ;
	EncounterSet3_panel.place(
		EncounterSet3_control , 'hfill' ,
		EncounterSet3Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet3_panel , 'br hfill' ) ;
	
	// ADDITIONAL SET 4 PANEL
	let EncounterSet4_panel = new TypeGrid() ;
	EncounterSet4_panel.setTitle( @LRL-panel-EncounterSet4 ) ;
	let EncounterSet4_control = new uiEncounterSetList( 'EncounterSet4' , bindings , [FRONT] ) ;
	let EncounterSet4Portrait_control = new uiPortrait( 'EncounterSet4',diy) ;
	EncounterSet4_panel.place(
		EncounterSet4_control , 'hfill' ,
		EncounterSet4Portrait_control , 'br hfill'
	) ;
	EncounterSet_tab.place( EncounterSet4_panel , 'br hfill' ) ;
	
	// ADDITIONAL SET 5 PANEL
	let EncounterSet5_panel = new TypeGrid() ;
	EncounterSet5_panel.setTitle( @LRL-panel-EncounterSet5 ) ;
	let EncounterSet5_control = new uiEncounterSetList( 'EncounterSet5' , bindings , [FRONT] ) ;
	let EncounterSet5Portrait_control = new uiPortrait( 'EncounterSet5',diy) ;
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
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;
	
	// LAYOUT PANEL
	let TemplateLayout_panel = new TypeGrid() ;
	TemplateLayout_panel.setTitle( @LRL-panel-Layout ) ;
	let list = new Array( 'Plain' , 'Title' , 'Sets' ) ;
	let TemplateLayout_control = new uiCycler( 'TemplateLayout' , list , bindings , [FRONT] );
	TemplateLayout_panel.place( @LRL-Layout, '' , TemplateLayout_control , 'hfill' ) ;
	Template_tab.place( TemplateLayout_panel , 'hfill' ) ;
	
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
	
	// PORTRAIT PANEL
	let PortraitBack_panel = new TypeGrid() ;
	PortraitBack_panel.setTitle( @LRL-panel-PortraitBack ) ;
	let ArtistBack_control = new uiText( 'ArtistBack' , bindings , [BACK] ) ;
	let PortraitBack_control = new uiPortrait( 'PortraitBack',diy) ;
	let PortraitMirrorBack_control = new uiPortraitMirror( 'PortraitBack' , PortraitBack_control ) ;
	list = new Array( 'None' , 'Medium' , 'Small' ) ;
	let PortraitLayoutBack_control = new uiCycler( 'PortraitBackLayout' , list , bindings	, [BACK] ) ;
	PortraitBack_panel.place(
		@LRL-Artist , '' , ArtistBack_control , 'hfill' 
		, PortraitBack_control , 'br hfill' 
		, @LRL-Layout, 'br' , PortraitLayoutBack_control , 'hfill'
		, PortraitMirrorBack_control , ''
	) ;
	Portrait_tab.place( PortraitBack_panel , 'hfill' ) ;

	Portrait_tab.addToEditor( editor , @LRL-tab-Portrait ) ;
	
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle( @LRL-panel-Collection ) ;
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT] ) ;
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
	let Copyright_control = new uiText( 'Copyright' , bindings , [FRONT] ) ;
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'createFrontPainter') ;
// TEMPLATE

// PORTRAIT

// STATS

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Page_writer = new createTextBox( 'Page' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	
	updateExternalPortrait( 'Collection',diy) ;
	updateExternalPortrait( 'EncounterSet',diy) ;
	updateExternalPortrait( 'EncounterSet1',diy) ;
	updateExternalPortrait( 'EncounterSet2',diy) ;
	updateExternalPortrait( 'EncounterSet3',diy) ;
	updateExternalPortrait( 'EncounterSet4',diy) ;
	updateExternalPortrait( 'EncounterSet5',diy) ;
}

function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ;
// STATS

// TEXT

	updateExternalPortrait( 'PortraitBack',diy) ;
}

function paintFront( g, diy, sheet ){ debug(1,'\npaintFront') ;

// TEMPLATE
	sheet.paintTemplateImage( g ) ;

// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;

	if( $TemplateLayout == 'Sets' ){
		let list = new Array( 'EncounterSet' , 'EncounterSet1' , 'EncounterSet2' , 'EncounterSet3' , 'EncounterSet4' , 'EncounterSet5' ) ;
		let selector = 0;
		for( let index = 0 ; index<list.length ; index++ ) if( diy.settings.get(list[index]) != 'Empty' ) selector=index+1 ;
		paintAdapter( list , diy , g , sheet ) ; 

		let ESregion = settingToArray('EncounterSet-portrait-clip-region',diy) ;
		let ES1region = settingToArray('EncounterSet1-portrait-clip-region',diy) ;
		let ES2region = settingToArray('EncounterSet2-portrait-clip-region',diy) ;
		let ES3region = settingToArray('EncounterSet3-portrait-clip-region',diy) ;
		let ES4region = settingToArray('EncounterSet4-portrait-clip-region',diy) ;
		let ES5region = settingToArray('EncounterSet5-portrait-clip-region',diy) ;
		switch( selector ){
		case 0 : break ;
		case 1 : case 3 : case 5 :
			ESregion[0] = Number(ESregion[0])+Number($Adapter-corrector ) ;
			ES1region[0] = Number(ES1region[0])+Number($Adapter-corrector ) ;
			ES2region[0] = Number(ES2region[0])+Number($Adapter-corrector ) ;
			ES3region[0] = Number(ES3region[0])+Number($Adapter-corrector ) ;
			ES4region[0] = Number(ES4region[0])+Number($Adapter-corrector ) ;
			ES5region[0] = Number(ES5region[0])+Number($Adapter-corrector ) ;
		case 2: case 4: case 6: 
			ESregion = new Region([Number(ESregion[0]),Number(ESregion[1]),Number(ESregion[2]),Number(ESregion[3])] ) ;
			ES1region = new Region([Number(ES1region[0]),Number(ES1region[1]),Number(ES1region[2]),Number(ES1region[3])] ) ;
			ES2region = new Region([Number(ES2region[0]),Number(ES2region[1]),Number(ES2region[2]),Number(ES2region[3])] ) ;
			ES3region = new Region([Number(ES3region[0]),Number(ES3region[1]),Number(ES3region[2]),Number(ES3region[3])] ) ;
			ES4region = new Region([Number(ES4region[0]),Number(ES4region[1]),Number(ES4region[2]),Number(ES4region[3])] ) ;
			ES5region = new Region([Number(ES5region[0]),Number(ES5region[1]),Number(ES5region[2]),Number(ES5region[3])] ) ;
		}
		
		if( diy.settings.get('EncounterSet','Empty') != 'Empty' ) sheet.paintImage( g , getIcon( 'EncounterSet' , diy ) , ESregion ) ;
		if( diy.settings.get('EncounterSet1','Empty') != 'Empty' ) sheet.paintImage( g , getIcon( 'EncounterSet1' , diy ) , ES1region ) ;
		if( diy.settings.get('EncounterSet2','Empty') != 'Empty' ) sheet.paintImage( g , getIcon( 'EncounterSet2' , diy ) , ES2region ) ;
		if( diy.settings.get('EncounterSet3','Empty') != 'Empty' ) sheet.paintImage( g , getIcon( 'EncounterSet3' , diy ) , ES3region ) ;
		if( diy.settings.get('EncounterSet4','Empty') != 'Empty' ) sheet.paintImage( g , getIcon( 'EncounterSet4' , diy ) , ES4region ) ;
		if( diy.settings.get('EncounterSet5','Empty') != 'Empty' ) sheet.paintImage( g , getIcon( 'EncounterSet5' , diy ) , ES5region ) ;

//		switch( Number( adapterSelector ) ){
//		case 6:
//			paintIcon('EncounterSet' , diy , g , sheet ) ;
//			paintIcon('EncounterSet1' , diy , g , sheet ) ;
//			paintIcon('EncounterSet2' , diy , g , sheet ) ;
//			paintIcon('EncounterSet3' , diy , g , sheet ) ;
//			paintIcon('EncounterSet4' , diy , g , sheet ) ;
//			paintIcon('EncounterSet5' , diy , g , sheet ) ;
//			break ;
//		case 5: 
//			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSetM1' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSetM2' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet2' ) , diy.settings.getRegion( 'EncounterSetM3' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet3' ) , diy.settings.getRegion( 'EncounterSetM4' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet4' ) , diy.settings.getRegion( 'EncounterSetM5' ) ) ;
//			break ;
//		case 4: 
//			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSet1-portrait-clip-region' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSet2-portrait-clip-region' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet2' ) , diy.settings.getRegion( 'EncounterSet3-portrait-clip-region' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet3' ) , diy.settings.getRegion( 'EncounterSet4-portrait-clip-region' ) ) ;
//			break ;
//		case 3: 
//			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSetM2' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSetM3' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet2' ) , diy.settings.getRegion( 'EncounterSetM4' ) ) ;
//			break ;
//		case 2:
//			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSet2-portrait-clip-region' ) ) ;
//			sheet.paintImage( g , getIcon( 'EncounterSet1' ) , diy.settings.getRegion( 'EncounterSet3-portrait-clip-region' ) ) ;
//			break ;
//		case 1: 
//			sheet.paintImage( g , getIcon( 'EncounterSet' ) , diy.settings.getRegion( 'EncounterSetM3' ) ) ;
//			break ;
//		default:
//			break ;
//		}
	}

// TEXTS
	if( $TemplateLayout != 'Plain' ){
		writeTextOutlined( $Name , Name_writer , diy.settings.getRegion( 'Name' ) , getStroke( 'Name' , diy ) , diy , g , sheet ) ;
	}
	
	writeParagraph( [ 'Story' , 'Rules' , 'Flavour' ] , Body_writer , diy.settings.getRegion( $TemplateLayout+'-Body' , diy.settings.getRegion( 'Body' ) ) , diy , g ) ;

	writeLine( diy.settings.get( 'Copyright-format' , '' )+$Copyright , Bottom_writer , diy.settings.getRegion( 'Copyright' ) , g ) ;
	writeLine( diy.settings.get( '$CollectionInfo' , '' )+$CollectionInfo , Bottom_writer , diy.settings.getRegion( 'CollectionInfo' ) , g ) ;
	writePage( diy , g , sheet ) ;
	
	paintCut( diy , g , sheet ) ;
}

function paintBack( g , diy , sheet ){ debug(1,'\npaintBack') ;
// TEMPLATE
	sheet.paintTemplateImage( g ) ;
// PORTRAIT
	switch( $PortraitBackLayout ){
	case 'Small':
		paintPortrait( 'PortraitBack' , diy , g , sheet ) ;
		sheet.paintImage( g , 'PortraitBack-Overlay-small' , 'Template' ) ;
		break;
	case 'Medium':
		paintPortrait( 'PortraitBack' , diy , g , sheet ) ;
		sheet.paintImage( g , 'PortraitBack-Overlay' , 'Template' ) ;
		break;
	default: 
		break;
	}
// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;
// TEXT
	writeParagraph(  
		[ 'StoryBack' , 'RulesBack' , 'FlavourBack' ] , Body_writer ,
		diy.settings.getRegion($PortraitBackLayout+'-BodyBack') , diy , g
	) ;

	writeLine( diy.settings.get( '$CollectionInfo' , '' )+$CollectionInfo , Bottom_writer , diy.settings.getRegion( 'CollectionInfo' ) , g ) ;
	if( $PortraitBackLayout != 'None' ){
		writeLine( formatArtist( 'ArtistBack' , diy ) , Bottom_writer , diy.settings.getRegion( 'ArtistBack' ) , g ) ;
	}else{
		writeLine( diy.settings.get( 'Copyright-format' , '' )+$Copyright , Bottom_writer , diy.settings.getRegion( 'Copyright' ) , g ) ;
	}
	writePageBack( diy , g , sheet ) ;
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
