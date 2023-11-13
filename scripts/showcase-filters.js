var tags = [
    {"name":"sor4","tags":["2D","Console","PlayStation4","XboxOne","NintendoSwitch","Featured"]},
    {"name":"paladin","tags":["2D","Console","Mac","Linux","Desktop","XboxOne","NintendoSwitch","Featured"]},
    {"name":"fhook","tags":["2D","Console","PlayStation4","XboxOne","NintendoSwitch","Featured"]},
    {"name":"mkings","tags":["2D","Console","PlayStation4","XboxOne","NintendoSwitch","PSVita"]},
    {"name":"goat2","tags":["2D","Console","PlayStation4"]},
    {"name":"daryl","tags":["2D","Console","PlayStation4","NintendoSwitch","Featured"]},
    {"name":"chasm","tags":["2D","Console","PlayStation4","PSVita","NintendoSwitch","Featured"]},
    {"name":"celeste","tags":["2D","Console","XboxOne","NintendoSwitch","PlayStation4","Featured"]},
    {"name":"rblob","tags":["2D","Android","Console","Desktop","Linux","Mac","Mobile","Windows","XboxOne"]},
    {"name":"bta","tags":["2D","3D","Desktop","Windows"]},
    {"name":"armed","tags":["3D","Desktop","Mobile","Windows","WindowsPhone"]},
    {"name":"redungeon","tags":["Mobile","iOS","Android","Featured"]},
    {"name":"squareheroes","tags":["Console","PlayStation4","Featured"]},
    {"name":"wayward","tags":["Windows","Desktop","Featured"]},
    {"name":"bastion","tags":["Console","Desktop","Mac","PlayStation4"]},
    {"name":"fez","tags":["Desktop","Linux","Mac"]},    
    {"name":"skulls","tags":["Console","PlayStation4","Mobile","Android","Featured"]},
    {"name":"ty","tags":["Desktop","Windows","2D","Featured"]},
    {"name":"hockey","tags":["Console","PlayStation4","XboxOne","3D","Featured"]},
    {"name":"flight","tags":["iOS","Android","Mobile","3D","Featured"]},
    {"name":"neurovoider","tags":["Windows","Mac","Linux","XboxOne","PlayStation4","PSVita","NintendoSwitch","2D","Desktop","Console","Featured"]},
    {"name":"apotheon","tags":["PlayStation4","2D","Console","Featured"]},
    {"name":"axiom","tags":["PlayStation4","XboxOne","NintendoSwitch","PSVita","2D","Console","Featured"]},
    {"name":"towerfall","tags":["PlayStation4","XboxOne","NintendoSwitch","PSVita","2D","Console","Featured"]},
    {"name":"stardew","tags":["PlayStation4","XboxOne","NintendoSwitch","PSVita","2D","Console","Mac","Linux","Desktop","Featured"]},
    {"name":"bleed2","tags":["2D","Console","NintendoSwitch","PlayStation4","XboxOne"]},
    {"name":"bleed","tags":["2D","Console","NintendoSwitch","PlayStation4","XboxOne"]},
    {"name":"toothandtail","tags":["PlayStation4","Windows","2D","Console","Desktop","Featured"]},
    {"name":"mgforms","tags":["Library","Linux","Windows"]}    
];

function init_filter() {
    var data = window.top.location.search;
    if(data != null && data !="")
    {        
        var elements = document.getElementsByClassName('showcase-link-image');        
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        for (var i = 0; i < tags.length; i++) {
            if (tags[i].tags.includes(removeQuestionmark(data))) {
                var name = tags[i].name;
                var element = document.getElementById(name);
                if (element) {
                    element.style.display = 'block';
                }                
            }
        }
    }
}

function removeQuestionmark(str) {
    var pattern = /\?/;
    var result = pattern.exec(str);
    if (result != null) {
        return str.replace('?', '');
    } else {
        return str;
    }
}

init_filter();