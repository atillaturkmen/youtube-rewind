import {getWatchHistory} from "../util/videoUtil";
import {format} from "date-fns";
import React from "react";
import {errorPage} from "./errorPage";

export function watchHistoryTable(json) {
    try {
        let watchHistory = getWatchHistory(json);
        return (
            <div>
                <br/>
                <h2>Watch History</h2>
                <br/>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                        <tr className="text-nowrap">
                            <th>Video Title</th>
                            <th>Channel</th>
                            <th>Date Watched</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            watchHistory.map(
                                (video, index) => (
                                    <tr key={index}>
                                        <td><a href={video.titleUrl}  target="_blank" rel="noreferrer">{video.title}</a></td>
                                        <td>{video.subtitles[0].name}</td>
                                        <td>{format(new Date(video.time), "dd/MM/yyyy H:mm")}</td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <br/>
            </div>
        );
    } catch (e) {
        console.log(json);
        console.error(e);
        return (
            errorPage("Watch History")
        );
    }
}
