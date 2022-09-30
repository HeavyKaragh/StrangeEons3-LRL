useLibrary('diy') ;
useLibrary('common') ;
useLibrary('ui') ;
useLibrary('markup') ;
useLibrary('fontutils') ;
useLibrary('imageutils') ;
useLibrary('tints') ;
importClass(arkham.component.DefaultPortrait) ;
importClass(ca.cgjennings.graphics.ImageUtilities) ;

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
var PathNumber = ResourcesPath+'number/' ;
var PathNumberTintable = ResourcesPath+'numberTint/' ;

var GameLanguage = Language.getGame() ;
var InterfaceLanguage = Language.getInterface() ;
var PortraitList = [] ;
const FRONT = [0] ;
const BACK = [1] ;
const BOTH = [0,1] ;

function getStroke(key,diy){ debug(3,'\n\tgetStroke: '+key) ;
	importClass(ca.cgjennings.graphics.filters.StrokeFilter) ;
	let stroke = diy.settings.get(key+'-stroke','none') ;
	let position = StrokeFilter.Position.OUTSIDE ;
	let transparent = new Colour(0x00000000,true) ;
	let strong = new Colour(0xf00f0f0f,true) ;
	let medium = new Colour(0xb00f0f0f,true) ;
	let light = new Colour(0x800f0f0f,true) ;
	debug(5,'\tValue: '+stroke) ;
	switch(String(stroke) ){
	case 'none' : 		return new StrokeFilter(transparent,1,position) ; break ;
	case 'Strong' :		return new StrokeFilter(strong,2,position) ; break ;
	case 'StrongThin' :	return new StrokeFilter(strong,1,position) ; break ;
	case 'StrongWide' :	return new StrokeFilter(strong,3,position) ; break ;
	case 'Medium' :		return new StrokeFilter(medium,2,position) ; break ;
	case 'MediumThin' :	return new StrokeFilter(medium,1,position) ; break ;
	case 'MediumWide' :	return new StrokeFilter(medium,3,position) ; break ;
	case 'Light' :		return new StrokeFilter(light,2,position) ; break ;
	case 'LightThin' :	return new StrokeFilter(light,1,position) ; break ;
	case 'LightWide' :	return new StrokeFilter(light,3,position) ; break ;
	case 'Custom' :
		let colour = diy.settings.getColour(key+'-stroke-colour',new Colour(0xffff0000,true)) ;
		let width = diy.settings.getFloat(key+'-stroke-width',2) ;
		return new StrokeFilter(colour,width,position) ;
		break ;
	default :
		throw new Error('\tERROR: Stroke: UNDEFINED') ;
		return new StrokeFilter(transparent,1,position) ;
	}
}

function getPortraitImage(key){ debug(3,'\n\tgetPortraitImage: '+key) ;
	return PortraitList[portraitIndexOf(key)].getImage() ; 
}

var IconSize = $LRL-uiIconSize ;

/* DEBUGGING */
function debug(level,text){ if(Number($LRL-debug )>=level) println(text) ; }

/* HELPER FUNCTIONS */
function isOdd(number){ return Boolean(Number(number)&1) ; } //obsoleto ???

function getLocale(){ debug(3,'\n\tgetLocale') ;
/*
Returns the main locale used by the component. This is used to support several
text translations in the same component.
*/
	let output = String(Language.getGameLocale()) ;
	output = output.split('_') ;
	output = output[0] ;

	debug(4,'\tOutput: '+output) ;
	return String(output) ;
}

function getRegionTemplate(key,diy){
	return diy.settings.getRegion($Template+'-'+key,diy.settings.getRegion(key)) ;
}

function updateToPreferences(key,diy){ debug(3,'\n\tupdateToPreferences: '+key) ;
/*
Used to overwrite values on component creation or loading if 
$LRL-UpdateToPreferences option is enabled in user preferences.
Looks for $LRL-key value, if not available, keep $key value.
$key values are kept too if the $LRL-value is an empty string ('')
or 'KeepValue'.
*/
//importClass(ca.cgjennings.apps.arkham.AbstractStrangeEonsEditor) ;

	debug(5,'\tLRL-UpdateToPreferences: '+$LRL-UpdateToPreferences) ;
	let output = '' ;
	if(diy.settings.getBoolean('LRL-UpdateToPreferences', false) ){
		let value = diy.settings.get('LRL-'+key,'') ;
		if((value!='') // used to avoid overwriting texts
			&& (value!='KeepValue') // used to avoid overwriting lists 
		){
			diy.settings.set(key,value) ;
			debug(4,'\tUpdated: '+value) ;
		}
	}
}

function getKeyForTemplate(key,diy){ debug(3,'\n\tgetKeyForTemplate: '+key) ;
/*
Looks for the most specific setting name. It's used to get correct settings
depending on template variant selected.
Will look for and RETURN, if it exists, in this order:
	1- $Template-key
	2- key
	3- null
*/
	debug(5,'\tTemplate: '+$Template) ;
	let output = null ;
	
	if(diy.settings.get($Template+'-'+key)!=null) output = $Template+'-'+key ;
	else if(diy.settings.get(key)!=null) output = key ;

	debug(4,'\tOutput: '+output) ;
	return String(output) ;
}

function getArray(key,diy){ debug(3,'\n\tgetArray: '+key) ;
/*
Convert a setting to an array.
*/
	let output = diy.settings.get(key) ;
	if(output==null) throw new Error('\tERROR: '+key+': UNDEFINED') ;
	else{
		output = String(output).split(',') ;
		debug(4,'\tOutput: '+output) ;
	}

	return output ;
}

function createCombo(list){ debug(3,'\n\tcreateCombo') ;
/*
Creates a combo suitable for a ui comboBox from a list.
It's used on components that use the same lists for several controls,
like Set, Set1, etc on Quest card.
*/
	importClass(arkham.diy.ListItem) ;
	
	let output = new Array() ;
	
	debug(5,'\tList: '+list) ;
	for( let index in list ){
		let item = list[index] ;
		debug(5,'\tItem: '+item) ;
		output[index] = ListItem(item,@('LRL-'+item),uiIcon(item) ) ;
	}
	
	debug(4,'\tOutput: '+output) ;
	return output ;
}

function uiComboIcon(key,combo,bindings,sides){ debug(3,'\n\tuiIconCombo: '+key) ;
/*
Creates a user interface comboBox using a combo.
It's used on components that use the same lists for several controls,
like Set, Set1, etc on Quest card.
*/
	if(sides==null) sides = BOTH ;

	let control = new comboBox(combo,null) ;
	bindings.add(key,control,sides) ;
	
	return control ;
}

function uiListIcon(key,list,bindings,sides){ debug(3,'\n\tuiIconList: '+key) ;
/*
Creates a user interface comboBox using the icons in "list".
*/
	importClass(arkham.diy.ListItem) ;
	if(sides==null) sides = BOTH ;
		
	let combo = new Array() ;
	for( let index in list ){
		let item = list[index] ;
		combo[index] = ListItem(item,@('LRL-'+item),uiIcon(item) ) ;
	}

	let control = new comboBox(combo,null) ;
	bindings.add(key,control,sides) ;
	
	return control ;
}

function uiListIconLabeled(key,list,bindings,sides){ debug(3,'\n\tuiIconListLabeled: '+key) ;
/*
Creates a user interface comboBox using the icons in "list".
*/
	let grid = new TypeGrid() ;

	let label = '<html><b>'+@('LRL-'+key)+':' ;
	let control = uiListIcon(key,list,bindings,sides) ;
	grid.place(label,'',control,'hfill') ;
	
	return grid ;
}

function uiListText(key,list,bindings,sides){ debug(3,'\n\tuiTextList: '+key) ;
/*
Creates a user interface list containing characters of "list".
list is binded to $key, and updates the component "sides".
*/
	importClass(arkham.diy.ListItem) ;
	if(sides==null) sides = BOTH ;
	
	let combo = new Array() ;

	debug(5,'\tList: '+list) ;
	for( let index in list ){
		let item = list[index] ;
		debug(5,'\tItem: '+item) ;
		combo[index] = ListItem(item,String(item)) ;
	}

	let control = new comboBox(combo,null) ;
	bindings.add(key,control,sides) ;
	
	return control ;
}

function uiSetList(bindings,sides){ debug(3,'\n\tuiSetList') ;
	if(sides==null) sides = BOTH ;
	
	let control = new comboBox(GO.SetCombo,null) ;
	bindings.add('Set',control,sides) ;
	
	return control ;
}

function uiOtherSetList(key,bindings,sides){ debug(3,'\n\tuiOtherSetList') ;
	if(sides==null) sides = BOTH ;
	
	let control = new comboBox(GO.SetCombo,null) ;
	bindings.add(key,control,sides) ;
	
	return control ;
}

