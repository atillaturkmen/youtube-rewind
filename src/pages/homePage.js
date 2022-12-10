import {useFilePicker} from "use-file-picker";
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {watchHistoryTable} from "./watchHistoryTable";
import {welcome} from "./welcome";
import {privacy} from "./privacy";
import {getTop10Channels, getTop10Videos, mostWatchedChannels, mostWatchedVideos} from "../util/videoUtil";
import {Col, Dropdown, Row} from "react-bootstrap";
import {VideoChart} from "./chart";
import graphSS from '../image/graph.png';
import channelSS from '../image/most_watched_channels.png';
import videoSS from '../image/most_watched_videos.png';
import useScript from "../util/useScript";
import InnerHTML from 'dangerously-set-html-content'
import {processFile} from "../util/fileUtils";
import {errorPage} from "./errorPage";
import {ShareButtons} from "./shareButtons";

function HomePage() {
    const [openFileSelector, {filesContent, loading}] = useFilePicker({
        multiple: false,
    });
    const [showInstructions, setShowInstructions] = useState(false);
    const [showSS, setShowSS] = useState(false);
    const [page, setPage] = useState("channels");
    const [year, setYear] = useState("2022");
    const [month, setMonth] = useState("Any Month");
    const [channelFilter, setChannelFilter] = useState("");
    const [shortFilter, setShortFilter] = useState(false);
    useScript(process.env.PUBLIC_URL + "/autoCompleteForm.js");

    function navbar() {
        return <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand>Rewind 2022</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#/channels" onClick={() => {
                        setPage("channels")
                    }}>Most Watched Channels</Nav.Link>
                    <Nav.Link href="#/videos" onClick={() => {
                        setPage("videos")
                    }}>Most Watched Videos</Nav.Link>
                    <Nav.Link href="#/graph" onClick={() => {
                        setPage("graph");
                        setChannelFilter("");
                    }}>Graph</Nav.Link>
                    <Nav.Link href="#/privacy" onClick={() => {
                        setPage("privacy")
                    }}>Privacy Statement</Nav.Link>
                    <Nav.Link href="#/contact" onClick={() => {
                        setPage("contact")
                    }}>Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    }

    function shortFilterCheckbox() {
        return [<input onChange={() => {
            setShortFilter(!shortFilter)
        }} checked={shortFilter} style={{marginRight: "5px", marginLeft: "20px"}}
                       className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>,
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Filter Shorts
            </label>];
    }

    function dropDowns() {
        const years = [];
        for (let i = new Date().getFullYear(); i >= 2004; i--) {
            years.push(<Dropdown.Item onClick={() => setYear(i.toString())}>{i}</Dropdown.Item>);
        }
        return (
            <Row>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Month: {month}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setMonth("Any Month")}>Any Month</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("January")}>January</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("February")}>February</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("March")}>March</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("April")}>April</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("May")}>May</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("June")}>June</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("July")}>July</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("August")}>August</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("September")}>September</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("October")}>October</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("November")}>November</Dropdown.Item>
                            <Dropdown.Item onClick={() => setMonth("December")}>December</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Year: {year}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setYear("Any Year")}>Any Year</Dropdown.Item>
                            {years}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    {shortFilterCheckbox()}
                </Col>
            </Row>
        );
    }

    function filterByChannel() {
        let channelName = document.getElementById("channel_input").value;
        setChannelFilter(channelName);
    }

    function clearChannelFilter() {
        setChannelFilter("");
        document.getElementById("channel_input").value = "";
    }

    let json = null;

    if (loading) {
        return <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Rewind 2022</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Privacy Statement</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div className="container"><br/>Loading, Please Wait...</div>
        </div>;
    } else if (page === "privacy") {
        return (
            <div>
                {filesContent.length === 0 ?
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>Rewind 2022</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="#/home" onClick={() => {
                                    setPage("channels")
                                }}>Home</Nav.Link>
                                <Nav.Link to="#/privacy" onClick={() => {
                                    setPage("privacy")
                                }}>Privacy Statement</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar> : navbar()}
                {privacy()}
            </div>
        );
    } else if (filesContent.length === 0) {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>Rewind 2022</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#/home" onClick={() => {
                                setPage("home")
                            }}>Home</Nav.Link>
                            <Nav.Link href="#/privacy" onClick={() => {
                                setPage("privacy")
                            }}>Privacy Statement</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <div className="container">
                    <br/>
                    <h2>YouTube Rewind 2022</h2>
                    <br/>
                    <p>
                        This is a simple website to see statistics on videos you've watched on YouTube.
                    </p>
                    <div className={showSS ? "btn-group dropup" : "btn-group dropdown"}>
                        <button
                            className={showSS ? "btn btn-secondary dropdown-toggle" : "btn btn-outline-secondary dropdown-toggle"}
                            onClick=
                                {() => setShowSS(currentShow => !currentShow)}>See Example Screenshots
                        </button>
                    </div>
                    {showSS ? <div>
                        <br/>
                        <h5>Most Watched Channels: </h5>
                        <img src={channelSS} alt="most watched channels" width="100%"/>
                        <br/>
                        <h5>Most Watched Videos: </h5>
                        <img src={videoSS} alt="most watched videos" width="100%"/>
                        <br/>
                        <h5>Graph of monthly video consumption: </h5>
                        <img src={graphSS} alt="graph ss" width="100%"/>
                    </div> : <div/>}
                    <br/>
                    <p>
                        To get started, you need to have a YouTube history file that you can get from your Google
                        Takeout. <br/>
                        <b>You cannot use this service if you don't have your YouTube history turned on.</b>
                    </p>
                    <div className={showInstructions ? "btn-group dropup" : "btn-group dropdown"}>
                        <button
                            className={showInstructions ? "btn btn-secondary dropdown-toggle" : "btn btn-outline-secondary dropdown-toggle"}
                            onClick=
                                {() => setShowInstructions(currentShow => !currentShow)}>How can I get my
                            watch-history.json?
                        </button>
                    </div>
                    <br/>
                    <br/>
                    {showInstructions ? welcome() : <div/>}
                    <button className="btn btn-outline-secondary" onClick={openFileSelector}>Select watch history file
                    </button>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    } else if (page === "history") {
        json = processFile(filesContent[0]);
        return (
            <div>
                {navbar()}
                <div className="container">
                    {watchHistoryTable(json)}
                </div>
            </div>
        );
    } else if (page === "channels") {
        let channels, deletedRatio, sortedChannels, shareObject;
        try {
            json = processFile(filesContent[0]);
            [channels, deletedRatio] = mostWatchedChannels(json, month, year, shortFilter);
            sortedChannels = Object.keys(channels).sort(function (a, b) {
                return channels[b] - channels[a];
            });
            let top10Channels = [];
            for (let i = 0; i < 10; i++) {
                top10Channels.push({
                    name: sortedChannels[i],
                    nofTimesWatched: channels[sortedChannels[i]],
                });
            }
            let top10Videos = getTop10Videos(json, month, year);
            shareObject = {
                channels: top10Channels,
                videos: top10Videos,
            };
        } catch (e) {
            console.error(e);
            return (
                <div>
                    {navbar()}
                    {errorPage("Most Watched Channels")}
                </div>
            );
        }

        return (
            <div>
                {navbar()}
                <div className="container">
                    <br/>
                    <h2>Most Watched Channels</h2>
                    <br/>
                    {ShareButtons(shareObject, month, year)}
                    <br/>
                    {dropDowns()}
                    <br/>
                    {
                        Object.keys(channels).length === 0 ? <p>No channels found.</p> :
                            <div>
                                <p>{deletedRatio} videos you watched in this time period are deleted.</p>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Channel</th>
                                            <th className="text-nowrap">Number of Videos Watched</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            sortedChannels.map(
                                                (channel, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{channel}</td>
                                                        <td>{channels[channel]}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                    }
                    <br/>
                </div>
            </div>
        );
    } else if (page === "videos") {
        let videos, deletedRatio, sortedVideos, shareObject;
        try {
            json = processFile(filesContent[0]);
            [videos, deletedRatio] = mostWatchedVideos(json, month, year, shortFilter);
            sortedVideos = Object.keys(videos).sort(function (a, b) {
                return videos[b].count - videos[a].count;
            });
            let top10Videos = [];
            for (let i = 0; i < Math.min(10, Object.keys(videos).length); i++) {
                top10Videos.push({
                    title: videos[sortedVideos[i]].name,
                    titleUrl: sortedVideos[i],
                    channel: videos[sortedVideos[i]].channel,
                    nofTimesWatched: videos[sortedVideos[i]].count,
                });
            }
            let top10Channels = getTop10Channels(json, month, year);
            shareObject = {
                channels: top10Channels,
                videos: top10Videos,
            };
        } catch (e) {
            console.error(e);
            return (
                <div>
                    {navbar()}
                    {errorPage("Most Watched Videos")}
                </div>
            );
        }

        return (
            <div>
                {navbar()}
                <div className="container">
                    <br/>
                    <h2>Most Watched Videos</h2>
                    <br/>
                    {ShareButtons(shareObject, month, year)}
                    <br/>
                    {dropDowns()}
                    <br/>
                    {
                        Object.keys(videos).length === 0 ? <p>No videos found.</p> :
                            <div>
                                <p>{deletedRatio} videos you watched in this time period are deleted.</p>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Video Title</th>
                                            <th>Channel</th>
                                            <th className="text-nowrap">Number of Times Watched</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            sortedVideos.map(
                                                (video, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><a href={video} target="_blank"
                                                               rel="noreferrer">{videos[video].name}</a></td>
                                                        <td>{videos[video].channel}</td>
                                                        <td>{videos[video].count}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                    <br/>
                </div>
            </div>
        );
    } else if (page === "graph") {
        try {
            json = processFile(filesContent[0]);
            const channels = Object.keys(mostWatchedChannels(json, "Any Month", "Any Year")[0]);
            const autoCompleteScriptTag = `
                <script>
                  autocomplete(document.getElementById("channel_input"), ${JSON.stringify(channels)});
                </script>
              `;
            return (
                <div>
                    {navbar()}
                    <div className="container">
                        <br/>
                        <h2>How Many Videos You Watched Each Month</h2>
                        <div className="form-inline">
                            <div className="form-group">
                                <label className="form-label">Filter By Channel: </label>
                                <div className="input-group">
                                    <input autoComplete="off" type="text" className="form-control" id="channel_input"
                                           placeholder="Channel Name"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-danger" onClick={clearChannelFilter}>X</button>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <button className="btn btn-secondary" onClick={filterByChannel}>Filter Channel</button>
                            {shortFilterCheckbox()}
                        </div>
                        <br/>
                        {VideoChart(json, channelFilter, shortFilter)}
                    </div>
                    <InnerHTML html={autoCompleteScriptTag}/>
                </div>
            );
        } catch (e) {
            console.error(e);
            return (
                <div>
                    {navbar()}
                    {errorPage("How Many Videos You Watched Each Month")}
                </div>
            );
        }
    } else if (page === "contact") {
        return (
            <div>
                {navbar()}
                <div className="container">
                    <br/>
                    <h2>Contact Information</h2>
                    <br/>
                    <p>If you encountered a bug, have an idea for improvement or want to provide general feedback please
                        mail to: <a
                            href="mailto:contact@youtuberewind.net">contact@youtuberewind.net</a></p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                {navbar()}
                <div className="container">
                    <br/>
                    <p>Something went wrong.</p>
                </div>
            </div>
        );
    }
}

export default HomePage;
