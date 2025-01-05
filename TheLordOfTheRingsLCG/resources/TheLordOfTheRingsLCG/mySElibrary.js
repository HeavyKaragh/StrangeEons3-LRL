useLibrary('diy');
useLibrary('common');
useLibrary('ui');
useLibrary('markup');
useLibrary('fontutils');
useLibrary('imageutils');
useLibrary('tints');
importClass(arkham.component.DefaultPortrait);
importClass(ca.cgjennings.graphics.ImageUtilities);

/* VERSION CONTROL */
var SEVersion = 100;
//100: 2024 rewrite

/* CONSTANTS AND VARIABLES */
var GameLanguage = Language.getGame();
var InterfaceLanguage = Language.getInterface();
var PortraitList = [];
const FRONT = [0];
const BACK = [1];
const BOTH = [0, 1];

function getStroke(key, diy) {
    debug(3, '\n\tgetStroke: ' + key);
    importClass(ca.cgjennings.graphics.filters.StrokeFilter);
    let stroke = diy.settings.get(key + '-stroke', 'none');
    let position = StrokeFilter.Position.OUTSIDE;
    let transparent = new Colour(0x00000000, true);
    let strong = new Colour(0xf00f0f0f, true);
    let medium = new Colour(0xb00f0f0f, true);
    let light = new Colour(0x800f0f0f, true);
    debug(5, '\tValue: ' + stroke);
    switch (String(stroke)) {
        case 'none':
            return new StrokeFilter(transparent, 1, position);
            break;
        case 'Strong':
            return new StrokeFilter(strong, 2, position);
            break;
        case 'StrongThin':
            return new StrokeFilter(strong, 1, position);
            break;
        case 'StrongWide':
            return new StrokeFilter(strong, 3, position);
            break;
        case 'Medium':
            return new StrokeFilter(medium, 2, position);
            break;
        case 'MediumThin':
            return new StrokeFilter(medium, 1, position);
            break;
        case 'MediumWide':
            return new StrokeFilter(medium, 3, position);
            break;
        case 'Light':
            return new StrokeFilter(light, 2, position);
            break;
        case 'LightThin':
            return new StrokeFilter(light, 1, position);
            break;
        case 'LightWide':
            return new StrokeFilter(light, 3, position);
            break;
        case 'Custom':
            let colour = diy.settings.getColour(key + '-stroke-colour', new Colour(0xffff0000, true));
            let width = diy.settings.getFloat(key + '-stroke-width', 2);
            return new StrokeFilter(colour, width, position);
            break;
        default:
            throw new Error('\tERROR: Stroke: UNDEFINED');
            return new StrokeFilter(transparent, 1, position);
    }
}

function getPortraitImage(key) {
    debug(3, '\n\tgetPortraitImage: ' + key);
    return PortraitList[portraitIndexOf(key)].getImage();
}

/* DEBUGGING */
function debug(level, text) {
    if (Number($(GAME+'-Debug')) >= level) println(text);
}

/* HELPER FUNCTIONS */
function isOdd(number) {
    return Boolean(Number(number) & 1);
} //obsoleto ???

function getLocale() {
    debug(3, '\n\tgetLocale');
    /*
    Returns the main locale used by the component. This is used to support several
    text translations in the same component.
    */
    let output = String(Language.getGameLocale());
    output = output.split('_');
    output = output[0];

    debug(4, '\tOutput: ' + output);
    return String(output);
}

function getRegionTemplate(key, diy) {
    return diy.settings.getRegion($Template + '-' + key, diy.settings.getRegion(key));
}

function getKeyForTemplate(key, diy) {
    debug(3, '\n\tgetKeyForTemplate: ' + key);
    /*
    Looks for the most specific setting name. It's used to get correct settings
    depending on template variant selected.
    Will look for and RETURN, if it exists, in this order:
    	1- $Template-key
    	2- key
    	3- null
    */
    debug(5, '\tTemplate: ' + $Template);
    let output = null;

    if (diy.settings.get($Template + '-' + key) != null) output = $Template + '-' + key;
    else if (diy.settings.get(key) != null) output = key;

    debug(4, '\tOutput: ' + output);
    return String(output);
}

function getArray(key, diy) {
    debug(3, '\n\tgetArray: ' + key);
    /*
    Convert a setting to an array.
    */
    let output = diy.settings.get(key);
    if (output == null) throw new Error('\tERROR: ' + key + ': UNDEFINED');
    else {
        output = String(output).split(',');
        debug(4, '\tOutput: ' + output);
    }

    return output;
}

function createCombo(list) {
    debug(3, '\n\tcreateCombo');
    /*
    Creates a combo suitable for a ui comboBox from a list.
    It's used on components that use the same lists for several controls,
    like Encounterset, Encounterset1, etc on Quest card.
    */
    importClass(arkham.diy.ListItem);

    let output = new Array();

    debug(5, '\tList: ' + list);
    for (let index in list) {
        let item = list[index];
        debug(5, '\tItem: ' + item);
        output[index] = ListItem(item, @('LRL-' + item), uiIcon(item));
    }

    debug(4, '\tOutput: ' + output);
    return output;
}

function uiComboIcon(key, combo, bindings, sides) {
    debug(3, '\n\tuiIconCombo: ' + key);
    /*
    Creates a user interface comboBox using a combo.
    It's used on components that use the same lists for several controls,
    like Encounterset, Encounterset1, etc on Quest card.
    */
    if (sides == null) sides = BOTH;

    let control = new comboBox(combo, null);
    bindings.add(key, control, sides);

    return control;
}

