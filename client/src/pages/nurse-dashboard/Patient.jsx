import { useParams } from "react-router-dom";

export default function Patient() {
  const { id } = useParams();
  return <div>{id}</div>;
}
