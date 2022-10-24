import { useRouter } from "next/router";
import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../data/dummy-data";

function FilteredEventsPage() {
    const router = useRouter();
    const filterData = router.query.slug;

    if(!filterData) {
        return <p className="cnter">Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 ||  numYear < 2021 ||  numMonth < 1 ||  numMonth > 12) {
        return (
            <>
                <ErrorAlert> <p>Invalid filter. Please adjust your values!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>All Events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>All Events</Button>
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