function uiListIcon(key, list, bindings, sides) {
    debug(3, '\n\tuiIconList: ' + key);
    /*
    Creates a user interface comboBox using the icons in "list".
    */
    importClass(arkham.diy.ListItem);
    if (sides == null) sides = BOTH;

    let combo = new Array();
    for (let index in list) {
        let item = list[index];
        combo[index] = ListItem(item, @('LRL-' + item), uiIcon(item));
    }

    let control = new comboBox(combo, null);
    bindings.add(key, control, sides);

    return control;
}

function uiListIconLabeled(key, list, bindings, sides) {
    debug(3, '\n\tuiIconListLabeled: ' + key);
    /*
    Creates a user interface comboBox using the icons in "list".
    */
    let grid = new TypeGrid();

    let label = '<html><b>' + @('LRL-' + key) + ':';
    let control = uiListIcon(key, list, bindings, sides);
    grid.place(label, '', control, 'hfill');

    return grid;
}

function uiListText(key, list, bindings, sides) {
    debug(3, '\n\tuiTextList: ' + key);
    /*
    Creates a user interface list containing characters of "list".
    list is binded to $key, and updates the component "sides".
    */
    importClass(arkham.diy.ListItem);
    if (sides == null) sides = BOTH;

    let combo = new Array();

    debug(5, '\tList: ' + list);
    for (let index in list) {
        let item = list[index];
        debug(5, '\tItem: ' + item);
        combo[index] = ListItem(item, String(item));
    }

    let control = new comboBox(combo, null);
    bindings.add(key, control, sides);

    return control;
}

function uiListTextLabeled(key, list, bindings, sides) {
    debug(3, '\n\tuiListTextLabeled: ' + key);
    /*
    Creates a user interface list containing characters of "list".
    list is binded to $key, and updates the component "sides".
    */
    let grid = new TypeGrid();

    let label = '<html><b>' + @('LRL-' + key) + ':';
    let control = uiListText(key, list, bindings, sides);
    grid.place(label, '', control, 'hfill');

    return grid;
}

/* TEXT FUNCTIONS */
function createWriter(key, diy, sheet) {
    debug(3, '\n\tcreateWriter: ' + key);
    /*
    Used in createFrontPainter to load the settings related to the rules paragraph.
    */

    let writer = new markupBox(sheet)
    writer.defaultStyle = diy.settings.getTextStyle(key, null);
    writer.setAlignment(diy.settings.getTextAlignment(key));
    writer.defaultStyle.add(SIZE, diy.settings.getPointSize(key, 8.0));
    writer.defaultStyle.add(COLOUR, diy.settings.getColour(key));
    writer.setLineTightness(diy.settings.getFloat(key + '-lineTightness', 1.0));
    writer.setTabWidth(diy.settings.getFloat(key + '-tabWidth', 0.2));

    if (diy.settings.get(key + '-shape')) { // look for a shape of the text box
        debug(5, '\t' + key + '-shape :' + diy.settings.get(key + '-shape'));
        writer.setPageShape(diy.settings.getCupShape(key)); // only cupshape is supported
    }

    switch (String($(key + '-textFitting'))) {
        case 'none':
            writer.setTextFitting(FIT_NONE);
            break; //don't fit text
        case 'spacing':
            writer.setTextFitting(FIT_TIGHTEN_LINE_SPACING);
            break;
        case 'scaling':
            writer.setTextFitting(FIT_SCALE_TEXT);
            break;
        case 'both':
            writer.setTextFitting(FIT_BOTH);
            break; //fit text by shrinking it and reducing the space between lines
    }
    writer.setScalingLimit(diy.settings.getFloat(key + '-scalingLimit', 0.7));
    writer.setTightnessLimit(diy.settings.getFloat(key + '-lineTightnessLimit', 0.5));

    for (let index in GAMEOBJECT.IconTagList) {
        let item = GAMEOBJECT.IconTagList[index];
        debug(5, '\nEffect tag: '+item); 
        let tag = diy.settings.get(item + '-tag');
        debug(5, 'Tag: '+tag); 
        let replacement = diy.settings.get(item + '-tag-replacement', '');
        debug(5, 'Replacement: '+replacement); 
        writer.setReplacementForTag(tag, replacement);
    }

//    for (let index in GAMEOBJECT.EffectTagList) {
//        let item = GAMEOBJECT.EffectTagList[index];
//        debug(5, '\nEffect tag: '+item); 
//        let tag = diy.settings.get(item + '-tag');
//        debug(5, 'Tag: '+tag); 
//        let replacement = diy.settings.get(item + '-tag-replacement', '');
//        if(replacement == '') replacement = #('LRL-'+item);
//        debug(5, 'Replacement: '+replacement); 
//        writer.setReplacementForTag(tag, replacement);
//    }

    for (index in GAMEOBJECT.StyleTagList) {
        let item = GAMEOBJECT.StyleTagList[index];
        debug(5, '\nEffect tag: '+item); 
        let tag = diy.settings.get(item + '-tag');
        debug(5, 'Tag: '+tag); 
        let style = diy.settings.getTextStyle(item + '-style', null);
        debug(5, 'Style: '+style); 
        writer.setStyleForTag(tag, style);
    }

    return writer;
}

function uiTitle(diy, bindings, sides) {
    debug(3, '\n\tuiTitle');
    /*
    Creates the component title/name control. It's different from other text
    controls because it's linked to file name and other special features.
    Component "sides" will be updated on control edit.
    */
    if (sides == null) sides = BOTH;

    let control = new textField($Title, 20, null);
    bindings.add('Title', control, sides);
    diy.nameField = control;

    return control;
}

