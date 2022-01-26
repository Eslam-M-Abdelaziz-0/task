import React, { Component, useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, Row, Col, Form, Image } from 'react-bootstrap';
import AddOrder from './AddOrder';
import EditOrder from './EditOrder';

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: {},
      addModalShow: false,
      editModalShow: false,
    };
  }

  refreshList() {
    fetch('http://127.0.0.1:8000/api/order/', {
      method: 'GET',
      headers: {
        Authorization: 'token bc69083aee79da0378c9759e7ec9e2d5f9cea7ef',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ orders: data });
        console.log(this.state);
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  // componentDidUpdate() {
  //   this.refreshList();
  // }

  rateOrder(orderid) {}

  editOrder(orderid) {
    if (window.confirm('Are you sure you want to cancel?')) {
      for (var i = 0; i < this.state.orders.length; i += 1) {
        if (this.state.orders[i].id == orderid) {
          console.log('from delete fun id : ', this.state.orders[i]);
          this.state.orders[i].status = 'Canceled';
          fetch('http://127.0.0.1:8000/api/order/' + orderid + '/', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'token bc69083aee79da0378c9759e7ec9e2d5f9cea7ef',
            },
            body: JSON.stringify({
              id: this.state.orders[i].id,
              note: this.state.orders[i].note,
              price: this.state.orders[i].price,
              rate: this.state.orders[i].rate,
              sendFrom: this.state.orders[i].sendFrom,
              sendTo: this.state.orders[i].sendTo,
              shipmentCompanyName: this.state.orders[i].shipmentCompanyName,
              status: this.state.orders[i].status,
              title: this.state.orders[i].title,
              user: this.state.orders[i].user,
              weight: this.state.orders[i].weight,
            }),
          })
            .then((res) => res.json())
            .then(
              (result) => {
                this.setState({ orders: this.state.orders });
                // alert('Done');
              },
              (error) => {
                alert('Failed');
              }
            );
        }
      }
    }
  }
  render() {
    let addModalClose = () => {
      this.setState({ addModalShow: false });
    };
    let editModalClose = () => this.setState({ editModalShow: false });
    // {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'token bc69083aee79da0378c9759e7ec9e2d5f9cea7ef',
    //     }
    return (
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>ShipmentCompanyName</th>
              <th>SendFrom</th>
              <th>SendTo</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Status</th>
              <th>Note</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order) => (
              <tr key={order.id}>
                <td>{order.title}</td>
                <td>{order.user}</td>
                <td>{order.shipmentCompanyName}</td>
                <td>{order.sendFrom}</td>
                <td>{order.sendTo}</td>
                <td>{order.weight}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{order.note}</td>
                <td>{order.rate}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className='mr-2'
                      variant='info'
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          order: order,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className='mr-2'
                      variant='danger'
                      onClick={() => this.editOrder(order.id)}
                    >
                      Cancele
                    </Button>

                    <EditOrder
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      order={this.state.order}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant='primary'
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Order
          </Button>

          <AddOrder show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}

export default Order;
