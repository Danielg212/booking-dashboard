import React, { Component } from "react";
import Axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import TopSeller from "./TopSeller";

var moment = require('moment');
export default class TopSellersPanel extends Component {

    constructor(props) {
        super(props);
        this.myMap = new Map();
        this.getTotalHours = this.getTotalHours.bind(this)
    }

    state = {
        dealsData: [],
        loading: false,
        topFirstSeller: {},
        topSecontSeller: {},
        topThierdSeller: {}

    };
    componentDidMount() {

        this.setState({ loading: true }, () => {
            Axios.get('https://interview-booking-api.herokuapp.com/api/bookings')
                .then(res => {
                    this.setState({
                        dealsData: res.data,
                        loading: false
                    })
                }).then(() => {
                    //Grouping the whole sellers by theirs "deals"
                    let dealsGroupBySellers = this.groupBy(this.state.dealsData, 'employee')
                    //reduce to calculate the totalHours
                    Object.keys(dealsGroupBySellers).forEach(obj => { dealsGroupBySellers[obj].reduce(this.getTotalHours, 0) })
                    //mapping by the map helper the the houers per salesman and sorting the value in desc order
                    this.myMap = new Map([...this.myMap.entries()].sort((a, b) => b[1] - a[1]));
                    //formatting the results to Arrays
                    var maxHoursArray = [...this.myMap.values()]      
                    var sellersIdArray = [...this.myMap.keys()]
                    this.setState({
                        topFirstSeller: dealsGroupBySellers[sellersIdArray[0]][0].employee,
                        topSecontSeller: dealsGroupBySellers[sellersIdArray[1]][0].employee,
                        topThierdSeller: dealsGroupBySellers[sellersIdArray[2]][0].employee,
                        firstSellerHours:maxHoursArray[0],
                        secondSellerHours:maxHoursArray[1],
                        thirdSellerHours:maxHoursArray[2]
                    })
                }).catch(()=>{alert("error!")});

        });
    }

    groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            if (obj[property] === undefined) {
                return acc
            }
            var key = obj[property].id;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    };

    getTotalHours(total, curr) {
        var start = moment(curr.checkInDate.split('-').reverse().join(''), 'YYYYMMDD')
        var end = moment(curr.checkOutDate.split('-').reverse().join(''), 'YYYYMMDD')
        var duration = moment.duration(end.diff(start));
        var hours = duration.asHours();
        this.myMap.set(curr.employee.id, total + hours);
        return total + hours;
    }





    render() {
        return (
            <div>
                <div className="container top-sellers">
                    {this.state.loading ?
                        <LoadingSpinner /> :
                        <React.Fragment>
                        <h3 className="white">Employee stats</h3>
                        <TopSeller sellerData={this.state.topFirstSeller} hours={this.state.firstSellerHours}/>
                        <TopSeller sellerData={this.state.topSecontSeller} hours={this.state.secondSellerHours}/>
                        <TopSeller sellerData={this.state.topThierdSeller} hours={this.state.thirdSellerHours}/>
                        </React.Fragment>}
                </div>
                <hr className="container" />

            </div>
        );
    }
}
