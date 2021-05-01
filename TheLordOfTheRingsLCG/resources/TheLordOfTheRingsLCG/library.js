useLibrary('diy' ) ;
useLibrary('common' ) ;
useLibrary('ui' ) ;
useLibrary('markup' ) ;
useLibrary('fontutils' ) ;
useLibrary('imageutils' ) ;
useLibrary('tints' ) ;
importClass( arkham.component.DefaultPortrait ) ;
importClass( ca.cgjennings.graphics.ImageUtilities ) ;

/* VERSION CONTROL */
var LibraryVersion = 21 ;
//21: 2021 rewrite

/* CONSTANTS AND VARIABLES */
var GO = Eons.namedObjects.LRL ;
var ResourcesPath = 'TheLordOfTheRingsLCG/' ;
// "PathCard" is the path to the component specific files
// in the Strange Eons virtual file system.
var PathCard = ResourcesPath+Card+'/' ;
var PathText = ResourcesPath+'text/' ;
var PathUi = ResourcesPath+'ui/' ;
var PathIcon = ResourcesPath+'icon/' ;
var PathImage = ResourcesPath+'image/' ;
var PathNumber = ResourcesPath+'LRLnumber/' ;
var PathNumberTintable = ResourcesPath+'LRLnumberTintable/' ;

var GameLanguage = Language.getGame() ;
var InterfaceLanguage = Language.getInterface() ;
var PortraitList = [] ;
const FRONT = 0 ;
const BACK = 1 ;
const BOTH = [0,1] ;