function uiCollectionList(bindings,sides){ debug(3,'\n\tuiCollectionList') ;
	if(sides==null) sides = BOTH ;
	
	let control = new comboBox(GO.CollectionCombo,null) ;
	bindings.add('Collection',control,sides) ;
	
	return control ;
}

/* TEXT FUNCTIONS */
function createTextBox(key,diy,sheet){ debug(3,'\n\tcreateTextBox: '+key) ;
/*
Used in createFrontPainter to load the settings related to the rules paragraph.
*/

	let box = new markupBox(sheet)
	box.defaultStyle = diy.settings.getTextStyle(key,null) ;
	box.setAlignment(diy.settings.getTextAlignment(key)) ;
	box.defaultStyle.add(SIZE,diy.settings.getPointSize(key,8.0)) ;
	box.defaultStyle.add(COLOUR,diy.settings.getColour(key)) ;
	box.setLineTightness(diy.settings.getFloat(key+'-lineTightness',1.0)) ;
	box.setTabWidth(diy.settings.getFloat(key+'-tabWidth',0.2)) ;

	if(diy.settings.get(key+'-shape')){ // look for a shape of the text box
		debug(5,'\t'+key+'-shape :'+diy.settings.get(key+'-shape')) ;
		box.setPageShape(diy.settings.getCupShape(key)) ; // only cupshape is supported
	}

	switch(String($(key+'-textFitting')) ){
	case 'none':	box.setTextFitting(FIT_NONE) ; break ; //don't fit text
	case 'spacing':	box.setTextFitting(FIT_TIGHTEN_LINE_SPACING) ; break ;
	case 'scaling':	box.setTextFitting(FIT_SCALE_TEXT) ; break ;
	case 'both':	box.setTextFitting(FIT_BOTH) ; break ; //fit text by shrinking it and reducing the space between lines
	}
	box.setScalingLimit(diy.settings.getFloat(key+'-scalingLimit',0.7)) ;
	box.setTightnessLimit(diy.settings.getFloat(key+'-lineTightnessLimit',0.5)) ;

	for( let index in GO.TagList ){
		let item = GO.TagList[index] ;
		box.setReplacementForTag(diy.settings.get(item+'-tag'),diy.settings.get(item+'-tag-replacement')) ;
	}

	for( index in GO.StyleList ){
		let item = GO.StyleList[index] ;
		box.setStyleForTag(diy.settings.get(item+'-tag'),diy.settings.getTextStyle(item+'-style',null)) ;
	}

	return box ;
}

function uiName(diy,bindings,sides){ debug(3,'\n\tuiName') ;
/*
Creates the component title/name control. It's different from other text
controls because it's linked to file name and other special features.
Component "sides" will be updated on control edit.
*/
	if(sides==null) sides = BOTH ;

	let control = new textField($Name,20,null) ;
	bindings.add('Name',control,sides) ;
	diy.nameField = control ;
	
	return control ;
}

function uiNameUnique(diy,bindings,sides){ debug(2,'\n\tuiNameUnique') ;
/*
Creates the component title/name control and precedes it with Unique
icon control.
*/
	let grid = new TypeGrid() ;

	let Unique_control = new uiButtonIcon('Unique',diy,bindings,sides) ;
	let Name_control = uiName(diy,bindings,sides) ;
	grid.place(Unique_control,'',Name_control,'hfill') ;
	
	return grid ;
}

function uiNameParagraph(diy,bindings,sides){ debug(2,'\n\tuiNameParagraph') ;
/*
Creates the component title/name control. It's different from other text
controls because it's linked to file name and other special features.
Component "sides" will be updated on control edit.
This is a variant for paragraph oriented card titles, like Presentation.
*/
	if(sides==null) sides = BOTH ;

	let control = new textArea($Name,3,30,true,true) ;
	bindings.add('Name',control,sides) ;
//	diy.nameField = control ; // no funciona

	return control ;
}

function uiText(key,bindings,sides){ debug(3,'\n\tuiText: '+key) ;
/*
Returns a user interface textField. Value will be initialized and binded
to $key. Component "sides" will be updated on control edit.
*/
	if(sides==null) sides = BOTH ;

	let control = new textField($(key),20,null) ;
	bindings.add(key,control,sides) ;
	
	return control ;
}

function uiTextLabeled(key,bindings,sides){ debug(2,'\n\tuiTextLabeled: '+key) ;
/*
Returns a user interface textField. Value will be initialized and binded
to $key. Component "sides" will be updated on control edit.
*/
	let grid = new TypeGrid() ;
	
	let label = '<html><b>'+@('LRL-'+key)+':' ;
	let control = uiText(key,bindings,sides) ;
	grid.place(label,'',control,'hfill') ;
	
	return grid ;
}

function writeLine(text,writer,region,g){ debug(3,'\n\twriteLine') ;
/*
Draws $key on the component template $key-region.
*/
	writer.markupText = text ;
	writer.drawAsSingleLine(g,region) ;
}

function formatText(key,diy){ debug(3,'\n\tformatText: '+key) ;
	let format = diy.settings.get(key+'-format','') ;
	let text = diy.settings.get(key,'') ;
	let formatEnd = diy.settings.get(key+'-formatEnd','') ;
	
	let output = format+text+formatEnd ;
	
	debug(4,'\tOutput: '+output) ;
	return output ;
}

function writeCampaign(diy,g){ debug(2,'\n\twriteCampaign') ;
	let text = formatText('Campaign',diy);
	let region = diy.settings.getRegion('Campaign');
	let format = diy.settings.get('Campaign-format','')
	
	text = format+text ;
	
	debug(5,'\tText: '+text) ;
	writeLine(text,Campaign_writer,region,g) ;
}

function writeType(diy,g){ debug(2,'\n\twriteType') ;
	let text = diy.settings.get('Type','') ;
	let region = diy.settings.getRegion('Type') ;
	let format = diy.settings.get('Type-format','')
	
	if(text==''){
		text = #('LRL-'+$Template+'-'+Card) ;
		if(text=="[MISSING: LRL-"+$Template+'-'+Card+"]") text = #('LRL-'+Card) ;
	}
	text = format+text ;
	
	debug(5,'\tText: '+text) ;
	writeLine(text,Type_writer,region,g) ;
}

function writeSubtype(diy,g){ debug(2,'\n\twriteSubtype') ;
	let text = diy.settings.get('Subtype','') ;
	let region = diy.settings.getRegion($Template+'-Subtype',diy.settings.getRegion('Subtype')) ;
	let format = diy.settings.get('Subtype-format','')
	
	if(text=='') text = #('LRL-'+$Template) ;
	text = format+text ;
	
	debug(5,'\tText: '+text) ;
	writeLine(text,Subtype_writer,region,g) ;
}

function writeSetNumber(diy,g){ debug(2,'\n\twriteSetNumber') ;
	let text ;
	let number = diy.settings.get('SetNumber',0) ;
	let region = getRegionTemplate('SetNumber',diy) ;
	let format = diy.settings.get('SetNumber-format','')

	if(number>0){
		let total = diy.settings.get('SetTotal',0) ;
		if(total>0){
			let separator = diy.settings.get('SetOf','') ;
			if(separator=='') separator = #LRL-SetOf ;
			text = number+separator+total ;
		}else text = number ;
	}else text = '---' ; // if 0
	text = format+text ;
	
	debug(5,'\tText: '+text) ;
	writeLine(text,SetNumber_writer,region,g) ;
}

function writeName(diy,g){ debug(2,'\n\twriteName') ;
/*
Draws $key on the component template in the $key-region.
*/
	let text = diy.settings.get('Name','') ;
	let region = diy.settings.getRegion('Name') ;
	let format = diy.settings.get('Name-format','')
	let unique = diy.settings.get('Unique-format','<lrs>u<u+2006></lrs>') ;

	if(diy.settings.getBoolean('Unique')) text = unique+text ;
	text = format+text ;
	
	debug(5,'\tText: '+text) ;
	writeLine(text,Name_writer,region,g) ;
}

function writeNameRotated(diy,g){ debug(2,'\n\twriteNameRotated') ;
// usar nuevo drawtitlerotated
/*
Draws $key rotated on the component template in the $key-region.
*/
	let text = diy.settings.get('Name','') ;
	let region = diy.settings.getRegion('Name') ;
	let format = diy.settings.get('Name-format','')
	let unique = diy.settings.get('Unique-format','<lrs>u<u+2006></lrs>') ;

	if(diy.settings.getBoolean('Unique',false)) text = unique+text ;
	text = format+text ;
	
	debug(5,'\tText: '+text) ;
	Name_writer.markupText = text ;

	let oldTransform = g.getTransform() ;
	g.rotate(-Math.PI/2,0,0) ; // quitar 0s
	let newRegion = region.clone() ;
	let x = region.getX() ;
	let y = region.getY() ;
	let w = region.getWidth() ;
	let h = region.getHeight() ;
	newRegion.setRect(-h-y,x,h,w) ;
	Name_writer.draw(g,newRegion) ;
	g.setTransform(oldTransform) ;
}

