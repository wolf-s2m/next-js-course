import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/EventDetail/EventSummary';
import EventLogistics from '../../components/EventDetail/EventLogistics';
import EventContent from '../../components/EventDetail/EventContent';
import ErrorAlert from '../../components/Events/ErrorAlert';

function EventsDetail() {
    const router = useRouter();

    const { eventId } = router.query;
    const event = getEventById(eventId);
    if(!event) {
      return (
        <Fragment>
          <ErrorAlert>
            <p> No event found!</p>
          </ErrorAlert>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <EventSummary title= {event.title}/>
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    )
  }
  
  export default EventsDetail;