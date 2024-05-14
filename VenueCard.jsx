import React from "react";
import PropTypes from "prop-types";
import "./venuescard.css";
import { useNavigate } from "react-router-dom";

function VenueCard(props) {
  const navigate = useNavigate();
  const aVenue = props.venueData;

  const onViewDetails = () => {
    var state = {
      type: "Venue Card",
      payload: aVenue,
    };
    navigate(`/venuesinnerdescription?id=${aVenue.id}`, { state });
  };

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
VenueCard.propTypes = {
  venueData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fileImageUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    locationInfo: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default VenueCard;
