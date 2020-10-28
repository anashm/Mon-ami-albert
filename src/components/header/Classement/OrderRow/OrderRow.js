import React from "react";
import highfive from "../../../../images/highFive/HIGHFIVE.svg";

const OrderRow = ({ order, name, school, points }) => {
  return (
    <div className="orderRow">
      <div className="order"> {order} </div>
      <div className="infos">
        <div>
          {name && <div className="student-name"> {name} </div>}
          <div className="school-name"> {school} </div>
        </div>
      </div>
      <div className="highfive">
        {" "}
        <img src={highfive} alt="" />{" "}
      </div>
      <div className="points"> {points} </div>
    </div>
  );
};

export default OrderRow;
