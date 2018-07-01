import React, { Component } from "react";
import styles from './App.module.scss';
import DashboardTotals from "./dashboard/DashboardTotals";

export default class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <DashboardTotals/>
                </div>
            </div>
        );
    }
}
