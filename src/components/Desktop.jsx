import React from "react";
//import computer from "../assets/my_computer.png"
import "./Desktop.css"

const Desktop = () =>
    <div className="desktop">
        <div className="computer">
            <img src="/assets/my_computer.ico" alt="computer" ></img>
            <label>My Computer</label>
        </div>
        <div className="neighbourhood">
            <img src="/assets/network_neighbourhood.ico" alt="computer" ></img>
            <label>Network Neighbourhood</label>
        </div>
        <div className="inbox">
            <img src="/assets/inbox.ico" alt="computer" ></img>
            <label>Inbox</label>
        </div>
        <div className="recycle">
            <img src="/assets/recycle_bin.ico" alt="computer" ></img>
            <label>Recycle Bin</label>
        </div>
    </div>
    ;

export default Desktop;