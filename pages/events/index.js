import { getAllEvents } from "../../helpers/apiUtils";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/Events/EventsSearch";
import { Fragment } from "react/cjs/react.production.min";
import { useRouter } from "next/router";

function Events(props) {
  const allEvents = props.events;
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
}

export async function getStaticProps(context) {

  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 600,
  };
}

export default Events;
