import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Button from "../../components/Button";
import Toast from "../../components/Toast";
import { ADD_CONSULTION } from "../../config/apollo-client";
import trainingData, {
  symptomsList as options,
} from "../../utils/trainingData";
import userAuth from "../../utils/useAuth";

export default function Consultation() {
  const [network, setNetwork] = useState(null);
  const [multiSelections, setMultiSelections] = useState([]);
  const { user } = userAuth();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const { id } = useParams();

  const navigate = useNavigate();
  const [addConstationMutation, { loading, error }] =
    useMutation(ADD_CONSULTION);

  const onSubmit = async (data) => {
    const nurseId = user.entityId;
    const patientId = id;
    const consultationData = {
      patient: patientId,
      nurse: nurseId,
      date: new Date(),
      ...data,
    };
    try {
      const { data: responseData } = await addConstationMutation({
        variables: consultationData,
      });
      if (responseData) {
        console.log("Successfully saved", responseData);
        navigate(`/nurse/patient/${id}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const newNetwork = new brain.NeuralNetwork();
    newNetwork.train(trainingData);
    setNetwork(newNetwork);
    console.log("Network training completed!");
  }, []);

  const makePrediction = () => {
    if (network) {
      const symptoms = {};
      multiSelections.map((selection) => {
        symptoms[selection] = 1;
      });
      const prediction = network.run(symptoms);
      const sortedPredictions = Object.entries(prediction).sort(
        (a, b) => b[1] - a[1]
      );
      // Extract probabilities as an array
      const listOfPredictions = sortedPredictions.map(
        ([disease, probability]) => disease
      );
      setValue("possibleDiagnosis", listOfPredictions.slice(0, 3).join(", "));
    } else {
      console.log("Network not yet trained");
    }
  };

  return (
    <section className="page">
      {error && <Toast message={error.message ? error.message : error} />}
      {loading && (
        <Toast message="Saving consultation details..." isErrorToast={false} />
      )}
      <header className="page__header">
        <h1 className="title">Provide Consultation</h1>
      </header>
      <div className="page__body">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label htmlFor="symptoms" className="input-label">
              Symptoms
            </label>
            <Typeahead
              id="symptoms"
              labelKey="name"
              multiple
              onChange={setMultiSelections}
              options={options}
              placeholder="Select symptoms..."
              selected={multiSelections}
              className="typehead"
            />
          </div>
          <Button
            classNames="mb-3"
            variant="secondary"
            label="Generate Diagnosis Using AI"
            onClick={makePrediction}
            type="button"
            isDisabled={multiSelections.length == 0}
          />
          <div className="input-wrapper">
            <label htmlFor="diagnosis" className="input-label">
              Possible Diagnosis
            </label>
            <input
              className="input"
              {...register("possibleDiagnosis", {
                required: "Field cannot be empty!",
              })}
              id="possibleDiagnosis"
            />
            {errors.possibleDiagnosis && (
              <p className="input-error">{errors.possibleDiagnosis.message}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="suggestions" className="input-label">
              Suggestions
            </label>
            <textarea
              className="input input--textarea"
              {...register("suggestions", {
                required: "Field cannot be empty!",
              })}
              id="suggestions"
            ></textarea>
            {errors.suggestions && (
              <p className="input-error">{errors.suggestions.message}</p>
            )}
          </div>
          <Button label="Submit" type="submit" />
        </form>
      </div>
    </section>
  );
}
