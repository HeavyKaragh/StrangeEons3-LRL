// Used on libraries to get correct card images, settings, ...
const Card = 'Ally' ; 

// This script's code version
const CardVersion = 1 ;
// 1: rewrite using new 2021 library

/*
All the plugin code revolves around the concept of the component "settings"
explained in the Strange Eons developer manual. "Settings" (defined in the
code by the $ simbol) store everything the user can define in a component,
like it's title, stats or portraits.
I've created a library that creates user interface controls, drawing methods
and other stuff based on the "setting" name. Basically, three functions are
needed for each editable part on a component: one for user interface control
(it's text or a image?), one for the painter (if it's text, which font
and size?) and another that actually paints it (where and when? to
avoid overlapping other stuff and/or to use a special graphical effect).
For example, card "Type" setting, ($Type), is defined in the user interface
by Type_control, in the createFrontPainter by Type_writer and in the
paintFront by writeLine( 'Type' ).
*/

function create( diy ){ debug(1,'\ncreate') ;
/*
"create" is one of the main functions on scripted components. It's 
called on "New" component creation. It defines the basic 
characteristics of the component, like what plugin it relies on, 
how many sides it has, basic template, portraits, example values... 
*/

/*
Next portion of code defines the plugin the component uses and the 
version of the code. $VersionHistory is used for debugging purposes,
keeping track of the plugin versions used to edit the component.
*/
	diy.extensionName = 'TheLordOfTheRingsLCG.seext' ;
	diy.version = LibraryVersion+CardVersion ;
	$VersionHistory = diy.version ;
	
/*
Next portion of code loads $settings used by the component, specifically, 
regions where images and texts are drawn.
In previous versions of the plugin, these where loaded into the plugin scope.
I modified it to make it easier for the users to customize settings and to
avoid problems with aspect change from loading into newer plugin versions.
*/
	// custom functions, to load default settings and texts for the card
	loadSettings( diy ) ;
	loadExample( diy ) ; 
	loadPreferences( diy ) ; 

	// Next portion of code defines the template of the component. 
	diy.faceStyle = FaceStyle.PLAIN_BACK ;
	// FaceStyle.PLAIN_BACK defines that a simple image is used for the
	// back of the component: it won't change regardless of user action.
	//diy.faceStyle = FaceStyle.TWO_FACES ; // This should be used for variable back
	diy.frontTemplateKey = 'Template' ;
	// frontTemplateKey defines the setting used for the main frontal
	// image of the component. It is not mandatory to draw this image,
	// and the main purpose is to get the correct component size. In this
	// plugin, whenever a variable template is required for the same type
	// of component, the required template variant is painted.
	diy.backTemplateKey = 'TemplateBack' ;
	// backTemplateKey defines the setting used for the back
	// image of the component. Because we are using PLAIN_BACK, it 
	// will be painted always.
	diy.bleedMargin = 9 ;
	// bleedMargin defines the overdrawn template size, that is, the size
	// of the template that will be cut to get a properly sized component.
	// It is done to minimize the impact of cutting errors.
	
	// Next portion of code defines the user defined images of the component. 
	diy.customPortraitHandling = true ;
	// I use the custom portrait system because portraits are used in other
	// component elements, like collection icon or some graphics for custom
	// template variant.
	createPortrait( 'Portrait' , diy ) ;
	createPortrait( 'Collection' , diy ) ;
	createPortrait( 'Sphere' , diy ) ;
	createPortrait( 'BodyIcon' , diy ) ;
	// These are custom functions to create the portrait elements.
	// portraits are the only graphical element that is stored in the
	// component file. Thus, they are handled in a special way. They have to
	// be identified when the component is created so they can be stored and
	// and put back in their place on component file reading.
	
	$PortraitListCount = getPortraitCount() ;
	// This is used by customPortraitHandling and must be kept
	// I store it in a setting for backwards compatibility use
}

