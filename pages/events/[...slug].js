import { useRouter } from "next/router";

import { getFilteredEvents } from "../../dummy-data";
import EventList from '../../components/Events/EventList';
import { Fragment } from "react/cjs/react.production.min";
import ResultsTitle from "../../components/Events/ResultsTitle";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/Events/ErrorAlert";

function FilteredEvents() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (
    isNaN(filterMonth) ||
    isNaN(filteredYear) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12
  ) {
    return     (
      <Fragment>
        <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filterMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
        <p> No events to list for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(filteredYear, filterMonth -1);
    return (
      <Fragment>
        <ResultsTitle date={date}/>
        <EventList items={filteredEvents}/>
      </Fragment>
    );
}

export default FilteredEvents;