function writeTextOutlined(text,writer,region,stroke,diy,g,sheet){ debug(3,'\n\twriteTextOutlined') ;

	let newRegion = String(region).split(',') ;
	let w = Number(newRegion[2]) ;
	let h = Number(newRegion[3]) ;

	let textImage = sheet.createTemporaryImage(w,h,true) ;
	let gi = sheet.createGraphics(textImage,true,true) ;

	writer.markupText = text ;
	writer.draw(gi,new Region([2,2,w-4,h-4])) ;
	// Text is written in a smaller region to give room to the outline
	// otherwise outline may be cut

	let originalWidth = stroke.getWidth() ;
	if((originalWidth*sheet.scalingFactor)<1 ){
		debug(0,'\tBad width: '+originalWidth*sheet.scalingFactor) ;
		stroke.setWidth(1) ;
	}else stroke.setWidth(originalWidth*sheet.scalingFactor) ;
	textImage = stroke.filter(textImage,null) ;

	sheet.paintImage(g,textImage,region) ;
}

function writeTextShadowed(key,writer,diy,g,sheet){ debug(3,'\n\twriteTextShadowed') ;
	// This function passes several times a stroke filter on a text.
	// It uses $key-shadow-* for configuration.
	importClass(ca.cgjennings.graphics.filters.StrokeFilter) ;

	let region = diy.settings.getRegion($Template+'-'+key,diy.settings.getRegion(key)) ;
	let colour = diy.settings.getColour(key+'-shadow-colour',new Colour(0x4f0f0f0f,true)) ;
	let passes = diy.settings.get(key+'-shadow-passes',6) ;
	let width = diy.settings.getFloat(key+'-shadow-width',2) ;
	if(sheet.isHighResolutionRendering()) width = width*2 ;
	
	let stroke = new StrokeFilter(colour,width,StrokeFilter.Position.OUTSIDE) ;
	
	let newRegion = diy.settings.get($Template+'-'+key+'-region',diy.settings.get(key+'-region') )
	newRegion = String(region).split(',') ;
	let w = Number(newRegion[2]) ;
	let h = Number(newRegion[3]) ;

	let textImage = sheet.createTemporaryImage(w,h,true) ;
	let gi = sheet.createGraphics(textImage,true,true) ;

	writer.markupText = formatText(key,diy) ;
	writer.draw(gi,new Region([2,2,w-4,h-4])) ;

	while(passes>0){
		textImage = stroke.filter(textImage,null) ;
		passes--;
	}

	sheet.paintImage(g,textImage,region) ;
}

function paintIconDecorated(key,diy,g,sheet){ debug(3,'\n\tpaintIconDecorated: '+key) ;
/*
Paints $icon on the component template adding an image as background.
*/
	let decoration = diy.settings.get(key+'-decoration','');
	if(decoration!=''){ 
		debug(5,'\tDecoration: '+decoration) ;
		decoration = diy.settings.getImageResource(key+'-decoration') ;
	}else throw new Error('\tERROR: '+key+'-decoration: UNDEFINED') ;
	
	let decorationRegion = diy.settings.get(key+'-decoration-region','');
	if(decorationRegion!=''){ 
		debug(5,'\tRegion: '+decorationRegion) ;
		decorationRegion = diy.settings.getRegion(key+'-decoration-region') ;
	}else throw new Error('\tERROR: '+key+'-decoration-region: UNDEFINED') ;

	sheet.paintImage(g,decoration,decorationRegion) ;
//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???

	paintIcon(key,diy,g,sheet) ;
}

function writeLineDecorated(key,writer,diy,g,sheet){ debug(3,'\n\twriteLineDecorated: '+key) ;
/*
Draws $key on the component template adding an image as background.
*/
	let decoration = diy.settings.get(key+'-decoration','');
	if(decoration!=''){ 
		debug(5,'\tImage: '+decoration) ;
		decoration = diy.settings.getImageResource(key+'-decoration') ;
	}else throw new Error('\tERROR: '+key+'-decoration: UNDEFINED') ;
	
	let decorationRegion = diy.settings.get(key+'-decoration-region','');
	if(decorationRegion!=''){ 
		debug(5,'\tRegion: '+decorationRegion) ;
		decorationRegion = diy.settings.getRegion(key+'-decoration-region') ;
	}else throw new Error('\tERROR: '+key+'-decoration-region: UNDEFINED') ;

	sheet.paintImage(g,decoration,decorationRegion) ;
	//usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
	writer.markupText = formatText(key,diy) ;
	writer.drawAsSingleLine(g,diy.settings.getRegion(key)) ;
}

function formatPage(diy,g,sheet){ debug(2,'\n\tformatPage') ;
	let output ;
	let number = diy.settings.get('PageNumber',0) ;
	let format = diy.settings.get('Page-format','') ;

	if(number>0){
		number = number+sheet.getSheetIndex() ; // increase by 1 in odd pages
		let page = diy.settings.get('LRL-Page','')
		if(page=='') page = #LRL-Page ;
			
		let total = diy.settings.get('PageTotal',0) 
		if(total>0){
			let pageOf = diy.settings.get('LRL-PageOf','') ;
			if(pageOf=='') pageOf = #LRL-PageOf ;
			if(pageOf=="[MISSING: LRL-PageOf]") pageOf = '<u+2004>/' ;
			output = format+page+number+pageOf+total ;
		}else output = format+page+number ;
	}else output = '' ; // if 0

	debug(5,'\tOutput: '+output) ;
	return output ;
}

function writePage(diy,g,sheet){ debug(2,'\n\twritePage') ;
	let number = diy.settings.get('PageNumber',0) ;
	
	if (number>0){
		let region ;
		let side = '' ;
		if(sheet.getSheetIndex()==1) side = '-back' ;
		let decoration = diy.settings.get('Page-decoration','') ;
		
		if(decoration!=''){
			let decoration = diy.settings.getImageResource('Page-decoration') ;
			region = diy.settings.getRegion('Page'+side+'-decoration',diy.settings.getRegion('Page-decoration')) ;
			sheet.paintImage(g,decoration,region) ;
		}
		
		Page_writer.markupText = formatPage(diy,g,sheet) ;
		region = diy.settings.getRegion('Page'+side,diy.settings.getRegion('Page')) ;
		Page_writer.drawAsSingleLine(g,region) ;
	}
}

function writeOption(key,diy,g,sheet){ debug(2,'\n\twriteOption: '+key) ;
	let text = diy.settings.get(key,'') ;
	if(text!='') writeLineDecorated(key,Option_writer,diy,g,sheet) ;
}

