import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default class EditOrder extends Component {
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
    fetch('http://127.0.0.1:8000/api/order/' + this.props.order.id + '/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'token bc69083aee79da0378c9759e7ec9e2d5f9cea7ef',
      },
      body: JSON.stringify({
        id: this.props.order.id,
        note: event.target.note.value,
        price: this.props.order.price,
        rate: event.target.rate.value,
        sendFrom: event.target.sendFrom.value,
        sendTo: event.target.sendTo.value,
        shipmentCompanyName: event.target.shipmentCompanyName.value,
        status: this.props.order.status,
        title: this.props.order.title,
        weight: event.target.weight.value,
        user: this.props.order.user,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('event.target.rate.value', event.target.rate.value);
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
              Edit Order
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
                      disabled
                      defaultValue={this.props.order.title}
                    />
                  </Form.Group>
                  <Form.Group controlId='sendFrom'>
                    <Form.Label>Send From</Form.Label>
                    <Form.Control
                      type='text'
                      name='sendFrom'
                      required
                      defaultValue={this.props.order.sendFrom}
                      placeholder='sendFrom'
                    />
                  </Form.Group>
                  <Form.Group controlId='sendTo'>
                    <Form.Label>Send To</Form.Label>
                    <Form.Control
                      type='text'
                      name='sendTo'
                      required
                      defaultValue={this.props.order.sendTo}
                      placeholder='sendTo'
                    />
                  </Form.Group>
                  <Form.Group controlId='weight'>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      type='text'
                      name='Weight'
                      required
                      defaultValue={this.props.order.weight}
                      placeholder='Weight'
                    />
                  </Form.Group>
                  <Form.Group controlId='note'>
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      type='text'
                      name='note'
                      defaultValue={this.props.order.note}
                      placeholder='note'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant='primary' type='submit'>
                      Update Employee
                    </Button>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId='shipmentCompanyName'>
                    <Form.Label>Shipment Company Name</Form.Label>
                    <Form.Control
                      as='select'
                      defaultValue={this.props.order.shipmentCompanyName}
                    >
                      {this.state.profiles.map((profile) => (
                        <option value={profile.id} key={profile.id}>
                          {profile.companyName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='rate'>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      as='select'
                      defaultValue={this.props.order.rate}
                    >
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <option key={i}>{i}</option>
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
