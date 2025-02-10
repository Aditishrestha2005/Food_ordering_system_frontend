import React from "react";
import { DashboardList } from "../helpers/dashboardList";
import '../private/dashboard.css';
const DashboardPage = () => {
 
    return (
        
        <div className="dashboard">
            <h1 className="dashboardTitle">Our Dashboard</h1>
            <div className="dashboardListContainer">
                <ul><li>asbdhasj</li></ul>
            </div>
            <div className="dashboardList">{DashboardList.map((DahboardItem,key)=>{
                return <div></div>;
            })}
            </div>
        </div>
    );
}

export default DashboardPage;