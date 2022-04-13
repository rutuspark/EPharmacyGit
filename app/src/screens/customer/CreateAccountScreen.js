import "../../App.css"
import axios from 'axios';

import { InputInfo } from "./InputInfo";
import Header from "../../components/Header"
import {Link} from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiCustomerService";
import React, { Component } from 'react'
 
class CreateAccountScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state ={
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      role:'CUSTOMER',
      gender:'',
      message: ''
  }
    this.registerUser = this.registerUser.bind(this);
}
  
onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    registerUser = (e) => {
      e.preventDefault();
      let user = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, phone: this.state.phone, gender: this.state.gender, role: this.state.role};
      
        
        let firstName = user.firstName;
        let lastName = user.lastName;
        let email = user.email;
        let password = user.password;
      if(firstName.trim().length <= 2){
                  alert("please provide valid first name")
                  return
              }
              
              let firstNameCheck = firstName;
              let firstNamepattern = /[0-9]/g;
              let result = firstNameCheck.match(firstNamepattern);
              console.log(result)
              if(result != null){
                  alert("name should not contain numeric value")
                  return;
              }
              if(lastName.trim().length <= 2){
                  alert("please provide valid last name")
                  return
              }
      
              let lastNameCheck = firstName;
              let lastpattern = /[0-9]/g;
              let result2 = lastNameCheck.match(lastpattern);
              if(result2 != null){
                  alert("name should not contain numeric value")
                  return
              }
              
              if(email.trim().length <= 6){
                  alert("please provide valid email address...")
                  
                  return
              }
              if(!email.includes(".com" && "@")){
                  alert("@ or .com is missing in email address...") 
                  return;
               }
              
              
              if(password.trim().length <= 6){
                  alert("please enter more than six digits of password")
                  return
              }
              let passwordCheck = password;
              let passpattern = /[0-9]/g;
              let result3 = passwordCheck.match(passpattern);
              if(result3 === null){
                  alert("password must include alphabets and digits both")
                  return
              }
            
            axios.post('http://localhost:8080/customers/signup',user).then(response =>{
              if (response.status >= 200 && response.status < 300) {
                  console.log(response);
                  alert("Created account successfully!!!");
                   
                  return ;
              } else {
                 console.log('Somthing went wrong...');
              }
              }).catch(err => err);
  
              
         
         this.props.history.push('/login');
          user.firstName = null;
          user.lastName = null;
          user.email = null;
          user.password = null;
  
  
      }
        
  
      
  render(){
    return (
      <div>
        <Navigation/>
        <div className="main">
      <Header title="Create Account" />
      <div className="form">
      <div className="row mb-3">
          <label className="col-sm-4 col-form-label">First Name</label>
          <div className="col-sm-8">
          
              <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.onChange} required="true"
              placeholder="Enter First Name"/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Last Name</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.onChange} required="true"
              placeholder="Enter Last Name"/>
          </div>
       </div>

       <div class="row mb-3">
          <label className="col-sm-4 col-form-label">Email</label>
          <div className="col-sm-8">
              <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onChange} required="true"
              placeholder="Enter email"/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Password</label>
          <div className="col-sm-8">
              <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} required="true"
              placeholder="Enter Password"/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Phone</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.onChange} required="true"
              placeholder="Enter Phone Number"/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Gender</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="gender" value={this.state.gender} onChange={this.onChange} required="true"
              placeholder="Enter Gender"/>
          </div>
       </div>



        <div className="mb-3">
        <div className="float-start"><br></br>
            Existing User? <Link to="/login">Login here</Link>
          </div>
          <button className="btn-hover color-9 float-end" onClick=
                                               {this.registerUser}>

            Register
          </button>
          <br></br>

        </div>
      </div>
    </div>
      </div>
    )
          }
        
      
        }

 


export default CreateAccountScreen