function formatArtist(key,diy){ debug(2,'\n\tformatArtist') ;
	let output = '' ;
	let text = diy.settings.get(key,'') ;
	let format = diy.settings.get(key+'-format','') ;
	switch(String(text)){
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

	debug(4,'\tOutput: '+output) ;
	return output ;
}

function writeArtist(diy,g,sheet){ debug(2,'\n\twriteArtist') ;
	let text = formatArtist('Artist',diy) ;
	let region = diy.settings.getRegion('Artist') ;
	let stroke = getStroke('Bottom',diy) ;
	writeTextOutlined(text,Bottom_writer,region,stroke,diy,g,sheet) ;
}

function writeArtistBack(diy,g,sheet){ debug(2,'\n\twriteArtistBack') ;
	let text ;
	let stroke = getStroke('Bottom',diy) ;
	let region = diy.settings.getRegion('Artist') ;
	if(diy.settings.getBoolean('PortraitShare',true) ){
		debug(5,'\tPortrait shared.') ;
		text = formatArtist('Artist',diy) ;
	}else text = formatArtist('ArtistBack',diy) ;
	writeTextOutlined(text,Bottom_writer,region,stroke,diy,g,sheet) ;
}

function writeCopyright(diy,g,sheet){ debug(2,'\n\twriteCopyright') ;
	let text = formatText('Copyright',diy) ;
	let region = diy.settings.getRegion('Copyright') ;
	let stroke = getStroke('Bottom',diy) ;
	writeTextOutlined(text,Bottom_writer,region,stroke,diy,g,sheet) ;
}
function writeCollectionInfo(diy,g,sheet){ debug(2,'\n\twriteCollectionInfo') ;
	let text = formatText('CollectionInfo',diy) ;
	let region = diy.settings.getRegion('CollectionInfo') ;
	let stroke = getStroke('Bottom',diy) ;
	writeTextOutlined(text,Bottom_writer,region,stroke,diy,g,sheet) ;
}
function writeCollectionNumber(diy,g,sheet){ debug(2,'\n\twriteCollectionNumber') ;
	let text = diy.settings.get('CollectionNumber','0') ;
	if(text == '0') text = '---' ;
	let region = diy.settings.getRegion('CollectionNumber') ;
	let stroke = getStroke('Bottom',diy) ;
	writeTextOutlined(text,Bottom_writer,region,stroke,diy,g,sheet) ;
}

function uiParagraph(key,bindings,sides,size){ debug(3,'\n\tuiParagraph: '+key) ;
/*
Returns a user interface textArea. Value will be initialized and binded
to $key. Area "size" defaults to regular card text box size. Component
"sides" will be updated on control edit.
*/
	if(sides==null) sides = BOTH ;
	if(size==null) size = 'medium' ;
	
	let rows = 4 ;
	let columns = 50 ;
	
	switch(String(size) ){
	case 'line' :	rows = 1 ; break ;
	case 'small' :	rows = 2 ; break ;
	case 'medium' :	rows = 4 ; break ;
	case 'big' :	rows = 8 ; break ;
	case 'huge' :	rows = 20 ; break ;
	}

	let control = new textArea($(key),rows,columns,true,true) ;
	bindings.add(key,control,sides) ;
	return control ;
}

function uiParagraphLabeled(key,bindings,sides,size){ debug(3,'\n\tuiParagraphLabeled: '+key) ;
/*
Returns a user interface grid containing a textArea control and a
text label above it, both depending on key name.
*/
	let grid = new TypeGrid() ;
	let label = @('LRL-'+key+'-uiParagraphLabeled') ;
	if(label=="[MISSING: LRL-"+key+"-uiParagraphLabeled]") label = @('LRL-'+key) ;
	label = '<html><b>'+label ;
	
	let control = new uiParagraph(key,bindings,sides,size) ;
	grid.place(	label,'center',control,'br hfill') ;
	return grid ;
}

function writeParagraph(parts,writer,region,diy,g){ debug(3,'\n\twriteParagraph: '+parts) ;
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
	if(parts==null) parts = new Array('Rules') ;

	let text = '' ;
	
	for(let index in parts ){
		let key = parts[index] ;
		let newText = diy.settings.get(key,'') ;
		if(newText!=''){
			if(text!='') text = text+diy.settings.get('Body-break','') ;
			let format = diy.settings.get(key+'-format','') ;
			let formatEnd = diy.settings.get(key+'-formatEnd','') ;
			text = text+format+newText+formatEnd ;
		}
	}
	writer.setMarkupText(text) ;
	updateNameTags(writer,diy) ;
	writer.draw(g,region) ;
}
function writeBody(parts,diy,g){ debug(2,'\n\twriteBody') ;
	// This looks for $Template-Body-region, and if not found, uses Body-region
	let region = diy.settings.getRegion($Template+'-Body',diy.settings.getRegion('Body')) ;
	writeParagraph(parts,Body_writer,region,diy,g) ;
	
//// sacar TraitOut a componente
//	if(diy.settings.getBoolean('TraitOut') ){ // \u00bfconvertir en permanente?
//		let index = parts.indexOf('Trait') ;
//		if (index > -1) {
//			writeParagraph(
//				['Trait'],Body_writer,
//				diy.settings.getRegion('TraitOut-Trait',diy.settings.getRegion('Body') ),diy,g
//			) ;
//			parts.splice(index, 1) ;
//			writeParagraph(
//				parts,Body_writer ,
//				diy.settings.getRegion('TraitOut-Body',diy.settings.getRegion('Body') ),diy,g
//			) ;
//		}else{
//			writeParagraph(parts,Body_writer,diy.settings.getRegion('Body'),diy,g) ;
//		}
//	}else{
//		writeParagraph(parts,Body_writer,diy.settings.getRegion('Body'),diy,g) ;
//	}
}

function uiTransparency(key,bindings,sides){ debug(3,'\n\tuiTransparency: '+key) ;
/*
Creates a user interface slider for body icon transparency setting.
*/
	if(sides==null) sides = BOTH ;

	let grid = new TypeGrid() ;
	let labels = [1,@LRL-High,4,@LRL-Medium,7,@LRL-Low,10,@LRL-Opaque] ;
	let control = new slider(1,10,5,labels,null) ;
	bindings.add(key+'-transparency',control,sides) ;
	 
	grid.place('<html><b>'+@LRL-uiTransparency+':','br',control,'hfill') ;
	return grid ;
}

function uiTint(key,bindings,sides){ debug(3,'\n\tuiTint: '+key) ;
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

useLibrary('diy');
useLibrary('ui');
useLibrary('imageutils');

function create(diy) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	$tintValue = '0,1,1'; // note that this will match the "Enraged" preset
	$peacefulPreset = '-60,0.43,0.78';
}

function createInterface(diy, editor ) {
	let panel = new Stack();
	hsbPanel = tintPanel();

	// define the preset tint values to use
	// (the user can still choose a custom tint if they wish)
	hsbPanel.setPresets(
		'Peaceful', $peacefulPreset, // preset values can be set from setting value
		'Enraged', '0,1,1',     //  or just a string that uses the setting value format
		'Toxic',  [0.34,1,1]    //  or an array [h,s,b] with h=angle/360
	);

	panel.add(hsbPanel );

	let bindings = new Bindings(editor, diy);
	bindings.add('tintValue', hsbPanel );
	panel.addToEditor(editor, 'Tint Presets Demo');
	bindings.bind();
}

let tintable; // the image we will tint

function createFrontPainter(diy,sheet) {
	tintable = ImageUtils.create(100, 100 );
	let g = tintable.createGraphics();
	try {
		g.setPaint(Colour.RED );
		g.fillRect(0, 0, tintable.width, tintable.height );
		g.setPaint(Colour.BLACK );
		g.drawRect(0, 0, tintable.width-1, tintable.height-1 );
	} finally {
		if(g) g.dispose();
	}
}

function paintFront(g,diy,sheet) {
	sheet.paintTemplateImage(g );
	let tint = $$tintValue.tint;
	let tinted = ImageUtils.tint(tintable, hsb );
	g.drawImage(tinted,
		(sheet.templateWidth-tintable.width)/2,
		(sheet.templateHeight-tintable.height)/2,
		null
	);

	// don't ask about unsaved changes when
	// the demo window is closed
	diy.markSaved();
}

function createBackPainter(diy,sheet) {}
function paintBack(g,diy,sheet) {}
function onClear() {}
function onRead() {}
function onWrite() {}

testDIYScript();
*/

	if(sides==null) sides = BOTH ;

	importClass(ca.cgjennings.apps.arkham.HSBPanel) ;
	let control = new HSBPanel() ;
	
	let label = @('LRL-'+key+'-uiTint') ;
	if(label=="[MISSING: LRL-"+key+"-uiTint]") label = @('LRL-'+key) ;
	control.setTitle(label) ;
	
 	control.setPresets(
 		@LRL-Neutral,$Neutral-tint
 		, @LRL-Leadership,$Leadership-tint
		, @LRL-Lore,$Lore-tint
		, @LRL-Spirit,$Spirit-tint
		, @LRL-Tactics,$Tactics-tint
		, @LRL-Fellowship,$Fellowship-tint
		, @LRL-Baggins,$Baggins-tint
		, @LRL-Mastery,$Mastery-tint
		, @LRL-Red,$Red-tint
		, @LRL-Green,$Green-tint
		, @LRL-Blue,$Blue-tint
		, @LRL-Yellow,$Yellow-tint
		, @LRL-Magenta,$Magenta-tint
		, @LRL-Cyan,$Cyan-tint
		, @LRL-White,$White-tint
		, @LRL-Grey,$Grey-tint
		, @LRL-Black,$Black-tint
	) ;
 	bindings.add(key+'-tint',control,sides) ;
	return control ;
}

// User interface controls
//function iconListComboBox(list ){
///*
//Creates a user interface list containing the icons and names
//refered in "list".
//Creates an icon suitable for the user interface from the
//plugin ui folder's "name" PNG file.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	if(list==null){ list==new Array('null') ;
//		debug(0,"\tList not defined.") ;
//		return ;
//	}else{
//		debug(5,'\ticonListComboBox: '+list) ;
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
//			uiIcon(name )
//		) ;
//	}
//
//	return new comboBox(combo,null) ;
//}

function uiIcon(name){ debug(3,'\n\tuiIcon: '+name) ;
/*
Creates a user interface icon from the plugin "ui" folder's "name" PNG file.
If it's not found, the function tries to get it from the "icons" folder.
Icon size depends on the plugin's "uiIconSize" setting.
*/
	let image = ImageUtils.get(PathUi+name+'.png',false,true)
	if(image==null) image = ImageUtils.get(PathIcon+name+'.png',false,true) ;

	image = ImageUtils.createIcon(image,IconSize,IconSize) ;
	return image ;
}

