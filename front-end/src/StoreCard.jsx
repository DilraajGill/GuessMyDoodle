import React from "react";
import { Card, Button } from "react-bootstrap";

function StoreCard({
  Icon,
  imageURL,
  name,
  buttonText,
  onPurchaseClick,
  isOwned,
}) {
  return (
    <Card className="store-card">
      <Card.Body>
        {Icon ? (
          <Icon size={100} />
        ) : (
          <Card.Img
            variant="top"
            src={imageURL}
            style={{ height: "100px", width: "100px" }}
          />
        )}

        <Card.Title className="mt-2">{name}</Card.Title>
        <Button
          variant={isOwned ? "secondary" : "primary"}
          onClick={onPurchaseClick}
          disabled={isOwned}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StoreCard;
