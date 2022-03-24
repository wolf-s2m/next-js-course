import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/Events/EventsSearch';
import { Fragment } from 'react/cjs/react.production.min';
import { useRouter } from 'next/router';
function Events() {
  const allEvents = getAllEvents();
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
    )
  }
  
  export default Events;