function uiButtonIcon(key,diy,bindings,sides){ debug(3,'\n\tuiButtonIcon: '+key) ;
/*
Creates a toggle button with an icon from the plugin "ui" folder's "key" PNG file.
*/
	if(sides==null) sides = BOTH ;

	let control = new toggleButton('',uiIcon(key),diy.settings.getBoolean(key,false),null) ;
	bindings.add(key,control,sides) ;

	return control ;
}

function uiButtonText(key,diy,bindings,sides ){ debug(3,'\n\tuiButtonText: '+key) ;
/*
Creates a toggle button with a text label.
*/
	if(sides==null) sides = BOTH ;
	let label = @('LRL-'+key+'-uiButtonText') ;
	if(label=="[MISSING: LRL-"+key+"-uiButtonText]") label = @('LRL-'+key) ;
	label = '<html><b>'+label ;
	
	let control = new toggleButton(label,'',diy.settings.getBoolean(key, false),null) ;
	bindings.add(key,control,sides) ;

	return control ;
}
//
//function uiOptionSpecial(key,diy,bindings,sides ){ debug(2,'\n\tuiOptionSpecial: '+key) ;
///*
//Creates a toggle button with an icon from the
//plugin ui folder's "key" PNG file.
//Requires passing diy.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	
//	var combo = new Array(
//		ListItem('none',@LRL-None,ImageUtils.createIcon(ImageUtils.get(PathUi+'Empty.png'),IconSize,IconSize ) ) ,
//		ListItem('Sailing',@LRL-Sailing,ImageUtils.createIcon(ImageUtils.get(PathUi+'Sailing.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron',@LRL-EyeOfSauron,ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron2',@LRL-EyeOfSauron+' x2',ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron2.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron3',@LRL-EyeOfSauron+' x3',ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron3.png'),IconSize,IconSize ) ) ,
//		ListItem('EyeOfSauron4',@LRL-EyeOfSauron+' x4',ImageUtils.createIcon(ImageUtils.get(PathUi+'EyeOfSauron4.png'),IconSize,IconSize ) )
//	) ;
//
//	bindings.add(key,combo,[ 0,1 ]) ;
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
//	//var collectionsList = getArray('collectionsList') ;
//
//	var collections = new Array() ;
//	for(
//		let index = 0 ;
//		index < GO.GameCollectionList.length ;
//		index++
//	){
//		let item = GO.GameCollectionList[ index ] ;
//		collections = collections.concat(
//			getArray(item+'-Collection-list')
//		) ;
//	}
//	return collections ;
//}
//
//function getSets(){ debug(2,'getSets') ;
///* getSets()
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
//			getArray(item+'-Set-list')
//		) ;
//	}
//
//	return sets;
//}

//function paintSpecialOption(key,diy,g,sheet){ debug(2,'\n\tpaintSpecialOption: '+key) ;
//	let item = diy.settings.get(key,'Empty') ;
//	if(item!='Empty') sheet.paintImage(g,ImageUtils.get(PathIcon+item+'.png'),key+'-region') ;
//}

function paintAdapter(list,diy,g,sheet){ debug(3,'\n\tpaintAdapter') ;
	let image = null ;
	let selector = 0;
	
	for( let index = 0 ; index<list.length ; index++ ) if(diy.settings.get(list[index])!='Empty') selector=index+1 ;
	debug(5,'\tSelector: '+selector) ;
	
	if(diy.settings.get('Adapter-'+selector,'')!='') image = diy.settings.getImageResource('Adapter-'+selector) ;
	if(diy.settings.get($Template+'-Adapter-'+selector,'')!='') image = diy.settings.getImageResource($Template+'-Adapter-'+selector) ;
	
	if(image!=null) sheet.paintImage(g,image,'Template-region') ;
}

function paintIcon(key,diy,g,sheet){ debug(3,'\n\tpaintIcon: '+key+':'+diy.settings.get(key)) ;
/*
This paints an icon in the component. The icon position to paint is
determined by the 'key' and the actual image to paint is determined by $key.
The icon is looked for in the plugin ui folder's, as "key" PNG file.
It will also look for Nightmare and Draft variants if needed.
*/
	let item = diy.settings.get(key) ; // get the icon name contained inside $key
	let image ;
	let regionKey = getKeyForTemplate(key+'-portrait-clip-region',diy) ;
	switch(String(item)){
	case 'null' : throw new Error('\t'+key+' not defined.') ; break ;
	case 'Empty' : break ;
	case 'Custom' :
		//PortraitList[portraitIndexOf(key)].paint(g,sheet.getRenderTarget()) ;
		image = PortraitList[portraitIndexOf(key)].getImage() ;
		sheet.paintImage(g,image,regionKey) ;
		break ;
	default :
		if( (key=='Set') && ($Template=='Nightmare') ){
			image = ImageUtils.get(PathIcon+item+'-Nightmare.png',false, true) ;
			if(image==null){
				image = ImageUtils.get(PathIcon+item+'.png') ;
				image = ImageUtils.invert(image) ;
			}
		}else image = ImageUtils.get(PathIcon+item+'.png') ;
		sheet.paintImage(g,image,regionKey) ;
	}
}

function getIcon(key,diy){ debug(3,'\n\tgetIcon: '+key+':'+diy.settings.get(key)) ;
	let item = diy.settings.get(key,'') ; // get the icon name contained inside $key
	let image ;
	switch(String(item)){
	case '' : throw new Error('\t'+key+' not defined.') ; break ;
	case 'Empty' : return ImageUtils.get(PathImage+'empty1x1.png') ; break ;
	case 'Custom' : return PortraitList[portraitIndexOf(key)].getImage() ; break ;
	default :
		image = ImageUtils.get(PathIcon+item+'.png') ;
		if( (key=='Set') && ($Template=='Nightmare') ) return ImageUtils.invert(image) ;
		else return image ;
	}
}

function paintGameLogo(diy,g,sheet){ debug(3,'\n\tpaintLogo') ;
	let image ;
	switch(getLocale()){
	case 'es' : image = diy.settings.getImageResource('GameLogo-es') ; break ;
	case 'pl' : image = diy.settings.getImageResource('GameLogo-pl') ; break ;
	case 'en' : default : image = diy.settings.getImageResource('GameLogo-en') ; break ;
	}
	sheet.paintImage(g,image,'Template-region') ;
}

/* PORTRAIT related code */

function createPortrait(key,diy){ debug(3,'\n\tcreatePortrait: '+key) ;
/*
This function returns Portrait that allows user to change
and manipulate an external image to be used in the component.
Use only the key without the "Card" type.
*/
	let index = PortraitList.length ;
	PortraitList[index] = new DefaultPortrait(diy,key,false) ;
	PortraitList[index].setBackgroundFilled(diy.settings.getBoolean(key+'-portrait-backgroundFilled',true)) ;
	PortraitList[index].setClipping(diy.settings.getBoolean(key+'-portrait-clipping',true)) ;
	PortraitList[index].setScaleUsesMinimum(diy.settings.getBoolean(key+'-portrait-scaleUsesMinimum',false)) ;

	if(diy.settings.getBoolean(key+'-portrait-stencil',true)){
		let image = diy.settings.getImageResource(diy.frontTemplateKey+'-template')
		if(diy.settings.get(key) == 'PortraitBack'){
			image = diy.settings.getImageResource(diy.backTemplateKey+'-template');
		}
		let region = diy.settings.getRegion(key+'-portrait-clip-region');
		let stencil = PortraitList[index].createStencil(image,region);
		PortraitList[index].setClipStencil( stencil ) ;
	}

	debug(5,'\t-portrait-clip-region: '+diy.settings.get(key+'-portrait-clip-region')) ;
	debug(5,'\t-portrait-template: '+diy.settings.get(key+'-portrait-template')) ;
	debug(5,'\t-portrait-scale: '+diy.settings.get(key+'-portrait-scale')) ;
	debug(5,'\t-portrait-panx: '+diy.settings.get(key+'-portrait-panx')) ;
	debug(5,'\t-portrait-pany: '+diy.settings.get(key+'-portrait-pany')) ;
	debug(5,'\t-portrait-rotation: '+diy.settings.get(key+'-portrait-rotation')) ;
	debug(5,'\t-portrait-backgroundFilled: '+diy.settings.get(key+'-portrait-backgroundFilled')) ;
	debug(5,'\t-portrait-clipping: '+diy.settings.get(key+'-portrait-clipping')) ;
	debug(5,'\t-portrait-scaleUsesMinimum: '+diy.settings.get(key+'-portrait-scaleUsesMinimum')) ;
	debug(5,'\t-portrait-stencil: '+diy.settings.get(key+'-portrait-stencil')) ;

	PortraitList[index].installDefault() ;
	debug(4,'\tPortrait index: '+portraitIndexOf(key)) ;
}