function uiTitleParagraph(diy, bindings, sides) {
    debug(2, '\n\tuiTitleParagraph');
    /*
    Creates the component title/name control. It's different from other text
    controls because it's linked to file name and other special features.
    Component "sides" will be updated on control edit.
    This is a variant for paragraph oriented card titles, like Presentation.
    */
    if (sides == null) sides = BOTH;

    let control = new textArea($Title, 3, 30, true, true);
    bindings.add('Title', control, sides);
    //	diy.nameField = control ; // no funciona

    return control;
}

function uiText(key, bindings, sides) {
    debug(3, '\n\tuiText: ' + key);
    /*
    Returns a user interface textField. Value will be initialized and binded
    to $key. Component "sides" will be updated on control edit.
    */
    if (sides == null) sides = BOTH;

    let control = new textField($(key), 20, null);
    bindings.add(key, control, sides);

    return control;
}

function uiTip(key){
    debug(2, '\n\tuiTip: ' + key);
    /*
    Returns a user interface tip button .
    */

    let tip = @('LRL-' + key + '-tip');
    if(tip != '[MISSING: LRL-' + key + '-tip]') {
    	debug(5, '\n\ttext: ' + tip);
    	tip = new tipButton(tip);
	}else tip = false ;
	
	return tip;
}

function uiTextLabeled(key, bindings, sides) {
    debug(2, '\n\tuiTextLabeled: ' + key);
    /*
    Returns a user interface textField. Value will be initialized and binded
    to $key. Component "sides" will be updated on control edit.
    */
    let grid = new TypeGrid();

    let label = '<html><b>' + @('LRL-' + key) + ':';
    let control = uiText(key, bindings, sides);
    let tip = uiTip(key);
    if(tip) {
    	grid.place(label, '', control, 'hfill', tip, '');
    }else grid.place(label, '', control, 'hfill');
    
    return grid;
}

function writeLine(text, writer, region, g) {
    debug(3, '\n\twriteLine');
    /*
    Draws $key on the component template $key-region.
    */
    writer.markupText = text;
    debug(5, '\n\tText: '+text);
    debug(5, '\n\tRegion: '+region);
    writer.drawAsSingleLine(g, region);
}

function formatText(key, diy) {
    debug(3, '\n\tformatText: ' + key);
    let text = diy.settings.get(key, '');
    let format = diy.settings.get(key + '-format', '');
    let formatEnd = diy.settings.get(key + '-formatEnd', '');

    let output = format + text + formatEnd;

    debug(4, '\tOutput: ' + output);
    return output;
}


function writeTextOutlined(text, writer, region, stroke, diy, g, sheet) {
    debug(3, '\n\twriteTextOutlined');

    let newRegion = String(region).split(',');
    let w = Number(newRegion[2]);
    let h = Number(newRegion[3]);

    let textImage = sheet.createTemporaryImage(w, h, true);
    let gi = sheet.createGraphics(textImage, true, true);

    writer.markupText = text;
    writer.draw(gi, new Region([2, 2, w-4, h-4]));
    // Text is written in a smaller region to give room to the outline
    // otherwise outline may be cut

    let originalWidth = stroke.getWidth();
    if ((originalWidth * sheet.scalingFactor) < 1) {
        debug(0, '\tBad width: ' + originalWidth * sheet.scalingFactor);
        stroke.setWidth(1);
    } else stroke.setWidth(originalWidth * sheet.scalingFactor);
    textImage = stroke.filter(textImage, null);

    sheet.paintImage(g, textImage, region);
}

function writeTextShadowed(key, writer, diy, g, sheet) {
    debug(3, '\n\twriteTextShadowed');
    // This function passes several times a stroke filter on a text.
    // It uses $key-shadow-* for configuration.
    importClass(ca.cgjennings.graphics.filters.StrokeFilter);

    let region = diy.settings.getRegion($Template + '-' + key, diy.settings.getRegion(key));
    let colour = diy.settings.getColour(key + '-shadow-colour', new Colour(0x4f0f0f0f, true));
    let passes = diy.settings.get(key + '-shadow-passes', 6);
    let width = diy.settings.getFloat(key + '-shadow-width', 2);
    if (sheet.isHighResolutionRendering()) width = width * 2;

    let stroke = new StrokeFilter(colour, width, StrokeFilter.Position.OUTSIDE);

    let newRegion = diy.settings.get($Template + '-' + key + '-region', diy.settings.get(key + '-region'))
    newRegion = String(region).split(',');
    let w = Number(newRegion[2]);
    let h = Number(newRegion[3]);

    let textImage = sheet.createTemporaryImage(w, h, true);
    let gi = sheet.createGraphics(textImage, true, true);

    writer.markupText = formatText(key, diy);
    writer.draw(gi, new Region([2, 2, w-4, h-4]));

    while (passes > 0) {
        textImage = stroke.filter(textImage, null);
        passes--;
    }

    sheet.paintImage(g, textImage, region);
}

