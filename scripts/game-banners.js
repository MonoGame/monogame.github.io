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
            for (var i=0; i < games.length; i++)
            {
                if (games[i].name == name)
		{
                    show_banner(games[i]);
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
		var featuredBanners = games.filter(function(banner) {
			return banner.tags.includes('Featured');
		});

        shuffled = shuffled.concat(featuredBanners);
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
    var headerImage = document.getElementById("hero-background-image");
    headerImage.style.backgroundImage = "url('" + BannerPath + title.screenshot + "')";
    set_pixel_art(headerImage, title.pixelart);

	var logoImage = document.getElementById("credits-logo");
    logoImage.src = BannerPath + title.logo;
    logoImage.parentElement.href = title.url;
}

init_banner();
