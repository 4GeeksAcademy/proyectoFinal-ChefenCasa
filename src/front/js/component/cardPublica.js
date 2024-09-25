import React from "react";

export const CardPublica = () => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Chicken</h5>
                <i className="fa-regular fa-clock"></i><p>20 Minutes</p>
                <a href="#" className="btn btn-primary">Info</a>
            </div>
        </div>
    );
};