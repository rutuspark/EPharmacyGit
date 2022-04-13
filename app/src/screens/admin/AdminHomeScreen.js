import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import React, { Component } from 'react'
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class AdminHomeScreen extends Component {
    constructor(props) {
        super(props)
        
        this.showProfile = this.showProfile.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.showPendingOrders = this.showPendingOrders.bind(this);
        this.showdeliveredOrders = this.showdeliveredOrders.bind(this);
        this.addMedicine = this.addMedicine.bind(this);
        this.addCategory =this.addCategory.bind(this);
       /* this.showSupplier = this.showSupplier.bind(this);
        this.showDeliveryBoy = this.showDeliveryBoy.bind(this);
        this.logout = this.logout.bind(this); */
    }

    showProfile(){
        this.props.history.push('/myaccount/profile');
    }
    editProfile(){
        this.props.history.push('/myaccount/editprofile');
    }
    changePassword(){
        this.props.history.push('/myaccount/change-password');
    }
    showPendingOrders(){
        this.props.history.push('/pendingorderforadmin');
    }
    showdeliveredOrders(){
        this.props.history.push('/deliveredorderforadmin');
    }
    addMedicine(){
        this.props.history.push('/add-medicine');
    }
    showMedicine(){
        this.props.history.push('/show-medicine');
    }

    addCategory(){
        this.props.history.push('/add-category');
    }





   /* showSupplier(){
        this.props.history.push('/showsupplier');
    }
    showDeliveryBoy(){
        this.props.history.push('/showdeliveryboy');
    }   */

    logout(){
        this.props.history.push('/logout');
    }
   render(){
    return (
        <div>
            <Navigation/>
            <div className="main1">
            <table>
                <td><button className="btn4 btn-success" onClick={() => this.showProfile()}>Profile</button></td>
                <td><button className="btn4 btn-danger" onClick={() => this.editProfile()}>Edit Profile</button></td>
                <td><button className="btn4 btn-success" onClick={() => this.changePassword()}>Change Password</button></td>
                <td><button className="btn4 btn-danger" onClick={() => this.showPendingOrders()}>Pending Orders</button></td>
                <td><button className="btn4 btn-success" onClick={() => this.showdeliveredOrders()}>Delivered Orders</button></td>
                <td><button className="btn4 btn-success" onClick={() => this.addMedicine()}>Add Medicine</button></td> 
                <td><button className="btn4 btn-success" onClick={() => this.showMedicine()}>Show Medicine</button></td> 
                <td><button className="btn4 btn-success" onClick={() => this.addCategory()}>Add Category</button></td>
                <td><button className="btn4 btn-danger" onClick={() => this.logout()}>Logout</button></td>
            </table>
        </div>
        </div>
    );
   }
}
export default AdminHomeScreen