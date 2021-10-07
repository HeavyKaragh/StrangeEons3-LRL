/* COMPONENT CONFIGURATION */
const Card = 'DividerDeck' ;
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
	createPortrait('Set',diy) ;
	$PortraitListCount = getPortraitCount() ;
}

function createInterface(diy,editor,sheet){ debug(1,'\ncreateInterface') ;
	let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls') ;

	var bindings = new Bindings(editor,diy) ;
	let list ;
	
// MAIN TAB
	let Main_tab = new TypeGrid() ;
	Main_tab.editorTabScrolling = true ;
	
	// TITLE PANEL
	let Title_panel = new TypeGrid() ;
	Title_panel.setTitle(@LRL-Title) ;
	let Name_control = uiNameParagraph(diy,bindings,BOTH) ; 
	Title_panel.place(Name_control,'hfill') ;
	Main_tab.place(Title_panel,'hfill') ;

	// ENCOUNTER SET PANEL
	let Set_panel = new TypeGrid() ;
	Set_panel.setTitle(@LRL-Set) ;
	let Set_control = new uiSetList(bindings,BOTH) ;
	let SetPortrait_control = new uiPortrait('Set',diy) ;
	Set_panel.place(
		Set_control,'hfill' ,
		SetPortrait_control,'br hfill'
	) ;
	Main_tab.place(Set_panel,'br hfill') ;

	Main_tab.addToEditor(editor,@LRL-Main) ;

// TEMPLATE TAB
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;
	
	// TEMPLATE PANEL
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle(@LRL-Template) ;

	list = new Array('Standard','Nightmare') ;
	if(advancedControls) list = list.concat( new Array('Collection','Custom')) ;
	let Template_control = new uiListIcon('Template',list,bindings,BOTH) ;
	Template_panel.place(Template_control,'hfill') ;
	if(advancedControls){
		CustomTint_control = new uiTint('Custom',bindings) ;
		CustomTint_control.title = @LRL-TemplateTint-uiTint ;
		CustomOutsideTint_control = new uiTint('Custom-outside',bindings) ;
		CustomOutsideTint_control.title = @LRL-TemplateTextTint-uiTint ;
		Template_panel.place(
			CustomTint_control,'br hfill'
			, CustomOutsideTint_control,'br hfill'
		) ;
	}
	Template_tab.place(Template_panel,'hfill') ;
	
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle(@LRL-Cutting) ;
	list = new Array('CutNo','Cut','CutBig') ;
	let ShowCut_control = new uiGroupr('ShowCut',list,bindings,BOTH );
	Cutting_panel.place(ShowCut_control,'hfill') ;
	if(advancedControls){
		let ShowBleeding_control = new uiButtonText('ShowBleeding',diy,bindings,BOTH) ;
		Cutting_panel.place(ShowBleeding_control ,'') ;
	}
	Template_tab.place(Cutting_panel,'br hfill') ;
	
	Template_tab.addToEditor(editor,@LRL-Template) ;
	
// PORTRAIT TAB
	let Portrait_tab = new TypeGrid() ;
	Portrait_tab.editorTabScrolling = true ;
	
	// PORTRAIT PANEL
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle(@LRL-Portrait) ;
	let Artist_control = new uiTextLabeled('Artist',bindings,BOTH) ;
	let Portrait_control = new uiPortrait('Portrait',diy) ;
	let PortraitMirror_control = new uiPortraitMirror('Portrait',Portrait_control) ;
	Portrait_panel.place(
		Artist_control,'hfill' 
		, Portrait_control,'br hfill' 
		, PortraitMirror_control,'br hfill' 
	) ;
	Portrait_tab.place(Portrait_panel,'hfill') ;
	
	Portrait_tab.addToEditor(editor,@LRL-Portrait) ;
	
// COLLECTION TAB
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
	// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle(@LRL-Collection) ;
	//let CollectionInfo_control = new uiTextLabeled('CollectionInfo',bindings,BOTH) ;
	let Collection_control = new uiCollectionList(bindings,BOTH) ;
	let CollectionPortrait_control = new uiPortrait('Collection',diy) ;
	Collection_panel.place(
		Collection_control,'hfill' 
		//, CollectionInfo_control,'hfill' 
		, CollectionPortrait_control,'br hfill'
	) ;
	Collection_tab.place(Collection_panel,'hfill') ;

	Collection_tab.addToEditor(editor,@LRL-Collection) ;

	bindings.bind() ;
}

function createFrontPainter(diy,sheet){ debug(1,'\ncreateFrontPainter') ;

// TEMPLATE
	Custom_tinter = new createTinter('Custom',diy) ;
	CustomOutside_tinter = new createTinter('Custom-outside',diy) ;

// STATS

// TEXT
	Name_writer = new createTextBox('Name',diy,sheet) ;
	Bottom_writer = new createTextBox('Bottom',diy,sheet) ;

	updateExternalPortrait('Portrait',diy) ;
	updateExternalPortrait('Collection',diy) ;
	updateExternalPortrait('Set',diy) ;
}