//function createLinkedPortrait(key){ debug(3,'createLinkedPortrait: '+key) ; //obsoleto
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
//	PortraitList[index] = new DefaultPortrait(portraitIndexOf('Main'),Card+'-'+key) ;
//	PortraitList[index].backgroundFilled = false ;
//	PortraitList[index].installDefault() ;
//}

function uiPortrait(key,diy){ debug(3,'\n\tuiPortrait: '+key) ;
/*
This function returns a user interface portraitPanel that
allows user to change and manipulate an external image to be
used in the component. It's also used to load external images
on some non-manipulable component places, like Collection icon.
Use only the key without the "Card" type.
*/
	let label = @('LRL-'+key+'-uiPortrait') ;
	if(label=="[MISSING: LRL-"+key+"-uiPortrait]") label = @('LRL-'+key) ;

	let control = new portraitPanel(diy,portraitIndexOf(key),label) ;
	return control ;
}

function uiPortraitMirror(key,panel){ debug(3,'\n\tuiPortraitMirror: '+key) ;
/*
This function creates a user interface button used to
mirror horizontally a Portrait control of the component.
*/
	let label = '<html><b>'+@LRL-uiPortraitMirror ;
	listener = function(){
			let index = portraitIndexOf(key) ;
			let scale = PortraitList[index].getScale() ;
			let panX = PortraitList[index].getPanX() ;
			let panY = PortraitList[index].getPanY() ;
			PortraitList[index].setImage(
				PortraitList[index].getSource(),
				ImageUtils.mirror(PortraitList[index].getImage(),true,false)
			);
			PortraitList[index].setScale(scale) ;
			PortraitList[index].setPanX(panX) ;
			PortraitList[index].setPanY(panY) ;
			panel.updatePanel() ;
		} ;
	let control = new repeaterButton(label,'',listener) ;
	return control ;
}

function uiCycler(key,list,bindings,sides){ debug(3,'\n\tuiCycler: '+key) ;
/*
This function creates a user interface button used to
select which identifing elements are shown in the card.
It's used only in "Divider" and "DividerHorizontal".
*/
	if(sides==null) sides = BOTH ;

	let labels = new Array() ;
	for( let index in list ){ 
		labels[index] = @('LRL-'+list[index]+'-uiCycler') ;
		if(labels[index]=="[MISSING: LRL-"+list[index]+"-uiCycler]") labels[index] = @('LRL-'+list[index]) ;
	}
	let control = new cycleButton(labels,list) ;
	bindings.add(key,control,sides) ;
	return control ;
}

function uiCyclerLabeled(key,list,bindings,sides){ debug(3,'\n\tuiCyclerLabeled: '+key) ;
/*
This function creates a user interface button used to
select which identifing elements are shown in the card.
It's used only in "Divider" and "DividerHorizontal".
*/
	let grid = new Grid() ;

	let control = new uiCycler(key,list,bindings,sides) ;
	let label = @('LRL-'+key+'-uiCyclerLabeled') ;
	if(label=="[MISSING: LRL-"+key+"-uiCyclerLabeled]") label = @('LRL-'+key) ;
	label = '<html><b>'+label+':' ;

	grid.place(label,'',control,'') ;//wmin 50lp') ;
	
	return grid ;
}

function portraitIndexOf(key){ debug(3,'\n\tportraitIndexOf: '+key) ;
/*
Returns the portrait index of the panel built with key.
Use only the key without the "Card" type.
*/
	for( let index in PortraitList ){
		let currentKey = PortraitList[index].getBaseKey() ;
		if(currentKey==key){
			debug(4,'\tIndex: '+index) ;
			return index ;
		}
	}
	throw new Error('\tInvalid portrait key.') ;
	return null ;
}

function paintPortrait(key,diy,g,sheet){ debug(3,'\n\tpaintPortrait: '+key) ;
	if( (typeof(SE2CARD)!='undefined') && (key=='Main') ){
		// support for Strange Eons 2 card portrait
		debug(3,'WARNING: STRANGE EONS 2 COMPONENT.') ;
		sheet.paintPortrait(g) ;
	}else{
		let index = portraitIndexOf(key) ;
		PortraitList[index].paint(g,sheet.getRenderTarget()) ;
	}
	switch($PortraitShadow){
	case 'None' : break ;
	case 'Black' :
		sheet.paintImage(g,key+'-shadow','Template-region') ;
		break ;
	case 'PortraitTint' :
		if($PortraitTint=='true'){
			let image = diy.settings.getImageResource(key+'-shadow-tintable') ;
			if($Template=='Nightmare') image = createRedishImage(image) ;
			else image = createSepiaImage(image) ;
			sheet.paintImage(g,image,'Template-region') ;
		}else sheet.paintImage(g,key+'-shadow','Template-region') ;
		break ;
	case 'Custom' :
		tint = diy.settings.getTint(key+'-shadow') ;
		PortraitShadow_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		image = PortraitShadow_tinter.getTintedImage() ;
		sheet.paintImage(g,image,'Template-region') ;
		break ;
	}
}

//function paintPortraitDraft(key,g,sheet ){ debug(3,'paintPortraitDraft: '+key) ;
//	var imageTinted = PortraitList[portraitIndexOf(key)].getImage() ;
//	var imagePanX = PortraitList[portraitIndexOf(key)].getPanX() ;
//	var imagePanY = PortraitList[portraitIndexOf(key)].getPanY() ;
//	var imageRotation = PortraitList[portraitIndexOf(key)].getRotation() ;
//	var imageScale = PortraitList[portraitIndexOf(key)].getScale() ;
//	imageTinted = createHCImage(imageTinted) ;
//	var region = getArray(getKeyForTemplate(key+'-portrait-clip-region',diy)) ;
//	var AT = java.awt.geom.AffineTransform ;
//	var transform =	AT.getTranslateInstance(
//			Number(region[ 0 ] )+(Number(region[ 2 ] )/2 )+imagePanX-((imageTinted.width*imageScale )/2 ) ,
//			Number(region[ 1 ] )+(Number(region[ 3 ] )/2 )+imagePanY-((imageTinted.height*imageScale )/2 )
//		) ;
//	transform.concatenate(AT.getScaleInstance(imageScale, imageScale )) ;
//	transform.concatenate(
//		AT.getRotateInstance(
//			-imageRotation * Math.PI/180 ,
//			imageTinted.width/2 ,
//			imageTinted.height/2
//		)
//	) ;
//	g.drawImage(imageTinted, transform, null) ;
//}

function getPortraitCount(){ debug(3,'\n\tgetPortraitCount') ;
/*
Returns the portrait count.
*/
	let output = PortraitList.length ;
	debug(4,'\tOutput: '+output) ;
	return output ;
}

function getPortrait(index){ debug(3,'\n\tgetPortrait: '+index) ;
/*
Returns the portrait given by index.
*/
	if( (index<0) || (index>=PortraitList.length) ) throw new Error('\tInvalid portrait index.') ;
	return PortraitList[index] ;
}

// Following filters are used on portrait elements
const createHCImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.BrightnessContrastFilter(0.3,0.5)
	] )
) ;

const createRedishImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		//new ca.cgjennings.graphics.filters.BrightnessContrastFilter(-0.2,0.2) ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter(1.5,0.5,0.5)
	] )
) ;

const createSepiaImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter(1.5,1,0.5)
	] )
) ;
/* NUMERIC CONTROLS */
function uiSpinner(key,bindings,sides,limit){ debug(3,'\n\tuiSpinner: '+key) ;
	if(sides==null) sides = BOTH ;
	if(limit==null) limit = 999 ;

	let control = new spinner(0,limit,1,0,null) ;
 	bindings.add(key,control,sides) ;
	return control ;
}

function uiSpinnerLabeled(key,bindings,sides,limit){ debug(3,'\n\tuiSpinnerLabeled: '+key) ;
	let control = new uiSpinner(key,bindings,sides,limit) ;
	
	let grid = new Grid() ;
	let label = @('LRL-'+key+'-uiSpinnerLabeled') ;
	if(label=="[MISSING: LRL-"+key+"-uiSpinnerLabeled]") label = @('LRL-'+key) ;
	label = '<html><b>'+label+':' ;
	grid.place(label,'',control,'wmin 50lp') ;
	return grid ;
}

function uiSetNumber(bindings){ debug(3,'\n\tuiSetNumber') ;
	let grid = new Grid() ;
	
	let Number_control = new uiSpinner('SetNumber',bindings,FRONT,99) ;
	let Total_control = new uiSpinner('SetTotal',bindings,FRONT,99) ;
	
	grid.place(
		 '<html><b>'+@LRL-Number+':','' , Number_control,''
		 , @LRL-Of,'' , Total_control,''
	) ;
	return grid ;
}

