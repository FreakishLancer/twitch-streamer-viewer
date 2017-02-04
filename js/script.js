const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const twitchAPI = "https://wind-bow.gomix.me/twitch-api/";


class Channel {
    constructor(name) {

        let streamsAPI = `${twitchAPI}streams/${name}`;
        let usersAPI = `${twitchAPI}users/${name}`;
        let channelsAPI = `${twitchAPI}channels/${name}`;

        $.getJSON(usersAPI, data => {
            if (data.hasOwnProperty("message")) this.message = data.message;

            this.name = data.display_name;
            this.bio = data.bio;
            this.logo = data.logo;
        });

        $.getJSON(streamsAPI, data => {
            if (data.stream === null) this.isOnline = false;
            else if (data.stream !== null && data.stream !== undefined) {
                this.isOnline = true;
                this.gameStreamed = data.stream.game;
                this.currentViewers = data.stream.viewers;
                this.streamPreviewImage = data.stream.preview.medium;
            }
        });

        $.getJSON(channelsAPI, data => {
            this.status = data.status;
            this.banner = data.profile_banner;
            this.url = data.url;
            this.totalViews = data.views;
            this.followers = data.followers;
        });

        this.tableString = `<th scope="row">#</th>
                                <td>${this.isOnline}</td>
                                <td><a href="${this.url}">${this.name}</a></td>
                                <td><img src="${this.logo}" alt="${this.name} channel logo"></td>
                                <td>${this.bio}</td>
                                <td>${this.status}</td>
                                <td>${this.totalViews}</td>
                                <td>${this.followers}</td>
                            </tr>`;
    }
}

$(document).ready(() => {

    $.ajaxSetup({async: false});

    streamers.map(x => {
        let streamer = new Channel(x);

        if (streamer.name === undefined) return;

        streamer.isOnline ? 
            $(".streamer-info").append(`<tr class="table-success">${streamer.tableString}`) : 
            $(".streamer-info").append(`<tr class="table-warning">${streamer.tableString}`);
    });

});