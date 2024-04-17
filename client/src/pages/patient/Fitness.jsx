import React from "react";

import { useQuery } from "@apollo/client";
import Button from "../../components/Button";
import { GET_PATIENT_BY_ID, GET_CONSULTATIONS_BY_PATIENT } from "../../config/apollo-client";
import useAuth from "../../utils/useAuth";
import Dice from "../../assets/img/fitness/dice.jpg"
import FitnessBingo from "../../assets/img/fitness/fitness_bingo.png"
import ObstacleChallenge from "../../assets/img/fitness/obstacle_challenge.jpg"
import TreasureHunt from "../../assets/img/fitness/treasure_hunt.jpg"
import VirtualReality from "../../assets/img/fitness/vital_reality_fitness.jpeg"

export default function Dashboard() {
    const { user } = useAuth();

    const patient = useQuery(GET_PATIENT_BY_ID, {
        variables: { id: user.entityId },
    });

    if (patient.loading) {
        return <div>Loading data...</div>;
    }

    if (patient.error) {
        return <div>Error loading patient data!!</div>;
    }

    const patientResponse = patient.data.patient;

    return (
        <section>
            <header className="dashboard-header">
                <div className="header__left">
                    <img
                        className="profile-img"
                        src={patientResponse.image}
                        alt={`Profile image of ${patientResponse.firstName}`}
                    />
                    <div className="header__info">
                        <h1 className="title">
                            {patientResponse.firstName} {patientResponse.lastName}
                        </h1>
                        <p>
                            {patientResponse.email} | {patientResponse.phoneNumber}
                        </p>
                    </div>
                </div>
                <div className="header__right">
                    <Button
                        variant="secondary"
                        label="Add Vitals"
                        elementType="link"
                        href="/add-vital"
                    />
                </div>
            </header>
            <div className="mt-4">
                <h2 className="sub-title">Your Fitness</h2>

                <div className="rounded shadow-sm p-2 bg-white table-responsive mt-3">

                    <div className="row" style={{ width: "100%"}}>
                        <div className="col-md-2">
                            <img className="profile-img" src={Dice} alt={Dice} />
                        </div>
                        <div className="col-md-10">
                            <h6 style={{ color: "teal", fontWeight: "bold", fontSize: "20px" }}>Fitness Dice</h6>
                            <p className="mt-3">Create a set of fitness dice with different exercises written on each side (e.g., push-ups, squats, jumping jacks, lunges). Roll the dice and perform the exercise corresponding to the number rolled. You can make it more challenging by adding a time limit or repetitions for each exercise.</p>
                        </div>
                    </div>

                    <div className="row mt-5" style={{ width: "100%"}}>
                        <div className="col-md-2">
                            <img className="profile-img" src={ObstacleChallenge} alt={ObstacleChallenge} />
                        </div>
                        <div className="col-md-10">
                            <h6 style={{ color: "teal", fontWeight: "bold", fontSize: "20px" }}>Obstacle Course Challenge</h6>
                            <p className="mt-3">Set up an obstacle course using household items like chairs, cushions, ropes, and hula hoops. Time yourself or compete with family members to complete the course as quickly as possible. You can incorporate various movements such as crawling, jumping, balancing, and climbing to make it a full-body workout.</p>
                        </div>
                    </div>

                    <div className="row mt-5" style={{ width: "100%"}}>
                        <div className="col-md-2">
                            <img className="profile-img" src={VirtualReality} alt={VirtualReality} />
                        </div>
                        <div className="col-md-10">
                            <h6 style={{ color: "teal", fontWeight: "bold", fontSize: "20px" }}>Virtual Reality Fitness</h6>
                            <p className="mt-3">If you have a virtual reality (VR) headset, explore fitness games and experiences designed to make exercising more engaging and immersive. Many VR fitness games simulate activities like boxing, dancing, or even exploring virtual landscapes while jogging in place.</p>
                        </div>
                    </div>

                    <div className="row mt-5" style={{ width: "100%"}}>
                        <div className="col-md-2">
                            <img className="profile-img" src={FitnessBingo} alt={FitnessBingo} />
                        </div>
                        <div className="col-md-10">
                            <h6 style={{ color: "teal", fontWeight: "bold", fontSize: "20px" }}>Fitness Bingo</h6>
                            <p className="mt-3">Create a bingo card with different fitness challenges or exercises in each square (e.g., hold a plank for one minute, do 20 mountain climbers, complete a set of burpees). Each day, aim to complete a line or pattern on the bingo card by completing the corresponding exercises. This adds an element of gamification and keeps you motivated to reach your fitness goals.</p>
                        </div>
                    </div>

                    <div className="row mt-5" style={{ width: "100%"}}>
                        <div className="col-md-2">
                            <img className="profile-img" src={TreasureHunt} alt={TreasureHunt} />
                        </div>
                        <div className="col-md-10">
                            <h6 style={{ color: "teal", fontWeight: "bold", fontSize: "20px" }}>Fitness Treasure Hunt</h6>
                            <p className="mt-3">Hide fitness-related items or clues around your home or yard. Create a list of these items or clues and set a timer. Start searching for them, incorporating exercises like jogging, lunges, or high knees between each location. Once you find all the items or solve all the clues, reward yourself with a healthy snack or a designated rest period</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
