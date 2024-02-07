import React from "react";
import { Card, Button } from "react-bootstrap";

function StoreCard({ Icon, name, buttonText, onPurchaseClick, isOwned }) {
  return (
    <Card className="store-card">
      <Card.Body>
        <Icon size={70} />
        <Card.Title>{name}</Card.Title>
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