function createInterface( diy , editor , sheet ){ debug(1,'\ncreateInterface') ;
/*
"createInterface" is one of the main functions on scripted components.
It's called only when a component is going to be edited. It fills 
Strange Eons editor tabs with user controls, allowing component editing.
I create a tab on the component editor for different groups of controls. 
So, we will have containers containing the containers of controls. 
The Main_tab contains the main controls, like card title, stats and effect 
text. The Tamplate_tab includes the Sphere selection and other graphical 
stuff. The Portrait_tab is used only for Main and secondary portrait related 
controls, like the portrait image selector and manipulators and artist naming. 
The Collection_tab includes collection icon, number and optional information, 
along with other controls that may be useful but rarely used, like copyright 
information or card type. The Help_tab is a way of giving to the user help on 
editing without accesing external sources. Also, some game specific 
information is included, like officialy used traits or keywords.
*/

	let advancedControls = diy.settings.getBoolean( 'LRL-AdvancedControls' ) ;
	if( $Template == 'Custom' ) advancedControls = true ;
/*
Advanced controls are optional, providing editing controls that most users 
won't use. Things like Custom spheres or weird graphical elements or stats. 
Because Custom template requires these controls, it will override the user 
setting if it used in the card.
LRL-AdvancedControls value is irrelevant on component drawing: to export a 
component that uses these features through the Strange Eons project explorer 
is not necessary to set the value to true.
*/

	var bindings = new Bindings( editor , diy ) ;
/* 
"Bindings" is the system that initializes user interface control 
values into the settings loaded from a saved component or from plugin 
defaults. It will store them into the component settings too. Each 
control creator includes a method bindings.add linking it to a $setting. 
Also note the method bindings.bind at the end of CreateInterface.
*/
	
// MAIN TAB
/*
This tab includes the component title, and all the stats and effects.
A few important things (for example, sphere), aren't included here,
but all text is in this tab. First, user interface controls are
defined, then grouped by relationship, and finally they are actually
placed in the Strange Eons user interface tab. 
*/
	let Main_tab = new TypeGrid() ;
	// Now we define the tab that will be added to the user interface.
	// Then will add to it the control containers.
	
	Main_tab.editorTabScrolling = true ; 
	// Shows a vertical scrolling control in the tab, if needed

// TITLE PANEL
/*
User interface controls are grouped. In this case, a panel is used to 
group together the Name control and Unique button.
*/
	let Title_panel = new TypeGrid() ;
	// User interface can be seen as a text document were controls are placed
	// one after another. Here, I define a container grid where elements will 
	// be placed using some placement control through html like keys. This 
	// container will be placed later in the tab. I will include only the 
	// controls related to the title of the card.

	Title_panel.setTitle( @LRL-panel-Title ) ;
	// This will add a label to the container
	// "@LRL-panel-Title" passes a text localized depending on the Strange Eons
	// "User interface language" defined in the Preferences.
	
	let Name_control = uiNameUnique( diy , bindings , [FRONT] ) ;
	// custom function to define the card title text control. It's linked to
	// diy.nameField that is used in the placement

	Title_panel.place( Name_control , 'hfill' ) ;
	// "place" is the method that places controls in the container (or in 
	// the user interface tab, as it's used later). For each user interface
	// control (or container), it's placement options are defined.
	// "Name_control" control will be drawn, and its placements
	// options are defined were the '' is. In this case, the "hfill" option
	// is used to make the control as wide as possible in the row. This is 
	// very useful for text controls.
		
	Main_tab.place( Title_panel , 'hfill' ) ; // adds the panel to the tab

// STATS PANEL
/*
Another control group for the component numerical controls.
*/
	let Stats_panel = new TypeGrid() ;
	Stats_panel.setTitle( @LRL-panel-Stats ) ;
	
	let ResourceCost_control = new uiStatIcon( 'ResourceCost' , bindings , [FRONT] , 9 , ['X','-'] ) ;
	let Willpower_control = new uiStatIcon( 'Willpower' , bindings , [FRONT] , 9 , ['X','-'] ) ;
	let Attack_control = new uiStatIcon( 'Attack' , bindings , [FRONT] , 9 , ['X','-'] ) ;
	let Defense_control = new uiStatIcon( 'Defense' , bindings , [FRONT] , 9 , ['X','-'] ) ;
	let HitPoints_control = new uiStatIcon( 'HitPoints' , bindings , [FRONT] , 19 , ['X','-'] ) ;
	// custom funtions to define stats. In this case, stats could include
	// non-numerical options, like - and X, so the control is a list.
	// each stat is preceded by an icon for identification
	
	Stats_panel.place(
		ResourceCost_control , '' 
		, Willpower_control , '' 
		, Attack_control , '' 
		, Defense_control , '' 
		, HitPoints_control , ''
	) ;
	Main_tab.place( Stats_panel , 'br hfill' ) ;
	
// MAIN PANEL
/*
The text that defines the card effect and the flavour text is grouped here.
I've added different controls for the different elements (Trait, Effect
and Flavour). They will be written in the card together, as a single text
block, but this way the user can forget about formating the text block
apropiately. 
*/
	let Effect_panel = new TypeGrid() ;
	Effect_panel.setTitle( @LRL-panel-Effect ) ;
	
	let Trait_control = new uiParagraphLabeled( 'Trait' , bindings , [FRONT] , 'line' ) ;
	let Rules_control = new uiParagraphLabeled( 'Rules' , bindings , [ FRONT ] , 'big' ) ;
	let Flavour_control = new uiParagraphLabeled( 'Flavour' , bindings , [ FRONT ] , 'medium' ) ;
	// custom functions to define text controls that may span several lines.
	// Trait only needs one line, but this way looks better in the interface
	
	Effect_panel.place(
		Trait_control , 'hfill'
		, Rules_control , 'br hfill'
		, Flavour_control , 'br hfill'
	) ;
	Main_tab.place( Effect_panel , 'br hfill' ) ;
	
// ADVANCED PANEL
/*
Here I include optional controls for stuff that may not be added to the
card. Specifically, the text blocks for Victory points is added here.
*/
	let OtherEffect_panel = new TypeGrid() ;
	OtherEffect_panel.setTitle( @LRL-panel-OtherEffect ) ;
	
	let OptionLeft_control = new uiText( 'OptionLeft' , bindings , [ FRONT ] ) ;
	let OptionRight_control = new uiText( 'OptionRight' , bindings , [ FRONT ] ) ;
	
	OtherEffect_panel.place(
		@LRL-OptionLeft , '' , OptionLeft_control , 'tab hfill'
		, @LRL-OptionRight , 'br' , OptionRight_control , 'tab hfill'
		// "@LRL-OptionLeft" writes a text localized depending on the
		// Strange Eons "User interface language" defined in the Preferences.
		// "tab"ulator is used to align controls, for a better look.
		// "hfill" makes the control as wide as possible in the row.
		// "br" is used to get put the elment on the next row.
	) ;
	Main_tab.place( OtherEffect_panel , 'br hfill' ) ;
	
	Main_tab.addToEditor( editor , @LRL-tab-Main ) ;
	// Now everything is actually drawn in the editor, and the tab name defined.
	
// TEMPLATE TAB
/*
This tab is used for template related options, like the sphere (colour)
the component belongs to. It also includes controls for the creation of
custom spheres, that is, unofficial spheres.
*/
	let Template_tab = new TypeGrid() ;
	Template_tab.editorTabScrolling = true ;

// TEMPLATE PANEL
/*
This will add the template selector, that means the sphere for player cards.
*/
	let Template_panel = new TypeGrid() ;
	Template_panel.setTitle( @LRL-panel-Template ) ;
	
	let templateList = new Array( 'Neutral' , 'Leadership' , 'Lore' , 'Spirit' , 'Tactics' ) ;
	// "templateList" includes all the template variants
	if( advancedControls ) templateList = templateList.concat( new Array( 'Baggins' , 'Fellowship' , 'Mastery' , 'Custom' ) ) ;
	// "templateList" may be extended with unusual templates
	let Template_control = new uiIconList( 'Template' , templateList , bindings , [ FRONT ] ) ;
	// custom function that shows a selectable icon plus text list control.  
	
	Template_panel.place( Template_control , 'hfill' ) ;
	Template_tab.place( Template_panel , 'hfill' ) ;
	
// CUSTOM SPHERE PANEL
/*
Users can create their own customized spheres through the use of colorizable
graphical elements and adding their own graphics for the sphere icon. This
panel includes all the controls related to it.
*/
	if( advancedControls ){
		let CustomSphere_panel = new TypeGrid() ;
		CustomSphere_panel.setTitle( @LRL-panel-CustomSphere ) ;
		
		let CustomTint_control = new uiTint( 'Custom' , bindings, [ FRONT ] ) ;
		// custom function that shows a tinter control. It shows a colour
		// selector and a list of predefined colours.
		
		let SpherePortrait_control = new uiPortrait( 'Sphere' , diy ) ;
		let BodyIconPortrait_control = new uiPortrait( 'BodyIcon' , diy ) ;
		// custom functions that shows a portrait control used to add own
		// graphics easily.
		
		let BodyIconTransparency_control = new uiTransparency( 'BodyIcon' , bindings , [ FRONT ] ) ;
		// custom function that shows a horizontal slider control
		// to select the transparency of "BodyIcon".
		
		// In this placement text descriptions of the controls aren't added
		// because the descriptions are included in the control creator.
		CustomSphere_panel.place(
			CustomTint_control , 'hfill'
			, SpherePortrait_control ,'br hfill' 
			, BodyIconPortrait_control , 'br hfill' 
			, BodyIconTransparency_control , 'br hfill'
		) ;
		Template_tab.place( CustomSphere_panel , 'br hfill' ) ;
	}
	
/*
Custom functions to show how the card will look after the cut.
ShowBleeding is specially interesting during plugin development, to check 
that component's template show all important stuff inside the safe space.
*/
	// CUTTING PANEL
	let Cutting_panel = new TypeGrid() ;
	Cutting_panel.setTitle( @LRL-panel-Cutting ) ;
	let ShowCut_control = new uiButtonText( 'ShowCut' , diy , bindings , [ FRONT ] ) ;
	Cutting_panel.place( ShowCut_control , 'hfill' ) ;
	if( advancedControls ){
		let ShowBleeding_control = new uiButtonText( 'ShowBleeding' , diy , bindings , [ FRONT ] ) ;
		Cutting_panel.place( ShowBleeding_control ,'' ) ;
	}
	Template_tab.place( Cutting_panel , 'br hfill' ) ;
	
	Template_tab.addToEditor( editor , @LRL-tab-Template ) ;
	
// PORTRAIT TAB
/*
This tab is used only for the main portrait of the component and the
"Artist" control related to it. When other components have several
portraits, like the Quest card, they are added here too.
*/
	let Portrait_tab = new TypeGrid() ;
	Portrait_tab.editorTabScrolling = true ;
	
// PORTRAIT PANEL	
	let Portrait_panel = new TypeGrid() ;
	Portrait_panel.setTitle( @LRL-panel-Portrait ) ;
	
	let Artist_control = new uiText( 'Artist' , bindings , [ FRONT ] ) ;
	let Portrait_control = new uiPortrait( 'Portrait' , diy ) ;
	let PortraitMirror_control = new uiPortraitMirror( 'Portrait' , Portrait_control ) ;
	// Custom function to add a button to mirror a portrait image horizontally
	
	Portrait_panel.place(
		@LRL-Artist , '' , Artist_control , 'hfill' 
		, Portrait_control , 'br hfill' 
		, PortraitMirror_control , 'br hfill' 
	) ;
	Portrait_tab.place( Portrait_panel , 'hfill' ) ;
	
	Portrait_tab.addToEditor( editor , @LRL-tab-Portrait ) ;
	
// COLLECTION TAB
/*
This tab is used for the collection icon and information, and also for other
less likely to be used controls. For example, controls to change "Type" and
"Copyright" texts are included here.
*/
	let Collection_tab = new TypeGrid() ; 
	Collection_tab.editorTabScrolling = true ;
	
// COLLECTION PANEL
	let Collection_panel = new TypeGrid() ;
	Collection_panel.setTitle( @LRL-panel-Collection ) ;
	
	let CollectionNumber_control = new uiSpinner( 'CollectionNumber' , bindings , [ FRONT ] , 999 ) ;
	// Custom control to change the collection number
	let CollectionInfo_control = new uiText( 'CollectionInfo' , bindings , [ FRONT ] ) ;
	// This adds a small text field to the component, next to the collection
	// icon. It's not present on the official components, and is included
	// to provide some information about the custom release and easily
	// tell them apart from other custom releases or official products.
	// It can include the designer name or nick, a word referencing the
	// release or release collection.
	let Collection_control = new uiCollectionList( bindings , [FRONT] ) ;
	// Custom control that builds a icon+text list including all the
	// Collection icons. There's a similar function for Encounter Sets.
	let CollectionPortrait_control = new uiPortrait( 'Collection' , diy ) ;
	
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
	
	let Copyright_control = new uiText( 'Copyright' , bindings , [ FRONT ] ) ;
	
	Copyright_panel.place( Copyright_control , 'hfill' ) ;
	Collection_tab.place( Copyright_panel , 'br hfill' ) ;

// OTHER PANEL
/*
A few extra controls may be included to, for example, change default
texts, like the card type. Useful to create cards in languages not
supported by the plugin.
*/
	if( advancedControls ){
		let Other_panel = new TypeGrid() ;
		Other_panel.setTitle( @LRL-panel-Other ) ;
		
		let Type_control = new uiText( 'Type' , bindings , [ FRONT ] ) ;
		
		Other_panel.place( @LRL-Type , '' , Type_control , 'hfill' ) ;
		Collection_tab.place( Other_panel , 'br hfill' ) ;
	}

	Collection_tab.addToEditor( editor , @LRL-tab-Collection ) ;

	// This method links each control to it's respective setting as defined
	// in the creator of each control. Must be included always and at the end 
	// of the function.
	bindings.bind() ; 
}

