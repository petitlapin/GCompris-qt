.pragma library
.import QtQuick 2.0 as Quick

var backgroundImages = [
    "Adelie_Penguin2.jpg",
    "Adelie_Penguin.jpg",
    "Asian_Elephant_and_Baby.jpg",
    "bear001.jpg",
    "black-headed-gull.jpg",
    "butterfly.jpg",
    "cape_petrel.jpg",
    "cat1.jpg",
    "cat2.jpg",
    "cow.jpg",
    "donkey.jpg",
    "earless_seal2.jpg",
    "earless_seal.jpg",
    "elephanteauxgc.jpg",
    "emperor_penguin.jpg",
    "flamentrosegc.jpg",
    "fulmar_antarctic.jpg",
    "gazelle.jpg",
    "giant_panda.jpg",
    "girafegc.jpg",
    "golden_toad.jpg",
    "Helioconius_sp_Richard_Bartz.jpg",
    "honey_bee.jpg",
    "horses2.jpg",
    "horses.jpg",
    "hypogc.jpg",
    "joybear002.jpg",
    "jumentmulassieregc.jpg",
    "maki1.jpg",
    "maki2.jpg",
    "maki3.jpg",
    "maki4.jpg",
    "maki5.jpg",
    "maki6.jpg",
    "malaybear002.jpg",
    "papilio_demodocus.jpg",
    "polabear011.jpg",
    "polarbear001.jpg",
    "poolbears001.jpg",
    "Pteroglossus-torquatus-001.jpg",
    "rhinogc.jpg",
    "sheep_irish2.jpg",
    "sheep_irish.jpg",
    "singegc.jpg",
    "skua.jpg",
    "snow_petrels.jpg",
    "spectbear001.jpg",
    "Spider_vdg.jpg",
    "squirrel.jpg",
    "tetegorillegc.jpg",
    "tiger1_by_Ralf_Schmode.jpg",
    "tigercub003.jpg",
    "tigerdrink001.jpg",
    "tigerplay001.jpg",
    "White_shark.jpg"
]

var blockImages = [
    "qrc:/gcompris/src/activities/erase/resource/transparent_square.svgz",
    "qrc:/gcompris/src/activities/erase/resource/transparent_square_yellow.svgz",
    "qrc:/gcompris/src/activities/erase/resource/transparent_square_green.svgz"
]

var currentLevel
var currentSubLevel
var currentImage
var main
var background
var bar
var bonus

// The array of created blocks object
var createdBlocks
var killedBlocks

function start(_main, _background, _bar, _bonus) {
    main = _main
    background = _background
    bar = _bar
    bonus = _bonus
    currentLevel = 0
    currentSubLevel = 0
    currentImage = 0
    initLevel()
}

function stop() {
    destroyBlocks();
}

function initLevel() {
    destroyBlocks();
    bar.level = currentLevel + 1
    background.source = "qrc:/gcompris/src/activities/erase/resource/" +
            backgroundImages[currentImage++]
    if(currentImage >= backgroundImages.length) {
        currentImage = 0
    }
    createdBlocks = new Array()
    var number_of_item_x = (currentLevel % 2 + 1) * 5;
    var number_of_item_y = (currentLevel % 2 + 1) * 5;
    var w = main.width / number_of_item_x
    var h = (main.height - bar.height) / number_of_item_y
    var i = 0

    for(var imgIndex = 0; imgIndex <= Math.floor(currentLevel / 2) ; imgIndex++) {
        for(var x = 0;  x < number_of_item_x; ++x) {
            for(var y = 0;  y < number_of_item_y; ++y) {
             createdBlocks[i++] = createBlock(w * x, h * y, w, h, blockImages[imgIndex])
            }
        }
    }
}

function nextLevel() {
    if( ++currentLevel >= 6 ) {
        currentLevel = 0
    }
    initLevel();
}

function nextSubLevel() {
    if( ++currentSubLevel > 10) {
        currentSubLevel = 0
        nextLevel()
    }
    initLevel();
}

function previousLevel() {
    if(--currentLevel < 0) {
        currentLevel = 5
    }
    initLevel();
}

function createBlock(x, y, w, h, img) {
    var component = Qt.createComponent("qrc:/gcompris/src/activities/erase/Block.qml");
    var block = component.createObject(
                background,
                {
                    "main": main,
                    "x": x,
                    "y": y,
                    "width": w,
                    "height": h,
                    "opacity": 0.0,
                    "source": img
                });

    block.opacity = 1.0
    if (block === null) {
        // Error Handling
        console.log("Error creating object");
    }
    return block;
}

function destroyBlocks() {
    if (createdBlocks) {
        for(var i = 0;  i < createdBlocks.length; ++i) {
            createdBlocks[i].destroy()
        }
        createdBlocks.length = 0
    }
    killedBlocks = 0
}

function blockKilled() {
    if(++killedBlocks === createdBlocks.length) {
        bonus.good("flower")
    }
}

function getFirstImage() {
    backgroundImages = shuffle(backgroundImages)
    return backgroundImages[0]
}

function shuffle(o) {
    for(var j, x, i = o.length; i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
