import React, { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { BsCreditCard } from "react-icons/bs";
import { FaIdCard } from "react-icons/fa";
import * as userService from "../../services/courseService";

const PaymentForm = (props) => {
  const [opencredit, setOpenCredit] = useState(true);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035 ];

  const enrollCourse = async id => {
    await userService.enrollOrUnenroll(id);
  }

  return (
    <React.Fragment>
        <div className="paymentFormCard__icon-container">

       
      <div className="paymentFormCard-Container">
        <div
          className="paymentFormCard paymentFormCard__icon-container"
          onClick={() => setOpenCredit(!opencredit)}
          aria-controls="example-collapse-text"
          aria-expanded={opencredit}
        >
          <BsCreditCard className="paymentFormCard__icon"></BsCreditCard>
          <div className="paymentFormCard__header">Credit or Debit Cards</div>
        </div>

        <Collapse in={opencredit}>
          <Form className="paymentFormCard__form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Card number *</Form.Label>
              <Form.Control
                className="paymentFormCard__form--input"
                type="password"
                placeholder="Enter Card Number"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Card holder's name *</Form.Label>
              <Form.Control
                className="paymentFormCard__form--input"
                type="text"
                placeholder="Enter holder's name *"
              />
            </Form.Group>
            <div className="paymentFormCard__icon-container">

            <Form.Group className="paymentFormCard__selectContainer">
              <Form.Label>Expiry date *</Form.Label>
              <div className="paymentFormCard__icon-container paymentFormCard__form--input">
                <Form.Control
                  className="paymentFormCard__form--input paymentFormCard__form--select"
                  as="select"
                >
                  {months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Form.Control>
                <Form.Control
                  className="paymentFormCard__form--input paymentFormCard__form--select"
                  as="select"
                >
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Card verification code *</Form.Label>
             <div className="paymentFormCard__icon-container">
                 <FaIdCard className="paymentFormCard__icon--verify"></FaIdCard>             
                  <Form.Control
                 
                className="paymentFormCard__form--input paymentFormCard__form--input--sm"
                type="text"
                
              />

             </div>
            </Form.Group>
           </div>
            
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Save for future use" />
            </Form.Group>
            <Button className="paymentFormCard__btn btn--secondary" onClick={() => enrollCourse(props.match.params.id)}>
              Place Order
            </Button>
          </Form>
        </Collapse>
       
      </div>
    
      <div className="paymentFormCard__img"></div>
      </div>
    </React.Fragment>
  );
};

export default PaymentForm;
