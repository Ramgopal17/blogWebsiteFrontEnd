import React from "react";
import { Link } from "react-router-dom";
import error from "../../images/404.jpg";

const Error = () => {
 
  return (
    <>
    <style>
      {`
  .error_page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
      `}
    </style>
      <div className="container">
        <div className="error_page pb-50">
          <img style={{ width: "100%" }} src={error} alt="error" />
               <div className="tp-offcanvas-btn-wrapper">
              <Link to="/" className="tp-common-btn"     style={{
            color: "white",
            padding: "12px 15px",
            fontSize: "13px",
            overflow: "hidden",
          }}>
               Go to Home
                <span>
                  <i className="fal fa-long-arrow-right"></i>
                  <i className="fal fa-long-arrow-right"></i>
                </span>
              </Link>
            </div>
       
        </div>
      </div>
    </>
  );
};

export default Error;
