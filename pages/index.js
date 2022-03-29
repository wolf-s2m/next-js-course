import Head from "next/head";

import { getFeaturedEvents } from "../helpers/apiUtils";
import EventList from "../components/Events/EventList";
import NewsletterRegistration from "../components/input/NewsletterRegistration";
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="Find great events everywhere" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
}

// static server side rendering
// that means this function will execute when our project is build and the react.js part is transformed into html/css
// for better seo

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
