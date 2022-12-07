import { getFeaturedEvents } from "../helpers/api-utils"
import EventList from '../components/events/event-list'

function HomePage(props) {
  return (
    <div>
      <EventList list={props.events}/>
    </div>
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