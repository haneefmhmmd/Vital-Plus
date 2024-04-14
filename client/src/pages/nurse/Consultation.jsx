import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
export default function Consultation() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const passageRef = useRef(null);
  // const questionRef = useRef(null);
  // const [answer, setAnswer] = useState();
  // const [model, setModel] = useState(null);

  // const loadModel = async () => {
  //   const loadedModel = await qna.load();
  //   setModel(loadedModel);
  //   console.log("Model loaded.");
  // };

  // // 5. Handle Questions
  // const answerQuestion = async (e) => {
  //   if (e.which === 13 && model !== null) {
  //     console.log("Question submitted.");
  //     const passage = passageRef.current.value;
  //     const question = questionRef.current.value;

  //     const answers = await model.findAnswers(question, passage);
  //     setAnswer(answers);
  //     console.log(answers);
  //   }
  // };

  // useEffect(() => {
  //   loadModel();
  // }, []);

  const onSubmit = (data) => {
    console.log(data);
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
            <select className="input" {...register("symptoms")} id="symptoms">
              <option>Fever</option>
              <option>Nausea</option>
              <option>Vomitting</option>
            </select>
            {errors.symptoms && (
              <p className="input-error">{errors.symptoms.message}</p>
            )}
          </div>
          <Button
            classNames="mb-3"
            variant="secondary"
            label="Generate Diagnosis Using AI"
          />
          <div className="input-wrapper">
            <label htmlFor="diagnosis" className="input-label">
              Diagnosis
            </label>
            <input
              className="input"
              {...register("diagnosis")}
              id="diagnosis"
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
          <Button label="Submit" />
        </form>
      </div>
    </section>
  );
}
