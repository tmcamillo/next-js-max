import EventItem from './event-item';

function EventList(props) {
    const { list } = props;
    return (
        <ul>
            {list.map(event => console.log(item))}
        </ul>
    )
}