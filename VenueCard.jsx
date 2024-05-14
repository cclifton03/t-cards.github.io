import React from "react";
import PropTypes from "prop-types";
import "./venuescard.css";

function VenueCard(props) {

  const aVenue = props.venueData;


  return (
    <React.Fragment>
      <div className="col-3 card venue-div-Card m-2">
        <div className="card-img">
          <img src={aVenue.fileImageUrl} className="card-img-top" alt="..." />
        </div>
        <div className="card-body">
          <h2 className="card-title">{aVenue.name}</h2>
          <p className="card-text venue-card-desc">
            {aVenue.locationInfo.city}, {aVenue.locationInfo.state}
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VenueCard;
