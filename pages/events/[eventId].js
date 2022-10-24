import { useRouter } from "next/router";

function EventDetailPage() {
    const route = useRouter();

    return (
        <div>
            <h1>{`Event Detail ${route.query.eventId}`}</h1>
        </div>
    )
};

export default EventDetailPage;