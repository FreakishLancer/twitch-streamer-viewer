const streamers = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
    ];
const twitchAPI = "https://wind-bow.gomix.me/twitch-api/";

class Channel {
    constructor(name, statusCheck = "all") {

        const streamsAPI = `${twitchAPI}streams/${name}`;
        const usersAPI = `${twitchAPI}users/${name}`;
        const channelsAPI = `${twitchAPI}channels/${name}`;

        let dataCount = 0;

        $.getJSON(usersAPI, data => {
            if (data.hasOwnProperty("message")) this.message = data.message;
            this.name = data.display_name;
            data.bio === null ? this.bio = "" : this.bio = data.bio;
            this.logo = data.logo;
        }).then(() => {
            dataCount++;
            if (dataCount === 3) {
                Channel.appendStreamer(this, statusCheck);
            }
        });

        $.getJSON(streamsAPI, data => {
            if (data.stream === null) this.onlineStatus = `<i class="fa fa-times"></i>`;
            else if (data.stream !== null && data.stream !== undefined) this.onlineStatus = `<i class="fa fa-check"></i>`;
        }).then(() => {
            dataCount++;
            if (dataCount === 3) {
                Channel.appendStreamer(this, statusCheck);
            }
        });

        $.getJSON(channelsAPI, data => {
            data.status === null ? this.status = "" : this.status = data.status;
            this.url = data.url;
            this.totalViews = data.views;
            this.followers = data.followers;
        }).then(() => {
            dataCount++;
            if (dataCount === 3) {
                Channel.appendStreamer(this, statusCheck);
            }
        });
    }

    static appendStreamer(streamer, statusCheck) {
        streamer.hasOwnProperty("message") ?
            streamer.tableString = `<th scope="row" colspan="2"></th>
                <td colspan="5">${streamer.message}</td>
            </tr>` :
            streamer.tableString = `<th scope="row">${streamer.onlineStatus}</th>
                <td><img src="${streamer.logo}" alt="${streamer.name} channel logo"></td>
                <td><a href="${streamer.url}" target="_blank">${streamer.name}</a></td>
                <td class="table-text">${streamer.bio}</td>
                <td class="table-text">${streamer.status}</td>
                <td>${streamer.totalViews}</td>
                <td>${streamer.followers}</td>
            </tr>`;

        if (statusCheck === "all") {
            streamer.onlineStatus === `<i class="fa fa-check"></i>` ?
                $(".streamer-info").append(`<tr class="table-success">${streamer.tableString}`) :
                $(".streamer-info").append(`<tr class="table-warning">${streamer.tableString}`);
        } else if (statusCheck === "online") {
            if (streamer.onlineStatus === `<i class="fa fa-check"></i>`)
                $(".streamer-info").append(`<tr class="table-success">${streamer.tableString}`);
        } else if (statusCheck === "offline") {
            if (streamer.onlineStatus !== `<i class="fa fa-check"></i>`)
                $(".streamer-info").append(`<tr class="table-warning">${streamer.tableString}`);
        }
    }
}

$(document).ready(() => {

    streamers.map(x => new Channel(x));

    $("#all-streamers").on("click", () => {
        $(".streamer-info").html("");
        streamers.map(x => new Channel(x));
    });

    $("#online-streamers").on("click", () => {
        $(".streamer-info").html("");
        streamers.map(x => new Channel(x, "online"));
    });

    $("#offline-streamers").on("click", () => {
        $(".streamer-info").html("");
        streamers.map(x => new Channel(x, "offline"));
    });

});