function uiStat(key,bindings,sides,limit,extraList){ debug(3,'\n\tuiStat: '+key) ;
/*
Creates a user interface list containing numbers up to
"limit" and may add items contained on "extraList".
list is binded to $key, and updates the component "sides".
*/
	importClass(arkham.diy.ListItem) ;
	if(sides==null) sides = BOTH ;
	if(limit==null) limit = 9 ;
	if(extraList==null) extraList = new Array() ;

	let combo = new Array() ;
	let index = 0 ;
	do{
		combo[index] = ListItem(index,String(index)) ;
		index++ ;
	}while(index<=limit)

	index = 0 ;
	for( index in extraList ){
		combo[combo.length] = ListItem(String(extraList[index]),String(extraList[index])) ;
	}
	let control = new comboBox(combo,null) ;
	bindings.add(key,control,sides) ;
	return control ;
}

function uiStatIcon(key,bindings,sides,limit,extraList){ debug(3,'\n\tuiStatIcon: '+key) ;
/*
Creates a user interface grid containing a list control preceded
by a icon to describe it, both depending on key name.
*/
	let grid = new Grid() ;
	let icon = uiIcon(key) ;
	let control = uiStat(key,bindings,sides,limit,extraList) ; 
	grid.place(icon,'',control,'wmin 50lp') ;
	return grid ;
}

function paintStat(key,diy,g,sheet){ debug(3,'\n\tpaintStat: '+key) ;
/*
This function paints the "key" stat using a image.
Used for plain black stats like Attack.
*/
	debug(4,'\tKey value: '+diy.settings.get(key)) ;
	let image = ImageUtils.get(PathNumber+diy.settings.get(key)+'.png') ;
	let region = diy.settings.getRegion(getKeyForTemplate(key+'-region',diy)) ;
	debug(5,'\tRegion: '+region) ;
	sheet.paintImage(g,image,region) ;
}

function paintStatTinted(key,tinter,diy,g,sheet){ debug(3,'\n\tpaintStatTinted: '+key) ;
/*
This function tints and paints the "key" stat.
Used for colored stats like HitPoints.
*/
	debug(4,'\tKey value: '+diy.settings.get(key)) ;
	let image = ImageUtils.get(PathNumberTintable+diy.settings.get(key)+'.png') ;
	tinter.setImage(image) ;
	image = tinter.getTintedImage() ;
	let region = diy.settings.getRegion(getKeyForTemplate(key+'-region',diy)) ;
	debug(5,'\tRegion: '+region) ;
	sheet.paintImage(g,image,region) ;
}

/* OTHER GRAPHIC STUFF */

function paintTemplate(diy,g,sheet){ debug(3,'\n\tpaintTemplate: '+$Template) ;
/*
This funtion draws the base image selected by $template.
Note this is different from using the basic paintTemplateImage.
*/
	let template = $Template ;
	let side = sheet.getSheetIndex() ;
	if(side==1) if(diy.settings.get(template+'Back-template','')!='') template = template+'Back' ;
	debug(4,'\tTemplate: '+ diy.settings.get(template+'-template')) ;
	sheet.paintImage(g,template+'-template','Template-region') ;
}

function paintCut(diy,g,sheet){ debug(3,'\n\tpaintCut') ;
	if(diy.settings.getBoolean('ShowBleeding')){
		debug(4,'\tShowBleeding') ;
		sheet.paintImage(g,'Template-bleeding','Template-region') ;
	}
	if(diy.settings.getBoolean('ShowCut')){
		debug(4,'\tShowCut') ;
		sheet.paintImage(g,'Template-cut','Template-region') ;
	}
}

function paintDifficulty(diy,g,sheet){ debug(2,'\n\tpaintDifficulty: '+$Difficulty) ;
/*
This function paints the Difficulty decorations.
*/
	switch($Difficulty) {
	case 'Standard' : break ;
	case 'Custom' :
		debug(5,'\tDifficulty tint: '+$Difficulty-tint) ;
		let tint = diy.settings.getTint('Difficulty-tint') ; //mover a listener
		Difficulty_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		sheet.paintImage(g,Difficulty_tinter.getTintedImage(),'Difficulty') ;
		break ;
	default :
		if(diy.settings.getTint($Difficulty+'-tint')==null){
			debug(0,'\tError: Tint not defined.') ;
			debug(0,'\tTint: '+diy.settings.get($Difficulty+'-tint')) ;
			break ;
		}
		debug(5,'\tTint: '+diy.settings.get($Difficulty+'-tint')) ;
		tint = diy.settings.getTint($Difficulty+'-tint') ;
		Difficulty_tinter.setFactors(tint[0],tint[1],tint[2]) ;
		sheet.paintImage(g,Difficulty_tinter.getTintedImage(),'Difficulty') ;
		break ;
	}
}

function paintCustomBody(diy,g,sheet){ debug(2,'\n\tpaintCustomBody') ;
/*
This function paints the tinted text box and custom sphere icon for the rules text.
CustomBody_tinter must de defined in createFrontPainter.
CustomBodyIcon_tinter is optional.
*/
	debug(5,'\tTint: '+$Custom-tint) ;
	let tint = diy.settings.getTint('Custom-tint') ;
	CustomBody_tinter.setFactors(tint[0],tint[1],tint[2]) ; // mover a listener
	let image = CustomBody_tinter.getTintedImage() ;
	sheet.paintImage(g,image,'Template-region') ;

	if(CustomBodyIcon_tinter){
		debug(2,'\tpaintCustomBodyIcon: '+$Difficulty) ;
		image = PortraitList[portraitIndexOf('BodyIcon')].getImage() ; // get image from portrait
		CustomBodyIcon_tinter.setImage(image) ; // put image into tinter
		CustomBodyIcon_tinter.setFactors(tint[0],tint[1],tint[2]) ; // modify tinter colour
		image = CustomBodyIcon_tinter.getTintedImage() ; // get tinted image
		debug(5,'\tTransparency: '+$BodyIcon-transparency) ;
		image = ImageUtilities.alphaComposite(image,Number($BodyIcon-transparency)/10) ; // apply transparency
		sheet.paintImage(g,image,'BodyIcon-portrait-clip-region') ;
	}
}

function paintCustomColour(diy,g,sheet){ debug(2,'\n\tpaintCustomColour') ;
/*
This function paints the small tinted sphere decorations.
*/
	debug(5,'\tTint: '+$Custom-tint) ;
	let tint = diy.settings.getTint('Custom-tint') ;
	CustomColour_tinter.setFactors(tint[0],tint[1],tint[2]) ; // mover a listener
	let image = CustomColour_tinter.getTintedImage() ;
	sheet.paintImage(g,image,'Template-region') ;
}

function createTinter(key,diy){ debug(3,'\n\tcreateTinter: '+key) ;
/*
This function creates a TintCache. TintCaches are functions that
take a image and colorize them to use, for example, in stats like
HitPoints and Progress. The source image is the same for both stats,
but it is colorized through the TintCache. Initial tint color is defined by
$key-tint and source image by $key-tintable. These elements may change
in the paintFront/Back functions.
*/
	let image = diy.settings.getImageResource(key+'-tintable') ;
	let tinter = new TintCache(new TintFilter(),image) ;

	let tint ;
	if(diy.settings.get(key+'-tint')==null){
		debug(0,'\tWARNING: '+key+'-tint: UNDEFINED') ;
		tint = diy.settings.getTint('Custom') ;
	}else{
		debug(5,'\t'+key+'-tint: '+diy.settings.get(key+'-tint')) ;
		tint = diy.settings.getTint(key) ;
	}
	tinter.setFactors(tint[0],tint[1],tint[2]) ;

	return tinter ;
}

function filterFunction(filter){
	let f = function filter(source){ return filter.filter.filter(source,null) ; } ;
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
	if(sourcefile=='Quickscript') diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/'+PathCard+'component.settings') ;
	else diy.settings.addSettingsFrom(PathCard+'component.settings') ;
}

function loadExample(diy){ debug(3,'\n\tloadExample') ;
//revisar
/*
This function is called on new component creation.
It loads example component settings and localized strings.
Then, it loads the settings from the plugin preferences.
*/
	if(sourcefile=='Quickscript'){
		diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/'+PathCard+'example.settings') ;
		diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/'+PathCard+'example.properties') ;
	}else{
		diy.settings.addSettingsFrom(PathCard+'example.settings') ;
		let locale = getLocale() ;
		diy.settings.addSettingsFrom(PathCard+'example.properties') ;
		if(locale!='en'){
			try{ diy.settings.addSettingsFrom(PathCard+'example_'+locale+'.properties') ;
			}catch(err){ throw new Error(Card+' '+@LRL-ExampleNotLocalized-error) ; }
		}
	}
}

