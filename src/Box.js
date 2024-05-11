import { useEffect, useState } from "react";
import React from "react";
import Confetti from 'react-confetti'
import "./Box.css"
import Die from "./Die";

function DisplayConfetti() {
    // const width = "1280";
    // const height = "650";
    return (
        <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        />
    )
}

function Box() {
    const dieValueArray = [];
    for (let i = 0; i < 10; i++) {
        const dieObject = {
            dieNo: i,
            dieValue : generateRandomNumber(),
            isClicked: false,
            handleClickDie : handleClickDie
        }
        dieValueArray.push(dieObject);
    }
    const [dieArray, setDieArray] = useState(dieValueArray);
    const [won, setWon] = useState(true);

    useEffect(() => {
        let check = true
        for (let i = 0; i < 10; i++) {
            check = (check && dieArray[i].isClicked)
        }
        setWon(check)
    }, [dieArray])

    const dieToRender = [];
    for (let i = 0; i < 10; i++) {
        dieToRender.push(<Die key={i} dieObject={dieArray[i]}/>)
    }
    let selectedNum = 0;
    let firstTime = true;

    function generateRandomNumber() {
        return Math.floor(Math.random()*6 + 1)
    }

    function handleClickDieHelper(dieObject) {
        setDieArray((oldArray) => oldArray.map(die => {
            if (die.dieNo === dieObject.dieNo) {
                return {
                    ...dieObject,
                    isClicked: true
                }
            } else {
                return die;
            }
        }))
    }

    function handleClickDie(dieObject) {
        if (firstTime) {
            handleClickDieHelper(dieObject)
            firstTime = false;
            selectedNum = dieObject.dieValue;
        } else {
            if (dieObject.dieValue === selectedNum) {
                handleClickDieHelper(dieObject)
            }
        }
    }

    function handleRollButtonClick() {
        if (won) {
            window.location.reload()
        } else {
            setDieArray(oldArray => oldArray.map(dieObject => {
                if (dieObject.isClicked === false) {
                    return {
                        ...dieObject,
                        dieValue: generateRandomNumber()
                    }
                } else {
                    return dieObject;
                }
            }))
        }
    }

    return (
        <div className="container">
            {won && <DisplayConfetti />}
            <h1 className="game-name">Tenzies</h1>
            <p className="description">Roll until all dice are the same. 
                Click each die to freeze it at its 
                current value between rolls.
            </p>
            <div className="boxes">
                {dieToRender}
            </div>
            <button 
            className="roll-button" 
            onClick={handleRollButtonClick}
            onTouchEnd={handleRollButtonClick}
            >{won ? "Reset Game": "Roll"}
            </button>
        </div>
    )
}

export default Box;