function paintIconDecorated(key, diy, g, sheet) {
    debug(3, '\n\tpaintIconDecorated: ' + key);
    /*
    Paints $icon on the component template adding an image as background.
    */
    let decoration = diy.settings.get(key + '-decoration', '');
    if (decoration != '') {
        debug(5, '\tDecoration: ' + decoration);
        decoration = diy.settings.getImageResource(key + '-decoration');
    } else throw new Error('\tERROR: ' + key + '-decoration: UNDEFINED');

    let decorationRegion = diy.settings.get(key + '-decoration-region', '');
    if (decorationRegion != '') {
        debug(5, '\tRegion: ' + decorationRegion);
        decorationRegion = diy.settings.getRegion(key + '-decoration-region');
    } else throw new Error('\tERROR: ' + key + '-decoration-region: UNDEFINED');

    sheet.paintImage(g, decoration, decorationRegion);
    //usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???

    paintIcon(key, diy, g, sheet);
}

function writeLineDecorated(key, writer, diy, g, sheet) {
    debug(3, '\n\twriteLineDecorated: ' + key);
    /*
    Draws $key on the component template adding an image as background.
    */
    let decoration = diy.settings.get(key + '-decoration', '');
    if (decoration != '') {
        debug(5, '\tImage: ' + decoration);
        decoration = diy.settings.getImageResource(key + '-decoration');
    } else throw new Error('\tERROR: ' + key + '-decoration: UNDEFINED');

    let decorationRegion = diy.settings.get(key + '-decoration-region', '');
    if (decorationRegion != '') {
        debug(5, '\tRegion: ' + decorationRegion);
        decorationRegion = diy.settings.getRegion(key + '-decoration-region');
    } else throw new Error('\tERROR: ' + key + '-decoration-region: UNDEFINED');

    sheet.paintImage(g, decoration, decorationRegion);
    //usar getRegion(d(parent, dx, dy, dw, dh)) \u00bf\u00bf\u00bf???
    writer.markupText = formatText(key, diy);
    writer.drawAsSingleLine(g, diy.settings.getRegion(key));
}


function uiParagraph(key, bindings, sides, size) {
    debug(3, '\n\tuiParagraph: ' + key);
    /*
    Returns a user interface textArea. Value will be initialized and binded
    to $key. Area "size" defaults to regular card text box size. Component
    "sides" will be updated on control edit.
    */
    if (sides == null) sides = BOTH;
    if (size == null) size = 'medium';

    let rows = 4;
    let columns = 50;

    switch (String(size)) {
        case 'line':
            rows = 1;
            break;
        case 'small':
            rows = 2;
            break;
        case 'medium':
            rows = 4;
            break;
        case 'big':
            rows = 8;
            break;
        case 'huge':
            rows = 20;
            break;
    }

    let control = new textArea($(key), rows, columns, true, true);
    bindings.add(key, control, sides);
    return control;
}

function uiParagraphLabeled(key, bindings, sides, size) {
    debug(3, '\n\tuiParagraphLabeled: ' + key);
    /*
    Returns a user interface grid containing a textArea control and a
    text label above it, both depending on key name.
    */
    let grid = new TypeGrid();
    
    let label = @('LRL-' + key + '-uiParagraphLabeled')
    if (label == "[MISSING: LRL-" + key + "-uiParagraphLabeled]") label = @('LRL-' + key);
    label = '<html><b>' + label;
    let control = new uiParagraph(key, bindings, sides, size);
    let tip = uiTip(key);
    if(tip) {
    	grid.place(label, 'center', tip, '', control, 'br hfill');
    }else grid.place(label, 'center', control, 'br hfill');

   
    return grid;
}

function writeParagraph(parts, writer, region, diy, g) {
    debug(3, '\n\twriteParagraph: ' + parts);
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
    if (parts == null) parts = new Array('Rules');

    let text = '';

    for (let index in parts) {
        let key = parts[index];
        let newText = diy.settings.get(key, '');
        if (newText != '') {
            if (text != '') text = text + diy.settings.get('Body-break', '');
            let format = diy.settings.get(key + '-format', '');
            let formatEnd = diy.settings.get(key + '-formatEnd', '');
            text = text + format + newText + formatEnd;
        }
    }
    writer.setMarkupText(text);
    updateNameTags(writer, diy);
    //$key-measuredHeight = writer.measure(g,region);
    writer.draw(g, region);
}

function uiTransparency(key, bindings, sides) {
    debug(3, '\n\tuiTransparency: ' + key);
    /*
    Creates a user interface slider for body icon transparency setting.
    */
    if (sides == null) sides = BOTH;

    let grid = new TypeGrid();
    let labels = [0, @LRL-Transparent, 5, @LRL-Medium, 10, @LRL-Opaque];
    let control = new slider(0, 10, 5, labels, null);
    bindings.add(key + '-transparency', control, sides);

    grid.place('<html><b>' + @LRL-uiTransparency + ':', 'br', control, 'hfill');
    return grid;
}

