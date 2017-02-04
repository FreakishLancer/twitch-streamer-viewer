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
            data.bio === null ? this.bio = "" : this.bio = data.bio;
            this.logo = data.logo;
        });

        $.getJSON(streamsAPI, data => {
            if (data.stream === null) this.onlineStatus = `<i class="fa fa-times" aria-hidden="true"></i>`;
            else if (data.stream !== null && data.stream !== undefined) this.onlineStatus = `<i class="fa fa-check" aria-hidden="true"></i>`;
        });

        $.getJSON(channelsAPI, data => {
            data.status === null ? this.status = "" : this.status = data.status;
            this.url = data.url;
            this.totalViews = data.views;
            this.followers = data.followers;
        });

        this.hasOwnProperty("message") ? 
            this.tableString = `<th scope="row" colspan="2"></th>
                                    <td colspan="5">${this.message}</td>
                                </tr>` :
            this.tableString = `<th scope="row">${this.onlineStatus}</th>
                                    <td><img src="${this.logo}" alt="${this.name} channel logo"></td>
                                    <td><a href="${this.url}" target="_blank">${this.name}</a></td>
                                    <td class="table-text">${this.bio}</td>
                                    <td class="table-text">${this.status}</td>
                                    <td>${this.totalViews}</td>
                                    <td>${this.followers}</td>
                                </tr>`;

    }

    static findStreamer() {
        let searchTerm = $("#search-term").val();
        if (searchTerm === undefined || searchTerm === null || searchTerm === "") return;
        let streamer = new Channel(searchTerm);
        $(".streamer-info").html("");
        Channel.appendStreamer(streamer);
    }

    static appendStreamer(streamer) {
        streamer.onlineStatus === `<i class="fa fa-check" aria-hidden="true"></i>` ?
            $(".streamer-info").append(`<tr class="table-success">${streamer.tableString}`) :
            $(".streamer-info").append(`<tr class="table-warning">${streamer.tableString}`);
    }
}

$(document).ready(() => {

    $.ajaxSetup({async: false});

    streamers.map(x => {
        let streamer = new Channel(x);
        Channel.appendStreamer(streamer);
    });

/*    $("#submit-search").on("click", () => {
        Channel.findStreamer();
    });

    $("#submit-search").keypress(key => {
        if (key.keyCode === 13) {
            let searchTerm = $("#search-term").val();
            Channel.findStreamer(searchTerm);
        }
    })*/

    $("#all-streamers").on("click", () => {
        $(".streamer-info").html("");
        streamers.map(x => {
            let streamer = new Channel(x);
            Channel.appendStreamer(streamer);
        });
    });

    $("#online-streamers").on("click", () => {
        $(".streamer-info").html("");
        streamers.map(x => {
            let streamer = new Channel(x);
            if (streamer.onlineStatus === `<i class="fa fa-check" aria-hidden="true"></i>`) Channel.appendStreamer(streamer);
        });
    });

    $("#offline-streamers").on("click", () => {
        $(".streamer-info").html("");
        streamers.map(x => {
            let streamer = new Channel(x);
            if (streamer.onlineStatus !== `<i class="fa fa-check" aria-hidden="true"></i>`) Channel.appendStreamer(streamer);
        });
    });

});