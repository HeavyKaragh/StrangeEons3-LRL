/* COMPONENT CONFIGURATION */
// Used on libraries to get correct card images, settings, ...
const Card = 'Ally';

// This script's code version
const CardVersion = 1;
// 1: rewrite using new 2023 library

/*
All the plug-in code revolves around the concept of the component "settings"
explained in the Strange Eons developer manual. "Settings" (defined in the
code by the $ symbol) store everything the user can define in a component,
like it's title, stats or portraits placement.
I've written a library that creates user interface controls, drawing methods
and other stuff based on the "setting" name. Basically, three functions are
needed for each editable part on a component: one for user interface control
(it's a short text or a paragraph or a image?), one for the painter (if it's text
, which font and size?) and another that actually paints it (where and when? to
avoid overlapping other stuff and/or to use a special graphical effect).
For example, card's "Type" text setting, ($Type), is defined in createInterface
by Type_control, in the createFrontPainter by Type_writer and in the
paintFront by writeLine('Type').
*/

function create(diy) {
    /*
    "create" is one of the main functions on scripted components. It's 
    called on "New" component creation. It defines the basic 
    characteristics of the component, like what plugin it relies on, 
    how many sides it has, basic template, portraits, example values... 
    */
    debug(1, '\ncreate');
    /*
    These debug functions output stuff to the "Script Output" console
    window found in the Window tab of the main Strange Eons user interface.
    They provide information useful to correct programming errors or invalid
    $setting values. They must be enabled in the plugin options, where a
    information level must be selected. It's useful during plugin development
    but not for users, unless something goes wrong. 
    */

    /*
    Next portion of code defines the plugin the component uses and the 
    version of the code. $VersionHistory is used for debugging purposes,
    keeping track of the plugin versions used to edit the component.
    */
    diy.extensionName = 'TheLordOfTheRingsLCG.seext';
    diy.version = SEVersion + LRLVersion + CardVersion;
    $VersionHistory = diy.version;//+ versión anterior 

    /*
    Next portion of code loads $settings used by the component, specifically, 
    regions where images and texts are drawn.
    In previous versions of the plugin, these where loaded into the plugin scope.
    I modified it to make it easier for the users to customize settings and to
    avoid problems with aspect change from loading into later plugin versions. Now these settings are loaded into the component.
    */
    loadSettings(diy);
    loadExample(diy);
    loadPreferences(diy);

    /*
    Next portion of code defines the template of the component.
    */

    diy.faceStyle = FaceStyle.TWO_FACES;
    /*
    FaceStyle.TWO_FACES defines that both sides of the card have modifiable elements.
    FaceStyle.PLAIN_BACK is used for components with a simple image
    used as the back of the card. Because there are player cards that
    can be added to the encounter deck, and encounter cards that are added
    to the player deck, this style is not used often. In other games, like
    competitive games (Magic, A Game of Thrones, etc...), PLAIN_BACK
    style is the most common.
    */

    diy.frontTemplateKey = 'Template';
    /* 
    frontTemplateKey defines the setting used for the main frontal
    image of the component. It is not mandatory to draw this image,
    and the main purpose is to get the correct component size. In this
    plugin, whenever a variable template is required for the same type
    of component, the required template variant is painted.
    */

    diy.backTemplateKey = 'TemplateBack';
    /* 
    backTemplateKey defines the setting used for the back
    image of the component. If we are using PLAIN_BACK, it 
    will be painted always.
    */

    diy.bleedMargin = 9;
    /* 
    bleedMargin defines the overdrawn template size, that is, the size
    of the template that will be cut to get a properly sized component.
    This cut is done to avoid white borders on cutting errors.
    */

    /* 
    Next portion of code defines the user defined images of the component. 
    */
    diy.customPortraitHandling = true;
    /* 
    I use the custom portrait system because portraits are used in other
    component elements, like collection icon or some graphics for custom
    template variant. 
    */

    createPortrait('Portrait', diy);
    createPortrait('Collection', diy);
    createPortrait('SphereIcon', diy);
    createPortrait('BodyIcon', diy);
    /* 
    These are custom functions to create the portrait elements.
    portraits are the only graphical element that is stored in the
    component file. Thus, they are handled in a special way. They have to
    be identified when the component is created so they can be stored and
    and put back in their place on component file reading. 
    */

    $PortraitListCount = getPortraitCount();
    /* 
    This is used by customPortraitHandling and must be kept
    I store it in a setting for backwards compatibility use. 
    */
}