function uiTint(key, bindings, sides) {
    debug(3, '\n\tuiTint: ' + key);
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

    if (sides == null) sides = BOTH;

    importClass(ca.cgjennings.apps.arkham.HSBPanel);
    let control = new HSBPanel();

    let label = @('LRL-' + key + '-uiTint');
    if (label == "[MISSING: LRL-" + key + "-uiTint]") label = @('LRL-' + key);
    control.setTitle(label);

    control.setPresets(
//        @LRL-Neutral, $Neutral-tint
//        , @LRL-Leadership, $Leadership-tint
//        , @LRL-Lore, $Lore-tint
//        , @LRL-Spirit, $Spirit-tint
//        , @LRL-Tactics, $Tactics-tint
//        , @LRL-Fellowship , $Fellowship-tint
//        , @LRL-Baggins, $Baggins-tint
//        , @LRL-Mastery, $Mastery-tint,
        @LRL-Red, $Red-tint
        , @LRL-Green, $Green-tint
        , @LRL-Blue, $Blue-tint
        , @LRL-Yellow, $Yellow-tint
        , @LRL-Magenta, $Magenta-tint
        , @LRL-Cyan, $Cyan-tint
        , @LRL-White, $White-tint
        , @LRL-Grey, $Grey-tint
        , @LRL-Black, $Black-tint
    );
    bindings.add(key + '-tint', control, sides);
    return control;
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

function uiIcon(name) {
    debug(3, '\n\tuiIcon: ' + name);
    /*
    Creates a user interface icon from the plugin "ui" folder's "name" PNG file.
    If it's not found, the function tries to get it from the "icons" folder.
    Icon size depends on the plugin's "uiIconSize" setting.
    */
    let image = ImageUtils.get(PathUi + name + '.png', false, true)
    if (image == null) image = ImageUtils.get(PathIcon + name + '.png', false, true);

    image = ImageUtils.createIcon(image, IconSize, IconSize);
    return image;
}

function uiButtonIcon(key, diy, bindings, sides) {
    debug(3, '\n\tuiButtonIcon: ' + key);
    /*
    Creates a toggle button with an icon from the plugin "ui" folder's "key" PNG file.
    */
    if (sides == null) sides = BOTH;

    let control = new toggleButton('', uiIcon(key), diy.settings.getBoolean(key, false), null);
    bindings.add(key, control, sides);

    return control;
}

function uiButtonText(key, diy, bindings, sides) {
    debug(3, '\n\tuiButtonText: ' + key);
    /*
    Creates a toggle button with a text label.
    */
    if (sides == null) sides = BOTH;
    let label = @('LRL-' + key + '-uiButtonText');
    if (label == "[MISSING: LRL-" + key + "-uiButtonText]") label = @('LRL-' + key);
    label = '<html><b>' + label;

    let control = new toggleButton(label, '', diy.settings.getBoolean(key, false), null);
    bindings.add(key, control, sides);

    return control;
}

function paintIcon(key, diy, g, sheet) {
    debug(3, '\n\tpaintIcon: ' + key);
    /*
    This paints an icon in the component. The icon position to paint is
    determined by the 'key' and the actual image to paint is determined by $key.
    The icon is looked for in the plugin ui folder's, as "key" PNG file.
    */
    let image = getIcon(key, diy);
    let regionKey = getKeyForTemplate(key + '-portrait-clip-region', diy);
    sheet.paintImage(g, image, regionKey);
}

function getIcon(key, diy) {
    debug(3, '\n\tgetIcon: ' + key + ' : ' + diy.settings.get(key));
    let icon = diy.settings.get(key); // get the icon name contained inside $key
    switch (String(icon)) {
        case '':
        case null:
            throw new Error('\t' + key + ' not defined.');
            break;
        case 'EmptyIcon':
            return ImageUtils.get(PathImage + 'empty1x1.png');
            break;
        case 'CustomIcon':
            return PortraitList[portraitIndexOf(key)].getImage();
            break;
        default:
            return ImageUtils.get(PathIcon + icon + '.png');
    }
}

function createPortrait(key, diy) {
    debug(3, '\n\tcreatePortrait: ' + key);
    /*
    This function returns Portrait that allows user to change
    and manipulate an external image to be used in the component.
    Use only the key without the "Card" type.
    */
    let index = PortraitList.length;
    PortraitList[index] = new DefaultPortrait(diy, key, false);
    PortraitList[index].setBackgroundFilled(diy.settings.getBoolean(key + '-portrait-backgroundFilled', true));
    PortraitList[index].setClipping(diy.settings.getBoolean(key + '-portrait-clipping', true));
    PortraitList[index].setScaleUsesMinimum(diy.settings.getBoolean(key + '-portrait-scaleUsesMinimum', false));

    if (diy.settings.getBoolean(key + '-portrait-stencil', true)) {
        let image = diy.settings.getImageResource(diy.frontTemplateKey + '-template')
        if (diy.settings.get(key) == 'PortraitBack') {
            image = diy.settings.getImageResource(diy.backTemplateKey + '-template');
        }
        let region = diy.settings.getRegion(key + '-portrait-clip-region');
        let stencil = PortraitList[index].createStencil(image, region);
        PortraitList[index].setClipStencil(stencil);
    }

    debug(5, '\t-portrait-clip-region: ' + diy.settings.get(key + '-portrait-clip-region'));
    debug(5, '\t-portrait-template: ' + diy.settings.get(key + '-portrait-template'));
    debug(5, '\t-portrait-scale: ' + diy.settings.get(key + '-portrait-scale'));
    debug(5, '\t-portrait-panx: ' + diy.settings.get(key + '-portrait-panx'));
    debug(5, '\t-portrait-pany: ' + diy.settings.get(key + '-portrait-pany'));
    debug(5, '\t-portrait-rotation: ' + diy.settings.get(key + '-portrait-rotation'));
    debug(5, '\t-portrait-backgroundFilled: ' + diy.settings.get(key + '-portrait-backgroundFilled'));
    debug(5, '\t-portrait-clipping: ' + diy.settings.get(key + '-portrait-clipping'));
    debug(5, '\t-portrait-scaleUsesMinimum: ' + diy.settings.get(key + '-portrait-scaleUsesMinimum'));
    debug(5, '\t-portrait-stencil: ' + diy.settings.get(key + '-portrait-stencil'));

    PortraitList[index].installDefault();
    debug(4, '\tPortrait index: ' + portraitIndexOf(key));
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

function uiPortrait(key, diy) {
    debug(3, '\n\tuiPortrait: ' + key);
    /*
    This function returns a user interface portraitPanel that
    allows user to change and manipulate an external image to be
    used in the component. It's also used to load external images
    on some non-manipulable component places, like Collection icon.
    Use only the key without the "Card" type.
    */
    let label = @('LRL-' + key + '-uiPortrait');
    if (label == "[MISSING: LRL-" + key + "-uiPortrait]") label = null;

    let control = new portraitPanel(diy, portraitIndexOf(key), label);
    return control;
}

function uiPortraitMirror(key, panel) {
    debug(3, '\n\tuiPortraitMirror: ' + key);
    /*
    This function creates a user interface button used to
    mirror horizontally a Portrait control of the component.
    */
    let label = '<html><b>' + @LRL-uiPortraitMirror;
    listener = function() {
        let index = portraitIndexOf(key);
        let scale = PortraitList[index].getScale();
        let panX = PortraitList[index].getPanX();
        let panY = PortraitList[index].getPanY();
        PortraitList[index].setImage(
            PortraitList[index].getSource(),
            ImageUtils.mirror(PortraitList[index].getImage(), true, false)
        );
        PortraitList[index].setScale(scale);
        PortraitList[index].setPanX(panX);
        PortraitList[index].setPanY(panY);
        panel.updatePanel();
    };
    let control = new repeaterButton(label, '', listener);
    return control;
}

function portraitIndexOf(key) {
    debug(3, '\n\tportraitIndexOf: ' + key);
    /*
    Returns the portrait index of the panel built with key.
    Use only the key without the "Card" type.
    */
    for (let index in PortraitList) {
        let currentKey = PortraitList[index].getBaseKey();
        debug(5, '\tIndex: ' + index + ': currentKey: ' + currentKey);
        if (currentKey == key) {
            debug(5, '\tIndex found: ' + index);
            return index;
        }
    }
    throw new Error('\tInvalid portrait key.');
//    return null
}

function paintPortrait(key, diy, g, sheet) {
    debug(3, '\n\tpaintPortrait: ' + key);
    if ((typeof(SE2CARD) != 'undefined') && (key == 'Main')) {
        // support for Strange Eons 2 card portrait
        debug(3, 'WARNING: STRANGE EONS 2 COMPONENT.');
        sheet.paintPortrait(g);
    } else {
        let index = portraitIndexOf(key);
        PortraitList[index].paint(g, sheet.getRenderTarget());
    }
}

function paintPortraitShadow(key, tinter, diy, g, sheet) {
    debug(3, '\n\tpaintPortraitShadow: ' + key);
    let shadow = String(diy.settings.get(key+'-shadow', 'None')) ;
    debug(3, '\n\t'+key+'-shadow: ' + shadow);
    switch (shadow) {
    case null: 
    case 'None': 
    	break;
    case 'PortraitTint':
        let image = diy.settings.getImageResource(key + '-shadow-tintable');
        if ($Template == 'Nightmare') image = createRedishImage(image);
        else image = createSepiaImage(image);
        sheet.paintImage(g, image, 'Template-region');
        break;
    case 'CustomColour':
        tint = diy.settings.getTint(key + '-shadow');
        tinter.setFactors(tint[0], tint[1], tint[2]);
        image = tinter.getTintedImage();
        sheet.paintImage(g, image, 'Template-region');
        break;
    default: 
        sheet.paintImage(g, key + '-shadow-'+shadow, 'Template-region');
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

function getPortraitCount() {
    debug(3, '\n\tgetPortraitCount');
    /*
    Returns the portrait count.
    */
    let output = PortraitList.length;
    debug(4, '\tOutput: ' + output);
    return output;
}

function getPortrait(index) {
    debug(3, '\n\tgetPortrait: ' + index);
    /*
    Returns the portrait given by index.
    */
    if ((index < 0) || (index >= PortraitList.length)) throw new Error('\tInvalid portrait index.');
    return PortraitList[index];
}

function readPortraits(diy, ois) {
    debug(3, '\n\treadPortraits: PortraitList length: '+PortraitList.length);
    let portrait = true ;
    let index= 0 
    while (portrait != false) {
        try {
            portrait = ois.readObject();
        } catch (err) {
            portrait = false;
        }
        if(portrait != false){
            debug(4,'Index:'+index+'; Key: '+portrait.getBaseKey());
            PortraitList[index] = portrait; 
            index++;
        }
    }
    if(PortraitList){
        debug(4, '\n\tPortraitList length: '+PortraitList.length);
    }else{
        debug(4, '\n\t No portraits loaded.');
    }
}    

// Following filters are used on portrait elements
const createHCImage = filterFunction(
    new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
        new ca.cgjennings.graphics.filters.GreyscaleFilter(),
        new ca.cgjennings.graphics.filters.BrightnessContrastFilter(0.3, 0.5)
    ])
);

const createRedishImage = filterFunction(
    new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
        new ca.cgjennings.graphics.filters.GreyscaleFilter(),
        //new ca.cgjennings.graphics.filters.BrightnessContrastFilter(-0.2,0.2) ,
        new ca.cgjennings.graphics.filters.GammaCorrectionFilter(1.5, 0.5, 0.5)
    ])
);

