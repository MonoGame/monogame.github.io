var banners = [

{"name":"sor4","logo":"sor4-logo.png","screenshot":"sor4-screenshot.jpg","url":"https:\/\/www.streets4rage.com\/","pixelart":false,"tags":["2D","Console","PlayStation4","XboxOne","NintendoSwitch","Featured"]},
{"name":"paladin","logo":"paladin-logo.png","screenshot":"paladin-screenshot.jpg","url":"http:\/\/pumpkin-games.net\/paladin.php","pixelart":false,"tags":["2D","Console","Mac","Linux","Desktop","XboxOne","NintendoSwitch","Featured"]},
{"name":"fhook","logo":"fhook-logo.png","screenshot":"fhook-screenshot.png","url":"http:\/\/flinthook.com\/","pixelart":true,"tags":["2D","Console","PlayStation4","XboxOne","NintendoSwitch","Featured"]},
{"name":"daryl","logo":"daryl-logo.png","screenshot":"daryl-screenshot.jpg","url":"https:\/\/danandgarygames.com\/superdaryldeluxe","pixelart":false,"tags":["2D","Console","PlayStation4","NintendoSwitch","Featured"]},
{"name":"chasm","logo":"chasm-logo.png","screenshot":"chasm-screenshot.png","url":"http:\/\/www.chasmgame.com\/","pixelart":true,"tags":["2D","Console","PlayStation4","PSVita","NintendoSwitch","Featured"]},
{"name":"celeste","logo":"celeste-logo.png","screenshot":"celeste-screenshot.png","url":"http:\/\/www.celestegame.com\/","pixelart":true,"tags":["2D","Console","XboxOne","NintendoSwitch","PlayStation4","Featured"]},
{"name":"redungeon","logo":"redungeon-logo.png","screenshot":"redungeon-screenshot.png","url":"http:\/\/www.eneminds.com\/redungeon\/","pixelart":true,"tags":["Mobile","iOS","Android","Featured"]},
{"name":"squareheroes","logo":"squareheroes-logo.png","screenshot":"squareheroes-screenshot.png","url":"http:\/\/www.squareheroes.com\/","pixelart":false,"tags":["Console","PlayStation4","Featured"]},
{"name":"wayward","logo":"wayward-logo.png","screenshot":"wayward-screenshot.jpg","url":"http:\/\/www.wtfrontier.com\/","pixelart":false,"tags":["Windows","Desktop","Featured"]},
{"name":"skulls","logo":"skulls-logo.png","screenshot":"skulls-screenshot.jpg","url":"http:\/\/skullsoftheshogun.com\/","pixelart":false,"tags":["Console","PlayStation4","Mobile","Android","Featured"]},
{"name":"ty","logo":"ty-logo.png","screenshot":"ty-screenshot.jpg","url":"http:\/\/www.kromestudios.com\/TY\/","pixelart":false,"tags":["Desktop","Windows","2D","Featured"]},
{"name":"hockey","logo":"oth-logo.png","screenshot":"oldtimehockey-screenshot.jpg","url":"http:\/\/www.bushhockeyleague.com\/","pixelart":false,"tags":["Console","PlayStation4","XboxOne","3D","Featured"]},
{"name":"flight","logo":"flight-logo.png","screenshot":"flight-screenshot.jpg","url":"http:\/\/www.infinite-flight.com\/","pixelart":false,"tags":["iOS","Android","Mobile","3D","Featured"]},
{"name":"neurovoider","logo":"neurovoider-logo.png","screenshot":"neurovoider-screenshot.jpg","url":"http:\/\/www.neurovoider.com\/","pixelart":true,"tags":["Windows","Mac","Linux","XboxOne","PlayStation4","PSVita","NintendoSwitch","2D","Desktop","Console","Featured"]},
{"name":"apotheon","logo":"apotheon-logo.png","screenshot":"apotheon-screenshot.jpg","url":"http:\/\/www.apotheongame.com\/","pixelart":false,"tags":["PlayStation4","2D","Console","Featured"]},
{"name":"axiom","logo":"axiom-logo.png","screenshot":"axiom-screenshot.png","url":"http:\/\/www.axiomverge.com\/","pixelart":true,"tags":["PlayStation4","XboxOne","NintendoSwitch","PSVita","2D","Console","Featured"]},
{"name":"towerfall","logo":"towerfall-logo.png","screenshot":"towerfall-screenshot.jpg","url":"http:\/\/www.towerfall-game.com\/","pixelart":true,"tags":["PlayStation4","XboxOne","NintendoSwitch","PSVita","2D","Console","Featured"]},
{"name":"stardew","logo":"stardew-logo4.png","screenshot":"stardew-screenshot.png","url":"http:\/\/www.stardewvalley.net\/","pixelart":true,"tags":["PlayStation4","XboxOne","NintendoSwitch","PSVita","2D","Console","Mac","Linux","Desktop","Featured"]},
{"name":"toothandtail","logo":"toothandtail-logo.png","screenshot":"toothandtail-screenshot.png","url":"http:\/\/www.toothandtailgame.com\/","pixelart":false,"tags":["PlayStation4","Windows","2D","Console","Desktop","Featured"]}

];

var preload = new Array();
var shuffled = [];
function shuffle(a,b,c,d){c=a.length;while(c)b=Math.random()*(--c+1)|0,d=a[c],a[c]=a[b],a[b]=d}
function unique(a){return a.filter(function(e, p) { return a.indexOf(e) == p; });}

function set_pixel_art(element, pixelart)
{
	if (pixelart == true)
	{
		element.style["image-rendering"] = "pixelated";
		element.style["-ms-interpolation-mode"] = "nearest-neighbor";
	}
	else
	{
		element.style["image-rendering"] = "auto";
		element.style["-ms-interpolation-mode"] = "bicubic";
	}
}

function init_banner()
{
    var data = window.top.location.search;
    if(data != null && data !="")
    {
        var pattern = /banner=(\w+)/;
        var result = pattern.exec(data);
        if(result != null)
        {
            var name = result[1];
            for (var i=0; i < banners.length; i++)
            {
                if (banners[i].name == name)
		{
                    show_banner(banners[i]);
		    return;
		}
            }
        }     
    }

    random_banner();
}

function random_banner()
{
    if (shuffled.length <= 1)
    {
        shuffled = shuffled.concat(banners);
	shuffled = unique(shuffled);
	shuffle(shuffled);
    }

    var title = shuffled[0];
    shuffled.splice(0, 1);

    show_banner(title);

    if (shuffled.length > 0)
    {
        var next = shuffled[0];
	preload[0] = new Image();
	preload[0].src = BannerPath + next.screenshot;
	preload[1] = new Image();
	preload[1].src = BannerPath + next.logo;
    }

    setTimeout(random_banner, 10000);
}

function show_banner(title)
{
    var headerImage = document.getElementById("big-image-header");
    headerImage.style.backgroundImage = "url('" + BannerPath + title.screenshot + "')";
    set_pixel_art(headerImage, title.pixelart);

	var logoImage = document.getElementById("big-image-logo");
    logoImage.src = BannerPath + title.logo;
    logoImage.parentElement.href = title.url;
}

var BannerPath = "/images/showcase-header/";

init_banner();