function getStroke( key , diy ){ debug(3,'\n\tgetStroke: '+key) ;
	importClass( ca.cgjennings.graphics.filters.StrokeFilter ) ;
	let stroke = diy.settings.get( key+'-stroke','none' ) ;
	debug( 5 , '\tValue: '+stroke ) ;
	switch( String(stroke) ){
	case 'none' : 		return new StrokeFilter( new Colour( 0x00000000 , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ; break ; // transparent stroke
	case 'Strong' :		return new StrokeFilter( new Colour( 0xf00f0f0f , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'StrongThin' :	return new StrokeFilter( new Colour( 0xf00f0f0f , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'StrongWide' :	return new StrokeFilter( new Colour( 0xf00f0f0f , true ) , 3 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'Medium' :		return new StrokeFilter( new Colour( 0xb00f0f0f , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'MediumThin' :	return new StrokeFilter( new Colour( 0xb00f0f0f , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'MediumWide' :	return new StrokeFilter( new Colour( 0xb00f0f0f , true ) , 3 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'Light' :		return new StrokeFilter( new Colour( 0x800f0f0f , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'LightThin' :	return new StrokeFilter( new Colour( 0x800f0f0f , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'LightWide' :	return new StrokeFilter( new Colour( 0x800f0f0f , true ) , 3 , StrokeFilter.Position.OUTSIDE ) ; break ;
	case 'Custom' :
		return new StrokeFilter(
			diy.settings.getColour( key+'-stroke-colour' , new Colour( 0xffff0000 , true ) ) ,
			diy.settings.getFloat( key+'-stroke-width' , 2 ) ,
			StrokeFilter.Position.OUTSIDE
		) ;
		break ;
	default :
		throw new Error('\tERROR: Stroke: UNDEFINED') ;
		return new StrokeFilter( new Colour( 0x00000000 , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ; // transparent stroke
	}
}

function getPortraitImage( key ){ debug(3,'\n\tgetPortraitImage: '+key) ;
	return PortraitList[ portraitIndexOf( key ) ].getImage() ; 
}

var IconSize = $LRL-uiIconSize ;

/* DEBUGGING */
function debug( level , text ){ if( Number( $LRL-debug ) >= level ) println( text ) ; }

/* HELPER FUNCTIONS */
function isOdd( number ){ return Boolean( Number(number) & 1 ) ; } //obsoleto ???

function getLocale(){ debug(3,'\n\tgetLocale') ;
/*
Returns the main locale used by the component. This is used to support several
text translations in the same component.
*/
	let output = String( Language.getGameLocale() ) ;
	output = output.split('_' ) ;
	output = output[ 0 ] ;

	debug( 4 , 	'\tOutput: '+output ) ;
	return String( output ) ;
}

function setValueFromPreferences( key , diy ){ debug(3,'\n\tsetValueFromPreferences: '+key) ;
/*
Used to overwrite values on component creation or loading if 
$LRL-PreferencesUpdate option is enabled in user preferences.
Looks for $LRL-key value, if not available, keep $key value.
$key values are kept too if the $LRL-value is an empty string ('')
or 'KeepValue'.
*/
//importClass( ca.cgjennings.apps.arkham.AbstractStrangeEonsEditor ) ;

	debug(5,'\tLRL-PreferencesUpdate: '+$LRL-PreferencesUpdate) ;
	let output = '' ;
	if( diy.settings.getBoolean('LRL-PreferencesUpdate', false ) ){
		let value = diy.settings.get('LRL-'+key , '' ) ;
		if( ( value != '' ) // used to avoid overwriting texts
		&& ( value != 'KeepValue' ) // used to avoid overwriting lists 
		){
			diy.settings.set( key , value ) ;
			debug( 4 , '\tUpdated: '+value) ;
		}
	}
}

function getKeyForTemplate( key , diy ){ debug(3,'\n\tgetKeyForTemplate: '+key) ;
/*
Looks for the most specific setting name. It's used to get correct settings
depending on template variant selected.
Will look for and RETURN, if it exists, in this order:
	1- $Template-key
	2- key
	3- null
*/
	debug( 5 , '\tTemplate: '+$Template ) ;
	let output = null ;
	
	if( diy.settings.get( $Template+'-'+key ) != null ) output = $Template+'-'+key ;
	else if( diy.settings.get( key ) != null ) output = key ;

	debug( 4 , '\tOutput: '+output ) ;
	return String( output ) ;
}

function settingToArray( key , diy ){ debug(3,'\n\tsettingToArray: '+key) ;
/*
Convert a setting to an array.
*/
	let output = diy.settings.get( key ) ;
	if( output == null ) throw new Error('\tERROR: '+key+': UNDEFINED') ;
	else{
		output = String(output).split(',') ;
		debug( 4 , '\tOutput: '+output ) ;
	}
	return output ;
}

function createCombo( list ){ debug(3,'\n\tcreateCombo') ;
/*
Creates a combo suitable for a ui comboBox from a list.
It's used on components that use the same lists for several controls,
like EncounterSet, EncounterSet1, etc on Quest card.
*/
	importClass( arkham.diy.ListItem ) ;
	
	let output = new Array() ;
	
	debug( 5 , '\tList: '+list ) ;
	for( let index in list ){
		let item = list[ index ] ;
		debug( 5 , '\tItem: '+item ) ;
		output[ index ] = ListItem( item , @('LRL-'+item) , uiIcon( item ) ) ;
	}
	debug( 4 , '\tOutput: '+output ) ;
	return output ;
}

function uiIconCombo( key , combo , bindings , sides ){ debug(3,'\n\tuiIconCombo: '+key) ;
/*
Creates a user interface comboBox using a combo.
It's used on components that use the same lists for several controls,
like EncounterSet, EncounterSet1, etc on Quest card.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;

	let uiControl = new comboBox( combo , null ) ;

	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiIconList( key , list , bindings , sides ){ debug(3,'\n\tuiIconList: '+key) ;
/*
Creates a user interface comboBox using the icons in "list".
*/
	importClass( arkham.diy.ListItem ) ;
	if( sides == null ) sides = [ FRONT , BACK ] ;
	
	let combo = new Array() ;
	for( let index in list ){
		let item = list[ index ] ;
		combo[ index ] = ListItem( item , @('LRL-'+item) , uiIcon( item ) ) ;
	}

	let uiControl = new comboBox( combo , null ) ;

	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiTextList( key , bindings , sides , list ){ debug(3,'\n\tuiTextList: '+key) ;
/*
Creates a user interface list containing characters of "list".
list is binded to $key, and updates the component "sides".
*/
	importClass( arkham.diy.ListItem ) ;
	if( sides == null ) sides = [FRONT,BACK] ;
	if( list == null ) list = [] ;
	
	let combo = new Array() ;

	debug( 5 , '\tList: '+list ) ;
	for( let index in list ){
		let item = list[ index ] ;
		debug( 5 , '\tItem: '+item ) ;
		combo[ index ] = ListItem( item , String( item ) ) ;
	}

	let uiControl = new comboBox( combo , null ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiEncounterSetList( key , bindings , sides ){ debug(3,'\n\tuiEncounterSetList') ;
	if( sides == null ) sides = [FRONT,BACK] ;
	let uiControl = new comboBox( GO.EncounterSetCombo , null ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiCollectionList( bindings , sides ){ debug(3,'\n\tuiCollectionList') ;
	if( sides == null ) sides = [FRONT,BACK] ;
	let uiControl = new comboBox( GO.CollectionCombo , null ) ;
	bindings.add('Collection' , uiControl , sides ) ;
	return uiControl ;
}

/* TEXT FUNCTIONS */
function createTextBox( key , diy , sheet ){ debug(3,'\n\tcreateTextBox: '+key) ;
/*
Used in createFrontPainter to load the settings related to the rules paragraph.
*/

	let box = new markupBox( sheet )
	box.defaultStyle = diy.settings.getTextStyle( key , null ) ;
	box.setAlignment( diy.settings.getTextAlignment( key ) ) ;
	box.defaultStyle.add( SIZE, diy.settings.getPointSize( key , 8.0 ) ) ;
	box.defaultStyle.add( COLOUR, diy.settings.getColour( key ) ) ;
	box.setLineTightness( diy.settings.getFloat( key+'-lineTightness' , 1.0 ) ) ;
	box.setTabWidth( diy.settings.getFloat( key+'-tabWidth' , 0.2 ) ) ;

	if( diy.settings.get(key+'-shape') ){ // look for a shape of the text box
		debug( 5, '\t'+key+'-shape :'+diy.settings.get(key+'-shape') ) ;
		box.setPageShape( diy.settings.getCupShape( key ) ) ; // only cupshape is supported
	}

	switch( String($(key+'-textFitting')) ){
	case 'none':	box.setTextFitting( FIT_NONE ) ; break ; //don't fit text
	case 'spacing':	box.setTextFitting( FIT_TIGHTEN_LINE_SPACING ) ; break ;
	case 'scaling':	box.setTextFitting( FIT_SCALE_TEXT ) ; break ;
	case 'both':	box.setTextFitting( FIT_BOTH ) ; break ; //fit text by shrinking it and reducing the space between lines
	}
	box.setScalingLimit( diy.settings.getFloat( key+'-scalingLimit' , 0.7 ) ) ;
	box.setTightnessLimit( diy.settings.getFloat( key+'-lineTightnessLimit' , 0.5 ) ) ;

	for( let index in GO.TagList ){
		let item = GO.TagList[ index ] ;
		box.setReplacementForTag( diy.settings.get(item+'-tag') , diy.settings.get(item+'-tag-replacement') ) ;
	}

	for( index in GO.StyleList ){
		let item = GO.StyleList[ index ] ;
		box.setStyleForTag( diy.settings.get(item+'-tag') , diy.settings.getTextStyle( item+'-style' , null ) ) ;
	}

	return box ;
}

function uiName( diy , bindings , sides ){ debug(3,'\n\tuiName') ;
/*
Creates the component title/name control. It's different from other text
controls because it's linked to file name and other special features.
Component "sides" will be updated on control edit.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;

	let control =  new textField( $Name , 20 , null ) ;
	bindings.add('Name' , control , sides ) ;
	diy.nameField =  control ;
	
	return control ;
}

function uiNameUnique( diy , bindings , sides ){ debug(2,'\n\tuiNameUnique') ;
/*
Creates the component title/name control and precedes it with Unique
icon control.
*/
	let controlGrid = new TypeGrid() ;

	let Unique_control = new uiButtonIcon('Unique' , diy , bindings , sides ) ;
	let Name_control =  uiName( diy , bindings , sides ) ;
	
	controlGrid.place( Unique_control,'' , Name_control,'hfill' ) ;
	return controlGrid ;
}

function uiNameParagraph( diy , bindings , sides ){ debug(2,'\n\tuiNameParagraph') ;
/*
Creates the component title/name control. It's different from other text
controls because it's linked to file name and other special features.
Component "sides" will be updated on control edit.
This is a variant for paragraph oriented card titles, like Presentation.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;

	let control = new textArea( $Name , 3 , 30 , true , true ) ;
	bindings.add('Name' , control , sides ) ;
//	diy.nameField =  control ; // no funciona

	return control ;
}

function uiText( key , bindings , sides ){ debug(3,'\n\tuiText: '+key) ;
/*
Returns a user interface textField. Value will be initialized and binded
to $key. Component "sides" will be updated on control edit.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;

	let uiControl =  new textField( $( key ) , 20 , null ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiTextLabeled( key , bindings , sides ){ debug(2,'\n\tuiTextLabeled: '+key) ;
/*
Returns a user interface textField. Value will be initialized and binded
to $key. Component "sides" will be updated on control edit.
*/
	let grid = new TypeGrid() ;
	let label = @('LRL-uiTextLabeled-'+key) ;
	let control =  uiText( key , bindings , sides ) ;
	grid.place(	label , '' , control , 'hfill' ) ;
	return grid ;
}

function writeLine( text , writer , region , g ){ debug(3,'\n\twriteLine') ;
/*
Draws $key on the component template $key-region.
*/
	writer.markupText = text ;
	writer.drawAsSingleLine( g , region ) ;
}

function formatText( key , diy ){ debug(3,'\n\tformatText: '+key) ;
	let output ;
	let format = diy.settings.get(key+'-format','') ;
	let text = diy.settings.get(key,'') ;
	let formatEnd = diy.settings.get(key+'-formatEnd','') ;
	output = format+text+formatEnd ;
	debug( 4 , '\tOutput: '+output ) ;
	return output ;
}

function writeCycle( diy , g ){ debug(2,'\n\twriteCycle') ;
	writeLine( formatText('Cycle',diy) , Cycle_writer , diy.settings.getRegion('Cycle') , g ) ;
}

function writeAdventure( diy , g ){ debug(2,'\n\twriteAdventure') ;
	writeLine( formatText('Adventure',diy) , Adventure_writer , diy.settings.getRegion('Adventure') , g ) ;
}

function writeType( diy , g ){ debug(2,'\n\twriteType') ;
	let text ;
	
	if( diy.settings.get('Type','') != '' ) text =  $Type ;
	else{
		//if( $Template == 'Ship' ) text = #('LRL-Ship'+Card) ;
		//if( $Template == 'Complex' ) text = #('LRL-Complex'+Card) ;
		if( #('LRL-'+$Template+'-'+Card) != "[MISSING: LRL-"+$Template+'-'+Card+"]") text = #('LRL-'+$Template+'-'+Card) ;
		else text = #('LRL-'+Card) ;
	}

	text = diy.settings.get('Type-format','')+text ;
	debug(5,'\tText: '+text) ;
	writeLine( text , Type_writer , diy.settings.getRegion('Type') , g ) ;
}

function writeSubtype( diy , g ){ debug(2,'\n\twriteSubtype') ;
	let text = #('LRL-'+$Template) ;
	if( diy.settings.get('Subtype','') != '' ) text = $Subtype ;

	text = diy.settings.get('Subtype-format' , '' )+text ;
	debug(5,'\tText: '+text) ;
	writeLine( text , Subtype_writer , diy.settings.getRegion('Subtype' ) , g ) ;
}

function writeEncounterSetNumber( diy , g ){ debug(2,'\n\twriteEncounterSetNumber') ;
	let text = '---' ; // if 0

	if( $EncounterSetNumber > 0 ){
		if( $EncounterSetTotal > 0 ){ 
			text = $EncounterSetNumber+$EncounterSetOf+$EncounterSetTotal ;
		}else text = $EncounterSetNumber ;
	}

	text = diy.settings.get('EncounterSetNumber-format' , '' )+text ;
	writeLine( text , EncounterSetNumber_writer , diy.settings.getRegion('EncounterSetNumber' ) , g ) ;
}

function writeName( diy , g ){ debug(2,'\n\twriteName') ;
	let text = $Name ;

	if( diy.settings.getBoolean('Unique') ) text = $Unique-format+text ;

	text = $Name-format+text ;
	writeLine( text , Name_writer , diy.settings.getRegion('Name' ) , g ) ;
}

function writeNameRotated( diy , g ){ debug(2,'\n\twriteNameRotated') ;
// usar nuevo drawtitlerotated
/*
Draws $key on the component template $key-region rotated.
*/
	let text = $Name ;

	if( diy.settings.getBoolean('Unique') ) text = $Unique-format+text ;

	text = $Name-format+text ;
	Name_writer.markupText = text ;

	let region = diy.settings.getRegion('Name' ) ;
	let oldTransform = g.getTransform() ;
	g.rotate( -Math.PI/2 , 0 , 0 ) ; // quitar 0s
	let newRegion = region.clone() ;
	let x = region.getX() ;
	let y = region.getY() ;
	let w = region.getWidth() ;
	let h = region.getHeight() ;
	newRegion.setRect( -h-y , x , h , w ) ;
	Name_writer.draw( g , newRegion ) ;
	g.setTransform( oldTransform ) ;
}

function writeTextOutlined( text , writer , region , stroke , diy , g , sheet ){ debug(3,'\n\twriteTextOutlined') ;

	let newRegion = String(region).split(',') ;
	let w = Number(newRegion[2]) ;
	let h = Number(newRegion[3]) ;

	let textImage = sheet.createTemporaryImage( w , h , true ) ;
	let gi = sheet.createGraphics( textImage , true , true ) ;

	writer.markupText = text ;
	writer.draw( gi , new Region([2,2,w-4,h-4]) ) ;
	// Text is written in a smaller region to give room to the outline
	// otherwise outline may be cut

	let originalWidth = stroke.getWidth() ;
	if( (originalWidth*sheet.scalingFactor) < 1 ){
		debug( 0 , '\tBad width: '+originalWidth*sheet.scalingFactor) ;
		stroke.setWidth( 1 ) ;
	}else stroke.setWidth( originalWidth*sheet.scalingFactor ) ;
	textImage = stroke.filter( textImage , null ) ;

	sheet.paintImage( g , textImage , region ) ;

}

function writeTextShadowed( key , writer , diy , g , sheet ){ debug(3,'\n\twriteTextShadowed') ;
	// This function passes several times a stroke filter on a text.
	// It uses $key-shadow-* for configuration.
	// 
	importClass( ca.cgjennings.graphics.filters.StrokeFilter ) ;

	let region = diy.settings.getRegion( $Template+'-'+key,diy.settings.getRegion(key) ) ;
	let colour = diy.settings.getColour( key+'-shadow-colour' , new Colour(0x4f0f0f0f,true) ) ;
	let passes = diy.settings.get(key+'-shadow-passes',6) ;
	let width = diy.settings.getFloat( key+'-shadow-width' , 2 ) ;
	if( sheet.isHighResolutionRendering() ) width = width*2 ;
	
	let stroke = new StrokeFilter( colour , width , StrokeFilter.Position.OUTSIDE ) ;
	
	let newRegion = diy.settings.get( $Template+'-'+key+'-region',diy.settings.get(key+'-region') )
	newRegion = String(region).split(',') ;
	let w = Number(newRegion[2]) ;
	let h = Number(newRegion[3]) ;

	let textImage = sheet.createTemporaryImage( w , h , true ) ;
	let gi = sheet.createGraphics( textImage , true , true ) ;

	writer.markupText = formatText(key,diy) ;
	writer.draw( gi , new Region([2,2,w-4,h-4]) ) ;

	while( passes > 0 ){
		textImage = stroke.filter( textImage , null ) ;
		passes--;
	}

	sheet.paintImage( g , textImage , region ) ;

}

function paintIconDecorated( key , diy , g , sheet ){ debug(3,'\n\tpaintIconDecorated: '+key) ;
/*
Paints $icon on the component template adding an image as background.
*/
	let decoration = diy.settings.get( key+'-decoration' , '' );
	if( decoration != '' ){ 
		debug( 5 , '\tDecoration: '+decoration ) ;
		decoration = diy.settings.getImageResource( key+'-decoration' ) ;
	}else throw new Error('\tERROR: '+key+'-decoration: UNDEFINED') ;
	
	let decorationRegion = diy.settings.get( key+'-decoration-region' , '' );
	if( decorationRegion != '' ){ 
		debug( 5 , '\tRegion: '+decorationRegion ) ;
		decorationRegion = diy.settings.getRegion( key+'-decoration-region' ) ;
	}else throw new Error('\tERROR: '+key+'-decoration-region: UNDEFINED') ;

	sheet.paintImage( g , decoration , decorationRegion ) ;
//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???

	paintIcon( key , diy , g , sheet ) ;
}

function writeLineDecorated( key , writer , diy , g , sheet ){ debug(3,'\n\twriteLineDecorated: '+key) ;
/*
Draws $key on the component template adding an image as background.
*/
	let decoration = diy.settings.get( key+'-decoration' , '' );
	if( decoration != '' ){ 
		debug( 5 , '\tImage: '+decoration ) ;
		decoration = diy.settings.getImageResource( key+'-decoration' ) ;
	}else throw new Error('\tERROR: '+key+'-decoration: UNDEFINED') ;
	
	let decorationRegion = diy.settings.get( key+'-decoration-region' , '' );
	if( decorationRegion != '' ){ 
		debug( 5 , '\tRegion: '+decorationRegion ) ;
		decorationRegion = diy.settings.getRegion( key+'-decoration-region' ) ;
	}else throw new Error('\tERROR: '+key+'-decoration-region: UNDEFINED') ;

	sheet.paintImage( g , decoration , decorationRegion ) ;
//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
	writer.markupText = formatText( key , diy ) ;
	writer.drawAsSingleLine( g , diy.settings.getRegion( key ) ) ;
}

function formatPage( diy , g , sheet){ debug(2,'\n\tformatPage') ;
	let output = '' ; // if 0

	if( $PageNumber != 0 ){
		let format = diy.settings.get('Page-format','') ;
		
		let page = diy.settings.get('LRL-Page','')
		if( page == '' ) page = #LRL-Page ;
		
		let number = Number($PageNumber)+sheet.getSheetIndex() ;
			
		if( $PageTotal == 0 ) output = format+page+number ;
		else{
			let pageOf = diy.settings.get('LRL-PageOf','') ;
			if( pageOf == '' ) pageOf = #LRL-PageOf ;
			output = format+page+number+pageOf+$PageTotal ;
		}
	}

	return output ;
}

function writePage( diy , g , sheet ){ debug(2,'\n\twriteOptionLeft') ;
	if ( $PageNumber != 0 ){
		let side = '' ;
		let region ;
		if( sheet.getSheetIndex() == 1 ) side = '-back' ;
		//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
		if( diy.settings.get('Page-decoration','') != '' ){
			if( diy.settings.get('Page'+side+'-decoration-region','') != '' ) region = diy.settings.getRegion('Page'+side+'-decoration') ;
			else region = diy.settings.getRegion('Page-decoration') ;
			let image = diy.settings.getImageResource('Page-decoration') ;
			sheet.paintImage(g,image,region) ;
		}
		
		Page_writer.markupText = formatPage( diy , g , sheet ) ;
		
		if( diy.settings.get('Page'+side+'-region','') != '' ) region = diy.settings.getRegion('Page'+side) ;
		else region = diy.settings.getRegion('Page') ;
		
		Page_writer.drawAsSingleLine(g,region) ;
	}
}

function writePageBack( diy , g , sheet ){ debug(2,'\n\twriteOptionLeft') ;
	if ( $PageNumber != 0 ){ 
		//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
		sheet.paintImage( g , 'Page-decoration' , 'Page-decoration-back-region' ) ;
		
		let text = diy.settings.get('LRL-Page' , #LRL-Page )+String(Number($PageNumber)+1) ;
		if( $PageTotal != 0 ) text = text+diy.settings.get('LRL-PageOf' , #LRL-PageOf )+$PageTotal ;
		text = diy.settings.get('Page-format' , '' )+text ;
		
		Page_writer.markupText = text ;
		Page_writer.drawAsSingleLine( g , diy.settings.getRegion('Page-back' ) ) ;
	}
}

function writeOptionLeft( diy , g , sheet ){ debug(2,'\n\twriteOptionLeft') ;
	if ( $OptionLeft != '' ) writeLineDecorated('OptionLeft' , Option_writer , diy , g , sheet ) ;
}

function writeOptionRight( diy , g , sheet ){ debug(2,'\n\twriteOptionRight') ;
	if ( $OptionRight != '' ) writeLineDecorated('OptionRight' , Option_writer , diy , g , sheet ) ;
}

function writeOptionLeftBack( diy , g , sheet ){ debug(2,'\n\twriteOptionLeftBack') ;
	if ( $OptionLeftBack != '' ) writeLineDecorated('OptionLeftBack' , Option_writer , diy , g , sheet ) ;
}

function writeOptionRightBack( diy , g , sheet ){ debug(2,'\n\twriteOptionRightBack') ;
	if ( $OptionRightBack != '' ) writeLineDecorated('OptionRightBack' , Option_writer , diy , g , sheet ) ;
}

function formatArtist( key , diy ){ debug(2,'\n\tformatArtist') ;
	let output  = '' ;
	let text = diy.settings.get(key,'') ;
	let format = diy.settings.get(key+'-format','') ;
	switch( String(text) ){
	case 'no' : case null : break ;
	case '' : 
		let unknown = diy.settings.get('LRL-IllustratorUnknown','') ;
		if(unknown=='') unknown = #LRL-IllustratorUnknown ;
		output = format+unknown ;
		break ;
	default: 
		let illus = diy.settings.get('LRL-IllustratorShort','') ;
		if(illus=='') illus = #LRL-IllustratorShort ;
		output = format+illus+' '+text ;
	}

	debug( 4 , '\tOutput: '+output ) ;
	return output ;
}

function writeArtist( diy , g , sheet ){ debug(2,'\n\twriteArtist') ;
	writeTextOutlined(
		formatArtist('Artist',diy) ,
		Bottom_writer ,
		diy.settings.getRegion('Artist') ,
		getStroke('Bottom',diy) ,
		diy , g , sheet
	) ;
}

function writeArtistBack( diy , g , sheet ){ debug(2,'\n\twriteArtistBack') ;
	if( diy.settings.getBoolean('PortraitShare' , true ) ){
		debug( 5 , '\tPortrait shared.' ) ;
		writeTextOutlined(
			formatArtist('Artist' , diy ) ,
			Bottom_writer ,
			diy.settings.getRegion('Artist' ) ,
			getStroke('Bottom' , diy ) ,
			diy , g , sheet
		) ;
	}else{
		writeTextOutlined(
			formatArtist('ArtistBack' , diy ) ,
			Bottom_writer ,
			diy.settings.getRegion('Artist' ) ,
			getStroke('Bottom' , diy ) ,
			diy , g , sheet
		) ;
	}
}

function writeCopyright( diy , g , sheet ){ debug(2,'\n\twriteCopyright') ;
	writeTextOutlined(
		diy.settings.get('Copyright-format' , '' )+$Copyright ,
		Bottom_writer ,
		diy.settings.getRegion('Copyright' ) ,
		getStroke('Bottom' , diy ) ,
		diy , g , sheet
	) ;
}
function writeCollectionInfo( diy , g , sheet ){ debug(2,'\n\twriteCollectionInfo') ;
	writeTextOutlined(
		diy.settings.get('CollectionInfo-format' , '' )+$CollectionInfo ,
		Bottom_writer ,
		diy.settings.getRegion('CollectionInfo' ) ,
		getStroke('Bottom' , diy ) ,
		diy , g , sheet
	) ;
}
function writeCollectionNumber( diy , g , sheet ){ debug(2,'\n\twriteCollectionNumber') ;
	if( diy.settings.getInt('CollectionNumber' , 0 ) === 0 ) let text = '---' ;
	else text = $CollectionNumber ;
	writeTextOutlined(
		diy.settings.get('CollectionNumber-format' , '' )+text ,
		Bottom_writer ,
		diy.settings.getRegion('CollectionNumber' ) ,
		getStroke('Bottom' , diy ) ,
		diy , g , sheet
	) ;
}

function uiParagraph( key , bindings , sides , size ){ debug(3,'\n\tuiParagraph: '+key) ;
/*
Returns a user interface textArea. Value will be initialized and binded
to $key. Area "size" defaults to regular card text box size. Component
"sides" will be updated on control edit.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	if( size == null ) size = 'medium' ;
	
	let rows = 4 ;
	let columns = 50 ;
	
	switch( String( size ) ){
	case 'line' :	rows =  1 ; break ;
	case 'small' :	rows =  2 ; break ;
	case 'medium' :	rows =  4 ; break ;
	case 'big' :	rows =  8 ; break ;
	case 'huge' :	rows = 20 ; break ;
	}

	let control = new textArea( $(key) , rows , columns , true , true ) ;
	bindings.add( key , control , sides ) ;
	return control ;
}

function uiParagraphLabeled( key , bindings , sides , size ){ debug(3,'\n\tuiParagraphLabeled: '+key) ;
/*
Returns a user interface grid containing a textArea control and a
text label above it, both depending on key name.
*/
	let grid = new TypeGrid() ;
	let label = @('LRL-uiParagraphLabeled-'+key) ;
	let control = new uiParagraph( key , bindings , sides , size ) ;
	grid.place(	label , 'center' , control , 'br hfill' ) ;
	return grid ;
}

function writeParagraph( parts , writer , region , diy , g ){ debug(3,'\n\twriteParagraph: '+parts) ;
/*
Draws a text paragraph composed by "parts", formatting each part
based on specific settings and user preferences.
In some cards, differently formated texts can be found in the same text box.
For example, an Ally has Trait, Rules and Flavour text writen in the same
text space, each with it's own format (bold, italics and size). Also,
each parts' text size should be reduced equally if needed to fit in the box.
Instead of forcing the user to add format tags for each part, a text user
interface control is added for each part, and when card will be painted
format tags are added along to each part and then every part is put together.
*/
	if( parts == null ) parts = new Array('Rules' ) ;

	let text = '' ;
	
	for( let index in parts ){
		let key = parts[ index ] ;
		let newText = diy.settings.get( key , '' ) ;
		if( newText != '' ){
			if( text != '' ) text = text+diy.settings.get('Body-break' , '' ) ;
			let format = diy.settings.get( key+'-format' , '' ) ;
			let formatEnd = diy.settings.get( key+'-formatEnd' , '' ) ;
			text = text+format+newText+formatEnd ;
		}
	}
	writer.setMarkupText( text ) ;
	updateNameTags( writer , diy ) ;
	writer.draw( g , region ) ;
}
function writeBody( parts , diy , g ){ debug(2,'\n\twriteBody') ;
	// This looks for $Template-Body-region, and if not found, uses Body-region
	let region = diy.settings.getRegion( $Template+'-Body',diy.settings.getRegion('Body') ) ;
	writeParagraph( parts , Body_writer , region , diy , g ) ;
	
//// sacar TraitOut a componente
//	if( diy.settings.getBoolean('TraitOut') ){ // \u00bfconvertir en permanente?
//		let index = parts.indexOf('Trait' ) ;
//		if (index > -1) {
//			writeParagraph(
//				[ 'Trait' ] , Body_writer ,
//				diy.settings.getRegion('TraitOut-Trait' , diy.settings.getRegion('Body' ) ) , diy , g
//			) ;
//			parts.splice( index, 1 ) ;
//			writeParagraph(
//				parts , Body_writer ,
//				diy.settings.getRegion('TraitOut-Body' , diy.settings.getRegion('Body' ) ) , diy , g
//			) ;
//		}else{
//			writeParagraph( parts , Body_writer , diy.settings.getRegion('Body' ) , diy , g ) ;
//		}
//	}else{
//		writeParagraph( parts , Body_writer , diy.settings.getRegion('Body' ) , diy , g ) ;
//	}
}

function uiTransparency( key , bindings , sides ){ debug(3,'\n\tuiTransparency: '+key) ;
/*
Creates a user interface slider for body icon transparency setting.
*/
	if( sides == null ) sides = [FRONT,BACK] ;

	let grid = new TypeGrid() ;
	let control = new slider( 1 , 10 , 5 , [ 1 , @LRL-High , 4 , @LRL-Medium , 7 , @LRL-Low , 10 , @LRL-Opaque ] , null ) ;
	bindings.add( key+'-transparency' , control , sides ) ;
	 
	grid.place( @LRL-uiTransparency , 'br' , control,'hfill' ) ;
	return grid ;
}

function uiTint( key , bindings , sides ){ debug(3,'\n\tuiTint: '+key) ;
/*
Creates a user interface tint selection panel.
I have a working implementation. Look for it when the update is posted.

Here is the code of the demo I'll add to the authoring kit:

//
// tint-presets.js - version 1
//
// This script uses a DIY component to demonstrate how to add a list of
// preset tint settings to the controls for a tintable element.
// Run from the code editor window or by right clicking in the project pane.
//

useLibrary('diy' );
useLibrary('ui' );
useLibrary('imageutils' );

function create(diy) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	$tintValue = '0,1,1'; // note that this will match the "Enraged" preset
	$peacefulPreset = '-60,0.43,0.78';
}

function createInterface( diy, editor ) {
	let panel = new Stack();
	hsbPanel = tintPanel();

	// define the preset tint values to use
	// (the user can still choose a custom tint if they wish)
	hsbPanel.setPresets(
		'Peaceful', $peacefulPreset, // preset values can be set from setting value
		'Enraged',  '0,1,1',         //   or just a string that uses the setting value format
		'Toxic',    [0.34,1,1]       //   or an array [h,s,b] with h=angle/360
	);

	panel.add( hsbPanel );

	let bindings = new Bindings( editor, diy );
	bindings.add('tintValue', hsbPanel );
	panel.addToEditor( editor, 'Tint Presets Demo' );
	bindings.bind();
}

let tintable; // the image we will tint

function createFrontPainter( diy, sheet ) {
	tintable = ImageUtils.create( 100, 100 );
	let g = tintable.createGraphics();
	try {
		g.setPaint( Colour.RED );
		g.fillRect( 0, 0, tintable.width, tintable.height );
		g.setPaint( Colour.BLACK );
		g.drawRect( 0, 0, tintable.width-1, tintable.height-1 );
	} finally {
		if(g) g.dispose();
	}
}

function paintFront( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	let hsb = $$tintValue.tint;
	let tinted = ImageUtils.tint( tintable, hsb );
	g.drawImage( tinted,
		(sheet.templateWidth-tintable.width)/2,
		(sheet.templateHeight-tintable.height)/2,
		null
	);

	// don't ask about unsaved changes when
	// the demo window is closed
	diy.markSaved();
}

function createBackPainter( diy, sheet ) {}
function paintBack( g, diy, sheet ) {}
function onClear() {}
function onRead() {}
function onWrite() {}

testDIYScript();
*/

	if( sides == null ) sides = [ FRONT , BACK ] ;

	importClass( ca.cgjennings.apps.arkham.HSBPanel ) ;
	let uiControl = new HSBPanel() ;
	uiControl.setTitle( @('LRL-uiTint-'+key) ) ;
 	uiControl.setPresets(
 		@LRL-Neutral , $Neutral-tint
 		, @LRL-Leadership , $Leadership-tint
		, @LRL-Lore , $Lore-tint
		, @LRL-Spirit , $Spirit-tint
		, @LRL-Tactics , $Tactics-tint
		, @LRL-Fellowship , $Fellowship-tint
		, @LRL-Baggins , $Baggins-tint
		, @LRL-Mastery , $Mastery-tint
		, @LRL-Red , $Red-tint
		, @LRL-Green , $Green-tint
		, @LRL-Blue , $Blue-tint
		, @LRL-Purple , $Purple-tint
		, @LRL-Yellow , $Yellow-tint
		, @LRL-Brown , $Brown-tint
	) ;
 	bindings.add( key+'-tint' , uiControl , sides ) ;
	return uiControl ;
}

// User interface controls
//function iconListComboBox( list ){
///*
//Creates a user interface list containing the icons and names
//refered in "list".
//Creates an icon suitable for the user interface from the
//plugin ui folder's "name" PNG file.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	if( list == null  ){ list == new Array('null' ) ;
//		debug( 0 , "\tList not defined." ) ;
//		return ;
//	}else{
//		debug( 5 , '\ticonListComboBox: '+list ) ;
//	}
//
//	var combo = new Array() ;
//	for(
//		let index = 0 ;
//		index < list.length ;
//		index++
//	){
//		let name = list[ index ] ;
//		combo[ index ] = ListItem(
//			name ,
//			@('LRL-'+name) ,
//			uiIcon( name )
//		) ;
//	}
//
//	return new comboBox( combo , null ) ;
//}

function uiIcon( name ){ debug(3,'\n\tuiIcon: '+name) ;
/*
Creates a user interface icon from the plugin "ui" folder's "name" PNG file.
If it's not found, the function tries to get it from the "icons" folder.
Icon size depends on the plugin's "uiIconSize" setting.
*/
	let image = ImageUtils.get( PathUi+name+'.png' , false , true )
	if( image == null ){
		image = ImageUtils.get( PathIcon+name+'.png' , false , true ) ;
	}

	image = ImageUtils.createIcon( image , IconSize , IconSize ) ;
	return image ;
}

function uiButtonIcon( key , diy , bindings , sides ){ debug(3,'\n\tuiButtonIcon: '+key) ;
/*
Creates a toggle button with an icon from the plugin "ui" folder's "key" PNG file.
*/
	if( sides == null ) sides = [FRONT,BACK] ;

	let uiControl = new toggleButton('' , uiIcon(key) , diy.settings.getBoolean(key,false) , null ) ;
	bindings.add( key , uiControl , sides ) ;

	return uiControl ;
}

function uiButtonText( key , diy , bindings , sides ){ debug(3,'\n\tuiButtonText: '+key) ;
/*
Creates a toggle button with a text label.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;

	let uiControl = new toggleButton( @('LRL-uiButtonText-'+key) , '' , diy.settings.getBoolean( key, false ) , null ) ;
	bindings.add( key , uiControl , sides ) ;

	return uiControl ;
}
//
//function uiOptionSpecial( key , diy , bindings , sides ){ debug( 2 , '\n\tuiOptionSpecial: '+key ) ;
///*
//Creates a toggle button with an icon from the
//plugin ui folder's "key" PNG file.
//Requires passing diy.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	
//	var combo = new Array(
//		ListItem('none' , @LRL-None , ImageUtils.createIcon( ImageUtils.get( PathUi+'Empty.png' ) , IconSize , IconSize ) ) ,
//		ListItem('Sailing' , @LRL-Sailing , ImageUtils.createIcon( ImageUtils.get( PathUi+'Sailing.png' ) , IconSize , IconSize ) ) ,
//		ListItem('EyeOfSauron' , @LRL-EyeOfSauron , ImageUtils.createIcon( ImageUtils.get( PathUi+'EyeOfSauron.png' ) , IconSize , IconSize ) ) ,
//		ListItem('EyeOfSauron2' , @LRL-EyeOfSauron+' x2' , ImageUtils.createIcon( ImageUtils.get( PathUi+'EyeOfSauron2.png' ) , IconSize , IconSize ) ) ,
//		ListItem('EyeOfSauron3' , @LRL-EyeOfSauron+' x3' , ImageUtils.createIcon( ImageUtils.get( PathUi+'EyeOfSauron3.png' ) , IconSize , IconSize ) ) ,
//		ListItem('EyeOfSauron4' , @LRL-EyeOfSauron+' x4' , ImageUtils.createIcon( ImageUtils.get( PathUi+'EyeOfSauron4.png' ) , IconSize , IconSize ) )
//	) ;
//
//	bindings.add( key , combo , [ 0 , 1 ] ) ;
//	return combo ;
//}
//
//function getCollections(){ debug(3,'getCollections') ;
///* getCollections()
//	This function returns an array with the available Collections.
//	Check LRL-I settings file for information on how to add new icons
//	to this list.
//*/
//	
//	//var collectionsList = settingToArray('collectionsList' ) ;
//
//	var collections = new Array() ;
//	for(
//		let index = 0 ;
//		index < GO.GameCollectionList.length ;
//		index++
//	){
//		let item = GO.GameCollectionList[ index ] ;
//		collections = collections.concat(
//			settingToArray( item+'-Collection-list' )
//		) ;
//	}
//	return collections ;
//}
//
//function getEncounterSets(){ debug(2,'getEncounterSets') ;
///* getEncounterSets()
//	This function returns an array with the available Collections.
//	Check LRL-I settings file for information on how to add new icons
//	to this list.
//*/
//
//	var collections = getCollections() ;
//	var sets = new Array() ;
//
//	for(
//		let index = 0 ;
//		index < collections.length ;
//		index++
//	){
//		let item = collections[ index ] ;
//		sets = sets.concat(
//			settingToArray( item+'-EncounterSet-list' )
//		) ;
//	}
//
//	return sets;
//}

//function paintSpecialOption( key , diy , g , sheet ){ debug(2,'\n\tpaintSpecialOption: '+key) ;
//	let item = diy.settings.get( key , 'Empty' ) ;
//	if( item != 'Empty' ) sheet.paintImage( g , ImageUtils.get( PathIcon+item+'.png' ) , key+'-region') ;
//}

function paintAdapter( list , diy , g , sheet ){ debug(3,'\n\tpaintAdapter') ;
	let image = null ;
	let selector = 0;
	
	for( let index = 0 ; index<list.length ; index++ ) if( diy.settings.get(list[index]) != 'Empty' ) selector=index+1 ;
	debug(5,'\tSelector: '+selector) ;
	
	if( diy.settings.get('Adapter-'+selector , '' ) != '' ) image = diy.settings.getImageResource('Adapter-'+selector ) ;
	if( diy.settings.get( $Template+'-Adapter-'+selector , '' ) != '' ) image = diy.settings.getImageResource( $Template+'-Adapter-'+selector ) ;
	
	if( image != null ) sheet.paintImage( g , image , 'Template-region' ) ;
}

function paintIcon( key , diy , g , sheet ){ debug(3,'\n\tpaintIcon: '+key+':'+diy.settings.get(key)) ;
/*
This paints an icon in the component. The icon position to paint is
determined by the 'key' and the actual image to paint is determined by $key.
The icon is looked for in the plugin ui folder's, as "key" PNG file.
It will also look for Nightmare and Draft variants if needed.
*/
	let item = diy.settings.get( key ) ; // get the icon name contained inside $key
	let image ;
	let regionKey = getKeyForTemplate( key+'-portrait-clip-region',diy) ;
	switch( String(item) ){
	case 'null' : throw new Error('\t'+key+' not defined.') ; break ;
	case 'Empty' : break ;
	case 'Custom' :
		//PortraitList[ portraitIndexOf( key ) ].paint( g , sheet.getRenderTarget() ) ;
		image = PortraitList[ portraitIndexOf( key ) ].getImage() ;
		sheet.paintImage( g , image , regionKey ) ;
		break ;
	default :
		if( ( key == 'EncounterSet' ) && ( $Template == 'Nightmare' ) ){
			image = ImageUtils.get( PathIcon+item+'-Nightmare.png' , false, true ) ;
			if( image == null ){
				image = ImageUtils.get( PathIcon+item+'.png' ) ;
				image = ImageUtils.invert( image ) ;
			}
		}else image = ImageUtils.get( PathIcon+item+'.png' ) ;
		sheet.paintImage( g , image , regionKey ) ;
	}
}

function getIcon( key , diy ){ debug(3,'\n\tgetIcon: '+key+':'+diy.settings.get(key)) ;
	let item = diy.settings.get( key , '' ) ; // get the icon name contained inside $key
	let image ;
	switch( String(item) ){
	case '' : throw new Error('\t'+key+' not defined.') ; break ;
	case 'Empty' : return ImageUtils.get( PathImage+'empty1x1.png' ) ; break ;
	case 'Custom' : return PortraitList[ portraitIndexOf( key ) ].getImage() ; break ;
	default :
		image = ImageUtils.get( PathIcon+item+'.png' ) ;
		if( ( key == 'EncounterSet' ) && ( $Template == 'Nightmare' ) ) return ImageUtils.invert( image ) ;
		else return image ;
	}
}

function paintGameLogo( diy , g , sheet ){ debug(3,'\n\tpaintLogo') ;
	let image ;
	switch( getLocale() ){
	case 'es' : image = diy.settings.getImageResource('GameLogo-es' ) ; break ;
	case 'pl' : image = diy.settings.getImageResource('GameLogo-pl' ) ; break ;
	case 'en' : default : image = diy.settings.getImageResource('GameLogo-en' ) ; break ;
	}
	sheet.paintImage( g , image , 'Template-region' ) ;
}

/* PORTRAIT related code */

function createPortrait( key , diy ){ debug(3,'\n\tcreatePortrait: '+key) ;
/*
This function returns Portrait that allows user to change
and manipulate an external image to be used in the component.
Use only the key without the "Card" type.
*/
	let index = PortraitList.length ;
	PortraitList[ index ] = new DefaultPortrait( diy , key , false ) ;
	PortraitList[ index ].setBackgroundFilled( diy.settings.getBoolean( key+'-portrait-backgroundFilled' , false ) ) ;
	PortraitList[ index ].setClipping( diy.settings.getBoolean( key+'-portrait-clipping' , true ) ) ;
	PortraitList[ index ].setScaleUsesMinimum( diy.settings.getBoolean( key+'-portrait-fit' , false ) ) ;
//	if( diy.settings.get( Card+'-'+key+'-stencil' , null ) != null ){
//		PortraitList[ index ].setClipStencil(
//			ImageUtils.get( Card+'-'+key+'-stencil' )
////			ca.cgjennings.apps.arkham.component.AbstractPortrait.createStencil(
////				ImageUtils.get( Card+'-'+key+'-stencil' ) ,
////				diy.settings.getRegion( Card+'-'+key+'-portrait-clip-region' )
////			)
//		) ;
//		PortraitList[ index ].setClipping(true)
//	}
	debug( 5 , '\t-portrait-clip-region: '+$(key+'-portrait-clip-region') ) ;
	debug( 5 , '\t-portrait-template: '+$(key+'-portrait-template') ) ;
	debug( 5 , '\t-portrait-scale: '+$(key+'-portrait-scale') ) ;
	debug( 5 , '\t-portrait-panx: '+$(key+'-portrait-panx') ) ;
	debug( 5 , '\t-portrait-pany: '+$(key+'-portrait-pany') ) ;
	debug( 5 , '\t-portrait-rotation: '+$(key+'-portrait-rotation') ) ;
	debug( 5 , '\t-portrait-background: '+$(key+'-portrait-background') ) ;
	debug( 5 , '\t-portrait-clipping: '+$(key+'-portrait-clipping') ) ;
	debug( 5 , '\t-portrait-fit: '+$(key+'-portrait-fit') ) ;

	PortraitList[ index ].installDefault() ;
	debug( 4 , '\tPortrait index: '+portraitIndexOf(key) ) ;
}

//function createLinkedPortrait( key ){ debug(3,'createLinkedPortrait: '+key) ; //obsoleto
///*
//This function returns Portrait that allows user to change
//and manipulate an external image to be used in the component.
//This instance is linked to the Main portrait, and they will
//share the image. It's used to show the same picture, but in
//a different component region. For example in LRL plugin, it's
//used to load the Main portrait on Promotional Hero template.
//Use only the key without the "Card" type.
//*/
//	
//	var index = PortraitList.length ;
//	PortraitList[ index ] = new DefaultPortrait( portraitIndexOf('Main' ) , Card+'-'+key ) ;
//	PortraitList[ index ].backgroundFilled = false ;
//	PortraitList[ index ].installDefault() ;
//}

function uiPortrait( key , diy ){ debug(3,'\n\tuiPortrait: '+key) ;
/*
This function returns a user interface portraitPanel that
allows user to change and manipulate an external image to be
used in the component. It's also used to load external images
on some non-manipulable component places, like Collection icon.
Use only the key without the "Card" type.
*/
	let uiControl = new portraitPanel( diy , portraitIndexOf( key ) , @('LRL-uiPortrait-'+key) ) ;
	return uiControl ;
}

function uiPortraitMirror( key , control ){ debug(3,'\n\tuiPortraitMirror: '+key) ;
/*
This function creates a user interface button used to
mirror horizontally a Portrait control of the component.
*/
	return new repeaterButton(
		@LRL-uiButtonText-Mirror ,
		'' ,
		function(){
			let panel = portraitIndexOf( key ) ;
			let scale = PortraitList[ panel ].getScale() ;
			let panX = PortraitList[ panel ].getPanX() ;
			let panY = PortraitList[ panel ].getPanY() ;
			PortraitList[ panel ].setImage(
				PortraitList[ panel ].getSource(),
				ImageUtils.mirror( PortraitList[ panel ].getImage() , true , false )
			);
			PortraitList[ panel ].setScale( scale ) ;
			PortraitList[ panel ].setPanX( panX ) ;
			PortraitList[ panel ].setPanY( panY ) ;

			control.updatePanel() ;
		}
	) ;
}

function uiCycler( key , list , bindings , sides ){ debug(3,'\n\tuiCycler: '+key) ;
/*
This function creates a user interface button used to
select which identifing elements are shown in the card.
It's used only in "Divider" and "DividerHorizontal".
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;

	let labels = new Array() ;
	for( index in list){ labels[ index ] = @('LRL-uiCycler-'+list[ index ]) ; }
	let button = new cycleButton( labels , list ) ;
	bindings.add( key , button , sides ) ;
	return button ;
}

function portraitIndexOf( key ){ debug(3,'\n\tportraitIndexOf: '+key) ;
/*
Returns the portrait index of the panel built with key.
Use only the key without the "Card" type.
*/
	for( let index in PortraitList ){
		let currentKey = PortraitList[ index ].getBaseKey() ;
		if( currentKey == key ) {
			debug( 4 , '\tIndex: '+index ) ;
			return index ;
		}
	}
	throw new Error('\tInvalid portrait key.') ;
	return null ;
}

function paintPortrait( key , diy , g , sheet ){ debug(3,'\n\tpaintPortrait: '+key) ;
	if( ( typeof( SE2CARD ) != 'undefined' ) && ( key == 'Main' ) ){
		// support for Strange Eons 2 card portrait
		debug(3,'WARNING: STRANGE EONS 2 COMPONENT.') ;
		sheet.paintPortrait(g) ;
	}else{
		let index = portraitIndexOf( key ) ;
		PortraitList[ index ].paint( g , sheet.getRenderTarget() ) ;
	}
	switch( $PortraitShadow ){
	case 'None' : break ;
	case 'Black' :
		sheet.paintImage( g , key+'-shadow' , 'Template-region' ) ;
		break ;
	case 'PortraitTint' :
		if( $PortraitTint == 'true' ){
			let image = diy.settings.getImageResource( key+'-shadow-tintable' ) ;
			if( $Template == 'Nightmare' ) image = createRedishImage(  ) ;
			else image = createSepiaImage( diy.settings.getImageResource( key+'-shadow-tintable' ) ) ;
			sheet.paintImage( g , image , 'Template-region' ) ;
		}else{ sheet.paintImage( g , key+'-shadow' , 'Template-region' ) ; }
		break ;
	case 'Custom' :
		hsb = diy.settings.getTint( key+'-shadow' ) ;
		PortraitShadow_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( g , PortraitShadow_tinter.getTintedImage() , 'Template-region' ) ;
		break ;
	}
}

//function paintPortraitDraft( key , g , sheet ){ debug(3,'paintPortraitDraft: '+key) ;
//	var imageTinted = PortraitList[ portraitIndexOf( key ) ].getImage() ;
//	var imagePanX = PortraitList[ portraitIndexOf( key ) ].getPanX() ;
//	var imagePanY = PortraitList[ portraitIndexOf( key ) ].getPanY() ;
//	var imageRotation = PortraitList[ portraitIndexOf( key ) ].getRotation() ;
//	var imageScale = PortraitList[ portraitIndexOf( key ) ].getScale() ;
//	imageTinted = createHCImage( imageTinted ) ;
//	var region = settingToArray( getKeyForTemplate( key+'-portrait-clip-region' , diy ) ) ;
//	var AT = java.awt.geom.AffineTransform ;
//	var transform =	AT.getTranslateInstance(
//			Number( region[ 0 ] )+( Number( region[ 2 ] )/2 )+imagePanX-( ( imageTinted.width*imageScale )/2 ) ,
//			Number( region[ 1 ] )+( Number( region[ 3 ] )/2 )+imagePanY-( ( imageTinted.height*imageScale )/2 )
//		) ;
//	transform.concatenate( AT.getScaleInstance( imageScale, imageScale ) ) ;
//	transform.concatenate(
//		AT.getRotateInstance(
//			-imageRotation * Math.PI/180 ,
//			imageTinted.width/2 ,
//			imageTinted.height/2
//		)
//	) ;
//	g.drawImage( imageTinted, transform, null ) ;
//}

function getPortraitCount(){ debug(3,'\n\tgetPortraitCount') ;
/*
Returns the portrait count.
*/
	let output = PortraitList.length ;
	debug(4,'\tOutput: '+output) ;
	return output ;
}

function getPortrait( index ){ debug(3,'\n\tgetPortrait: '+index) ;
/*
Returns the portrait given by index.
*/
	if( ( index < 0 ) || ( index >= PortraitList.length ) ) throw new Error('\tInvalid portrait index.') ;
	return PortraitList[ index ] ;
}

// Following filters are used on portrait elements
const createHCImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter( [
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.BrightnessContrastFilter( 0.3 , 0.5 )
	] )
) ;

const createRedishImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter( [
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		//new ca.cgjennings.graphics.filters.BrightnessContrastFilter( -0.2 , 0.2 ) ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter( 1.5 , 0.5 , 0.5 )
	] )
) ;

const createSepiaImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter( [
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter( 1.5 , 1 , 0.5 )
	] )
) ;
/* NUMERIC CONTROLS */
function uiSpinner( key , bindings , sides , limit ){ debug(3,'\n\tuiSpinner: '+key) ;
	if( sides == null ) sides = [ FRONT , BACK ] ;
	if( limit == null ) limit = 999 ;

	let uiControl = new spinner( 0 , limit , 1 , 0 , null ) ;
 	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiSpinnerLabeled( key , bindings , sides , limit ){ debug(3,'\n\tuiSpinner: '+key) ;

	let grid = new Grid() ;
	let label = @('LRL-uiSpinnerLabeled-'+key) ;
	let control = new spinner( 0 , limit , 1 , 0 , null ) ;
	grid.place( label,'' , control,'wmin 50lp' ) ;
	return grid ;

	return grid ;
}

function uiStat( key , bindings , sides , limit , extraList ){ debug(3,'\n\tuiStat: '+key) ;
/*
Creates a user interface list containing numbers up to
"limit" and may add items contained on "extraList".
list is binded to $key, and updates the component "sides".
*/
	importClass( arkham.diy.ListItem ) ;
	if( sides == null ) sides = [FRONT,BACK] ;
	if( limit == null ) limit = 9 ;
	if( extraList == null ) extraList = [] ;

	let combo = new Array() ;
	let index = 0 ;
	do{
		combo[ index ] = ListItem( index , String( index ) ) ;
		index++ ;
	}while( index <= limit )

	index = 0 ;
	for( index in extraList ){
		combo[ combo.length ] = ListItem( String(extraList[index]) , String(extraList[index]) ) ;
	}
	let uiControl = new comboBox( combo , null ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiStatIcon( key , bindings , sides , limit , extraList ){ debug(3,'\n\tuiStatIcon: '+key) ;
/*
Creates a user interface grid containing a list control preceded
by a icon to describe it, both depending on key name.
*/
	let grid = new Grid() ;
	let icon = uiIcon(key) ;
	let control = uiStat( key , bindings , sides , limit , extraList ) ; 
	grid.place( icon,'' , control,'wmin 50lp' ) ;
	return grid ;
}

function paintStat( key , diy , g , sheet ){ debug( 3 , '\n\tpaintStat: '+key ) ;
/*
This function paints the "key" stat using a image.
Used for plain black stats like Attack.
*/
	debug( 4 , '\tKey value: '+diy.settings.get( key ) ) ;
	let image = ImageUtils.get( PathNumber+diy.settings.get( key )+'.png' ) ;
	let region = diy.settings.getRegion( getKeyForTemplate( key+'-region' , diy ) ) ;
	debug( 5 , '\tRegion: '+region ) ;
	sheet.paintImage( g , image , region ) ;
}

function paintStatTinted( key , tinter , diy , g , sheet ){ debug( 3 , '\n\tpaintStatTinted: '+key ) ;
/*
This function tints and paints the "key" stat.
Used for colored stats like HitPoints.
*/
	debug( 4 , '\tKey value: '+diy.settings.get( key ) ) ;
	let image = ImageUtils.get( PathNumberTintable+diy.settings.get( key )+'.png' ) ;
	tinter.setImage( image ) ;
	image = tinter.getTintedImage() ;
	let region = diy.settings.getRegion( getKeyForTemplate( key+'-region' , diy ) ) ;
	debug( 5 , '\tRegion: '+region ) ;
	sheet.paintImage( g , image , region ) ;
}

/* OTHER GRAPHIC STUFF */

function paintTemplate( diy , g , sheet ){ debug( 3 , '\n\tpaintTemplate: '+$Template ) ;
/*
This funtion draws the base image selected by $template.
Note this is different from using the basic paintTemplateImage.
*/
	let template = $Template ;
	let side = sheet.getSheetIndex() ;
	if( side == BACK ) if( diy.settings.get(template+'Back-template','') != '' ) template = template+'Back' ;
	debug( 4 , '\tTemplate: '+ diy.settings.get(template+'-template') ) ;
	sheet.paintImage( g, template+'-template', 'Template-region' ) ;
}

function paintCut( diy , g , sheet ){ debug( 3 , '\n\tpaintCut' ) ;
	if( diy.settings.getBoolean('ShowBleeding' ) ){
		debug( 4 , '\tShowBleeding' ) ;
		sheet.paintImage( g , 'Template-bleeding' , 'Template-region' ) ;
	}
	if( diy.settings.getBoolean('ShowCut' ) ){
		debug( 4 , '\tShowCut' ) ;
		sheet.paintImage( g , 'Template-cut' , 'Template-region' ) ;
	}
}

function paintDifficulty( diy , g , sheet ){ debug( 2 , '\n\tpaintDifficulty: '+$Difficulty ) ;
/*
This function paints the Difficulty decorations.
*/
	switch( $Difficulty ) {
	case 'Standard' : break ;
	case 'Custom' :
		debug( 5 , '\tDifficulty tint: '+$Difficulty-tint ) ;
		let tint = diy.settings.getTint('Difficulty-tint' ) ; //mover a listener
		Difficulty_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
		sheet.paintImage( g , Difficulty_tinter.getTintedImage() , 'Difficulty' ) ;
		break ;
	default :
		if( diy.settings.getTint( $Difficulty+'-tint' ) == null ){
			debug( 0 , '\tError: Tint not defined.' ) ;
			debug( 0 , '\tTint: '+diy.settings.get( $Difficulty+'-tint' ) ) ;
			break ;
		}
		debug( 5 , '\tTint: '+diy.settings.get( $Difficulty+'-tint' ) ) ;
		tint = diy.settings.getTint( $Difficulty+'-tint' ) ;
		Difficulty_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
		sheet.paintImage( g , Difficulty_tinter.getTintedImage() , 'Difficulty' ) ;
		break ;
	}
}

function paintCustomBody( diy , g , sheet ){ debug( 2 , '\n\tpaintCustomBody' ) ;
/*
This function paints the tinted text box and custom sphere icon for the rules text.
CustomBody_tinter must de defined in createFrontPainter.
CustomBodyIcon_tinter is optional.
*/
	debug( 5 , '\tTint: '+$Custom-tint ) ;
	let tint = diy.settings.getTint('Custom-tint' ) ;
	CustomBody_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
	let image = CustomBody_tinter.getTintedImage() ;
	sheet.paintImage( g , image , 'Template-region' ) ;

	if(CustomBodyIcon_tinter){
		debug( 2 , '\tpaintCustomBodyIcon: '+$Difficulty ) ;
		image = PortraitList[ portraitIndexOf('BodyIcon' ) ].getImage() ; // get image from portrait
		CustomBodyIcon_tinter.setImage( image ) ; // put image into tinter
		CustomBodyIcon_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // modify tinter colour
		image = CustomBodyIcon_tinter.getTintedImage() ; // get tinted image
		debug( 5 , '\tTransparency: '+$BodyIcon-transparency ) ;
		image = ImageUtilities.alphaComposite( image , Number($BodyIcon-transparency)/10 ) ; // apply transparency
		sheet.paintImage( g , image , 'BodyIcon-portrait-clip-region' ) ;
	}
}

function paintCustomColour( diy , g , sheet ){ debug( 2 , '\n\tpaintCustomColour' ) ;
/*
This function paints the small tinted sphere decorations.
*/
	debug( 5 , '\tTint: '+$Custom-tint ) ;
	let tint = diy.settings.getTint('Custom-tint' ) ;
	CustomColour_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ; // mover a listener
	sheet.paintImage( g , CustomColour_tinter.getTintedImage() , 'Template-region' ) ;
}

function createTinter( key , diy ){ debug(3,'\n\tcreateTinter: '+key) ;
/*
This function creates a TintCache. TintCaches are functions that
take a image and colorize them to use, for example, in stats like
HitPoints and Progress. The source image is the same for both stats,
but it is colorized through the TintCache. Initial tint color is defined by
$key-tint and source image by $key-tintable. These elements may change
in the paintFront/Back functions.
*/
	let image = diy.settings.getImageResource( key+'-tintable' ) ;
	let tinter = new TintCache( new TintFilter() , image ) ;

	let tint ;
	if( diy.settings.get( key+'-tint' ) == null){
		debug( 0 , '\tWARNING: '+key+'-tint: UNDEFINED' ) ;
		tint = diy.settings.getTint('Custom' ) ;
	}else{
		debug( 5 , '\t'+key+'-tint: '+diy.settings.get( key+'-tint' ) ) ;
		tint = diy.settings.getTint( key ) ;
	}
	tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;

	return tinter ;
}

function filterFunction( filter ){
	let f = function filter( source ){ return filter.filter.filter( source , null ) ; } ;
	f.filter = filter ;
	return f ;
}

/* OTHER STUFF */

function loadSettings(diy){ debug(3,'\n\tloadSettings') ;
//revisar
/*
This function is called on new component creation.
It loads default component settings for regions that
define text and image positions, or text format.
*/
	if( sourcefile == 'Quickscript' ) diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/'+PathCard+'component.settings' ) ;
	else diy.settings.addSettingsFrom( PathCard+'component.settings' ) ;
}

function loadExample(diy){ debug(3,'\n\tloadExample') ;
//revisar
/*
This function is called on new component creation.
It loads example component settings and localized strings.
Then, it loads the settings from the plugin preferences.
*/
	if( sourcefile == 'Quickscript' ){
		diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/'+PathCard+'example.settings' ) ;
		diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/'+PathCard+'example.properties' ) ;
	}else{
		diy.settings.addSettingsFrom( PathCard+'example.settings' ) ;
		let locale = getLocale() ;
		diy.settings.addSettingsFrom( PathCard+'example.properties' ) ;
		if( locale != 'en' ){
			try{ diy.settings.addSettingsFrom( PathCard+'example_'+locale+'.properties' ) ;
			}catch( err ){ throw new Error(Card+' '+@LRL-error-ExampleNotLocalized) ; }
		}
	}
}

function loadPreferences(diy){ debug(3,'\n\tloadPreferences') ;
/*
This function loads the default value from LRL preferences.
This is useful when creating a lot of components for the same collection.
*/
	setValueFromPreferences('Copyright',diy) ;
	setValueFromPreferences('CollectionInfo',diy) ;
	setValueFromPreferences('Collection',diy) ;
	setValueFromPreferences('Collection-portrait-template',diy) ;
	// If Custom icon is selected in preferences, the custom icon path is used.
	// This path should include the icon from the current project and start with 'project:'

	if( diy.settings.get('EncounterSet' ) != null ){
	// Check if the setting is used for this component.
	// $setting should be set in example.properties if needed, even as empty string.
	// Reading a $setting not defined, returns null.
		setValueFromPreferences('EncounterSet',diy) ;
		setValueFromPreferences('EncounterSet-portrait-template',diy) ;
	}
}

//function paintDividerCommon( g , diy , sheet ){ // obsoleto
///*
//	This function paints all the stuff that is the same in both sides of the component,
//*/
//	paintPortrait('Portrait' , g , sheet ) ;
//
//// TEMPLATE
//	var hsb;
//	switch( String($Template) ){
//	case 'CustomDifficulty':
//	case 'CustomSphere':
//		hsb = diy.settings.getTint('Template' ) ;
//		Template_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
//		break;
//	default:
//		hsb = diy.settings.getTint( $Template ) ;
//		Template_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
//	}
//
//	sheet.paintImage( g , Template_tinter.getTintedImage() , Card+'-template' ) ;
//
//	switch( String($Template) ){
//	case 'CustomDifficulty':
//		hsb = diy.settings.getTint('Template' ) ;
//		EncounterDeco_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
//		sheet.paintImage( g , EncounterDeco_tinter.getTintedImage() , Card+'-template' ) ;
//		break;
//	case 'Standard':
//	case 'Nightmare':
//	case 'Saga':
//		hsb = diy.settings.getTint( $Template ) ;
//		EncounterDeco_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
//		sheet.paintImage( g , EncounterDeco_tinter.getTintedImage() , Card+'-template' ) ;
//		break;
//	default:
//		if( sheet.getSheetIndex() == BACK ){
//			let templateImage = diy.settings.getImageResource( Card+'-template' ) ;
//			templateImage = ImageUtils.mirror( templateImage ) ;
//			sheet.paintImage( g , templateImage , Card+'-template' ) ;
//		}else{ sheet.paintTemplateImage( g ) ; }
//	}
//
//// ADAPTER
//	var adapterImage = null ;
//
//	var decoType ;
//	switch( String($Template) ){
//	case 'Standard':
//	case 'Nightmare':
//	case 'Saga':
//	case 'CustomDifficulty':
//		decoType = 'Encounter';
//		break;
//	default:
//		decoType = 'Player';
//	}
//
//	EncounterSetIcon = getIcon('EncounterSet' ) ;
//	switch( String($IconLayout) ){
//	case 'Left':
//		adapterImage = ImageUtils.get( PathCard+decoType+'-adapter-Left.jp2' ) ;
//		if( sheet.getSheetIndex() == BACK ) adapterImage = ImageUtils.mirror( adapterImage ) ;
//		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
//
//		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Left' ) ;
//		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Right' ) ;
//		break;
//	case 'LeftMiddle':
//		adapterImage = ImageUtils.get( PathCard+decoType+'-adapter-LeftMiddle.jp2' ) ;
//		if( sheet.getSheetIndex() == BACK ) adapterImage = ImageUtils.mirror( adapterImage ) ;
//		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
//
//		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-LeftMiddle' ) ;
//		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-RightMiddle' ) ;
//		break;
//	case 'RightMiddle':
//		adapterImage = ImageUtils.get( PathCard+decoType+'-adapter-LeftMiddle.jp2' ) ;
//		if( sheet.getSheetIndex() == FRONT ) adapterImage = ImageUtils.mirror( adapterImage ) ;
//		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
//
//		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-RightMiddle' ) ;
//		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-LeftMiddle' ) ;
//		break;
//	case 'Right':
//		adapterImage = ImageUtils.get( PathCard+decoType+'-adapter-Left.jp2' ) ;
//		if( sheet.getSheetIndex() == FRONT ) adapterImage = ImageUtils.mirror( adapterImage ) ;
//		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
//
//		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Right' ) ;
//		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Left' ) ;
//		break;
//	default:
//		adapterImage = ImageUtils.get( PathCard+decoType+'-adapter-Title.jp2' ) ;
//		if( sheet.getSheetIndex() == BACK ) adapterImage = ImageUtils.mirror( adapterImage ) ;
//		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
//		CollectionIcon = getIcon('Collection' ) ;
//		if( sheet.getSheetIndex() === FRONT ){
//			sheet.paintImage( g , EncounterSetIcon , Card+'-icon-TitleLeft' ) ;
//			sheet.paintImage( g , CollectionIcon , Card+'-icon-TitleRight' ) ;
//		}else{
//			if( Card == 'DividerHorizontal' ){
//				regionLeft = diy.settings.getRegion( Card+'-icon-TitleLeft-back' ) ;
//				regionRight = diy.settings.getRegion( Card+'-icon-TitleRight-back' ) ;
//			}else{
//				regionLeft = diy.settings.getRegion( Card+'-icon-TitleLeft' ) ;
//				regionRight = diy.settings.getRegion( Card+'-icon-TitleRight' ) ;
//			}
//			if( diy.settings.getBoolean('IconSwap' , false ) === true ){
//				sheet.paintImage( g , EncounterSetIcon , regionRight ) ;
//				sheet.paintImage( g , CollectionIcon , regionLeft ) ;
//			}else{
//				sheet.paintImage( g , EncounterSetIcon , regionLeft ) ;
//				sheet.paintImage( g , CollectionIcon , regionRight ) ;
//			}
//		}
//		if( (Card == 'DividerHorizontal') && (sheet.getSheetIndex() == BACK) ){
//			Name_writer.markupText = $Name ;
//			Name_writer.drawAsSingleLine( g , diy.settings.getRegion('DividerHorizontal-Name-back' ) ) ;
//		}else{ writeLine('Name' , Name_writer , g , diy ) ; }
//	}
//
//// ICONS
//	writeTextOutlined('Artist' , Artist_writer , getStroke('Bottom' , diy ) , diy , g , sheet ) ;
//	paintIcon('Collection' , g , sheet ) ;
//	paintIcon('EncounterSet' , g , sheet ) ;
//
//}

function updateExternalPortrait( key , diy ){ debug(3,'\n\tupdateExternalPortrait: '+key) ;
// this funtion provides support for updating through external scripting
// user definable elements that don't relly just on settings, like the
// portraits. Some other stuff, like the Artist, have special
	let value = diy.settings.get( key+'-external-path' ) ;
	if(	( value != '' ) && ( value != null ) ){
		index = portraitIndexOf( key ) ;
		PortraitList[ index ].setImage( value , diy.settings.getImageResource( key+'-external-path' ) ) ;
		diy.settings.set( key+'-external-path' , '' ) ;

		value = diy.settings.get( key+'-external-panx' ) ;
		if(	( value != '' ) && ( value != null ) ){
			PortraitList[ index ].setPanX( value ) ;
			diy.settings.set( key+'-external-panx' , '' ) ;
		}

		value = diy.settings.get( key+'-external-pany' ) ;
		if(	( value != '' ) && ( value != null ) ){
			PortraitList[ index ].setPanY( value ) ;
			diy.settings.set( key+'-external-pany' , '' ) ;
		}

		value = diy.settings.get( key+'-external-scale' ) ;
		if(	( value != '' ) && ( value != null ) ){
			PortraitList[ index ].setScale( value ) ;
			diy.settings.set( key+'-external-scale' , '' ) ;
		}
	}
}

/* Strange Eons main functions */
function onRead( diy , ois ){ debug(1,'\nonRead') ;
/*
This is one of the main functions on scripted components.
This function is called by Strange Eons on component file loading.
When using custom portrait handling, Portraits must be loaded
explicitly.
*/
	if( diy.settings.get('VersionHistory' , '' ) == '' ){
		debug( 0 , 'VersionHistory nonexistent.' ) ;
		$VersionHistory = diy.version ;
	}
	let LastVersion = String($VersionHistory).split(',') ;
	LastVersion = LastVersion[ LastVersion.length - 1 ] ;
	if( LastVersion != Number(LibraryVersion+CardVersion) ){
		debug( 4 , 'VersionHistory updated.' ) ;
		$VersionHistory = $VersionHistory+','+LibraryVersion+CardVersion ;
	}

	try{ portrait = ois.readObject() ; }catch(err){ portrait = null ; }
	while( portrait != null ){
		let index = PortraitList.length ;
		PortraitList[ index ] = portrait ;
		try{ portrait = ois.readObject() ; }catch(err){ portrait = null ; }
	}
	if( diy.settings.getBoolean('LRL-PreferencesUpdate' , false ) ) loadPreferences(diy) ;
}

function onWrite( diy , oos ){ debug(1,'\nonWrite') ;
/*
This is one of the main functions on scripted components.
This function is called by Strange Eons on component file save.
When using custom portrait handling, Portraits must be saved
explicitly.
*/
	for( let index in PortraitList ){ oos.writeObject( PortraitList[ index ] ) ; }
}

function onClear(diy){ debug(1,'\nonClear') ;
/*
This is one of the main functions on scripted components.
This function is called by the Strange Eons user interface on
Edit>Clear menu. Should be used only to initialize the component
settings and controls.
In my code, I use the Localizable list defined in the game object
to clear all the text of the card.
*/
	for( let index in GO.LocalizableList ){ diy.settings.reset( GO.LocalizableList[ index ] ) ; }
}
