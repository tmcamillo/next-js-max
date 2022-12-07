import { getAllEvents } from "../../helpers/api-utils";

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

function AllEventsPage(props) {
    const { events } = props
    const router = useRouter();
    function handleFindEvents(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }

    return (
        <>
            <EventsSearch onSearch={handleFindEvents}/>
            <EventList list={events} />
        </>
    )
};

export async function getStaticProps() {
    const events = await getAllEvents();
    
    return {
        props: {
          events: events
        },
        revalidate: 1080 
      }
}

export default AllEventsPage;