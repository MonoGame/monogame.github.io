function init_filter() {
    var data = window.top.location.search;
    var container = document.getElementById('gamesList');
    var filterTag = data ? remove_questionmark(data) : null;

    shuffle_array(games);

    for (var i = 0; i < games.length; i++) {
        if (!filterTag || games[i].tags.includes(filterTag)) {
            add_to_screen(games[i], container);
        }
    }
}

function add_to_screen(game, container) {
    var gameDiv = document.createElement('div');
    gameDiv.id = game.name;
    gameDiv.className = 'showcase-link-image';
    gameDiv.style.backgroundImage = "url('" + BannerPath + game.screenshot + "')";

    if (game.pixelart == true)
	{        
        gameDiv.style["image-rendering"] = "pixelated";
		gameDiv.style["-ms-interpolation-mode"] = "nearest-neighbor";
    } 
    else 
    {
        gameDiv.style["image-rendering"] = "auto";
		gameDiv.style["-ms-interpolation-mode"] = "bicubic";
    }

    var link = document.createElement('a');
    link.href = game.url;

    var logoDiv = document.createElement('div');
    logoDiv.className = 'showcase-link-logo';
    logoDiv.style = "background:url('" + BannerPath + game.logo + "') center center no-repeat";
    logoDiv.title = game.title;

    link.appendChild(logoDiv);
    gameDiv.appendChild(link);
    container.appendChild(gameDiv);
}

function shuffle_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function remove_questionmark(str) {
    var pattern = /\?/;
    var result = pattern.exec(str);
    if (result != null) {
        return str.replace('?', '');
    } else {
        return str;
    }
}

init_filter();