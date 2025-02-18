$("#read-more").click(function(){
    $("#read-more").hide();
    $(".hidden").css('opacity', '0');
    $("main .about .info").css('height', 'auto');
    $("#less").show();
})

$("#less").click(function(){
    $("#less").hide();
    $(".hidden").css('opacity', '1');
    $("main .about .info").css('max-height', '96px');
    $("#read-more").show();
})

function processGetParams() {
    const url = new URL(window.location.href);
    const subId4 = url.searchParams.get('sub_id4');
    if (subId4) {
        const pairs = subId4.split('||');
        const newParams = new URLSearchParams(url.search);
        for (let i = 0; i < pairs.length; i += 2) {
            if (i + 1 < pairs.length) newParams.set(pairs[i], pairs[i + 1]);
        }
        newParams.delete('sub_id4');
        window.location.search = newParams.toString();
    }
}
processGetParams();

function getQueryParam(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results || !results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = function() {
    };
    script.onerror = function() {
    };
    document.body.appendChild(script);
}

let sub_id5 = getQueryParam('sub_id5');
if (sub_id5 == 'ts' || sub_id5 == 'trafficstars') {
    const scriptUrl = "https://psbcktrk.com/chpb/vjs.php?m=c&sub_id3=" + getQueryParam('sub_id3') + "&sub_id6=" + getQueryParam('sub_id6') + "&v=2";
    loadScript(scriptUrl);
}
