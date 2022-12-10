import submitSS from '../image/takeout_submit.png';
import beforeSubmitSS from '../image/before_submit.png';

export function welcome() {
    return (
        <ol>
            <li>Go to <a href="https://takeout.google.com/" target="_blank"
                         rel="noreferrer">https://takeout.google.com/</a></li>
            <br/>
            <li>Start by deselecting all services
                <br/>
                <br/>
                <img src="https://gitlab.com/viktomas/total-youtube-watchtime/-/raw/master/docs/deselect-all.png"
                     alt="" width="800"/>
            </li>
            <br/>
            <li>Then scroll to Youtube and select it to be exported
                <br/>
                <br/>
                <img src="https://gitlab.com/viktomas/total-youtube-watchtime/-/raw/master/docs/select-youtube.png"
                     alt="" width="800"/></li>
            <br/>
            <li>Click on the "Multiple Formats" button on the YouTube item and select JSON for history and click OK
                <br/>
                <br/>
                <img src="https://gitlab.com/viktomas/total-youtube-watchtime/-/raw/master/docs/json-history.png"
                     alt="" width="500"/></li>
            <br/>
            <li>Now click on "All YouTube data included" button and select only History:
                <br/>
                <br/>
                <img src="https://gitlab.com/viktomas/total-youtube-watchtime/-/raw/master/docs/only-history.png"
                     alt="" width="300"/></li>
            <br/>
            <li>Only youtube service should be selected and it should look like this now:
                <br/>
                <br/>
                <img src="https://gitlab.com/viktomas/total-youtube-watchtime/-/raw/master/docs/final-youtube.png"
                     alt="" width="800"/></li>
            <br/>
            <li>Go to the next step and keep the defaults:<br/>
                - Send download link via email<br/>
                - Export once<br/>
                - .zip<br/>
                - 2GB<br/>
                <br/>
                <img src={beforeSubmitSS} alt="" width="500"/>
                <br/>
            </li>
            <br/>
            <li>Submit and wait for an email. <br/>
                <br/>
                <img src={submitSS} alt="" width="500"/>
                <br/>
                <b>It takes 1 or 2 minutes if you select only your youtube history on the
                    contrary to Google's "possibly hours or days"
                    statement.</b>
            </li>
            <br/>
            <li>Download the archive file from your email link to your computer</li>
            <br/>
            <li>After unpacking the archive, find the `watch-history.json` file in `Takeout/YouTube and YouTube
                Music/history/watch-history.json`
            </li>
            <br/>
            <li>Finally, select `watch-history.json` file via button below</li>
        </ol>
    );
}
