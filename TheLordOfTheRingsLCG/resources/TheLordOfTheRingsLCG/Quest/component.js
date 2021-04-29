const Card = 'Quest';
// cambiar StageLetter a imagen? y a\u00f1adir selector de letra
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
	createPortrait( 'PortraitBack' , diy ) ;
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
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle( @LRL-panel-Title ) ;
	let Name_control = uiName( diy , bindings , [FRONT,BACK] ) ;
	let Adventure_control = new uiText( 'Adventure' , bindings , [FRONT,BACK] ) ;
	let Stage_control = new uiSpinner( 'Stage' , bindings, [FRONT,BACK] , 9 ) ;
	Title_panel.place(
		Name_control , 'hfill'
		, @LRL-Adventure , 'br' , Adventure_control , 'hfill'
		, @LRL-Stage, '' , Stage_control , ''
	) ;
	if( advancedControls ){
		list = new Array( 
			'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' 
			, 'k' , 'l' , 'm' , 'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' 
			, 'u' , 'v' , 'w' , 'x' , 'y' , 'z'
		) ;
		let Side_control = new uiTextList( 'Side' , bindings , [FRONT] , list ) ;
		Title_panel.place( @LRL-Side , '' , Side_control , '' ) ;
	}
	Main_tab.place( Title_panel , 'hfill' ) ;
	
	// EFFECT PANEL
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	let Story_control = new uiParagraphLabeled( 'Story' , bindings , [FRONT] , 'medium' ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [FRONT] , 'big' ) ;
	let Condition_control = new uiParagraphLabeled( 'Condition' , bindings , [FRONT] , 'small' ) ;
	Effect_panel.place(
		Story_control , 'hfill'
		, Rules_control , 'br hfill'
		, Condition_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
	// OTHER PANEL
	let OtherEffect_panel = new TypeGrid() ;
	OtherEffect_panel.setTitle( @LRL-panel-OtherEffect ) ;
	let OptionRight_control = new uiText( 'OptionRight' , bindings , [FRONT] ) ;
	OtherEffect_panel.place( @LRL-OptionRight , 'br' , OptionRight_control , 'tab hfill' ) ;
	Main_tab.place( OtherEffect_panel , 'br hfill' ) ;

	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	
// MAIN BACK TAB
	let MainBack_tab = new TypeGrid() ;
	MainBack_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let TitleBack_panel = new TypeGrid() ;
	TitleBack_panel.setTitle( @LRL-panel-Title ) ;
	let NameBack_control = new uiText( 'NameBack' , bindings , [BACK] ) ;
	TitleBack_panel.place( NameBack_control , 'hfill' ) ;
	if( advancedControls ){
		let AdventureBack_control = new uiText( 'AdventureBack' , bindings , [BACK] ) ;
		let StageBack_control = new uiSpinner( 'StageBack' , bindings, [BACK] , 9 ) ;
		list = new Array( 
			'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' 
			, 'k' , 'l' , 'm' , 'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' 
			, 'u' , 'v' , 'w' , 'x' , 'y' , 'z'
		) ;
		let SideBack_control = new uiTextList( 'SideBack' , bindings , [BACK] , list ) ;
		TitleBack_panel.place( 
			@LRL-Adventure , 'br' , AdventureBack_control , 'hfill'
			, @LRL-Stage , '' , StageBack_control , '' 
			, @LRL-Side , '' , SideBack_control , '' 
		) ;
	}
	MainBack_tab.place( TitleBack_panel , 'hfill' ) ;

	// STATS PANEL	
	let Stats_panel = new TypeGrid() ;
	Stats_panel.setTitle( @LRL-panel-Stats ) ;
	let Progress_control = new uiStat( 'Progress' , bindings , [BACK] , 19 , ['x','-'] ) ;
	Stats_panel.place( uiIcon( 'Progress' ) , '' , Progress_control , '' ) ;
	MainBack_tab.place( Stats_panel , 'br hfill' ) ;
	
	// EFFECT PANEL	
	let EffectBack_panel = new TypeGrid() ;
	EffectBack_panel.setTitle( @LRL-panel-Effect ) ;
	let StoryBack_control = new uiParagraphLabeled( 'StoryBack' , bindings , [BACK] , 'medium' ) ;
	let RulesBack_control = new uiParagraphLabeled( 'RulesBack' , bindings , [BACK] , 'big' ) ;
	let ConditionBack_control = new uiParagraphLabeled( 'ConditionBack' , bindings , [BACK] , 'small' ) ;
	EffectBack_panel.place(
		StoryBack_control , 'hfill'
		, RulesBack_control , 'br hfill'
		, ConditionBack_control , 'br hfill'
	) ;
	MainBack_tab.place( EffectBack_panel , 'br hfill' ) ;
	
	// OTHER PANEL
	let OtherEffectBack_panel = new TypeGrid() ;
	OtherEffectBack_panel.setTitle( @LRL-panel-OtherEffect ) ;
	let OptionRightBack_control = new uiText( 'OptionRightBack' , bindings , [BACK] ) ;
	OtherEffectBack_panel.place( @LRL-OptionRight , 'br' , OptionRightBack_control , 'tab hfill' ) ;
	MainBack_tab.place( OtherEffectBack_panel , 'br hfill' ) ;
	
	MainBack_tab.addToEditor( editor , @LRL-tab-MainBack ) ;
	
// ENCOUNTER SET TAB
	var EncounterSet_tab = new TypeGrid() ;
	EncounterSet_tab.editorTabScrolling = true ;
	
	
	// ENCOUNTER SET PANEL
	let EncounterSet_panel = new TypeGrid() ;
	EncounterSet_panel.setTitle( @LRL-panel-EncounterSet ) ;
	let EncounterSet_control = new uiEncounterSetList( 'EncounterSet' , bindings , [FRONT,BACK] ) ;
	EncounterSet_panel.place( EncounterSet_control , 'hfill' ) ;
	if( advancedControls ){
		list = new Array( 'Standard' , 'Gold' , 'Red' , 'Green' , 'Blue' , 'Purple' ) ;
		let Difficulty_control = new uiIconList( 'Difficulty' , list , bindings , [FRONT] ) ;
		EncounterSet_panel.place( @LRL-Difficulty, '' , Difficulty_control , 'hfill' ) ;
	}
	let EncounterSetPortrait_control = new uiPortrait( 'EncounterSet' , diy ) ;
	EncounterSet_panel.place( EncounterSetPortrait_control , 'br hfill' ) ;
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
		list = new Array( 'Standard' , 'Nightmare' ) ;
		let Template_control = new uiIconList( 'Template' , list , bindings , [FRONT,BACK] ) ;
		Template_panel.place( Template_control , 'hfill' ) ;
		Template_tab.place( Template_panel , 'hfill' ) ;
	}
	
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
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle( @LRL-panel-Portrait ) ;
	let Artist_control = new uiText( 'Artist' , bindings , [FRONT] ) ;
	let Portrait_control = new uiPortrait( 'Portrait' , diy ) ;
	let PortraitTint_control = new uiButtonText( 'PortraitTint' , diy , bindings , [FRONT,BACK] ) ;
	let PortraitShadow_control = new uiCycler( 'PortraitShadow' , [ 'None' , 'Black' , 'Custom' ] , bindings , [FRONT,BACK] ) ;
	let PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	Portrait_panel.place(
		@LRL-Artist , '' , Artist_control , 'hfill' 
		, Portrait_control , 'br hfill' 
		, PortraitTint_control , 'br'
		, @LRL-PortraitShadow , '' , PortraitShadow_control , '' 
		, PortraitMirror_control , 'hfill'
	) ;
	Portrait_tab.place( Portrait_panel , 'hfill' ) ;
	
	// PORTRAIT BACK PANEL
	let PortraitBack_panel = new TypeGrid() ;
	PortraitBack_panel.setTitle( @LRL-panel-PortraitBack ) ;
	let PortraitShare_control = new uiButtonText( 'PortraitShare' , diy , bindings , [BACK] ) ;
	let ArtistBack_control = new uiText( 'ArtistBack' , bindings , [BACK] ) ;
	let PortraitBack_control = new uiPortrait( 'PortraitBack' , diy ) ;
	let PortraitBackShadow_control = new uiCycler( 'PortraitBackShadow' , [ 'None' , 'Black' , 'Custom' ] , bindings , [FRONT,BACK]	);
	let PortraitBackMirror_control = new uiPortraitMirror( 'PortraitBack' , PortraitBack_control ) ;
	PortraitBack_panel.place(
		PortraitShare_control , '' 
		, @LRL-Artist , '' , ArtistBack_control , 'hfill' 
		, PortraitBack_control , 'br hfill' 
		, @LRL-PortraitShadow , 'br' , PortraitBackShadow_control , '' 
		, PortraitBackMirror_control , 'hfill'
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
	let CollectionNumberHide_control = new uiButtonText( 'CollectionNumberHide' , diy , bindings , [FRONT] ) ;
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [FRONT,BACK] ) ;
	let Collection_control = new uiCollectionList( bindings , [FRONT,BACK] ) ;
	let CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	Collection_panel.place(
		Collection_control , 'hfill' 
		, @LRL-Number , 'br' , CollectionNumber_control , '' , CollectionNumberHide_control , ''
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
//	if( advancedControls == true ){
//		let Other_panel = new TypeGrid() ;
//		Other_panel.setTitle( @LRL-panel-Other ) ;	
//		list = new Array( 
//			'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' 
//			, 'k' , 'l' , 'm' , 'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' 
//			, 'u' , 'v' , 'w' , 'x' , 'y' , 'z'
//		) ;
//
//		let StageLetter_control = new uiTextList( 'StageLetter' , bindings , [FRONT,BACK] , list ) ;
//		let StageLetterBack_control = new uiTextList( 'StageLetterBack' , bindings , [FRONT,BACK] , list) ;
//		let StageBack_control = new uiTextList( 'SideBack' , bindings , [FRONT,BACK] , list) ;
//		Other_panel.place(
//			@LRL-StageLetter , '' , StageLetter_control , 'tab hfill'
//			, @LRL-StageLetterBack , 'br' , StageLetterBack_control , 'tab hfill'
//		) ;
//		Collection_tab.place( Other_panel , 'br hfill' ) ;
//	}
	
	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'createFrontPainter') ;
