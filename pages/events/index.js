import { getAllEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

function AllEventsPage() {
    const events = getAllEvents();
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

export default AllEventsPage;