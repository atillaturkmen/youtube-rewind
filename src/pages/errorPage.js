import extract from '../image/extract.png';
import extract2 from '../image/extract2.png';
import selectExtracted from '../image/select_extracted.png';
import React from "react";

export function errorPage(title) {
    return (
        <div className="container">
            <br/>
            <h2>{title}</h2>
            <br/>
            <p>
                There was an error parsing the watch history. Make sure you have a watch-history.json file from
                your Google Takeout.
            </p>
            <br/>
            <h5>Possible reasons you encountered this error:</h5>
            <ol>
                <li>Make sure you unzipped the archive and selected "watch-history.json" file.</li>
                <br/>
                <img src={extract} alt="" width="500"/>
                <br/>
                <img src={extract2} alt="" width="500"/>
                <br/>
                <img src={selectExtracted} alt="" width="600"/>
                <br/>
                <li>Your Google account language may not be in supported languages*. If that is the case, set
                    English as your Google account language and get your history file again.
                </li>
                <br/>
                <li>
                    If none of the above helped, please contact me at <a
                    href="mailto:contact@youtuberewind.net">contact@youtuberewind.net</a>.
                </li>
                <br/>
                <p>*Supported Languages:</p>
                <ul>
                    <li>English</li>
                    <li>Turkish</li>
                    <li>German</li>
                    <li>Arabic</li>
                    <li>Azerbaijani</li>
                    <li>Bengali</li>
                    <li>Persian</li>
                    <li>Philippine</li>
                    <li>French</li>
                    <li>Hindi</li>
                    <li>Spanish</li>
                    <li>Italian</li>
                    <li>Japanese</li>
                    <li>Korean</li>
                    <li>Russian</li>
                    <li>Urdu</li>
                    <li>Dutch</li>
                    <li>Swedish</li>
                    <li>Danish</li>
                    <li>Norwegian</li>
                    <li>Romanian</li>
                    <li>Polish</li>
                    <li>Ukrainian</li>
                    <li>Greek</li>
                    <li>Finnish</li>
                    <li>Czech</li>
                    <li>Bulgarian</li>
                    <li>Hungarian</li>
                </ul>
            </ol>
            <br/>
        </div>
    );
}