function createInterface(diy, editor, sheet) {
    debug(1, '\ncreateInterface');
    /*
    "createInterface" is one of the main functions on scripted components.
    It's called only when a component is going to be edited. It fills 
    Strange Eons editor tabs with user controls, allowing component editing.
    I create a tab on the component editor for different groups of controls. 
    So, we will have containers containing the containers of controls. 
    The Main_tab contains the main controls, like card title, stats and effect 
    text. The Tamplate_tab includes the Sphere selection and other graphical 
    stuff. The Portrait_tab is used only for Main and secondary portrait 
    related controls, like the portrait image selector and manipulators and 
    artist naming. 
    The Collection_tab includes collection icon, number and optional 
	information, along with other controls that may be useful but rarely used, 
    like copyright information or card type. The Help_tab is a way of giving 
    to the user help on editing without accesing external sources. Also, some 
    game specific information is included, like officialy used traits or 
    keywords.
    */

    let advancedControls = diy.settings.getBoolean('LRL-AdvancedControls', false);
    /*
    Advanced controls are optional, providing editing controls that most users 
    won't use. Things like Custom spheres or weird graphical elements or stats. 
    LRL-AdvancedControls value is irrelevant on component drawing, that is, only
    affects the user interface: it's value doesn't matter to export a component
    that uses these features through the Strange Eons project explorer.
    */

    var bindings = new Bindings(editor, diy);
    /* 
    "Bindings" is the system that initializes user interface control 
    values into the settings loaded from a saved component or from plugin 
    defaults. It will store them into the component settings too. Each 
    control creator includes a method bindings.add linking it to a $setting. 
    Also note the method bindings.bind at the end of CreateInterface.
    */
    let list;

    // MAIN TAB
    /*
    This tab includes the component title, and all the stats and effects.
    A few important things (for example, sphere), aren't included here,
    but all text is in this tab. First, user interface controls are
    defined, then grouped by relationship, and finally they are actually
    placed in the Strange Eons user interface tab. 
    */
    let Main_tab = new TypeGrid();
    /* 
    Now we define the tab that will be added to the user interface.
    There we will add the control containers.
    */

    Main_tab.editorTabScrolling = true;
    // Shows a vertical scrolling control in the tab, if needed

    // TITLE PANEL
    /*
    User interface controls are grouped. In this case, a panel is used to 
    group together the Name control and Unique button.
    */
    let Title_panel = new TypeGrid();
    /* 
    User interface can be seen as a text document were controls are placed
    one after another. Here, I define a container grid where elements will 
    be placed using some placement control through html like keys. This 
    container will be placed later in the tab. I will include only the 
    controls related to the title of the card.
    */

    Title_panel.setTitle(@LRL-Title);
    /* 
    This will add a label to the container and also show a border around.
    "@LRL-Title" passes a text localized depending on Strange Eons
    "User interface language" defined in the Preferences.
    */

    let Title_control = uiTitleUnique(diy, bindings, FRONT);
    /*
    This is a custom function to define the card title text control. It's
    linked to diy.nameField and will prompt the user to ensure the .eon file 
    name whenever changes. This control also includes a button to add the 
    unique symbol to the card title.
    FRONT determines the component side to redraw when this control changes.
    On non-plain components (editable stuff on both sides), may be
    different. For example, Quest cards, has BOTH instead, because you
    may share the name shown on both sides. Other controls may use BACK.
    uiName adds the same text control without the unique button.
    */

    Title_panel.place(Title_control, 'hfill');
    /* 
    ".place" is the method that layouts controls in the container (or in 
    the user interface tab, as it's used later). For each user interface
    control (or container), its placement options must be defined.
    "Name_control" control will be drawn, and its placements option is
    just "hfill", used to make the control as wide as possible in the user
    interface tab until it equals the widest container in the tab.
    */
    Main_tab.place(Title_panel, 'hfill');
   /* 
    This adds the panels to the tab and fills available horizontal space.
    Following panels will use "br" (break) to add them to the tab below
    previous panel.
    */

    // STATS PANEL
    /*
    Another control group for the component numerical controls.
    */
    let Stats_panel = new TypeGrid();
    Stats_panel.setTitle(@LRL-Stats);

    if (advancedControls) let limit = 99;
    else limit = 9;
    /*
    When using advanced controls, some weird/bad design choices are made
    available to the user, like absurd stat numbers.
    */
    let ResourceCost_control = new uiStatIcon('ResourceCost', bindings, FRONT, limit, ['X', '-']);
    let Willpower_control = new uiStatIcon('Willpower', bindings, FRONT, limit, ['X', '-']);
    let Attack_control = new uiStatIcon('Attack', bindings, FRONT, limit, ['X', '-']);
    let Defense_control = new uiStatIcon('Defense', bindings, FRONT, limit, ['X', '-']);
    if (advancedControls) limit = 99;
    else limit = 19;
    let HitPoints_control = new uiStatIcon('HitPoints', bindings, FRONT, limit, ['X', '-']);
    /* 
    Most ui controls are similarly defined: the $setting to change, bindings,
    and side of the component were it's drawn, so that side will be updated
    when this control changes the value that has to be drawn. Of course other
    control specific options may be defined.
    In this case, uiStatIcon provides a numerical list that includes a few 
    non-numerical options, like - and X. limit determines the maximum value
    of the stat always starting at 0. Each stat control is preceded by an 
    icon for easy identification.
    */

    Stats_panel.place(
        Willpower_control, ''
        , Attack_control, ''
        , Defense_control, ''
        , HitPoints_control, 'br'
        , ResourceCost_control, ''
    );
    /* 
    This Stats_panel is another container, but it doesn't require placing
    options to simply put each control beside the other.
    */
    Main_tab.place(Stats_panel, 'br hfill');


    // TEXTBOX PANEL
    /*
    The text that defines the card effect and the flavour text is grouped here.
    I've added different controls for the different elements (Traits, Effect
    and Flavour). They will be written in the card together, as a single text
    block, but this way the user can forget about formating the text block
    apropiately. 
    */
    let TextBox_panel = new TypeGrid();
    TextBox_panel.setTitle(@LRL-TextBox);

    let Traits_control = new uiParagraphLabeled('Traits', bindings, FRONT, 'line');
    let Effect_control = new uiParagraphLabeled('Effect', bindings, FRONT, 'big');
    let Flavour_control = new uiParagraphLabeled('Flavour', bindings, FRONT, 'medium');
    /* 
    These functions define text controls that may span several lines.
    They are labeled above the control depending on $key.
    'line', 'big' and 'medium' determine the number of lines it will
    provide.
    Trait only needs one line, but this way looks better in the interface.
    */

    TextBox_panel.place(
        Traits_control, 'hfill'
        , Effect_control, 'br hfill'
        , Flavour_control, 'br hfill'
    );
    Main_tab.place(TextBox_panel, 'br hfill');
    /* 
    These controls are put one below another using "br".
    The first element in each container doesn't require "br".
    Adding a br on the first control would add more space
    between the container top and the first control.
    */

    // OTHER EFFECT PANEL
    /*
    Here I include optional controls for stuff that may not be added to the
    card. Specifically, the text blocks for Victory points is added here.
    */
    let OtherEffect_panel = new TypeGrid();
    OtherEffect_panel.setTitle(@LRL-OtherEffect);

    let OptionRight_control = new uiTextLabeled('OptionRight', bindings, FRONT);
    /* 
    These functions add a text control preceded with a label
    determined by $key in the same line.
    */
    OtherEffect_panel.place(OptionRight_control, 'hfill');
 
    if (advancedControls) {
    /*
    Advanced controls, give the user the controls to add elements to the
    card that are rarely used, even elements completely non-existent on
    official components. In this case the decoration used for Victory
    points in cards, which is found always in the bottom-right side of
    the card, is made available too in the bottom-left, where is never
    been used in official cards. What it's used for is up to the user.
    99% of the cards don't require such controls, that's why they are
    disabled by default.
    */
	    let OptionLeft_control = new uiTextLabeled('OptionLeft', bindings, FRONT);
	    OtherEffect_panel.place(OptionLeft_control, 'br hfill');
    }
    
    Main_tab.place(OtherEffect_panel, 'br hfill');

	// MAIN TAB CLOSE
    Main_tab.addToEditor(editor, @LRL-Main);
    /* 
    Now everything is actually drawn in the editor, and the tab name defined.
    */

    // TEMPLATE TAB
    /*
    This tab is used for template related options, like the sphere (colour)
    the component belongs to. It also includes controls for the creation of
    custom spheres, that is, unofficial spheres.
    */
    let Template_tab = new TypeGrid();
    Template_tab.editorTabScrolling = true;

    // SPHERE PANEL
    /*
    This will add the template selector, that means the sphere for player cards.
    */
    let Sphere_panel = new TypeGrid();
    Sphere_panel.setTitle(@LRL-Sphere);

    list = new Array('Neutral', 'Leadership', 'Lore', 'Spirit', 'Tactics');
    // "list" includes all the important template variants
    if (advancedControls) list = list.concat(new Array('Baggins', 'Fellowship', 'CustomSphere', 'Mastery'));
    // "list" may be extended with unusual spheres, official variations
    // like Boon or Nightmare cards, or unofficial spheres
    let Sphere_control = new uiListIcon('Template', list, bindings, FRONT);
    /* 
    This function shows a selectable icon plus text in a list control,
    including all the templates from list. 
    */
    Sphere_panel.place(Sphere_control, 'hfill');

	Template_tab.place(Sphere_panel, 'hfill');

    // CUSTOM SPHERE PANEL
    /*
    Users can create their own customized spheres through the use of colorizable
    graphical elements and adding their own graphics for the sphere icon. This
    panel includes all the controls related to it.
    */
    if (advancedControls) {
        let CustomSphere_panel = new TypeGrid();
        CustomSphere_panel.setTitle(@LRL-CustomSphere);

        let CustomSphere_control = new uiTint('CustomSphere', bindings, FRONT);
        // This function shows a tinter control. It shows a colour
        // selector and a list of predefined colours.

        let SphereIcon_control = new uiPortrait('SphereIcon', diy);
        let BodyIcon_control = new uiPortrait('BodyIcon', diy);
        // These functions show a portrait control used to
        // add easily your own graphics from your files.

        let BodyIconTransparency_control = new uiTransparency('BodyIcon', bindings, FRONT);
        // This function shows a horizontal slider control
        // to select the transparency of "BodyIcon".
        let BodyIconTinted_control = new uiButtonText('BodyIcon-tinted', diy, bindings, FRONT)
        // This functions shows a button that adds a colorization
        // effect to the BodyIcon provided. This effect will make
        // the icon redish, to make it look consistent with the
        // selected tint.

        CustomSphere_panel.place(
            CustomSphere_control, 'hfill'
            , SphereIcon_control, 'br hfill'
            , BodyIcon_control, 'br hfill'
            , BodyIconTransparency_control, 'br hfill'
            , BodyIconTinted_control, ''
        );
	    Template_tab.place(CustomSphere_panel, 'br hfill');
    }

    // TEMPLATE BACK PANEL
    /*
    User can change the obvious card back of the player card. Some expansions
    cards' effects allow the player to put his player cards into the encounter
    deck. Likewise, some quests and campaigns put encounter cards into the 
    player deck.
    */
    if (advancedControls) {
        let TemplateBack_panel = new TypeGrid();
        TemplateBack_panel.setTitle(@LRL-TemplateBack);
        list = new Array('Player', 'Encounter');
        let TemplateBack_control = new uiListIcon('TemplateBack', list, bindings, BACK);
        TemplateBack_panel.place(TemplateBack_control, 'hfill');
	    Template_tab.place(TemplateBack_panel, 'br hfill');
    }

    // TEMPLATE TAB CLOSE
    Template_tab.addToEditor(editor, @LRL-Template);

    // PORTRAIT TAB
    /*
    This tab is used only for the main portrait of the component and the
    "Artist" control related to it. When other components have several
    portraits, like the Quest card, they are added to this tab too.
    */
    let Portrait_tab = new TypeGrid();
    Portrait_tab.editorTabScrolling = true;

    // PORTRAIT PANEL	
    let Portrait_panel = new TypeGrid();
    Portrait_panel.setTitle(@LRL-Portrait);

    let Artist_control = new uiTextLabeled('Artist', bindings, FRONT);
    let Portrait_control = new uiPortrait('Portrait', diy);
    let PortraitMirror_control = new uiPortraitMirror('Portrait', Portrait_control);
    // Custom function to add a button to mirror a portrait image horizontally

    Portrait_panel.place(
        Artist_control, 'hfill'
        , Portrait_control, 'br hfill'
        , PortraitMirror_control, 'br hfill'
    );
    Portrait_tab.place(Portrait_panel, 'hfill');

    // PORTRAIT TAB CLOSE	
    Portrait_tab.addToEditor(editor, @LRL-Portrait);

    // COLLECTION TAB
    /*
    This tab is used for the collection icon and information, and also for other
    less likely to be used controls. For example, controls to change "Type" and
    "Copyright" texts are included here.
    */
    let Collection_tab = new TypeGrid();
    Collection_tab.editorTabScrolling = true;

    // COLLECTION PANEL
    let Collection_panel = new TypeGrid();
    Collection_panel.setTitle(@LRL-Collection);

    let CollectionNumber_control = new uiSpinnerLabeled('CollectionNumber', bindings, FRONT, 999);
    // Custom control to change the collection number
    let CollectionInfo_control = new uiTextLabeled('CollectionInfo', bindings, FRONT);
    /* 
    This adds a small text field to the component, next to the collection
    icon. It's not present on the official components, and is included to
    provide some information about the custom release and easily tell them
    apart from other custom releases or official products. It can include
    the designer name or nick, or a word referencing the collection.
    */
    let Collection_control = new uiCollectionList(bindings, FRONT);
    /* 
    Custom control that builds a icon+text list including all the
    Collection icons. There's a similar function for Encounter Sets.
    */
    let CollectionPortrait_control = new uiPortrait('Collection', diy);

    Collection_panel.place(
        Collection_control, 'hfill'
        , CollectionNumber_control, 'br'
        , CollectionInfo_control, 'hfill'
        , CollectionPortrait_control, 'br hfill'
    );
    Collection_tab.place(Collection_panel, 'hfill');

    // OTHER CONTROLS PANEL
    /*
    A few extra controls may be included to, for example, change default
    texts, like the card type. Useful to create cards in languages not
    supported by the plugin.
    */
    let OtherControls_panel = new TypeGrid();
    OtherControls_panel.setTitle(@LRL-OtherControls);
    let Copyright_control = new uiTextLabeled('Copyright', bindings, FRONT);
    OtherControls_panel.place(Copyright_control, 'hfill');
    if (advancedControls) {
        let Type_control = new uiTextLabeled('Type', bindings, FRONT);
        OtherControls_panel.place(Type_control, 'br hfill');
        // This panel placement would put it beside the
        // previous one if "br" is not used
    }
    Collection_tab.place(OtherControls_panel, 'br hfill');

    // COLLECTION TAB CLOSE
    Collection_tab.addToEditor(editor, @LRL-Collection);

    bindings.bind();
    /*
    This method links each control to its respective setting as defined
    in the creator of each control. Must be included always at the end 
    of the create interface function.
    */
}

