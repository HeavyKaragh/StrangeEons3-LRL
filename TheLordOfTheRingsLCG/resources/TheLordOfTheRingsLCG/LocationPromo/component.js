const Card = 'LocationPromo';
// a\u00f1adir gr\u00e1ficos de distinto tama\u00f1o para texto
const CardVersion = 1;
// 1: rewrite using new 2020 library

const TemplateList = new Array();

function create(diy) {}

function createInterface(diy, editor, sheet) {}

function createFrontPainter(diy, sheet) {}

function createBackPainter(diy, sheet) {}


function paintFront(g, diy, sheet) {
}

function paintBack(g, diy, sheet) {
    sheet.paintTemplateImage(g);
}

function onRead(diy, ois) {
    debug(1, '\nonRead');
    /*
    This is one of the main functions on scripted components.
    This function is called by Strange Eons on component file loading.
    When using custom portrait handling, Portraits must be loaded
    explicitly.
    */
    if (diy.settings.get('VersionHistory', '') == '') {
        debug(0, 'VersionHistory nonexistent.');
        $VersionHistory = diy.version;
    }
    let LastVersion = String($VersionHistory).split(',');
    LastVersion = LastVersion[LastVersion.length-1];
    if (LastVersion != Number(SEVersion + LRLVersion + CardVersion)) {
        debug(4, 'VersionHistory updated.');
        $VersionHistory = $VersionHistory + ',' + SEVersion + LRLVersion + CardVersion;
    }

    try {
        portrait = ois.readObject();
    } catch (err) {
        portrait = null;
    }
    while (portrait != null) {
        let index = PortraitList.length;
        debug(5, 'PortraitList length: '+PortraitList.length);
        PortraitList[index] = portrait;
        try {
            portrait = ois.readObject();
        } catch (err) {
            portrait = null;
        }
    }
    if (diy.settings.getBoolean('LRL-PreferencesUpdate', false)) loadPreferences(diy);
}

function onWrite(diy, oos) {
    debug(1, '\nonWrite');
    /*
    This is one of the main functions on scripted components.
    This function is called by Strange Eons on component file save.
    When using custom portrait handling, Portraits must be saved
    explicitly.
    */
    for (let index in PortraitList) {
        oos.writeObject(PortraitList[index]);
    }
    debug(5, 'PortraitList length: '+PortraitList.length);
}

function onClear(diy) {
    debug(1, '\nonClear');
    /*
    This is one of the main functions on scripted components.
    This function is called by the Strange Eons user interface on
    Edit>Clear menu. Should be used only to initialize the component
    settings and controls.
    In my code, I use the Localizable list defined in the game object
    to clear all the text of the card.
    */
    for (let index in GAMEOBJECT.LocalizableList) {
        diy.settings.reset(GAMEOBJECT.LocalizableList[index]);
    }
}

if (sourcefile == 'Quickscript') {
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