function createFrontPainter( diy , sheet ){ debug(1,'\ncreateFrontPainter') ;
/*
"createFrontPainter" is one of the main functions on scripted 
components. It's called only once when a component is going to be 
drawn by the Strange Eons preview or exported to a file. Several 
editable stuff that depends on user controls or graphical effects 
must be defined before actually drawing the component. Further 
drawings will take less time once these elements are defined. Thus, 
text boxes' font format or tintable graphics are prepared beforehand. 
Only stuff used in the front side is defined. There is a "sister" 
function for the back side of the component too: createBackPainter. 
Note that all these "painters" are created as global elements (not 
defined as var or const) so they can be accesed in paintFront.
*/
	
// TEXT
	// Writers define, for a given text element, the basic font properties 
	// (family, size, alignment, colour...) pretty much all it's properties
	// except the region definition (that is, the position and size within the
	// component). The text itself along with the text position is passed to
	// these writers right before writing the text.
	// When these properties change, creating a new writes is the most
	// convenient solution. This may result in creating a writer for each text
	// element, but they can also be shared. For example, there are 2 Option
	// text elements (OptionLeft and OptionRight), but text properties are
	// exactly the same, and only the region changes. Bottom_writter is used
	// for each text element within the bottom line (CollectionInfo, Artist,
	// Copyright and CollectionNumber). The only difference in those elements
	// is the horizontal alignment, so an alignment tag is added to the text
	// through setting-format.
	Name_writer = new createTextBox( 'Name' , diy , sheet ) ;
	Body_writer = new createTextBox( 'Body' , diy , sheet ) ;
	Option_writer = new createTextBox( 'Option' , diy , sheet ) ;
	Type_writer = new createTextBox( 'Type' , diy , sheet ) ;
	Bottom_writer = new createTextBox( 'Bottom' , diy , sheet ) ;

// STATS
	// Tinters are Strange Eons functions that paint a image with a given
	// colour. Several stats are tinted with a fixed colour, and only image
	// used (that is, the number) changes.
	ResourceCost_tinter = new createTinter( 'ResourceCost' , diy ) ;
	HitPoints_tinter = new createTinter( 'HitPoints' , diy ) ;

	
// TEMPLATE
	// The control values from the Custom_panel and a image will be passed 
	// to these tinters to create the required images.
	CustomBody_tinter = new createTinter( 'Custom-Body' , diy ) ;
	CustomBodyIcon_tinter = new createTinter( '' , diy ) ;
	CustomColour_tinter = new createTinter( 'Custom-Colour' , diy ) ;

// PORTRAIT
	// These functions provide a way of updating the user defined
	// images without opening the component in the editor. Its usefull
	// for creating or updating components through external scripts or
	// through the plugin preferences.
	updateExternalPortrait( 'Portrait' , diy ) ;
	updateExternalPortrait( 'Collection' , diy ) ;
	updateExternalPortrait( 'Sphere' , diy ) ;
	updateExternalPortrait( 'BodyIcon' , diy ) ;
}

