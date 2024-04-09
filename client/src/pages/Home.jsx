import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";
import Img001 from "../assets/img/content/001.jpg";
import Img002 from "../assets/img/content/002.jpg";
import Img003 from "../assets/img/content/003.png";
import Img004 from "../assets/img/content/004.png";
import Img005 from "../assets/img/content/005.png";
import Logo from "../assets/img/logofull.png";
import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar />

      <div className="container app">
        <h6 className="display-6 mb-5">
          Welcome to <img src={Logo} alt={Logo} style={{ width: "150px" }} />
        </h6>

        <p className="display-6 mt-5 mb-5" style={{ fontSize: "25px" }}>
          At Vital+, we understand the importance of continuous monitoring and
          support, especially during the crucial first weeks after hospital
          discharge. Our modern web application provides a seamless platform for
          both nurse practitioners and patients to stay connected, track vital
          signs, and ensure optimal health outcomes.
        </p>

        <Link style={{ padding: "10px" }} to="/signin">
          <button type="button" className="pill">
            Login
          </button>
        </Link>

        <span className="display-6" style={{ fontSize: "25px" }}>
          {" "}
          or{" "}
        </span>

        <Link style={{ padding: "10px" }} to="#">
          <button type="button" className="pill">
            Register
          </button>
        </Link>

        <div className="mt-5" style={{ padding: "20px", textAlign: "center" }}>
          <img src={Img003} alt={Img003} style={{ width: "80%" }} />
        </div>

        <p className="display-6 mt-5" style={{ fontSize: "25px" }}>
          As a patient, your health is paramount, and Vital+ is here to support
          you every step of the way. Seamlessly record your daily vital signs
          from pulse rate and blood pressure to weight, temperature, and
          respiratory rate with our intuitive interface. By effortlessly
          tracking these key indicators, you can stay informed about your health
          status and take proactive steps towards optimal wellness.
          <br></br>
          <br></br>
          But that's not all – with Vital+, you gain access to a comprehensive
          checklist of common signs and symptoms, including those associated
          with conditions like COVID-19. By simply selecting your symptoms, you
          can receive personalized guidance and recommendations, empowering you
          to make informed decisions about your health.
        </p>

        <div
          className="row align-items-center justify-content-center mt-5"
          style={{ marginTop: "2rem" }}
        >
          <div
            className="col-md-auto"
            style={{ padding: "20px", textAlign: "center" }}
          >
            <img src={Img001} alt={Img001} style={{ width: "300px" }} />
          </div>

          <div
            className="col-md-auto"
            style={{ padding: "20px", textAlign: "center" }}
          >
            <img src={Img002} alt={Img002} style={{ width: "300px" }} />
          </div>
        </div>

        <p className="display-6 mt-5" style={{ fontSize: "25px" }}>
          As a nurse practitioner, you're at the forefront of patient wellness,
          and Vital+ equips you with the tools to excel. Easily navigate through
          patient records with our user-friendly interface, ensuring efficient
          management of vital health data at your fingertips. With Vital+,
          monitoring vital signs becomes a breeze. From tracking body
          temperature and heart rate to monitoring blood pressure and
          respiratory rate, you can effortlessly enter and analyze essential
          health metrics, ensuring comprehensive care and informed
          decision-making
        </p>

        <div
          className="row align-items-center justify-content-center mt-5"
          style={{ marginTop: "2rem" }}
        >
          <div
            className="col-md-auto"
            style={{ padding: "20px", textAlign: "center" }}
          >
            <img src={Img004} alt={Img004} style={{ width: "300px" }} />
          </div>

          <div
            className="col-md-auto"
            style={{ padding: "20px", textAlign: "center" }}
          >
            <img src={Img005} alt={Img005} style={{ width: "300px" }} />
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default Home;
