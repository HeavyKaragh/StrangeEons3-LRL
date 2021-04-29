// Strange Eons 3 plug-in initialization script
// The Lord of the Rings: The Card Game

// libraries
useLibrary( 'imageutils') ;
useLibrary( 'markup' ) ;
useLibrary( 'extension' ) ;
useLibrary( 'ui' ) ;

var GameLanguage = Language.getGame() ;
var InterfaceLanguage = Language.getInterface() ;

function getVersion(){ return 2.0 ; }

function getName(){ return @LRL ; }

function getDescription(){ return @LRL-description ; }

function initialize(){
/*
This function is run on plugin loading.
It's main purpose is to setup the main plugin into Strange Eons, so it is
recognized as a singular game. This allows defining a settings scope to look
for default values, so components will use those values when they are not
specified in the component.settings file.
It will also load the custom fonts and several lists (EncounterSet and 
Collection), along with the context bar buttons to include in text controls.
Also, it will to load default values for user defined settings and set up 
plugin preferences menu, and load the localized text strings used in the plugin
interface and components according to Strange Eons preferences (when interface 
and game .properties files' localized versions are available). 
*/
	importPackage( arkham.dialog.prefs ) ;
	importClass( arkham.diy.ListItem ) ;
	
	// variables and constants used in game registering  preferences
	// Here I set the path to resources within the project that are shared among components
	const PathUi = 'TheLordOfTheRingsLCG/ui/' ;
	const PathIcon = 'TheLordOfTheRingsLCG/icon/' ;
	const PathText = 'TheLordOfTheRingsLCG/text/' ;
	const PathImage = 'TheLordOfTheRingsLCG/image/' ;
	const IconSize = 24 ; // Icon size in preferences
	const ShortText = 10 ; // Text control size in preferences
	const MediumText = 20 ; // Text control size in preferences
	const LongText = 30 ; // Text control size in preferences

	function registerContextBarButton( name ){
	/*
	This function adds to the context bar of user interface text controls all the
	custom tags used in the plug\u00edn. These context bar buttons must be enabled in the
	preferences.
	*/
		importClass( arkham.ContextBar ) ;
		
		let button = {
			buttonIcon : ImageUtils.createIcon( ImageUtils.get(PathUi+name+'.png') , IconSize , IconSize ) ,
			getID : function getID(){ return 'LRL'+name ; } ,
			getName : function getName(){ return name ; } ,
			getIcon : function getIcon(){ return this.buttonIcon ; } ,
			isVisibleInCurrentContext :
				function isVisibleInCurrentContext( context ){
					return context.isMarkupTarget() 
						&& ( context.gameComponent != null ) 
						&& ( context.getGame() == #LRL-TheLordOfTheRingsLCG ) ;
				} ,
		    isEnabledInCurrentContext : function isEnabledInCurrentContext( context ){ return true ; } ,
		    actionPerformed : function actionPerformed( actionEvent ){ 
		    		try{
	//var mt = Eons.markupTarget ;
	//mt.selectNone() ;
	//mt.selectedText = "<"+Game.get('LRL').masterSettings.get(name+'-tag')+">" ;
		           		Eons.markupTarget.selectNone() ;
		           		Eons.markupTarget.selectedText = "<"+Game.get('LRL').masterSettings.get(name+'-tag')+">" ;
	    	    	}catch( ex ){ Error.handleUncaught( ex ) ; } 
	    	    }
		} ;
		
		button = new JavaAdapter( ContextBar.Button , button ) ;
		ContextBar.registerButton( button ) ;
	}
	
	// first, add user interface text to avoid errors during plugin loading
	InterfaceLanguage.addStrings( PathText+'interface' ) ;
	InterfaceLanguage.addStrings( PathText+'icons' ) ;
	GameLanguage.addStrings( PathText+'game' ) ;
	
	// create plugin/game environment (identity within Strange Eons, settings scope, ...) 
	const GAME = Game.register(
		'LRL' , 'LRL-TheLordOfTheRingsLCG' ,
		ImageUtils.get( PathUi+'TheLordOfTheRingsLCG.png' )
//'LRL',@LRL-TheLordOfTheRingsLCG,#LRL-TheLordOfTheRingsLCG,ImageUtils.get(PathUi+'TheLordOfTheRingsLCG.png'),null
	) ;
	GAME.masterSettings.addSettingsFrom( 'TheLordOfTheRingsLCG/LRL.settings' ) ;
	GAME.masterSettings.addSettingsFrom( 'TheLordOfTheRingsLCG/LRL-I.settings' ) ;
	if( $LRL-uiIconSize == null ) $LRL-uiIconSize = 24 ;
	if( $LRL-IllustratorUnknown == null ) $LRL-IllustratorUnknown = '' ;
	if( $LRL-IllustratorShort == null ) $LRL-IllustratorShort =  '' ;

	Eons.namedObjects.LRL = new gameObject();
	for( let index in Eons.namedObjects.LRL.TagList	){
//a\u00f1adir registro de error
		registerContextBarButton( Eons.namedObjects.LRL.TagList[index] ) ;
	}

/* Preferences dialog */
	importClass( ca.cgjennings.apps.arkham.dialog.prefs.FillInPreferenceCategory ) ;
	importClass( javax.swing.JTextField );
	
	var pc = new FillInPreferenceCategory( @LRL-preferences-shortTitle , PathUi+'TheLordOfTheRingsLCG-big.png' ) ;

	pc.heading( @LRL-TheLordOfTheRingsLCG ) ; 
	pc.join() ;
	pc.addHelp( @LRL-preferences-guideLink , @LRL-preferences-guide , false ) ;

	if( $LRL-AdvancedControls == null ) $LRL-AdvancedControls = false ;
	pc.addCheckBox( 'LRL-AdvancedControls' , @LRL-preferences-AdvancedControls , false ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-AdvancedControls ) ;
	
	if( $LRL-debug == null ) $LRL-debug = 5 ;
	pc.label( @LRL-preferences-debug ) ;
	pc.join() ; 
	pc.addDropDown( 'LRL-debug'
		, [ @LRL-preferences-debug-0 , @LRL-preferences-debug-1 , @LRL-preferences-debug-2 , @LRL-preferences-debug-3 , @LRL-preferences-debug-4 , @LRL-preferences-debug-5 ] // interface labels
		, [ 0 , 1 , 2 , 3 , 4 , 5 ] // actual setting values
	) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-debug ) ;

	pc.subheading( @LRL-preferences-default ) ;
	
	if( $LRL-PreferencesUpdate == null ) $LRL-PreferencesUpdate = false ; 
	pc.addCheckBox( 'LRL-PreferencesUpdate' , @LRL-preferences-PreferencesUpdate , false ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-PreferencesUpdate ) ;
	
	if( $LRL-CollectionInfo == null ) $LRL-CollectionInfo = '' ; 
	pc.addField( 'LRL-CollectionInfo' , @LRL-preferences-CollectionInfo , ShortText ) ;
	pc.join(); 
	pc.addTip( @LRL-tip-CollectionInfo ) ;

	if( $LRL-Copyright == null ) $LRL-Copyright = '' ; 
	pc.addField( 'LRL-Copyright' , @LRL-preferences-Copyright , MediumText ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-Copyright ) ;

	if( $LRL-Collection == null ) $LRL-Collection = 'KeepValue' ; 
	pc.label( @LRL-preferences-Collection ) ;
	pc.join() ; 
	let values = new Array( 'KeepValue' ).concat( Eons.namedObjects.LRL.DefaultIconList ) ;
	values = values.concat( Eons.namedObjects.LRL.CollectionList ) ;
	let labels = new Array();
	for( index in values ){ labels[index] = @('LRL-'+values[index]) ; }
	pc.addDropDown( 'LRL-Collection' , labels , values ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-Collection ) ;
	
	if( $LRL-Collection-portrait-template == null ) $LRL-Collection-portrait-template = '' ; 
	pc.indent() ; 
	pc.addField( 'LRL-Collection-portrait-template' , @LRL-preferences-pathToIcon , LongText ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-CollectionPath ) ;
//	pc.join() ; 
//	pc.addButton(
//		@LRL-preferences-pathToIcon ,
//		function addToList( actionEvent ) {
//			var filename = ResourceKit.showImageFileDialog( null ) ;
//// no guarda en shared.settings
//// guarda en Global (plug-in default)
//			if (filename != null) $LRL-Collection-portrait-template = filename ;
//		} 
//	);	
	pc.unindent() ; 

	if( $LRL-EncounterSet == null ) $LRL-EncounterSet = 'KeepValue' ; 
	pc.label( @LRL-preferences-EncounterSet ) ;
	pc.join() ; 
	values = new Array( 'KeepValue' ).concat( Eons.namedObjects.LRL.DefaultIconList ) ;
	values = values.concat( Eons.namedObjects.LRL.EncounterSetList ) ;
	labels = new Array() ;
	for( index in values ){ labels[index] = @('LRL-'+values[index]) ; }
	pc.addDropDown( 'LRL-EncounterSet' , labels , values ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-EncounterSet ) ;
	
	if( $LRL-EncounterSet-portrait-template == null ) $LRL-EncounterSet-portrait-template = '' ; 
	pc.indent() ; 
	pc.addField( 'LRL-EncounterSet-portrait-template' , @LRL-preferences-pathToIcon , LongText ) ;
	pc.join() ; 
	pc.addTip( @LRL-tip-EncounterSetPath ) ;
//	pc.join() ; 
//	pc.addButton(
//		@LRL-preferences-pathToIcon ,
//		function action(){//addToList( actionEvent ) {
//			var filename = ResourceKit.showImageFileDialog( null ) ;
//			if (filename != null){ $LRL-EncounterSetUser = filename  }
//		} 
//	);	
	pc.unindent() ; 


	
		
			
					
//	pc.subheading( @LRL-textAlignment ) ;
//	pc.join() ;	
//	pc.addTip( @LRL-tip-textAlignment ) ;
//	
//	if( $LRL-Rules-alignment == null ) $LRL-Rules-alignment = '<left>' ;
//	pc.label( @LRL-Effect ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Rules-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//	
//	if( $LRL-Shadow-alignment == null ) $LRL-Shadow-alignment = '<center>' ;
//	pc.label( @LRL-Shadow ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Shadow-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//	
//	if( $LRL-Flavour-alignment == null ) $LRL-Flavour-alignment = '<right>' ;
//	pc.label( @LRL-Flavour ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Flavour-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//		
//	if( $LRL-Story-alignment == null ) $LRL-Story-alignment = '<left>' ; 
//	pc.label( @LRL-Story ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Story-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//	
//	pc.subheading( @LRL-textJustified ) ;
//	pc.join(); 
//	pc.addTip( @LRL-textJustified-tip ) ;
//	
//	if( $LRL-Enemy-justified == null ) $LRL-Enemy-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Enemy-justified' , @LRL-Enemy , false ) ;
//	
//	if( $LRL-Location-justified == null ) $LRL-Location-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Location-justified' , @LRL-Location , false ) ;
//	
//	if( $LRL-Objective-justified == null ) $LRL-Objective-justified = 'no' ;
//	pc.addCheckBox( 'LRL-Objective-justified' , @LRL-Objective , false ) ;
//	
//	if( $LRL-ObjectiveAlly-justified == null ) $LRL-ObjectiveAlly-justified = 'no' ;
//	pc.addCheckBox( 'LRL-ObjectiveAlly-justified' , @LRL-ObjectiveAlly , false ) ;
//	
//	if( $LRL-SideQuestEncounter-justified == null ) $LRL-SideQuestEncounter-justified = 'yes' ;
//	pc.addCheckBox( 'LRL-SideQuestEncounter-justified' , @LRL-SideQuestEncounter , false ) ;
//	
//	if( $LRL-Treachery-justified == null ) $LRL-Treachery-justified = 'no' ;
//	pc.addCheckBox( 'LRL-Treachery-justified' , @LRL-Treachery , false ) ;
//	
//	if( $LRL-Quest-justified == null ) $LRL-Quest-justified = 'yes' ;
//	pc.addCheckBox( 'LRL-Quest-justified' , @LRL-Quest , false ) ;
//	
//	if( $LRL-Campaign-justified == null ) $LRL-Campaign-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Campaign-justified' , @LRL-Campaign , false ) ;
//	
//	if( $LRL-Preparation-justified == null ) $LRL-Preparation-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Preparation-justified' , @LRL-Preparation , false ) ;
//
//	if( $LRL-Hero-justified == null ) $LRL-Hero-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Hero-justified' , @LRL-Hero , false ) ;
//	
//	if( $LRL-Ally-justified == null ) $LRL-Ally-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Ally-justified' , @LRL-Ally , false ) ;
//	
//	if( $LRL-Attachment-justified == null ) $LRL-Attachment-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Attachment-justified' , @LRL-Attachment , false ) ;
//	
//	if( $LRL-Event-justified == null ) $LRL-Event-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Event-justified' , @LRL-Event , false ) ;
//	
//	if( $LRL-Treasure-justified == null ) $LRL-Treasure-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Treasure-justified' , @LRL-Treasure , false ) ;
//	
//	if( $LRL-Gift-justified == null ) $LRL-Gift-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Gift-justified' , @LRL-Gift , false ) ;
//	
//	if( $LRL-SideQuestPlayer-justified == null ) $LRL-SideQuestPlayer-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-SideQuestPlayer-justified' , @LRL-SideQuestPlayer , false ) ;
//	
//	if( $LRL-QuestSheet-justified == null ) $LRL-QuestSheet-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-QuestSheet-justified' , @LRL-QuestSheet , false ) ;
//	
//	if( $LRL-RulesCard-justified == null ) $LRL-RulesCard-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-RulesCard-justified' , @LRL-RulesCard , false ) ;
//	
//	if( $LRL-Presentation-justified == null ) $LRL-Presentation-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-Presentation-justified' , @LRL-Presentation , false ) ;
//	
//	if( $LRL-Scenario-justified == null ) $LRL-Scenario-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-Scenario-justified' , @LRL-Scenario , false ) ;
//	
//	if( $LRL-Set-justified == null ) $LRL-Set-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-Set-justified' , @LRL-Set , false ) ;
//
////	if( $LRL-Draft == null ) $LRL-Draft = 'yes' ;
////	pc.addCheckBox('LRL-Draft',@LRL-Draft,false);
////	pc.join();
////	pc.addTip( @LRL-preferences-tip-draft );
//	
//	pc.subheading( @LRL-byComponent ) ;
//	
//	if( $LRL-Hero-Promo-outOfBox == null ) $LRL-Hero-Promo-outOfBox = 'yes' ; 
//	pc.addCheckBox( 'LRL-HeroPromo-outOfBox' , @LRL-HeroPromo-outOfBox , false ) ;
//
//	
//	pc.subheading( @LRL-localization ) ;
//	
//	pc.label( @LRL-locale ) ;
//	pc.join() ; 
//	if( $LRL-locale-toLoad == null ) $LRL-locale-toLoad = 'last' ; 
//	pc.addDropDown( 
//		'LRL-locale-toLoad' , 
//		[ @LRL-LastValues , @LRL-CurrentLocale , @LRL-SpecifiedLocale ] , 
//		[ 'last' , 'current' , 'specified' ]
//	) ;
//	pc.join() ; 
//	pc.addField( 'LRL-locale' , '' , 6 ) ;
//	pc.join() ; 
//	pc.addTip( @LRL-locale-tip ) ;
//	
////	pc.subheading( @LRL-preferences-subheading-debug ) ;
////	pc.addCheckBox( 'LRL-debug' , @LRL-preferences-debug , false ) ;
////	pc.join() ; 
////	pc.addTip( @LRL-preferences-tip-debug ) ;
//	
//	pc.addCheckBox( 'LRL-dontDelete' , @LRL-preferences-dontDelete , false ) ;
//	pc.join() ; 
//	pc.addTip( @LRL-dontDelete-tip ) ;
	
	Preferences.registerCategory( pc ) ;
}