const createSepiaImage = filterFunction(
    new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
        new ca.cgjennings.graphics.filters.GreyscaleFilter(),
        new ca.cgjennings.graphics.filters.GammaCorrectionFilter(1.5, 1, 0.5)
    ])
);

function uiCycler(key, list, bindings, sides) {
    debug(3, '\n\tuiCycler: ' + key);
    /*
    This function creates a user interface button which cycles
    through a value list each time it's pressed.
    This should be used for applying different graphical effects
    to the card or some card element where final selection depends
    on user tastes. For other uses, a uiList is recomended.
    For example, it's in "Quest" portrait to apply a darkening 
    effect of different sizes and transparency.
    */
    if (sides == null) sides = BOTH;

    let labels = new Array();
    for (let index in list) {
        labels[index] = @('LRL-' + list[index] + '-uiCycler');
        if (labels[index] == "[MISSING: LRL-" + list[index] + "-uiCycler]") labels[index] = @('LRL-' + list[index]);
    }
    let control = new cycleButton(labels, list);
    bindings.add(key, control, sides);
    return control;
}

function uiCyclerLabeled(key, list, bindings, sides) {
    debug(3, '\n\tuiCyclerLabeled: ' + key);
    /*
    This function creates a user interface button used to
    select which identifing elements are shown in the card.
    It's used only in "Divider" and "DividerHorizontal".
    */
    let grid = new Grid();

    let control = new uiCycler(key, list, bindings, sides);
    let label = @('LRL-' + key + '-uiCyclerLabeled');
    if (label == "[MISSING: LRL-" + key + "-uiCyclerLabeled]") label = @('LRL-' + key);
    label = '<html><b>' + label + ':';

    grid.place(label, '', control, ''); //wmin 50lp') ;

    return grid;
}

