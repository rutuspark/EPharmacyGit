import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import ApiCustomerService from "../../services/customer/ApiCustomerService";

class OrderHistoryScreen extends Component{

    constructor(props) {
        super(props)
        this.state = {
          orders:[],
      }
        this.getOrdersList = this.getOrdersList.bind(this);
        this.orderDetails = this.orderDetails.bind(this);
        this.orderDetailsAddress = this.orderDetailsAddress.bind(this);
    }
    
    componentDidMount() {
      this.getOrdersList();
    }

    getOrdersList() {
        ApiCustomerService.fetchOrdersList(window.localStorage.getItem("user_id"))
        .then((res) => {
            this.setState({orders: res.data.result})
        });
    }

    orderDetails(orderId) {
        window.localStorage.setItem("orderIdForDetails", orderId)
        this.props.history.push('/orderDetailsPage');
    }

    orderDetailsAddress(orderId) {
        window.localStorage.setItem("orderIdForDetails", orderId)
        this.props.history.push('/showorderaddress');
    }

    render() {
    return (
       <div>
           <Navigation/>
            <div className="container">
        <h2 className="text-center">Orders History</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Orders Amount</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Delivery Date</th>
                    <th>Address</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {this.state.orders.map(
                        order =>
                            <tr key={order.orderId}>
                                <td>{order.orderTotal}</td>
                                <td>{order.createdDate}</td>
                                <td className="nameColor1"><h5>{order.orderStatus}</h5></td>
                                <td>{order.deliveredDate}</td>
                                <td><button className="btn4 btn-success" onClick={() => this.orderDetailsAddress(order.orderId)}>Address</button></td>
                                <td><button className="btn4 btn-success" onClick={() => this.orderDetails(order.orderId)}>Details</button></td>                        
                            </tr>
                    )
                }
            </tbody>         
        </table>
        
    </div>
       </div>
    );
    }
}
export default OrderHistoryScreen