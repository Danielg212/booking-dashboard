import React, { Component } from "react";
import Axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import TotalItem from "./TotalItem";

export default class DashboardTotals extends Component {
    state = {
        totals: {
            availableRooms: '',
            reservedRooms: '',
            checkedIn: '',
            weekAvailabilityPercent: ''
        },
        loading:false
    };
    componentDidMount() {
        this.setState({ loading: true }, () => {
        Axios.get('https://interview-booking-api.herokuapp.com/api/booking-snapshot')
            .then(res => {
                this.setState({
                    totals:res.data,
                    loading:false})
            }).then(()=>{console.log(this.state)})
    });
    console.log(this.state);

}
render() {
        return (
            <div>
                <div className="container totalHeaders">
                {this.state.loading?
                <LoadingSpinner/>:
                <TotalItem total={this.state.totals.availableRooms} desc="Rooms available"/>}
                <TotalItem total={this.state.totals.reservedRooms} desc="Reserved rooms"/>
                <TotalItem total={this.state.totals.checkedIn} desc="Checked in"/>
                
                </div>
                <hr className="container"/>
                
            </div>
        );
    }
}
