import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiCustomerService";
import Navigation from "../../components/Navigation";


class PaymentScreen extends Component {

    constructor(props) {
        super(props)
        this.state ={
            paymentInfo: '',
            message: ''
      }
        this.payment = this.payment.bind(this);
        this.paymentDetails = this.paymentDetails.bind(this);
        this.selectCredit = this.selectCredit.bind(this); 
        this.selectDebit = this.selectDebit.bind(this);
      
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

   
    paymentDetails(){
        this.state.payment = {paymentType: this.state.paymentInfo, 
                            orderId : JSON.parse(window.localStorage.getItem("orderId"))};
        ApiCustomerService.submit(this.state.payment);
    }

    payment() {
        this.paymentDetails();
        alert('Payment Done')
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("deliveryBoyId");
        window.localStorage.removeItem("orderId");

        this.props.history.push('/home');
    }

    selectCredit() {
        this.state.paymentInfo= "Online";
    }

    selectDebit() {
        this.state.paymentInfo= "Cash";
    }

    render () {
        return (
            <div>
                <Navigation/>
                <div className="payment">
               <div>
                <div className="float-center">
                    <h5>Total Price : {window.localStorage.getItem("total_price")}</h5>
                    <br/>
                    <div className="position1">
                         <div className="dropdown">
                             <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                             Payment Type
                             </a>
                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                 <li><a className="dropdown-item" onClick={() => { this.selectCredit()}}>Online</a></li>
                                 <li><a className="dropdown-item" onClick={() => { this.selectDebit()}}>Cash</a></li>
                             </ul>
                         </div>     
                     </div> 
                     <br/>  

                    <button className="btn4 btn-primary" style={{width:'150px'}} onClick={() => this.payment()}>Submit Order</button>
                </div>
                </div>
            </div>
            </div>
    
        );
    }
}

export default PaymentScreen