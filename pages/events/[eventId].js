import Head from 'next/head';

import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function EventDetailPage(props) {
    const event = props.selectedEvent;
    
    if(!event) {
        return <div className="center"><p>Loading...</p></div>
    }
    
    return (
        <>
        <Head>
            <title>{event.title}</title>
            <meta name='description' content={event.description}/>
        </Head>
        <EventSummary title={event.title}/>
        <EventLogistics 
            date={event.date}
            address={event.location}
            image={event.image}
            imageAlt={event.title}
        
        />
        <EventContent>
        <p>{event.description}</p>
        </EventContent>
        </>
        )
    };
    
    export async function getStaticProps(context) {
        const id = context.params.eventId;
        const event = await getEventById(id);
        
        return {
            props: {
                selectedEvent: event
            },
            revalidate: 30 
        }
    }
    
    export async function getStaticPaths() {
        const events = await getFeaturedEvents();
        const path = events.map(event => ({ params: {eventId: event.id} }))
        
        return {
            paths: path,
            fallback: true
        }
    }
    
    export default EventDetailPage;