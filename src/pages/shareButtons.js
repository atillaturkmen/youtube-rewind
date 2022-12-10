import {
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton, WhatsappIcon, WhatsappShareButton
} from "react-share";

export function ShareButtons(obj, month, year) {
    let shareString = "Check out which channels I watched on YouTube";
    if (month !== "Any Month" || year !== "Any Year") {
        shareString += " in ";
    }
    if (month !== "Any Month") {
        shareString += month + " ";
    }
    if (year !== "Any Year") {
        shareString += year;
    }
    shareString += "!\n\n";
    for (let i = 0; i < obj.channels.length; i++) {
        shareString += `${i+1}. ${obj.channels[i].name}: ${obj.channels[i].nofTimesWatched} videos\n`;
    }
    shareString += "\n";
    shareString += "https://www.youtuberewind.net";
    return (
        <div className="row justify-content-start">
            <h5>Share your top 10 most watched channels:</h5>
            <div className="col">
                <RedditShareButton url={shareString}><RedditIcon size="32" round={true}></RedditIcon></RedditShareButton>
            </div>
            <div className="col">
                <TwitterShareButton url={shareString}><TwitterIcon size="32" round={true}></TwitterIcon></TwitterShareButton>
            </div>
            <div className="col">
                <FacebookShareButton url={shareString}><FacebookIcon size="32" round={true}></FacebookIcon></FacebookShareButton>
            </div>
            <div className="col">
                <WhatsappShareButton url={shareString}><WhatsappIcon size="32" round={true}></WhatsappIcon></WhatsappShareButton>
            </div>
        </div>
    );
}
