import { useRouter } from "next/router";
import Head from 'next/head';

import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

import { getFilteredEvents } from "../../helpers/api-utils";

function FilteredEventsPage(props) {
    if(props.hasError) {
        return (
            <>
                <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = props.events

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
            </>
        )
    }

    const dateFormatted = new Date(props.date.year, props.date.month -1)

    return (
        <>
            <Head>
                <title>Filtered Events</title>
                <meta name='description' content={`All events for ${props.date.month}/${props.date.year }`}/>
            </Head>
            <ResultsTitle date={dateFormatted}/>
            <EventList list={filteredEvents} />
        </>
    )
};


export async function getServerSideProps(context) {
    const { params } = context;
    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 ||  
        numYear < 2021 ||  
        numMonth < 1 ||  
        numMonth > 12
    ) {
        return {
            props: { hasError: true }
            // notFound: true, //show 404 page
            // redirect:{
            //     destination: '/error'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });
  
    return {
      props: {
        events: filteredEvents,
        date: {
            year: numYear,
            month: numMonth
        }
      }
    }
  }
  

export default FilteredEventsPage;