function gameObject(){// GAME ){
	// "GameVariationList" includes the template variation list for 
	// strong game adaptations.
	this.GameVariationList = new Array( 
		'TheLordOfTheRingsLCG'// , // all the official and unoffical templates
		//'GUNNM' // new futuristic templates
	) ;

	// "DefaultIconList" defines the minimum item list for Collection
	// and EncounterSet lists
	this.DefaultIconList = new Array(
		'Custom' , // used to include icons through a Portrait_panel
		'Empty' , // used to not draw the icon
		'StrangeEons' // used to show the Strange Eons feather icon
	) ;
	
	this.ProductGroupList = new Array() ;
	this.ProductGroupList =  String(Game.get('LRL').masterSettings.get('TheLordOfTheRingsLCG-ProductGroup-list')).split(',') ;
	debug( 3 , 'ProductGroupList: '+this.ProductGroupList ) ;

	importClass( arkham.diy.ListItem ) ;
	function uiIcon( name ){ debug(3,'\n\tuiIcon: '+name) ;
		const PathUi = 'TheLordOfTheRingsLCG/ui/' ;
		const PathIcon = 'TheLordOfTheRingsLCG/icon/' ;
		const IconSize = 24 ; // Icon size in preferences
		let icon ;
		let image = ImageUtils.get( PathUi+name+'.png' , false , true )
		if( image == null ){
			image = ImageUtils.get( PathIcon+name+'.png' , false , true ) ;
			if( image == null ){
				image = ImageUtils.get( PathUi+'TheLordOfTheRingsLCG.png' , false , true ) ;
			}
		}
		icon = ImageUtils.createIcon( image , IconSize , IconSize ) ;
		return icon ;
	}
	
	this.CollectionList = new Array() ;
	this.CollectionCombo = new Array() ;
	for( index in this.ProductGroupList ){
		let productGroup = this.ProductGroupList[ index ] ;
		this.CollectionList = this.CollectionList.concat( 
			String(Game.get('LRL').masterSettings.get(productGroup+'-Collection-list')).split(',') 
		) ;
		list = this.DefaultIconList.concat(this.CollectionList) ;
		for( index in list ){
			let item = list[ index ] ;
			this.CollectionCombo[ index ] = ListItem( item , @('LRL-'+item) , uiIcon( item ) ) ;
		}
	}
	debug( 3 , 'CollectionList: '+this.CollectionList ) ;

	this.EncounterSetList = new Array() ;
	this.EncounterSetCombo = new Array() ;
	for( index in this.CollectionList ){
		let item = this.CollectionList[index] ;
		this.EncounterSetList = this.EncounterSetList.concat( 
			String(Game.get('LRL').masterSettings.get(item+'-EncounterSet-list')).split(',') 
		) ;
		list = this.DefaultIconList.concat(this.EncounterSetList) ;
		for( index in list ){
			let item = list[ index ] ;
			this.EncounterSetCombo[ index ] = ListItem( item , @('LRL-'+item) , uiIcon( item ) ) ;
		}
	}
	debug( 3 , 'EncounterSetList: '+this.EncounterSetList ) ;
	
	this.OptionSpecialList = new Array(
		'Empty'
		, 'Sailing'
		, 'EyeOfSauron'
		, 'EyeOfSauron2'
		, 'EyeOfSauron3'
		, 'EyeOfSauron4'
		, 'Person'	
	) ;
	debug( 3 , 'OptionSpecialList: '+this.OptionSpecialList ) ;
	
	this.SphereList = new String(Game.get('LRL').masterSettings.get('TheLordOfTheRingsLCG-Sphere-list')).split(',') ;
	debug( 3 , 'SphereList: '+this.SphereList ) ;
	
	this.FullIconList = new Array() ;
	for( index in this.CollectionList ){
		let collection = this.CollectionList[ index ] ;
		
		this.FullIconList = this.FullIconList.concat( collection ) ;
		
		encounterSetListForCurrentCollection = String(Game.get('LRL').masterSettings.get(collection+'-EncounterSet-list')).split(',') ;

		for( index1 in encounterSetListForCurrentCollection ){
			let encounterSet = encounterSetListForCurrentCollection[ index1 ] ;
			this.FullIconList = this.FullIconList.concat( encounterSet ) ;
		}
	}
	this.FullIconList = this.FullIconList.concat( this.SphereList ) ;
	
	debug( 3 , 'FullIconList: '+this.FullIconList ) ;
	
	// Register fonts to be used in the plugin
	useLibrary( 'fontutils' ) ;
	var pathLRLfont = 'TheLordOfTheRingsLCG/font/LRLfont.ttf' ;
	var pathLRLsymbols = 'TheLordOfTheRingsLCG/font/LRLsymbols.ttf' ;
	var pathLRLwindlass = 'TheLordOfTheRingsLCG/font/LRLwindlass.ttf' ;
	this.BodyFont = ResourceKit.getBodyFamily() ;
	this.LRLfont = FontUtils.registerFontFamilyFromResources.apply( this , [pathLRLfont] ) ;
	this.LRLsymbols = FontUtils.registerFontFamilyFromResources.apply( this , [pathLRLsymbols] ) ;
	this.LRLwindlass = FontUtils.registerFontFamilyFromResources.apply( this , [pathLRLwindlass] ) ;

//	this.DumbFont = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/Dumbledor.ttf']);
//	this.UnicodeFont = registerFont( 'Sun-ExtA.ttf' );

	// "StyleList" defines the tags for text styles used in boxes 
	this.StyleList = new Array(
		'LRLfont' ,
		'LRLsymbols' ,
		'LRLtitle' ,
		'Trait' ,
		'Section'
	) ;
		
	// "TagList" contains the available tags for text paragraphs
	// it's used to add the elements to the context bar too
	this.TagList = new Array(
		'Attack' ,
		'Defense' ,
		'Willpower' ,
		'Threat' ,
		'Unique' ,
		'Shadow' ,
		'VerticalSpacer' ,
		'HorizontalSpacer' ,
		'List' ,
		'Leadership' ,
		'Lore' ,
		'Spirit' ,
		'Tactics' ,
		'Baggins' ,
		'Fellowship' ,
		'Mastery' ,
		'HeadingOnCourse' ,
		'HeadingOffCourse' ,
		'HeadingBad' ,
		'HeadingWorst' ,
		'Sailing' ,
		'EyeOfSauron' ,
		'Person' ,
		'PerPlayer'
	) ;
	
	// "LocalizableList" contains the text elements used in any 
	// component it's used both for clearing a component and for
	// the in-component translations
	this.LocalizableList = new Array(
		'Adventure' ,
		'Artist' ,
		'ArtistBack' ,
		'CollectionInfo' ,
		'Condition' ,
		'ConditionBack' ,
		'Copyright' ,
		'Cycle' ,
		'Flavour' ,
		'FlavourBack' ,
		'FlavourLeft' ,
		'FlavourRight' ,
		'GameName' ,
		'Name' ,
		'NameBack' ,
		'OptionLeft' ,
		'OptionRight' ,
		'Rules' ,
		'RulesBack' ,
		'RulesLeft' ,
		'RulesRight' ,
		'Shadow' ,
		'Story' ,
		'StoryBack' ,
		'StoryLeft' ,
		'StoryRight' ,
		'Subtype' ,
		'Trait' ,
		'Type'
	) ;
}