function loadPreferences(diy){ debug(3,'\n\tloadPreferences') ;
/*
This function loads the default value from LRL preferences.
This is useful when creating a lot of components for the same collection.
*/
	updateToPreferences('Copyright',diy) ;
	updateToPreferences('CollectionInfo',diy) ;
	updateToPreferences('Collection',diy) ;
	updateToPreferences('Collection-portrait-template',diy) ;
	// If Custom icon is selected in preferences, the custom icon path is used.
	// This path should include the icon from the current project and start with 'project:'

	if(diy.settings.get('Set')!=null){
	// Check if the setting is used for this component.
	// $setting should be set in example.properties if needed, even as empty string.
	// Reading a $setting not defined, returns null.
		updateToPreferences('Set',diy) ;
		updateToPreferences('Set-portrait-template',diy) ;
	}
}

//function paintDividerCommon(g,diy,sheet){ // obsoleto
///*
//	This function paints all the stuff that is the same in both sides of the component,
//*/
//	paintPortrait('Portrait',g,sheet) ;
//
//// TEMPLATE
//	var hsb;
//	switch(String($Template) ){
//	case 'CustomDifficulty':
//	case 'CustomSphere':
//		hsb = diy.settings.getTint('Template') ;
//		Template_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		break;
//	default:
//		hsb = diy.settings.getTint($Template) ;
//		Template_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//	}
//
//	sheet.paintImage(g,Template_tinter.getTintedImage(),Card+'-template') ;
//
//	switch(String($Template) ){
//	case 'CustomDifficulty':
//		hsb = diy.settings.getTint('Template') ;
//		EncounterDeco_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		sheet.paintImage(g,EncounterDeco_tinter.getTintedImage(),Card+'-template') ;
//		break;
//	case 'Standard':
//	case 'Nightmare':
//	case 'Saga':
//		hsb = diy.settings.getTint($Template) ;
//		EncounterDeco_tinter.setFactors(tint[0],tint[1],tint[2]) ;
//		sheet.paintImage(g,EncounterDeco_tinter.getTintedImage(),Card+'-template') ;
//		break;
//	default:
//		if(sheet.getSheetIndex()==1){
//			let templateImage = diy.settings.getImageResource(Card+'-template') ;
//			templateImage = ImageUtils.mirror(templateImage) ;
//			sheet.paintImage(g,templateImage,Card+'-template') ;
//		}else{ sheet.paintTemplateImage(g) ; }
//	}
//
//// ADAPTER
//	var adapterImage = null ;
//
//	var decoType ;
//	switch(String($Template) ){
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
//	SetIcon = getIcon('Set') ;
//	switch(String($IconLayout) ){
//	case 'Left':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-Left.jp2') ;
//		if(sheet.getSheetIndex()==1) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,SetIcon,Card+'-icon-Left') ;
//		else sheet.paintImage(g,SetIcon,Card+'-icon-Right') ;
//		break;
//	case 'LeftMiddle':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-LeftMiddle.jp2') ;
//		if(sheet.getSheetIndex()==1) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,SetIcon,Card+'-icon-LeftMiddle') ;
//		else sheet.paintImage(g,SetIcon,Card+'-icon-RightMiddle') ;
//		break;
//	case 'RightMiddle':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-LeftMiddle.jp2') ;
//		if(sheet.getSheetIndex()==0) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,SetIcon,Card+'-icon-RightMiddle') ;
//		else sheet.paintImage(g,SetIcon,Card+'-icon-LeftMiddle') ;
//		break;
//	case 'Right':
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-Left.jp2') ;
//		if(sheet.getSheetIndex()==0) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//
//		if(sheet.getSheetIndex() === 0 ) sheet.paintImage(g,SetIcon,Card+'-icon-Right') ;
//		else sheet.paintImage(g,SetIcon,Card+'-icon-Left') ;
//		break;
//	default:
//		adapterImage = ImageUtils.get(PathCard+decoType+'-adapter-Title.jp2') ;
//		if(sheet.getSheetIndex()==1) adapterImage = ImageUtils.mirror(adapterImage) ;
//		sheet.paintImage(g,adapterImage,Card+'-adapter') ;
//		CollectionIcon = getIcon('Collection') ;
//		if(sheet.getSheetIndex() === 0 ){
//			sheet.paintImage(g,SetIcon,Card+'-icon-TitleLeft') ;
//			sheet.paintImage(g,CollectionIcon,Card+'-icon-TitleRight') ;
//		}else{
//			if(Card=='DividerHorizontal'){
//				regionLeft = diy.settings.getRegion(Card+'-icon-TitleLeft-back') ;
//				regionRight = diy.settings.getRegion(Card+'-icon-TitleRight-back') ;
//			}else{
//				regionLeft = diy.settings.getRegion(Card+'-icon-TitleLeft') ;
//				regionRight = diy.settings.getRegion(Card+'-icon-TitleRight') ;
//			}
//			if(diy.settings.getBoolean('IconSwap',false) === true){
//				sheet.paintImage(g,SetIcon,regionRight) ;
//				sheet.paintImage(g,CollectionIcon,regionLeft) ;
//			}else{
//				sheet.paintImage(g,SetIcon,regionLeft) ;
//				sheet.paintImage(g,CollectionIcon,regionRight) ;
//			}
//		}
//		if((Card=='DividerHorizontal') && (sheet.getSheetIndex()==1) ){
//			Name_writer.markupText = $Name ;
//			Name_writer.drawAsSingleLine(g,diy.settings.getRegion('DividerHorizontal-Name-back')) ;
//		}else{ writeLine('Name',Name_writer,g,diy) ; }
//	}
//
//// ICONS
//	writeTextOutlined('Artist',Artist_writer,getStroke('Bottom',diy),diy,g,sheet) ;
//	paintIcon('Collection',g,sheet) ;
//	paintIcon('Set',g,sheet) ;
//
//}

function updateExternalPortrait(key,diy){ debug(3,'\n\tupdateExternalPortrait: '+key) ;
/* 
This funtion provides support for updating the portraits through external
scripting. If a $Portrait-external-path to the new image is found, that
image is used as new portrait. New position and size can also be defined.
After the load, used settings are reseted to avoid updating the portrait
every time the component is opened.
*/
	let path = diy.settings.get(key+'-external-path','') ;
	if(path!=''){
		index = portraitIndexOf(key) ;
		let image = diy.settings.getImageResource(key+'-external-path') ;
		PortraitList[index].setImage(path,image) ;
		diy.settings.set(key+'-external-path','') ;

		let value = diy.settings.get(key+'-external-panx','') ;
		if(value!='') PortraitList[index].setPanX(value) ;
		diy.settings.set(key+'-external-panx','') ;

		value = diy.settings.get(key+'-external-pany','') ;
		if(value!='') PortraitList[index].setPanY(value) ;
		diy.settings.set(key+'-external-pany','') ;

		value = diy.settings.get(key+'-external-scale','') ;
		if(value!='') PortraitList[index].setScale(value) ;
		diy.settings.set(key+'-external-scale','') ;
	}
}

/* Strange Eons main functions */
function onRead(diy,ois){ debug(1,'\nonRead') ;
/*
This is one of the main functions on scripted components.
This function is called by Strange Eons on component file loading.
When using custom portrait handling, Portraits must be loaded
explicitly.
*/
	if(diy.settings.get('VersionHistory','')==''){
		debug(0,'VersionHistory nonexistent.') ;
		$VersionHistory = diy.version ;
	}
	let LastVersion = String($VersionHistory).split(',') ;
	LastVersion = LastVersion[LastVersion.length-1] ;
	if( LastVersion!=Number(LibraryVersion+CardVersion) ){
		debug(4,'VersionHistory updated.') ;
		$VersionHistory = $VersionHistory+','+LibraryVersion+CardVersion ;
	}

	try{ portrait = ois.readObject() ; }catch(err){ portrait = null ; }
	while(portrait!=null){
		let index = PortraitList.length ;
		PortraitList[index] = portrait ;
		try{ portrait = ois.readObject() ; }catch(err){ portrait = null ; }
	}
	if(diy.settings.getBoolean('LRL-PreferencesUpdate',false)) loadPreferences(diy) ;
}

function onWrite(diy,oos){ debug(1,'\nonWrite') ;
/*
This is one of the main functions on scripted components.
This function is called by Strange Eons on component file save.
When using custom portrait handling, Portraits must be saved
explicitly.
*/
	for( let index in PortraitList ){ oos.writeObject(PortraitList[index]) ; }
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
	for( let index in GO.LocalizableList ){ diy.settings.reset(GO.LocalizableList[index]) ; }
}
