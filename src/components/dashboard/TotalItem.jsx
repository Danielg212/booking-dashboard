import React from 'react';

const TotalItem = (props) => (
    <div className="col-md-4">
        <div className="total">{props.total}</div>
        <div className="desc">{props.desc}</div>
    </div>
  );
  export default TotalItem;
