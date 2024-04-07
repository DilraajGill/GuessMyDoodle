import React from "react";
import { Button } from "react-bootstrap";

/**
 * Display the podium (top 3) users of the game
 * @param {array<object>} props.podiumPositions - Array of users in the podium alongside their profiel picture
 * @param {number} userPosition - The position the current user finished with
 * @param {Function} playAgain - Function to be called if the host wishes to play again
 * @returns {React.Component} Renders the Podium component
 */
function Podium({ podiumPositions, userPosition, playAgain }) {
  return (
    <div className="reveal-word">
      <div className="podium">
        {/* Display podium and user's final position */}
        {podiumPositions.map((player, index) => (
          <div className={`podium-position place-${index + 1}`}>
            <div className="podium-user">
              <div className="profile-information">
                <img
                  src={`../${player.profilePicture}`}
                  className="picture"
                  alt="profile icon"
                />
                <div className="username">{player.username}</div>
              </div>
              <span className="position-number">#{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="finish-message">
        <h3>{`You finished ${userPosition}${
          userPosition === 1
            ? "st"
            : userPosition === 2
            ? "nd"
            : userPosition === 3
            ? "rd"
            : "th"
        }`}</h3>
      </div>
      <Button onClick={playAgain}>Play Again!</Button>
    </div>
  );
}

export default Podium;