function createFrontPainter(diy, sheet) {
    debug(1, '\ncreateFrontPainter');
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
    /* 
    Writers define, for a given text element, the basic font properties 
    (family, size, alignment, colour...) pretty much all it's properties
    except the region definition (that is, the position and size within the
    component). The text itself along with the text position is passed to
    these writers right before writing the text.
    When these properties change, creating a new writes is the most
    convenient solution. This may result in creating a writer for each text
    element, but they can also be shared. For example, there are 2 Option
    text elements (OptionLeft and OptionRight), but text properties are
    exactly the same, and only the region changes. Bottom_writter is used
    for each text element within the bottom line (CollectionInfo, Artist,
    Copyright and CollectionNumber). The only difference in those elements
    is the horizontal alignment, so an alignment tag is added to the text
    through setting-format.
    */
    Title_writer = new createWriter('Title', diy, sheet);
    Traits_writer = new createWriter('Traits', diy, sheet);
    Body_writer = new createWriter('Body', diy, sheet);
    Option_writer = new createWriter('Option', diy, sheet);
    Type_writer = new createWriter('Type', diy, sheet);
    Bottom_writer = new createWriter('Bottom', diy, sheet);

    // STATS
    /* 
    Tinters are Strange Eons functions that colorize a image with a given
    colour. Several stats are tinted with a fixed colour, and only image
    used change (that is, the number). The colour is determined through
    a $setting.
    */
    ResourceCost_tinter = new createTinter('ResourceCost', diy);
    HitPoints_tinter = new createTinter('HitPoints', diy);

    // TEMPLATE
    /*
    In these tinters some fixed images are passed (the text box, for example),
    determined through a $setting, and applied colour is determined with the
    user interface CustomTint_control. CustomBodyIcon_tinter uses a variable
    image, that's why doesn't use any $setting key for configuration.
    */
    Body_tinter = new createTinter('Body', diy);
    BodyIcon_tinter = new createTinter('BodyIcon', diy);
    Pearl_tinter = new createTinter('Pearl', diy);

    // PORTRAIT
    /* 
    These functions provide a way of updating the user defined
    images without opening the component in the editor. Its usefull
    for creating or updating components through external scripts or
    through the plugin preferences.
    */
    updateExternalPortrait('Portrait', diy);
    updateExternalPortrait('Collection', diy);
    updateExternalPortrait('SphereIcon', diy);
    updateExternalPortrait('BodyIcon', diy);
}

