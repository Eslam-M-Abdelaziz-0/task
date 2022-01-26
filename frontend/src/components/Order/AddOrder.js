import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/profile/', {
      method: 'GET',
      headers: {
        Authorization: 'token bc69083aee79da0378c9759e7ec9e2d5f9cea7ef',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ profiles: data });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/order/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'token bc69083aee79da0378c9759e7ec9e2d5f9cea7ef',
      },
      body: JSON.stringify({
        note: event.target.note.value,
        sendFrom: event.target.sendFrom.value,
        sendTo: event.target.sendTo.value,
        shipmentCompanyName: event.target.shipmentCompanyName.value,
        title: event.target.orderTitle.value,
        weight: event.target.weight.value,
        user: 1,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // alert('Done');
          location.reload();
        },
        (error) => {
          alert('Failed');
        }
      );
  }

  render() {
    return (
      <div className='container'>
        <Modal
          {...this.props}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header clooseButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Add New Order
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId='orderTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type='text'
                      name='orderTitle'
                      required
                      placeholder='orderTitle'
                    />
                  </Form.Group>
                  <Form.Group controlId='sendFrom'>
                    <Form.Label>Send From</Form.Label>
                    <Form.Control
                      type='text'
                      name='sendFrom'
                      required
                      placeholder='sendFrom'
                    />
                  </Form.Group>
                  <Form.Group controlId='sendTo'>
                    <Form.Label>Send To</Form.Label>
                    <Form.Control
                      type='text'
                      name='sendTo'
                      required
                      placeholder='sendTo'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant='primary' type='submit'>
                      Update Employee
                    </Button>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId='weight'>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      type='text'
                      name='Weight'
                      required
                      placeholder='Weight'
                    />
                  </Form.Group>
                  <Form.Group controlId='note'>
                    <Form.Label>Note</Form.Label>
                    <Form.Control type='text' name='note' placeholder='note' />
                  </Form.Group>

                  <Form.Group controlId='shipmentCompanyName'>
                    <Form.Label>Shipment Company Name</Form.Label>
                    <Form.Control as='select'>
                      {this.state.profiles.map((profile) => (
                        <option value={profile.id} key={profile.id}>
                          {profile.companyName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='danger' onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
