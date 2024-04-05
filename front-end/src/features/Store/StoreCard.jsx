import React from "react";
import { Card, Button } from "react-bootstrap";

/**
 *
 * @param {React.Component} props.Icon - Icon to dispaly if available
 * @param {string} props.imageURL - URL of the image to display (if icon is not passed as parameter)
 * @param {string} props.name - Name of the item
 * @param {string} props.buttonText - Text to display on the purchase button
 * @param {Function} props.onPurchaseClick - Function to execute if purchased
 * @param {boolean} props.isOwned - Indicate whether the user owns the item or not
 * @returns {React.Component} StoreCard component
 */
function StoreCard({
  Icon,
  imageURL,
  name,
  buttonText,
  onPurchaseClick,
  isOwned,
}) {
  const [mouseOver, isMouseOver] = React.useState(false);

  return (
    <Card className="store-card mb-3">
      <Card.Body>
        {Icon ? (
          <Icon size={100} />
        ) : (
          <Card.Img
            variant="top"
            src={imageURL}
            style={{ height: "100px", width: "100px", borderRadius: "10px" }}
          />
        )}

        <Card.Title className="mt-2">{name}</Card.Title>
        <Button
          variant={isOwned ? "secondary" : "primary"}
          onClick={onPurchaseClick}
          disabled={isOwned}
          onMouseEnter={() => isMouseOver(true)}
          onMouseOut={() => isMouseOver(false)}
        >
          {mouseOver ? "Buy!" : buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StoreCard;