function createBackPainter(diy, sheet) {
    debug(1, '\ncreateBackPainter');
    /*
    "createBackPainter" is one of the main functions on scripted components.
    This is functionally identical to createFrontPainter, but is used for 
    the back side of the component.
    In cards using PLAIN_BACK (when cardback is a simple image, defined on
    component creation), it's not needed.
    */
}

function paintFront(g, diy, sheet) {
    debug(1, '\npaintFront');
    /*
    "paintFront" is one of the main functions on scripted components. It's 
    called whenever a component is actually going to be drawn by Strange 
    Eons preview or exported to a file. There is a "sister" function for 
    the back side of the component too: paintBack. 
    */

    // PORTRAIT
    /* 
    This function simply paints the image defined in the corresponding
    user interface control in rhe specified region.
    */
    paintPortrait('Portrait', diy, g, sheet);

    // TEMPLATE
    if ($Template == 'CustomSphere') paintCustomSphereBody(diy, g, sheet); // colorized text box
    paintTemplate(diy, g, sheet); // this will draw the selected $Template
    //sheet.paintTemplateImage(g) ; // in some cards, where template cannot be modified,
    // this is used, and it will draw the image defined in diy.frontTemplateKey
    if ($Template == 'CustomSphere') paintCustomSpherePearl(diy, g, sheet); // colorized "pearls"

    // ICONS
    /* 
    Icons may be painted from two different sources: a predefined list
    or from the image added to a specific user interface control. Which
    one to use is stored in $Collection.
    */
    paintIcon('Collection', diy, g, sheet);
    if ($Template == 'CustomSphere') paintPortrait('SphereIcon', diy, g, sheet);

    // STATS
    /*
    These functions define how to paint a stat. These look for the
    value of $Attack, pick a image from the resources contained in 
    TheLordOfTheRings-B.seext and paints it $Attack-region.
    */
    paintStat('Willpower', diy, g, sheet);
    paintStat('Attack', diy, g, sheet);
    paintStat('Defense', diy, g, sheet);
    /*
    When tinted, a tintable image (colored, different from the plain black
    images used in other stats) containing the number determined by
    $HitPoints is passed to the tinter, which will return it in the colour
    defined in $HitPoints-tint, and then painted in $HitPoints-region.
    */
    paintStatTinted('ResourceCost', ResourceCost_tinter, diy, g, sheet);
    paintStatTinted('HitPoints', HitPoints_tinter, diy, g, sheet);

    // TEXTS
    /* 
    These functions put the text in the writers defined in
    createFrontPainter and paint the text in the defined region.
    Many use custom functions instead of a generic one because
    they require some specific formating. For example, to add the
    unique symbol to card Name or use predefined localized texts
    for the card type.
    Most texts are defined using several settings, for example:
    $Title : contains the text to display
    $Title-region : contains the placement of the text
    $Title-format : is optional, and provides a way of formating
    		the text through html tags without including them
    		in the user interface field.
    */
    writeTitle(diy, g);
    writeTraits(diy, g, sheet);
    /*
    The text region containing the card effect contains distinctly
    formated texts. Each text uses it's own user interface control,
    saving the user the trouble to add formatting stuff.
    All these texts are written in a single block, all at once. Each
    part uses it's own formats to add italics or whatever it needs,
    and are separated with line breaks.
    For example, in this Body block, all these settings are joined:
    $Effect-format : The text formatting options used in the writer 
    		are based on Rules text, so nothing is needed here. 
    $Effect
    $Effect-formatEnd
    $Flavour-format: adds a size change, italics and right alignment
    $Flavour
    $Flavour-formatEnd
    Also, note that Encounter cards' $Shadow-format adds the image
    of the ShadowSeparator.
    */
    writeBody(['Effect', 'Flavour'], diy, g);

    writeType(diy, g);
    writeOption('OptionLeft', diy, g, sheet);
    writeOption('OptionRight', diy, g, sheet);

    writeArtist(diy, g, sheet);
    writeCopyright(diy, g, sheet);
    writeCollectionInfo(diy, g, sheet);
    writeCollectionNumber(diy, g, sheet);
}

function paintBack(g, diy, sheet) {
    debug(1, '\npaintBack');
    /*
    "paintBack" is one of the main functions on scripted components. This 
    is functionally identical to paintFront, but is used for the back side
    of the component.
    In cards using a PLAIN_BACK (defined on component creation, for a single
    image that won't change), it's not needed.
    */

    // TEMPLATE
    paintTemplateBack(diy, g, sheet);
}

if (sourcefile == 'Quickscript') {
    /*
    "Quickscript" code is used to load the settings, texts and libraries
    used while running the script in the editor pressing F5.
    */
    Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.settings');
    Settings.shared.addSettingsFrom('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/LRL-I.settings');
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
    Eons.namedObjects.LRL = new gameObject();
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/mySElibrary.js');
    useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/myLRLlibrary.js');
    GameLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/game');
    GameLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons');
    InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/text/interface');
    InterfaceLanguage.addStrings('project:TheLordOfTheRingsLCG-I/resources/TheLordOfTheRingsLCG/text/icons');
    testDIYScript('LRL');
} else {
    useLibrary('res://TheLordOfTheRingsLCG/mySElibrary.js');
    useLibrary('res://TheLordOfTheRingsLCG/myLRLlibrary.js');
}
