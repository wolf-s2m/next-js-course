import { Fragment } from "react";
import Head from 'next/head';

import { getEventById, getFeaturedEvents } from "../../helpers/apiUtils";
import EventSummary from "../../components/EventDetail/EventSummary";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventContent from "../../components/EventDetail/EventContent";
import ErrorAlert from "../../components/Events/ErrorAlert";
import Comments from '../../components/input/comments';
function EventsDetail(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p> No event found!</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const selectedEvent = await getEventById(eventId);

  return {
    props: {
      selectedEvent: selectedEvent,
    },
    revalidate: 60,
  };
}

// getStaticPaths is used with getStaticProps to generate html/css files on the build
// but for dynamic paths where we have multiple paths that gives us multiple data.
export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
export default EventsDetail;
