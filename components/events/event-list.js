import EventItem from './event-item';
import classes from './event-list.module.css'

function EventList(props) {
    const { list } = props;
    return (
        <ul className={classes.list}>
            {list?.map(event => (
                <EventItem 
                    key={event.id} 
                    id={event.id} 
                    title={event.title} 
                    location={event.location} 
                    date={event.date} 
                    image={event.image} 
                />)
            )}
        </ul>
    )
};
export default EventList