/* NUMERIC CONTROLS */
function uiSpinner(key, bindings, sides, limit) {
    debug(3, '\n\tuiSpinner: ' + key);
    if (sides == null) sides = BOTH;
    if (limit == null) limit = 999;

    let control = new spinner(0, limit, 1, 0, null);
    bindings.add(key, control, sides);
    return control;
}

function uiSpinnerLabeled(key, bindings, sides, limit) {
    debug(3, '\n\tuiSpinnerLabeled: ' + key);
    let control = new uiSpinner(key, bindings, sides, limit);

    let grid = new Grid();
    let label = @('LRL-' + key + '-uiSpinnerLabeled');
    if (label == "[MISSING: LRL-" + key + "-uiSpinnerLabeled]") label = @('LRL-' + key);
    label = '<html><b>' + label + ':';
    grid.place(label, '', control, 'wmin 50lp');
    return grid;
}

function uiStat(key, bindings, sides, limit, extraList) {
    debug(3, '\n\tuiStat: ' + key);
    /*
    Creates a user interface list containing numbers up to
    "limit" and may add items contained on "extraList".
    list is binded to $key, and updates the component "sides".
    */
    importClass(arkham.diy.ListItem);
    if (sides == null) sides = BOTH;
    if (limit == null) limit = 9;
    if (extraList == null) extraList = new Array();

    let combo = new Array();
    let index = 0;
    do {
        combo[index] = ListItem(index, String(index));
        index++;
    } while (index <= limit)

    index = 0;
    for (index in extraList) {
        combo[combo.length] = ListItem(String(extraList[index]), String(extraList[index]));
    }
    let control = new comboBox(combo, null);
    bindings.add(key, control, sides);
    return control;
}

function uiStatIcon(key, bindings, sides, limit, extraList) {
    debug(3, '\n\tuiStatIcon: ' + key);
    /*
    Creates a user interface grid containing a list control preceded
    by a icon to describe it, both depending on key name.
    */
    let grid = new Grid();
    let icon = uiIcon(key);
    let control = uiStat(key, bindings, sides, limit, extraList);
    grid.place(icon, '', control, 'wmin 50lp');
    return grid;
}

function paintStat(key, diy, g, sheet) {
    debug(3, '\n\tpaintStat: ' + key);
    /*
    This function paints the "key" stat using a image.
    Used for plain black stats like Attack.
    */
    debug(4, '\tKey value: ' + diy.settings.get(key));
    let image = ImageUtils.get(PathNumber + diy.settings.get(key) + '.png');
    let region = diy.settings.getRegion(getKeyForTemplate(key + '-region', diy));
    debug(5, '\tRegion: ' + region);
    sheet.paintImage(g, image, region);
}

function paintStatTinted(key, tinter, diy, g, sheet) {
    debug(3, '\n\tpaintStatTinted: ' + key);
    /*
    This function tints and paints the "key" stat.
    Used for colored stats like HitPoints.
    */
    debug(4, '\tKey value: ' + diy.settings.get(key));
    let image = ImageUtils.get(PathNumberTintable + diy.settings.get(key) + '.png');
    tinter.setImage(image);
    image = tinter.getTintedImage();
    let region = diy.settings.getRegion(getKeyForTemplate(key + '-region', diy));
    debug(5, '\tRegion: ' + region);
    sheet.paintImage(g, image, region);
}

function paintTemplate(diy, g, sheet) {
    debug(3, '\n\tpaintTemplate: ' + $Template);
    /*
    This function draws the base image selected by $template.
    Note this is different from using the basic paintTemplateImage.
    */
    
    if (diy.settings.get($Template+'-template') != null) {
   		debug(5, '\tTemplate: ' + diy.settings.get($Template+'-template'));
    	sheet.paintImage(g, $Template+'-template', 'Template');
    }else sheet.paintTemplateImage(g);
}

