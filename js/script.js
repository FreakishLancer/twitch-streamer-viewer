const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const twitchAPI = "https://wind-bow.gomix.me/twitch-api/";

class Channel {
    constructor(name) {

        let streamsAPI = `${twitchAPI}streams/${name}`;
        let usersAPI = `${twitchAPI}users/${name}`;
        let channelsAPI = `${twitchAPI}channels/${name}`;

        $.getJSON(streamsAPI, data => {
            if (data.stream === null) this.isOnline = false;
            else if (data.stream !== null && data.stream !== undefined) {
                this.isOnline = true;
                this.gameStreamed = data.stream.game;
                this.currentViewers = data.stream.viewers;
                this.streamPreviewImage = data.stream.preview.medium;
            }
        });

        $.getJSON(usersAPI, data => {
            this.name = data.display_name;
            this.bio = data.bio;
            this.logo = data.logo;
        });
        $.getJSON(channelsAPI, data => {
            this.status = data.status;
            this.banner = data.profile_banner;
            this.url = data.url;
            this.totalViews = data.views;
            this.followers = data.followers;
        });
    }
}

$(document).ready(() => {

    streamers.map(x => {
        let streamer = new Channel(x);
        console.log(streamer);
    })

});