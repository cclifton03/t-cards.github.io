import React, { useState, useEffect } from "react";
import venuesService from "services/venuesService";
import VenueCard from "./VenueCard";
import "./venuescard.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";

function Venues() {
  const [venueInfo, setVenueInfo] = useState({
    arrayOfVenues: [],
    venueComponents: [],
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageIndex: 0,
    pageSize: 9,
    totalCount: 0,
    totalPages: 0,
  });
  _logger("venueInfo comp", venueInfo.venueComponents);

  useEffect(() => {
    venuesService
      .GetAllPaginated(pagination.pageIndex, pagination.pageSize)
      .then(onGetVenuesSuccess)
      .catch(onGetVenuesError);
  }, [pagination.pageSize, pagination.pageIndex]);

  const mapAVenue = (aVenue) => {
    return (
      <VenueCard venueData={aVenue} key={"ListA-" + aVenue.id}></VenueCard>
    );
  };

  const onGetVenuesSuccess = (response) => {
    _logger("success", response);
    let arrayOfVenues = response.item.pagedItems;

    const totalCount = response.item.totalCount;
    const pageSize = response.item.pageSize;
    const totalPages = response.item.totalPages;
    setPagination((prevState) => {
      const paginState = { ...prevState };
      paginState.totalCount = totalCount;
      paginState.pageSize = pageSize;
      paginState.totalPages = totalPages;
      return paginState;
    });

    setVenueInfo((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfVenues = arrayOfVenues;
      newState.venueComponents = arrayOfVenues.map(mapAVenue);

      return newState;
    });
  };

  const onGetVenuesError = (err) => {
    toastr.error("Error");
    _logger("error", err);
  };

  const onPageChange = (page) => {
    setPagination((prevState) => {
      const newPaginationState = { ...prevState };
      newPaginationState.current = page;
      newPaginationState.pageIndex = page - 1;
      return newPaginationState;
    });
  };

  return (
    <div className="container justify-content-center mt-5">
      <div className="text-center justify-content-center">
        <h2 className="text-center mt-5">Venues</h2>
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          {venueInfo.venueComponents}
        </div>
      </div>
      <div className="venues-pagination-container">
        <div className="col-12">
          <Pagination
            className="venues-pagination"
            locale={locale}
            onChange={onPageChange}
            current={pagination.current}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            total={pagination.totalCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Venues;