function paintTemplateBack(diy, g, sheet) {
    debug(3, '\n\tpaintTemplateBack: ' + $TemplateBack);
    /*
    This function draws the base image selected by $templateback.
    Note this is different from using the basic paintTemplateImage.
    */
    
    if (diy.settings.get($TemplateBack + '-template') != null) {
   		debug(5, '\tTemplate: ' + diy.settings.get($TemplateBack+'-template'));
    	sheet.paintImage(g, $TemplateBack+'-template', 'TemplateBack');
    } else sheet.paintTemplateImage(g);
}

function paintTemplateBackShared(diy, g, sheet) {
    debug(3, '\n\tpaintTemplateBackShared: ' + $Template);
    /*
    This function draws the base image selected by $template,
    but using images designed for card back. It's usefull in double
    sided cards.
    Note this is different from using the basic paintTemplateImage.
    */
    
    if (diy.settings.get($Template + 'Back-template') != null) {
   		debug(5, '\tTemplate: ' + diy.settings.get($Template+'Back-template'));
    	sheet.paintImage(g, $Template+'Back-template', 'TemplateBack');
    } else sheet.paintTemplateImage(g);
}

function paintCut(diy, g, sheet) {
    debug(3, '\n\tpaintCut');
    if (diy.settings.getBoolean('ShowBleeding')) {
        debug(4, '\tShowBleeding');
        sheet.paintImage(g, 'Template-bleeding', 'Template-region');
    }
    if (diy.settings.getBoolean('ShowCut')) {
        debug(4, '\tShowCut');
        sheet.paintImage(g, 'Template-cut', 'Template-region');
    }
}

function createTinter(key, diy) {
    debug(3, '\n\tcreateTinter: ' + key);
    /*
    This function creates a TintCache. TintCaches are functions that
    take a image and colorize them to use, for example, in stats like
    HitPoints and Progress. The source image is the same for both stats,
    but it is colorized through the TintCache. Initial tint color is defined by
    $key-tint and source image by $key-tintable. These elements may change
    in the paintFront/Back functions.
    */
    let image = diy.settings.getImageResource(key + '-tintable');
    let tinter = new TintCache(new TintFilter(), image);
    let tint = diy.settings.getTint(key,[0.0,0.5,0.5]);
    tinter.setFactors(tint[0], tint[1], tint[2]);

    return tinter;
}

function filterFunction(filter) {
    let f = function filter(source) {
        return filter.filter.filter(source, null);
    };
    f.filter = filter;
    return f;
}

/* OTHER STUFF */

function loadSettings(diy) {
    debug(3, '\n\tloadSettings');
    //revisar
    /*
    This function is called on new component creation.
    It loads default component settings for regions that
    define text and image positions, or text format.
    */
    if (sourcefile == 'Quickscript') diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/' + PathCard + 'component.settings');
    else diy.settings.addSettingsFrom(PathCard + 'component.settings');
}

function loadExample(diy) {
    debug(3, '\n\tloadExample');
    //revisar
    /*
    This function is called on new component creation.
    It loads example component settings and localized strings.
    Then, it loads the settings from the plugin preferences.
    */
    if (sourcefile == 'Quickscript') {
        diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/' + PathCard + 'example.settings');
        diy.settings.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/' + PathCard + 'example.properties');
    } else {
        diy.settings.addSettingsFrom(PathCard + 'example.settings');
        let locale = getLocale();
        diy.settings.addSettingsFrom(PathCard + 'example.properties');
        if (locale != 'en') {
            try {
                diy.settings.addSettingsFrom(PathCard + 'example_' + locale + '.properties');
            } catch (err) {
                throw new Error(Card + ' ' + @LRL-ExampleNotLocalized-error);
            }
        }
    }
}

function loadPreferences(diy) {
    debug(3, '\n\tloadPreferences');
    /*
    This function loads the default value from LRL preferences.
    This is useful when creating a lot of components for the same collection.
    */
    updateToPreferences('Copyright', diy);
    updateToPreferences('CollectionInfo', diy);
    updateToPreferences('Collection', diy);
    updateToPreferences('Collection-portrait-template', diy);
    // If Custom icon is selected in preferences, the custom icon path is used.
    // This path should include the icon from the current project and start with 'project:'

    if (diy.settings.get('Encounterset') != null) {
        // Check if the setting is used for this component.
        // $setting should be set in example.properties if needed, even as empty string.
        // Reading a $setting not defined, returns null.
        updateToPreferences('Encounterset', diy);
        updateToPreferences('Encounterset-portrait-template', diy);
    }
}

function updateExternalPortrait(key, diy) {
    debug(3, '\n\tupdateExternalPortrait: ' + key);
    /* 
    This funtion provides support for updating the portraits through external
    scripting. If a $Portrait-external-path to the new image is found, that
    image is used as new portrait. New position and size can also be defined.
    After the load, used settings are reseted to avoid updating the portrait
    every time the component is opened.
    */
    let path = diy.settings.get(key + '-external-path', '');
    if (path != '') {
        index = portraitIndexOf(key);
        let image = diy.settings.getImageResource(key + '-external-path');
        PortraitList[index].setImage(path, image);
        diy.settings.set(key + '-external-path', '');

        let value = diy.settings.get(key + '-external-panx', '');
        if (value != '') PortraitList[index].setPanX(value);
        diy.settings.set(key + '-external-panx', '');

        value = diy.settings.get(key + '-external-pany', '');
        if (value != '') PortraitList[index].setPanY(value);
        diy.settings.set(key + '-external-pany', '');

        value = diy.settings.get(key + '-external-scale', '');
        if (value != '') PortraitList[index].setScale(value);
        diy.settings.set(key + '-external-scale', '');
    }
}