//function createBackPainter( diy, sheet ){ debug(1,'\ncreateBackPainter') ;
/*
"createBackPainter" is one of the main functions on scripted components.
This is functionally identical to createFrontPainter, but is used for 
the back side of the component.
In cards using PLAIN_BACK (when cardback is a simple image, defined on
component creation), it's not needed. It's here just for reference.
*/
//}

function paintFront( g , diy , sheet ){ debug(1,'\npaintFront') ;
/*
"paintFront" is one of the main functions on scripted components. It's 
called whenever a component is actually going to be drawn by Strange 
Eons preview or exported to a file. There is a "sister" function for 
the back side of the component too: paintBack. 
*/
// PORTRAIT
	// This function simply paints the image defined in the corresponding
	// user interface control in rhe specified region
	paintPortrait( 'Portrait' , diy , g , sheet ) ;

// TEMPLATE
	if( $Template == 'Custom' ) paintCustomBody( diy , g , sheet ) ; // colorized text box
	paintTemplate( diy , g , sheet ) ; // this will draw the selected $Template
	//sheet.paintTemplateImage( g ) ; // in some cards, where template cannot be modified,
	// this is used, and it will draw the image defined in diy.frontTemplateKey
	if( $Template == 'Custom' ) paintCustomColour( diy , g , sheet ) ; // colorized "pearls"
	
// ICONS
	// Icons may be painted from two different sources: a predefined list
	// or from the image added to a specific user interface control. Which
	// one to use is stored in $Collection.
	paintIcon( 'Collection' , diy , g , sheet ) ;
	// This icon's only source is the user interface control.
	if( $Template == 'Custom' ) paintPortrait( 'Sphere' , diy , g , sheet ) ;

// STATS
	// These functions define how to paint a stat. These look for the
	// value of $Attack, pick a image from the resources contained in 
	// TheLordOfTheRings-B.seext and paints it $Attack-region.
	paintStat( 'Willpower' , diy , g , sheet ) ;
	paintStat( 'Attack' , diy , g , sheet ) ;
	paintStat( 'Defense' , diy , g , sheet ) ;
	// When tinted, a tintable image (colored, different from the plain black
	// images used in other stats) containing the number determined by
	// $HitPoints is passed to the tinter, which will return it in the colour
	// defined in $HitPoints-tint, and then painted in $HitPoints-region.
	paintStatTinted( 'ResourceCost' , ResourceCost_tinter , diy , g , sheet ) ;
	paintStatTinted( 'HitPoints' , HitPoints_tinter , diy , g , sheet ) ;
	
// TEXTS
	// These functions put the text in the writers defined in
	// createFrontPainter and paint the text in the defined region.
	// Many use custom functions instead of a generic one because
	// they require some specific formating. For example, to add the
	// unique symbol to card Name or use predefined localized texts
	// for the card type.
	// Most texts are defined using several settings, for example:
	// $Name : contains the text to display
	// $Name-region : contains the placement of the text
	// $Name-format : is optional, and provides a way of formating
	//			the text through html tags without including them
	//			in the user interface field.
	writeName( diy , g ) ;
	// The text region containing the card effect contains distinctly
	// formated texts. Each text uses it's own user interface control,
	// saving the user the trouble to add formatting stuff.
	// All these texts are written in a single block, all at once. Each
	// part uses it's own formats to add italics or whatever it needs,
	// and are separated with line breaks.
	// For example, in this Body block, all these settings are joined:
	// $Trait-format : adds italics, bold and centering through html tags
	// $Trait : contains the the text from the user interface
	// $Trait-formatEnd : removes the whatever is added in -format
	// $Body-break : contains a jump in line with bigger distance
	// $Rules-format : The text formatting options used in the writer 
	//			are based on Rules text, so nothing is needed here. 
	// $Rules
	// $Rules-formatEnd
	// $Body-break
	// $Flavour-format: adds a size change, italics and right alignment
	// $Flavour
	// $Flavour-formatEnd
	// Also, note that Encounter cards' $Shadow-format adds the image
	// of the ShadowSeparator.
	writeBody( [ 'Trait' , 'Rules' , 'Flavour' ] , diy , g ) ;

	writeType( diy , g ) ;
	writeOptionLeft( diy , g , sheet ) ;
	writeOptionRight( diy , g , sheet ) ;
	
	writeArtist( diy , g , sheet ) ;
	writeCopyright( diy , g , sheet ) ;
	writeCollectionInfo( diy , g , sheet ) ;
	writeCollectionNumber( diy , g , sheet ) ;

	// This shows the cut or bleed margin over the template, to show
	// the user how it would look.
	paintCut( diy , g , sheet ) ;
}

//function paintBack( g, diy, sheet ){ debug(1,'\npaintBack') ;
/*
"paintBack" is one of the main functions on scripted components. This 
is functionally identical to paintFront, but is used for the back side
of the component.
In cards using PLAIN_BACK (when cardback is a simple image, defined on
component creation), it's not needed. It's here just for reference.
*/
//	sheet.paintTemplateImage( g ) ;
//	paintCut( diy , g , sheet ) ;
//}

if( sourcefile == 'Quickscript' ){
/*
"Quickscript" code is used to load the settings, texts and libraries
used while running the script in the editor pressing F5.
*/
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