// TEMPLATE
	Difficulty_tinter = new createTinter( 'Difficulty' , diy ) ;
	
	PortraitShadow_tinter = new createTinter( 'Portrait-shadow' , diy ) ;

// STATS
	Stage_tinter = new createTinter( 'Stage' , diy ) ;

// TEXT
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Adventure_writer = new createTextBox( 'Adventure' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;
	EncounterSetNumber_writer = new createTextBox( 'EncounterSetNumber' , diy , sheet ) ;
	
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
// STATS
	Progress_tinter = new createTinter( 'Progress' , diy ) ;

// TEXT
	updateExternalPortrait( 'PortraitBack' , diy ) ;
}

function paintFront( g , diy , sheet ){ debug(1,'\npaintFront') ;
	
// PORTRAIT
	if( diy.settings.getBoolean( 'PortraitTint' ) ){
		sheet.paintImage( g , ImageUtils.get(PathImage+'white1x1.png') , 'Template' ) ;
		index = portraitIndexOf( 'Portrait' ) ;
		let imageTinted = PortraitList[ index ].getImage() ;
		let imagePanX = PortraitList[ index ].getPanX() ;
		let imagePanY = PortraitList[ index ].getPanY() ;
		let imageRotation = PortraitList[ index ].getRotation() ;
		let imageScale = PortraitList[ index ].getScale() ;
		
		if( $Template == 'Nightmare' ) imageTinted = createRedishImage( imageTinted ) ;
		else imageTinted = createSepiaImage( imageTinted ) ;

		let region = settingToArray( 'Portrait-portrait-clip-region' , diy ) ;
		let AT = java.awt.geom.AffineTransform;	
		let transform =	AT.getTranslateInstance(
			Number(region[0])+(Number(region[2])/2)+imagePanX-((imageTinted.width*imageScale)/2),
			Number(region[1])+(Number(region[3])/2)+imagePanY-((imageTinted.height*imageScale)/2)
		);
		transform.concatenate(AT.getScaleInstance(imageScale,imageScale));
		transform.concatenate(AT.getRotateInstance(-imageRotation * Math.PI/180,imageTinted.width/2,imageTinted.height/2));
		g.drawImage( imageTinted , transform , null ) ;
	}else paintPortrait( 'Portrait' , diy , g , sheet ) ;

//	switch(String($PortraitShadow)){
//	case 'None' : break ;
//	case 'Black' :
//		sheet.paintImage( g , 'Portrait-shadow' , 'Template' ) ;
//		break ;
//	case 'PortraitTint' :
//		if( diy.settings.getBoolean('PortraitTint') ){
//			if( $Template == 'Nightmare' ) sheet.paintImage(g , createRedishImage( diy.settings.getImageResource( 'Portrait-shadow-tintable' ) ) , 'Template' ) ;
//			else sheet.paintImage( g , createSepiaImage( diy.settings.getImageResource( 'Portrait-shadow-tintable' ) ) , 'Template' ) ;
//		}else{ sheet.paintImage( g , 'Portrait-shadow' , 'Template' ) ; }
//		break ;
//	case 'Custom' :
//		hsb = diy.settings.getTint( 'Portrait-shadow' ) ;
//		PortraitShadow_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
//		sheet.paintImage( g , PortraitShadow_tinter.getTintedImage() , 'Template' ) ;
//		break ;
//	}
	
// TEMPLATE
	paintTemplate( diy , g , sheet ) ;
	let list = new Array( 'EncounterSet1' , 'EncounterSet2' , 'EncounterSet3' , 'EncounterSet4' , 'EncounterSet5' ) ;
	paintAdapter( list , diy , g , sheet ) ; 
//	let adapterSelector = 0;
//	for( let index=0 ; index<adapterList.length ; index++ ) if( $(adapterList[index]) != 'Empty' ) adapterSelector=index+1 ;
//	sheet.paintImage( g , ImageUtils.get( PathCard+$Template+'-Adapter-'+adapterSelector+'.jp2' ) , 'Template' ) ;
	if( $Template == 'Standard' ) paintDifficulty( diy , g , sheet ) ;

// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet1' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet2' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet3' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet4' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet5' , diy , g , sheet ) ;

// STATS
	Stage_tinter.setImage( ImageUtils.get( PathNumberTintable+$Stage+'a.png' ) ) ;
	sheet.paintImage( g , Stage_tinter.getTintedImage() , 'Stage' ) ;
	
// TEXTS
	writeName( diy , g ) ;
	writeAdventure( diy , g ) ;
	if ( $OptionRight != '' ){
		writeOptionRight( diy , g , sheet ) ;
		Body_writer.setPageShape( diy.settings.getCupShape( 'Option-Body-shape' ) ) ;
	}else{ Body_writer.setPageShape( PageShape.RECTANGLE_SHAPE ) ; }
	writeBody( [ 'Story' , 'Rules' , 'Condition' ] , diy , g ) ;

	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	if( diy.settings.getBoolean('CollectionNumberHide' ) ){
		writeTextOutlined( 
			diy.settings.get( 'CollectionNumber-format' , '' )+'---' , Bottom_writer , 
			diy.settings.getRegion( 'CollectionNumber' ) , getStroke( 'Bottom-stroke' , diy ) , 
			diy , g , sheet
		) ;
	}else writeCollectionNumber( diy , g , sheet ) ;
	
	paintCut( diy , g , sheet ) ;
}

