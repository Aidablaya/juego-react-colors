import React, { useState } from "react";
import { connect } from "react-redux";
import { incrementScore, updateScore } from "../actions";
import Box from "../elementsMineS/Box";
import '../styles/elementsMineS/MinSweeper.scss';
//import { Link } from "react-router-dom";
import Bag from "../elementsMineS/Bag.js";
import Modal from "../elementsMineS/Modal";
import saffron from "../images/Azafran.png";
import blueberries from "../images/Arandanos.png";
import redFruits from "../images/Redfruit.png";
import iconBag from "../images/Iconbag.png";
import ReturnToVillageButton from "../elementsGeneral/returnVillageButton.js";
import backgroundForest from "../images/fondoBosque - copia.gif";

const MineSweeper = ({ setStoredScore, updateScore  }) => {
  const [score, setScore] = useState({ yellow: 0, red: 0, blue: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [values, setValues] = useState(Array(64).fill(""));
  const [showModal, setShowModal] = useState(true);
  const [isBagVisible, setIsBagVisible] = useState(false);

  const handleOpenBag = () => {
    setIsBagVisible(true);
  };

  const handleCloseBag = () => {
    setIsBagVisible(false);
  };

  const handleScoreUpdate = (value) => {
    if (!gameOver) {
      if (value === "1") {
        setScore((prevScore) => ({
          ...prevScore,
          yellow: prevScore.yellow + 1,
        }));
      } else if (value === "2") {
        setScore((prevScore) => ({
          ...prevScore,
          blue: prevScore.blue + 1,
        }));
      } else if (value === "3") {
        setScore((prevScore) => ({
          ...prevScore,
          red: prevScore.red + 1,
        }));
      } else if (value === "X") {
        setGameOver(true);
      }
    }
  };

  const handleReset = () => {
    setScore({ yellow: 0, red: 0, blue: 0 });
    setGameOver(false);
    setValues(Array(64).fill(""));
  };

  const handleStoreScore = () => {
    console.log('Guardando puntaje...');
    console.log('Puntuaciones:', score);
    updateScore(1, score.yellow); // ID 1 para saffron
    updateScore(2, score.blue);   // ID 2 para blueberries
    updateScore(3, score.red);    // ID 3 para redFruits
    console.log('Puntaje guardado');
    setScore({ yellow: 0, red: 0, blue: 0 });
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />

      <header className="header">
       
        
      </header>
      
     
      
      <main className="mine">
      
          
       
            
        <article className="mine__table">
          <Box
            onScoreUpdate={handleScoreUpdate}
            gameOver={gameOver}
            values={values}
            setValues={setValues}
          />
        </article>

        <article className="mine__info">
          
          <section>
            <h3 className="mine__info--title">ingredientes</h3>
            <ul className="mine__info--list">
              <li><img src={saffron} alt="" className="iconsScore" /><p>{score.yellow}</p></li>
              <li><img src={blueberries} alt="" className="iconsScore" /><p>{score.blue}</p></li>
              <li><img src={redFruits} alt="" className="iconsScore" /><p>{score.red}</p></li>
            </ul>

            <button onClick={handleStoreScore} className="mine__info--button"><h4 className="textSave">Guardar</h4></button>
          </section>
      
        </article>

        <article>
        <div className="tab__bagMine" onClick={isBagVisible ? handleCloseBag : handleOpenBag}>
            <p><img className='tab__bagMine--img' src={iconBag} alt="" /></p>
          </div>
          <div className="bag">
            {isBagVisible && <Bag storedScore={setStoredScore} type="Mine" />}
          </div>
        </article>

      </main>
      
    
      <img className='backgroundMineSweeper' src={backgroundForest} alt="" />
      
      <div className='returnButton'>
      <ReturnToVillageButton  />
      </div>
      
      <footer className="footermine">
      
        {gameOver && (
          <button onClick={handleReset} className="mine__textReturnStart--button"><h4 >Volver a empezar</h4></button>
        )}
      
        
          
          
        
      </footer>
    </>
  );
};


const mapStateToProps = (state) => ({
  bagScore: state.bag.elements,
});

const mapDispatchToProps = (dispatch) => ({
  incrementScore: (id) => dispatch(incrementScore(id)),
  updateScore: (id, amount) => dispatch(updateScore(id, amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MineSweeper);