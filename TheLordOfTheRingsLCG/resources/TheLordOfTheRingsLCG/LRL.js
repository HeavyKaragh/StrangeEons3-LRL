// Strange Eons 3 plug-in initialization script
// The Lord of the Rings: The Card Game

// libraries
useLibrary('imageutils');
useLibrary('markup');
useLibrary('extension');
useLibrary('ui');

var GameLanguage = Language.getGame();
var InterfaceLanguage = Language.getInterface();

function getVersion() {
    return 2.0;
}

function getName() {
    return @LRL;
}

function getDescription() {
    return @LRL-description;
}

function initialize() {
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
    importPackage(arkham.dialog.prefs);
    importClass(arkham.diy.ListItem);

    // variables and constants used in game registering preferences
    // Here I set the path to resources within the project that are shared among components
    const PathUi = 'TheLordOfTheRingsLCG/ui/';
    const PathIcon = 'TheLordOfTheRingsLCG/icon/';
    const PathText = 'TheLordOfTheRingsLCG/text/';
    const PathImage = 'TheLordOfTheRingsLCG/image/';
    const IconSize = 24; // Icon size in preferences
    const ShortText = 10; // Text control size in preferences
    const MediumText = 20; // Text control size in preferences
    const LongText = 30; // Text control size in preferences

    function registerContextBarButton(name) {
        /*
        This function adds to the context bar of user interface text controls all the
        custom tags used in the plug\u00edn. These context bar buttons must be enabled in the
        preferences.
        */
        importClass(arkham.ContextBar);

        let button = {
            buttonIcon: ImageUtils.createIcon(ImageUtils.get(PathUi + name + '.png'), IconSize, IconSize),
            getID: function getID() {
                return 'LRL' + name;
            },
            getName: function getName() {
                return name;
            },
            getIcon: function getIcon() {
                return this.buttonIcon;
            },
            isVisibleInCurrentContext: function isVisibleInCurrentContext(context) {
                return context.isMarkupTarget() && (context.gameComponent != null) && (context.getGame() == #LRL-TheLordOfTheRingsLCG);
            },
            isEnabledInCurrentContext: function isEnabledInCurrentContext(context) {
                return true;
            },
            actionPerformed: function actionPerformed(actionEvent) {
                try {
                    //var mt = Eons.markupTarget ;
                    //mt.selectNone() ;
                    //mt.selectedText = "<"+Game.get('LRL').masterSettings.get(name+'-tag')+">" ;
                    Eons.markupTarget.selectNone();
                    Eons.markupTarget.selectedText = "<" + Game.get('LRL').masterSettings.get(name + '-tag') + ">";
                } catch(ex) {
                    Error.handleUncaught(ex);
                }
            }
        };

        button = new JavaAdapter(ContextBar.Button, button);
        ContextBar.registerButton(button);
    }

    // first, add user interface text to avoid errors during plugin loading
    InterfaceLanguage.addStrings(PathText + 'plugin');
    InterfaceLanguage.addStrings(PathText + 'interface');
    InterfaceLanguage.addStrings(PathText + 'icons');
    GameLanguage.addStrings(PathText + 'game');
    GameLanguage.addStrings(PathText + 'icons');

    // create plugin/game environment (identity within Strange Eons, settings scope, ...) 
    const GAME = Game.register('LRL', 'LRL-TheLordOfTheRingsLCG', ImageUtils.get(PathUi + 'TheLordOfTheRingsLCG.png')
    //'LRL',@LRL-TheLordOfTheRingsLCG,#LRL-TheLordOfTheRingsLCG,ImageUtils.get(PathUi+'TheLordOfTheRingsLCG.png'),null
    );
    GAME.masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
    GAME.masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
    if ($LRL-uiIconSize == null) $LRL-uiIconSize = 24;
    if ($LRL-IllustratorUnknown == null) $LRL-IllustratorUnknown = '';
    if ($LRL-IllustratorShort == null) $LRL-IllustratorShort = '';

    Eons.namedObjects.LRL = new gameObject();
    for (let index in Eons.namedObjects.LRL.IconTagList) {
        registerContextBarButton(Eons.namedObjects.LRL.IconTagList[index]);
    } //a\u00f1adir registro de error

    /* Preferences dialog */
    importClass(ca.cgjennings.apps.arkham.dialog.prefs.FillInPreferenceCategory);
    importClass(javax.swing.JTextField);

    var pc = new FillInPreferenceCategory(@LRL-short, PathUi + 'TheLordOfTheRingsLCG-big.png');

    pc.heading(@LRL-TheLordOfTheRingsLCG);
    pc.join();
    pc.addHelp(@LRL-Guide-link, @LRL-Guide, false);

    if ($LRL-AdvancedControls == null) $LRL-AdvancedControls = false;
    pc.addCheckBox('LRL-AdvancedControls', @LRL-AdvancedControls, false);
    pc.join();
    pc.addTip(@LRL-AdvancedControls-tip-preferences);

    if ($LRL-Debug == null) $LRL-Debug = 5;
    pc.label(@LRL-Debug);
    pc.join();
    pc.addDropDown('LRL-Debug', [@LRL-Debug-0, @LRL-Debug-1, @LRL-Debug-2, @LRL-Debug-3, @LRL-Debug-4, @LRL-Debug-5] // interface labels
    , [0, 1, 2, 3, 4, 5] // actual setting values
    );
    pc.join();
    pc.addTip(@LRL-Debug-tip-preferences);

    pc.subheading(@LRL-DefaultValues);

    if ($LRL-UpdateToPreferences == null) $LRL-UpdateToPreferences = false;
    pc.addCheckBox('LRL-UpdateToPreferences', @LRL-UpdateToPreferences, false);
    pc.join();
    pc.addTip(@LRL-UpdateToPreferences-tip-preferences);

    if ($LRL-CollectionInfo == null) $LRL-CollectionInfo = '';
    pc.addField('LRL-CollectionInfo', @LRL-CollectionInfo, ShortText);
    pc.join();
    pc.addTip(@LRL-CollectionInfo-tip-preferences);

    if ($LRL-Copyright == null) $LRL-Copyright = '';
    pc.addField('LRL-Copyright', @LRL-Copyright, MediumText);
    pc.join();
    pc.addTip(@LRL-Copyright-tip-preferences);

    if ($LRL-Collection == null) $LRL-Collection = 'KeepValue';
    pc.label(@LRL-Collection);
    pc.join();
    let values = new Array('KeepValue').concat(Eons.namedObjects.LRL.DefaultIconList);
    values = values.concat(Eons.namedObjects.LRL.CollectionList);
    let labels = new Array();
    for (index in values) {
        labels[index] = @('LRL-' + values[index]);
    }
    pc.addDropDown('LRL-Collection', labels, values);
    pc.join();
    pc.addTip(@LRL-Collection-tip-preferences);

    if ($LRL-Collection-portrait-template == null) $LRL-Collection-portrait-template = '';
    pc.indent();
    pc.addField('LRL-Collection-portrait-template', @LRL-PathToIcon, LongText);
    pc.join();
    pc.addTip(@LRL-PathToIcon-tip-preferences);
    //  pc.join() ; 
    //  pc.addButton(
    //      @LRL-preferences-pathToIcon ,
    //      function addToList( actionEvent ) {
    //          var filename = ResourceKit.showImageFileDialog( null) ;
    //// no guarda en shared.settings
    //// guarda en Global (plug-in default)
    //          if (filename!=null) $LRL-Collection-portrait-template = filename ;
    //      } 
    //  );  
    pc.unindent();

    if ($LRL-EncounterSet == null) $LRL-EncounterSet = 'KeepValue';
    pc.label(@LRL-EncounterSet);
    pc.join();
    values = new Array('KeepValue').concat(Eons.namedObjects.LRL.DefaultIconList);
    values = values.concat(Eons.namedObjects.LRL.EncounterSetList);
    labels = new Array();
    for (index in values) {
        labels[index] = @('LRL-' + values[index]);
    }
    pc.addDropDown('LRL-EncounterSet', labels, values);
    pc.join();
    pc.addTip(@LRL-EncounterSet-tip-preferences);

    if ($LRL-EncounterSet-portrait-template == null) $LRL-EncounterSet-portrait-template = '';
    pc.indent();
    pc.addField('LRL-EncounterSet-portrait-template', @LRL-PathToIcon, LongText);
    pc.join();
    pc.addTip(@LRL-PathToIcon-tip-preferences);
    //  pc.join() ; 
    //  pc.addButton(
    //      @LRL-preferences-pathToIcon ,
    //      function action(){//addToList( actionEvent ) {
    //          var filename = ResourceKit.showImageFileDialog( null) ;
    //          if (filename!=null){ $LRL-EncounterSetUser = filename }
    //      } 
    //  );  
    pc.unindent();

    //  pc.subheading(@LRL-localization) ;
    //  
    //  pc.label(@LRL-locale) ;
    //  pc.join() ; 
    //  if($LRL-locale-toLoad==null ) $LRL-locale-toLoad = 'last' ; 
    //  pc.addDropDown( 
    //      'LRL-locale-toLoad',
    //      [ @LRL-LastValues,@LRL-CurrentLocale,@LRL-SpecifiedLocale ],
    //      ['last','current','specified']
    //  ) ;
    //  pc.join() ; 
    //  pc.addField('LRL-locale','',6) ;
    //  pc.join() ; 
    //  pc.addTip(@LRL-locale-tip) ;
    //  
    ////    pc.subheading(@LRL-preferences-subheading-debug) ;
    ////    pc.addCheckBox('LRL-debug',@LRL-preferences-debug,false) ;
    ////    pc.join() ; 
    ////    pc.addTip(@LRL-preferences-tip-debug) ;
    //  
    //  pc.addCheckBox('LRL-dontDelete',@LRL-preferences-dontDelete,false) ;
    //  pc.join() ; 
    //  pc.addTip(@LRL-dontDelete-tip) ;

    Preferences.registerCategory(pc);
}

function gameObject() { // GAME ){
    // "GameVariationList" includes the template variation list for 
    // strong game adaptations.
    this.GameVariationList = new Array('TheLordOfTheRingsLCG' //,// all the official and unoffical templates
    //, 'GUNNM' // new futuristic templates
    );

    // "DefaultIconList" defines the minimum item list for Collection
    // and EncounterSet lists
    this.DefaultIconList = new Array('CustomIcon' // used to include icons through a Portrait_panel
    , 'EmptyIcon' // used to not draw the icon
    , 'StrangeEons' // used to show the Strange Eons hat icon
    );

    this.ProductGroupList = new Array();
    this.ProductGroupList = String(Game.get('LRL').masterSettings.get('TheLordOfTheRingsLCG-ProductGroup-list')).split(',');
    debug(3, 'ProductGroupList: ' + this.ProductGroupList);

    importClass(arkham.diy.ListItem);

    function uiIcon(name) {
        debug(3, '\n\tuiIcon: ' + name);
        const PathUi = 'TheLordOfTheRingsLCG/ui/';
        const PathIcon = 'TheLordOfTheRingsLCG/icon/';
        const IconSize = 24; // Icon size in preferences
        let icon;
        let image = ImageUtils.get(PathUi + name + '.png', false, true) if (image == null) {
            image = ImageUtils.get(PathIcon + name + '.png', false, true);
            if (image == null) image = ImageUtils.get(PathUi + 'TheLordOfTheRingsLCG.png', false, true);
        }
        icon = ImageUtils.createIcon(image, IconSize, IconSize);
        return icon;
    }

    this.CollectionList = new Array();
    this.CollectionCombo = new Array();
    for (index in this.ProductGroupList) {
        let productGroup = this.ProductGroupList[index];
        this.CollectionList = this.CollectionList.concat(String(Game.get('LRL').masterSettings.get(productGroup + '-Collection-list')).split(','));
        list = this.DefaultIconList.concat(this.CollectionList);
        for (index in list) {
            let item = list[index];
            this.CollectionCombo[index] = ListItem(item, @('LRL-' + item), uiIcon(item));
        }
    }
    debug(3, 'CollectionList: ' + this.CollectionList);

    this.EncounterSetList = new Array();
    this.EncounterSetCombo = new Array();
    for (index in this.CollectionList) {
        let item = this.CollectionList[index];
        this.EncounterSetList = this.EncounterSetList.concat(String(Game.get('LRL').masterSettings.get(item + '-EncounterSet-list')).split(','));
        list = this.DefaultIconList.concat(this.EncounterSetList);
        for (index in list) {
            let item = list[index];
            this.EncounterSetCombo[index] = ListItem(item, @('LRL-' + item), uiIcon(item));
        }
    }
    debug(3, 'EncounterSetList: ' + this.EncounterSetList);

    this.OptionSpecialList = new Array('EmptyIcon', 'Sailing', 'EyeOfSauron', 'EyeOfSauron2', 'EyeOfSauron3', 'EyeOfSauron4', 'Person');
    debug(3, 'OptionSpecialList: ' + this.OptionSpecialList);

    this.SphereList = new String(Game.get('LRL').masterSettings.get('TheLordOfTheRingsLCG-Sphere-list')).split(',');
    debug(3, 'SphereList: ' + this.SphereList);

    this.FullIconList = new Array();
    for (index in this.CollectionList) {
        let collection = this.CollectionList[index];

        this.FullIconList = this.FullIconList.concat(collection);

        encountersetListForCurrentCollection = String(Game.get('LRL').masterSettings.get(collection + '-EncounterSet-list')).split(',');

        for (index1 in encountersetListForCurrentCollection) {
            let encounterset = encountersetListForCurrentCollection[index1];
            this.FullIconList = this.FullIconList.concat(encounterset);
        }
    }
    this.FullIconList = this.FullIconList.concat(this.SphereList);

    debug(3, 'FullIconList: ' + this.FullIconList);

    // Register fonts to be used in the plugin
    useLibrary('fontutils');
    var pathLRLfont = 'TheLordOfTheRingsLCG/font/LRLfont.ttf';
    var pathLRLsymbols = 'TheLordOfTheRingsLCG/font/LRLsymbols.ttf';
    var pathLRLwindlass = 'TheLordOfTheRingsLCG/font/LRLwindlass.ttf';
    this.BodyFont = ResourceKit.getBodyFamily();
    this.LRLfont = FontUtils.registerFontFamilyFromResources.apply(this, [pathLRLfont]);
    this.LRLsymbols = FontUtils.registerFontFamilyFromResources.apply(this, [pathLRLsymbols]);
    this.LRLwindlass = FontUtils.registerFontFamilyFromResources.apply(this, [pathLRLwindlass]);

    //  this.DumbFont = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/Dumbledor.ttf']);
    //  this.UnicodeFont = registerFont('Sun-ExtA.ttf');

    // "StyleTagList" defines the tags for text styles used in boxes 
    this.StyleTagList = new Array('LRLfont', 'LRLsymbols', 'LRLtitle', 'Trait', 'Section');

    // "IconTagList" contains the available tags for text paragraphs
    // it's used to add the elements to the context bar too
    this.IconTagList = new Array('Attack', 'Defense', 'Willpower', 'Threat', 'Unique', 'VerticalSpacer', 'HorizontalSpacer', 'List', 'Leadership', 'Lore', 'Spirit', 'Tactics', 'Baggins', 'Fellowship', 'Mastery', 'Sailing', 'HeadingOnCourse', 'HeadingOffCourse', 'HeadingBad', 'HeadingWorst', 'EyeOfSauron', 'Person', 'PerPlayer', 'ShadowSeparator', 'ChoiceSeparator');

    // "EffectTagList" contains the available tags for text paragraphs
    // that substitute them for localized text strings
    //    this.EffectTagList = new Array(
    //        'ActionEffect', 'ResponseEffect', 'ForcedEffect'
    //        , 'ShadowEffect'
    //        , 'SuccessEffect', 'FailureEffect'
    //        , 'Choice1Effect', 'Choice2Effect'
    //        //, 'Ranged', 'Sentinel'
    //    );

    // "LocalizableList" contains the text elements used in any 
    // component it's used both for clearing a component and for
    // the in-component translations
    this.LocalizableList = new Array('Group', 'Artist', 'ArtistBack', 'CollectionInfo', 'Condition', 'ConditionBack', 'Copyright', 'Group', 'Flavour', 'FlavourBack', 'FlavourLeft', 'FlavourRight', 'Group', 'Name', 'NameBack', 'OptionLeft', 'OptionRight', 'OptionLeftBack', 'OptionRightBack', 'Rules', 'RulesBack', 'RulesLeft', 'RulesRight', 'Shadow', 'Story', 'StoryBack', 'StoryLeft', 'StoryRight', 'Subtype', 'Trait', 'Type');
}