import React from "react";
import visa from "../../assets/visa.png";
import Chip from "../../assets/chip.png";
import "../Card/CardCredit.scss";

const CardCredit = (props) => {
  const { formik } = props;

  return (
    <div className="container">
      <div className="card-container">
        <div className="front">
          <div className="image">
            <img src={Chip} alt="sssss" />
            <img src={visa} alt="sss" />
          </div>
          <div className="card-number-box">
            {formik.values.number || "*******************"}
          </div>
          <div className="flexbox">
            <div className="box">
              <span>Name of card</span>
              <div className="card-holder-name">
                {formik.values.name || "Name"}
              </div>
            </div>
            <div className="box">
              <span>Expires</span>
              <div className="expiration">
                <span className="exp-month">
                  {formik.values.expiry || "MMYY"}
                </span>
                {/* <span className="exp-year">yy</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCredit;