function createBackPainter(diy,sheet){ debug(1,'\ncreateBackPainter') ; }

function paintCommon(diy,g,sheet){ debug(2,'\npaintCommon') ;
	debug(5,'Side: '+sheet.getSheetIndex()) ;

	function paintIconDecoratedThis(key,diy,g,sheet){ debug(3,'\n\tpaintIconDecoratedThis: '+key) ;
	/*
	Paints $icon on the component template adding an image as background.
	*/
		debug(5,'\tSide: '+sheet.getSheetIndex()) ;
		
		let side = '' ;
		if(sheet.getSheetIndex()==BACK) side = '-back' ; 
		// when drawing back side, get correct settings
	
		let decoration = diy.settings.get(key+'-decoration','');
		if(decoration!=''){ 
			debug(5,'\tDecoration: '+decoration) ;
			decoration = diy.settings.getImageResource(key+'-decoration') ;
		}else throw new Error('\tERROR: '+key+'-decoration: UNDEFINED') ;
		
		let decorationRegion = diy.settings.get(key+'-decoration'+side+'-region','');
		if(decorationRegion!=''){ 
			debug(5,'\tRegion: '+decorationRegion) ;
			decorationRegion = diy.settings.getRegion(key+'-decoration'+side+'-region') ;
		}else throw new Error('\tERROR: '+key+'-decoration'+side+'-region: UNDEFINED') ;
	
		sheet.paintImage(g,decoration,decorationRegion) ;
		//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
	
		let item = diy.settings.get(key) ;
		switch( String(item) ){
		case null : throw new Error('\tERROR: '+key+': UNDEFINED') ;
		case 'Empty' : break ;
		case 'Custom' :
			//PortraitList[portraitIndexOf(key)].paint(g,sheet.getRenderTarget()) ;
			sheet.paintImage(g,PortraitList[portraitIndexOf(key)].getImage(),key+'-portrait-clip'+side+'-region') ;
			break ;
		default :
			sheet.paintImage(g,ImageUtils.get(PathIcon+item+'.png'),key+'-portrait-clip'+side+'-region') ;
		}
	}
	
// PORTRAIT
	paintPortrait('Portrait',diy,g,sheet) ;
	
// TEMPLATE
	if( ($Template=='Custom') || ($Template=='Collection') ){
		let tint ; let tintOut ;
		if( ($Template=='Custom') || ($Collection=='Empty') || ($Collection=='Custom') ){
			tint = diy.settings.getTint('Custom') ;
			tintOut = diy.settings.getTint('Custom-outside') ;
		}else{
			tint = diy.settings.getTint($Collection) ;
			tintOut = diy.settings.getTint($Collection+'-outside') ;
		}
		Custom_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		CustomOutside_tinter.setFactors(tintOut[0],tintOut[1],tintOut[2]) ;
		sheet.paintImage(g,Custom_tinter.getTintedImage(),'Template-region') ;
		sheet.paintImage(g,CustomOutside_tinter.getTintedImage(),'Template-region') ;
	}
	paintTemplate(diy,g,sheet) ;

	// ICONS
	paintIconDecoratedThis('Set',diy,g,sheet) ;
	paintIconDecoratedThis('Collection',diy,g,sheet) ;
	
	// TEXT
	writeTextShadowed('Name',Name_writer,diy,g,sheet) ;

	writeArtist(diy,g,sheet) ;
	
	// CUT
	if(diy.settings.getBoolean('ShowBleeding') ){
		debug(4,'\tShowBleeding') ;
		sheet.paintImage(g,'Template-bleeding','Template-region') ;
	}
	if($ShowCut!='CutNo'){
		debug(4,'\tShowCut') ;
		if($ShowCut=='Cut') sheet.paintImage(g,'Template-cut','Template-region') ;
		if($ShowCut=='CutBig') sheet.paintImage(g,'Template-cutBig','Template-region') ;
	}
}

function paintFront(g,diy,sheet){ debug(1,'\npaintFront') ;
	paintCommon(diy,g,sheet) ;
}

function paintBack(g,diy,sheet){ debug(1,'\npaintBack') ;
	paintCommon(diy,g,sheet) ;
}

if(sourcefile=='Quickscript'){
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings') ;
	Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings') ;

	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js') ;
	Eons.namedObjects.LRL = new gameObject() ;
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/library.js') ;
	GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface') ;
	InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons') ;	

	testDIYScript('LRL') ;
}else{
	useLibrary('res://TheLordOfTheRingsLCG/library.js') ;
}
