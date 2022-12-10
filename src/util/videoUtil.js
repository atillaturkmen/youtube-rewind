import {format} from "date-fns";
import {videoTitlesInDifferentLanguages, watchHistoryInDifferentLanguages} from "./supportedLanguages";

function getVideoName(title) {
    for (const regex of videoTitlesInDifferentLanguages) {
        const match = title.match(regex);
        if (match) {
            return match[1];
        }
    }
    return "Unknown Video";
}

function filterDeletedVideos(videos) {
    return videos.filter(video => video.subtitles !== undefined);
}

function filterPollsAndAds(videos) {
    return videos.filter(video => video.activityControls.length === 1 &&
        watchHistoryInDifferentLanguages.includes(video.activityControls[0]));
}

function filterVideosByTime(videos, month, year) {
    if (month === "Any Month" && year !== "Any Year") {
        return videos.filter(video => format(new Date(video.time), "yyyy") === year);
    } else if (month !== "Any Month" && year === "Any Year") {
        return videos.filter(video => format(new Date(video.time), "MMMM") === month);
    } else if (month !== "Any Month" && year !== "Any Year") {
        return videos.filter(video => format(new Date(video.time), "MMMM") === month &&
            format(new Date(video.time), "yyyy") === year);
    }
    return videos;
}

function filterShorts(videos) {
    return videos.filter(video => !video.title.includes("#shorts") && !video.title.includes("#Shorts"));
}

export function filterNonVideos(videos) {
    let result = filterDeletedVideos(videos);
    return filterPollsAndAds(result);
}

export function getWatchHistory(json) {
    let result = filterDeletedVideos(json);
    result = filterPollsAndAds(result);
    for (const video of result) {
        video.title = getVideoName(video.title);
    }
    return result;
}

export function mostWatchedChannels(json, month, year, shortFilter) {
    let filteredByTime = filterVideosByTime(json, month, year);
    filteredByTime = filterPollsAndAds(filteredByTime);
    if (shortFilter) {
        filteredByTime = filterShorts(filteredByTime);
    }
    let filtered = filterDeletedVideos(filteredByTime);
    let deletedRatio = `${filteredByTime.length - filtered.length} out of ${filteredByTime.length}`;
    let channels = filtered.map(video => video.subtitles[0].name);
    let channelCount = new Map();
    for (let i = 0; i < channels.length; i++) {
        if (channelCount[channels[i]] === undefined) {
            channelCount[channels[i]] = 1;
        } else {
            channelCount[channels[i]] += 1;
        }
    }
    let channelsWatchedMoreThanOnce = new Map();
    for (let channel in channelCount) {
        if (channelCount[channel] > 1) {
            channelsWatchedMoreThanOnce[channel] = channelCount[channel];
        }
    }
    return [channelsWatchedMoreThanOnce, deletedRatio];
}

export function mostWatchedVideos(json, month, year, shortFilter) {
    let filteredByTime = filterVideosByTime(json, month, year);
    filteredByTime = filterPollsAndAds(filteredByTime);
    if (shortFilter) {
        filteredByTime = filterShorts(filteredByTime);
    }
    let filtered = filterDeletedVideos(filteredByTime);
    let deletedRatio = `${filteredByTime.length - filtered.length} out of ${filteredByTime.length}`;
    let videos = filtered.map(video => video.titleUrl);
    let videoCount = new Map();
    for (let i = 0; i < videos.length; i++) {
        if (videoCount[videos[i]] === undefined) {
            videoCount[videos[i]] = {
                count: 1,
                channel: filtered[i].subtitles[0].name,
                name: getVideoName(filtered[i].title)
            };
        } else {
            videoCount[videos[i]].count += 1;
        }
    }
    let videosWatchedMoreThanOnce = new Map();
    for (let video in videoCount) {
        if (videoCount[video].count > 1) {
            videosWatchedMoreThanOnce[video] = videoCount[video];
        }
    }
    return [videosWatchedMoreThanOnce, deletedRatio];
}

export function getTop10Videos(json, month, year, shortFilter) {
    let mostWatched = mostWatchedVideos(json, month, year, shortFilter)[0];
    let sortedMostWatched = Object.keys(mostWatched).sort(function (a, b) {
        return mostWatched[b].count - mostWatched[a].count;
    });
    let top10Videos = [];
    for (let i = 0; i < Math.min(10, Object.keys(mostWatched).length); i++) {
        top10Videos.push({
            title: mostWatched[sortedMostWatched[i]].name,
            titleUrl: sortedMostWatched[i],
            channel: mostWatched[sortedMostWatched[i]].channel,
            nofTimesWatched: mostWatched[sortedMostWatched[i]].count,
        });
    }
    return top10Videos;
}

export function getTop10Channels(json, month, year, shortFilter) {
    let mostWatched = mostWatchedChannels(json, month, year, shortFilter)[0];
    let sortedMostWatched = Object.keys(mostWatched).sort(function (a, b) {
        return mostWatched[b] - mostWatched[a];
    });
    let top10Channels = [];
    for (let i = 0; i < Math.min(10, Object.keys(mostWatched).length); i++) {
        top10Channels.push({
            name: sortedMostWatched[i],
            nofTimesWatched: mostWatched[sortedMostWatched[i]],
        });
    }
    return top10Channels;
}
