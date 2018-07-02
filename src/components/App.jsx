import React, { Component } from "react";
import styles from './App.module.scss';
import DashboardTotals from "./dashboard/DashboardTotals";
import TopSellersPanel from "./dashboard/TopSellersPanel";

export default class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <DashboardTotals/>
                    <TopSellersPanel/>
                </div>
            </div>
        );
    }
}
