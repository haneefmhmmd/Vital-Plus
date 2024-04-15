import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import Button from "../../components/Button";
import trainingData, {
  symptomsList as options,
} from "../../utils/trainingData";

import { Typeahead } from "react-bootstrap-typeahead";
// Import as a module in your JS
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function Consultation() {
  const [network, setNetwork] = useState(null);
  const [multiSelections, setMultiSelections] = useState([]);
  const [possibleDiagnosis, setPossibleDiagnosis] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
      setPossibleDiagnosis(listOfPredictions.slice(0, 3).join(", "));
    } else {
      console.log("Network not yet trained");
    }
  };

  return (
    <section className="page">
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

            {errors.symptoms && (
              <p className="input-error">{errors.symptoms.message}</p>
            )}
          </div>
          <Button
            classNames="mb-3"
            variant="secondary"
            label="Generate Diagnosis Using AI"
            onClick={makePrediction}
            type="button"
          />
          <div className="input-wrapper">
            <label htmlFor="diagnosis" className="input-label">
              Possible Diagnosis
            </label>
            <input
              className="input"
              {...register("diagnosis")}
              id="diagnosis"
              defaultValue={possibleDiagnosis}
            />
            {errors.diagnosis && (
              <p className="input-error">{errors.diagnosis.message}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="suggestions" className="input-label">
              Suggestions
            </label>
            <textarea
              className="input input--textarea"
              {...register("suggestions")}
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
