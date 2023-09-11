import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CourseCard() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img style={{height:"200px"}} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Computer_science_education.png/238px-Computer_science_education.png" />
        <Card.Body>
          <Card.Title>Compsci 399</Card.Title>
          <Card.Text>
            Capstone Course for all Science Students
          </Card.Text>
          <Card.Text>
            Asma Shakil
          </Card.Text>
          <Button variant="primary" style={{backgroundColor: "#005DFF"}}>Add to Cart</Button>
        </Card.Body>
      </Card>
    );
  }
  
export default CourseCard;