import React from 'react';

const TopSeller = (props) => (
    <div className="container row">
        <div className="col-md-4 seller">
            <img className="img" src={props.sellerData.profileImageUrl} alt="" />
            <div className="paddingLeft">
            <div className="full-name"> {props.sellerData.firstName} {props.sellerData.lastName}</div>
            <div className="total paddingLeft">{props.hours} hours</div>
            </div>
        </div>
    </div>
);
export default TopSeller;
