import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useSWR from 'swr';

import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

// import { getFilteredEvents } from "../../helpers/api-utils";

function FilteredEventsPage(props) {
    //this page would be fine for client side fetching, due it will be quickly and 
    //its not the main thing search engines should be crawling.
    const [ loadedEvents, setLoadedEvents ] = useState([]);
    const router = useRouter();
    const filterData = router.query.slug
    const { data, error } = useSWR('https://next-js-7fa61-default-rtdb.firebaseio.com/events.json');

    useEffect(() => {
      if (data) {
        const events = []
        for (const key in data) {
            events.push({
                id: key,
                ...data[key]
            });
        }
        setLoadedEvents(events);
      }
    }, [data])
    
    console.log('data', loadedEvents)
    if(!filterData) {
        return <p className="center">Loading...</p>
    }
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = + filteredMonth;


    if(isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 ||  
        numYear < 2021 ||  
        numMonth < 1 ||  
        numMonth > 12 ||
        error
    ) {
        return (
            <>
                <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = loadedEvents?.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if(!filteredEvents || filteredEvents.length === 0) {
        console.log(filteredEvents)
        return (
            <>
                <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
            </>
        )
    }

    const dateFormatted = new Date(numYear, numMonth -1)

    return (
        <>
            <ResultsTitle date={dateFormatted}/>
            <EventList list={filteredEvents} />
        </>
    )
};

export default FilteredEventsPage;