var urlStream = "https://wind-bow.glitch.me/twitch-api/streams/";
var urlChannel = "https://wind-bow.glitch.me/twitch-api/channels/";
var channelList = ["a_seagull","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function(){

    refreshPages("all");
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
        refreshPages($(this).html());
        console.log($(this).html() + "  this.html");
    });
});


function refreshPages(status){
    var html;
    var htmlAll;
    var jsonUrl;
    var jsonChannel;
    var channelLogo;
    var channelName;
    var channelUrl;
    var channelDetails;

    $(".main-view").empty();
    channelList.forEach(function(element){
        jsonUrl = urlStream + element;
        $.getJSON(jsonUrl, function(json){
            if(json.stream == null){    //  online or offline  offline = null
                console.log("offline element  " + element);
                jsonChannel = urlChannel + element;     //  if offline getjson from channel api
                if(status == "Online")                  
                    //  at online page offline item will not display
                    html = "";
                else {
                    html = GetJsonChannel(jsonChannel);
                    console.log(html);                    
                }
                
            }
            else {
                console.log("online element  " + element);
                if(status == "Offline"){
                    html = "";
                    console.log("online element in offline page");              
                }
                else {
                    console.log(jsonUrl + "  online");
                    channelLogo = json.stream.channel.logo;
                    channelName = json.stream.channel.display_name;
                    channelUrl = json.stream.channel.url;
                    channelDetails = json.stream.channel.status;
                    html = '<div class="streamer-card"><div class="card-title"><img src="' + channelLogo + '" alt="channel-logo" class="img-circle"><a href="' + channelUrl + '"><h4>' + channelName + '</h4></a></div><div class="card-details"><p>' + channelDetails + '</p></div></div>';
                    $(".main-view").append(html);
                }
            }
        });
    });

}

function GetJsonChannel(jsonChannel){
    console.log(jsonChannel + "   offline");
    var channelLogo;
    var channelName;
    var channelUrl;
    $.getJSON(jsonChannel, function(data){
        channelLogo = data.logo;
        channelName = data.display_name;
        channelUrl = data.url;
        var html = '<div class="streamer-card offline"><div class="card-title"><img src="' + channelLogo + '" alt="channel-logo" class="img-circle"><a href="' + channelUrl + '"><h4>' + channelName + '</h4></a></div></div>';
        $(".main-view").append(html);
        return html;
    });
}
