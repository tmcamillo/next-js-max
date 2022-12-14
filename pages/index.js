import Head from 'next/head';

import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from '../components/events/event-list';
import NewsLetterRegistrations from '../components/input/newsletter-registration';


function HomePage(props) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve.'/>
      </Head>
      <div>
        <NewsLetterRegistrations />
        <EventList list={props.events}/>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800 //half hour
  }
}

export default HomePage