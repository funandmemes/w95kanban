import React from "react";

import "./Footer.css";

const Footer = () => 
    <div className="footer">
        <button className="start-btn">
            <img src="/assets/windows.ico"></img>
            <label>Start</label>
        </button>
        <button className="save-btn">
            <img src="/assets/diskette.ico"></img>
            <label>Save Changes</label>
        </button>
    </div>
export default Footer