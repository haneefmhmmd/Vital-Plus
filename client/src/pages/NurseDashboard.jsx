import { GET_PATIENT_COUNT_BY_NURSE_ID } from "../config/apollo-client";
import useAuth from "../utils/useAuth";
import { useQuery } from "@apollo/client";

export default function Members() {

    const { user } = useAuth();

    const { loading, error, data } = useQuery(GET_PATIENT_COUNT_BY_NURSE_ID, { variables: { email: user.email } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { count } = data.getPatientCountByNurseId;

    return (
        <>
            <div>
                <h6>Tile #1</h6>
                <p>Count : {count}</p>
            </div>
        </>
    );
}