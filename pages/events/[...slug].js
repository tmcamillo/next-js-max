import { useRouter } from "next/router";

function Everthing() {
    const route = useRouter();

    return (
        <div>
            <h1>{`Filtered ${route.query}`}</h1>
        </div>
    )
};

export default Everthing;