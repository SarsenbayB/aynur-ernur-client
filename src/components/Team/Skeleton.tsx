import React from "react";
import { Placeholder, Card, ListGroup } from "react-bootstrap";

export const PostSkeleton: React.FC = () => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" style={{ width: "100%", height: "200px" }} />
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <Placeholder as="div" animation="glow" className="me-2">
            <Placeholder
              className="rounded-circle"
              style={{ width: 30, height: 30 }}
            />
          </Placeholder>
          <div>
            <Placeholder
              as="p"
              animation="glow"
              className="mb-1"
              style={{ width: "60%" }}
            />
            <Placeholder
              as="p"
              animation="glow"
              className="mb-0"
              style={{ width: "40%" }}
            />
          </div>
        </div>
        <Placeholder
          as="h5"
          animation="glow"
          className="mb-2"
          style={{ width: "80%" }}
        />
        <ListGroup horizontal>
          <Placeholder
            as={ListGroup.Item}
            animation="glow"
            className="me-2"
            style={{ width: "20%" }}
          />
          <Placeholder
            as={ListGroup.Item}
            animation="glow"
            className="me-2"
            style={{ width: "20%" }}
          />
          <Placeholder
            as={ListGroup.Item}
            animation="glow"
            className="me-2"
            style={{ width: "20%" }}
          />
        </ListGroup>
      </Card.Body>
    </Card>
  );
};