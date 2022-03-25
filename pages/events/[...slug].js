import { useRouter } from "next/router";
import Head from 'next/head';

import { getFilteredEvents } from "../../helpers/apiUtils";
import EventList from "../../components/Events/EventList";
import { Fragment } from "react/cjs/react.production.min";
import ResultsTitle from "../../components/Events/ResultsTitle";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/Events/ErrorAlert";

function FilteredEvents(props) {
  const router = useRouter();

  const filteredYear = props.filteredYear;
  const filterMonth = props.filterMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p> No events to list for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filterMonth - 1);
  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta name='description' content={`All events for ${filterMonth}/${filteredYear}`}/>
      </Head>
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

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
    return {
      // send props to comonent
      props: { hasError: true },
      // // use this to send the user to a 404 page
      // notFound: true,
      // // use this to redirect user to another path
      // redirect: {
      //   desination: '/path',
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filterMonth,
  });

  return {
    props: {
      events: filteredEvents,
      filteredYear: filteredYear,
      filterMonth: filterMonth
    },
  };
}

export default FilteredEvents;