function paintBack( g, diy, sheet ){ debug(1,'\npaintBack') ;
// PORTRAIT
	if( diy.settings.getBoolean( 'PortraitShare' ) ) paintPortrait( 'Portrait' , diy , g , sheet ) ;
	else paintPortrait( 'PortraitBack' , diy , g , sheet ) ;

	switch($PortraitBackShadow){
	case 'Black' :
		sheet.paintImage( g , 'Portrait-shadow' , 'Template' ) ;
		break ;
	case 'Custom' :
		hsb = diy.settings.getTint( 'Portrait-shadow' ) ;
		PortraitShadow_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( g , PortraitShadow_tinter.getTintedImage() , 'Template' ) ;
		break ;
	}

// TEMPLATE
	if( $Template == 'Nightmare' ) sheet.paintImage( g , 'Nightmare-template' , 'Template' ) ; 
	else sheet.paintTemplateImage( g ) ;

// ICONS
	paintIcon( 'Collection' , diy , g , sheet ) ;
	paintIcon( 'EncounterSet' , diy , g , sheet ) ;

// STATS
	Stage_tinter.setImage( ImageUtils.get( PathNumberTintable+$Stage+'b.png' ) ) ;
	sheet.paintImage( g , Stage_tinter.getTintedImage() , 'Stage' ) ;
	paintStatTinted( 'Progress' , Progress_tinter , diy , g , sheet ) ;
	
// TEXTS
	if( $NameBack == '' ) writeName( diy , g ) ;
	else writeLine( $NameBack , Name_writer , diy.settings.getRegion( 'Name' ) , g ) ;

	if( $AdventureBack == '' ) writeAdventure( diy , g ) ;
	else writeLine( $AdventureBack , Adventure_writer , diy.settings.getRegion( 'Adventure' ) , g ) ;
	
	if ( $OptionRightBack != '' ){
		writeLineDecorated(
			$OptionRightBack , Option_writer , diy.settings.getRegion( 'OptionRight' ) ,
			ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionRightDecoration' ) ,
			diy , g , sheet 
		) ;
		Body_writer.setPageShape( diy.settings.getCupShape( 'Option-Body-shape' ) ) ;
	}else{ Body_writer.setPageShape( PageShape.RECTANGLE_SHAPE ) ; }
	writeBody( [ 'StoryBack' , 'RulesBack' , 'ConditionBack' ] , diy , g ) ;

	if( diy.settings.getBoolean( 'PortraitShare' ) ) writeArtist( diy , g , sheet ) ;
	else{
		switch( $ArtistBack ){
		case 'no' : text = '' ; break ;
		case '' : 
			if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
			else text = #LRL-IllustratorUnknown ; 
			break ;
		default : 
			if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$ArtistBack ;
			else text = #LRL-IllustratorShort+' '+$ArtistBack ;
		}
		writeTextOutlined( 
			diy.settings.get( 'Artist-format' , '' )+text , Bottom_writer , 
			diy.settings.getRegion( 'Artist' ) , getStroke( 'Bottom-stroke' , diy ) , 
			diy , g , sheet
		) ;
	}
	
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
