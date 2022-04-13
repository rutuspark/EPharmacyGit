import "../../App.css"
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import ApiCustomerService from "../../services/customer/ApiCustomerService";

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category:[],
            products: [],
            message:"",
        }
        this.selectcategory = this.selectcategory.bind(this);
        this.reloadCategoryList = this.reloadCategoryList.bind(this);
        this.reloadProductsList = this.reloadProductsList.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.productDetails = this.productDetails.bind(this);
    }

    componentDidMount() {
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if(size === null)
            JSON.stringify(window.localStorage.setItem("cart_size", 0) );
        if(size !== null)
        JSON.stringify(window.localStorage.setItem("cart_size", size) );

        let uId = JSON.parse(window.localStorage.getItem("user_id"))
        if(uId === null)
            JSON.stringify(window.localStorage.setItem("user_id", 9999));
        if(uId !== null)
        JSON.stringify(window.localStorage.setItem("user_id", uId));
        
        this.reloadCategoryList();
        this.reloadProductsList();
    }

    reloadCategoryList() {
        ApiCustomerService.fetchAllCategory()
        .then((res) => {
            this.setState({category : res.data.result})
        });
    }

    reloadProductsList() {
        ApiCustomerService.fetchProductsForHomePage()
        .then((res) => {
            window.localStorage.setItem("msg", res.data.message)
            this.setState({products : res.data.result})
        });
    }


    selectcategory(id, name) {
        window.localStorage.setItem("category_id", id);
        window.localStorage.setItem("category_name", name);
        this.props.history.push('/product-category');
    }

    addProductToCart(product) {
        let productCartId = {userId: JSON.parse(window.localStorage.getItem("user_id")), 
            productId: product.id};
        ApiCustomerService.addProductToCart(productCartId)
        .then((res) => {
            this.setState({message: res.data.result})
        });
        alert("!!! Items Added to Cart !!!");
        JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1) );      
        window.localStorage.setItem("addressStatus", false)
        this.props.history.push('/home');       
    }

    productDetails(product) {
        window.localStorage.setItem("product_id", product.id);
        this.props.history.push('/product-details');
    }


    render() {
        return (
            <div>
                <Navigation/>
                <br></br>
    
                <div>
                    <table>
                        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel" >
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                   
                                </div>
    
                               <div className="carousel-inner" >
                                    <div className="carousel-item active" data-bs-interval="4000">
                                    <Link to="/home">
                                    <img src="https://thumbs.dreamstime.com/b/pharmacy-sign-design-illustration-white-background-39417556.jpg" className="d-block w-100 " alt="image1" />
                                    </Link>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="4000">
                                    <img src="https://cdn.lifestyleasia.com/wp-content/uploads/sites/6/2020/07/16104136/the-ordinary-regime-1600x619.jpg" className="d-block w-100 " alt="image2"/>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="4000">
                                    <img src="https://www.dyadic.com/wp-content/uploads/2015/05/Kayleigh-Sternberg-7th-grade-at-Lab-2-1600x619.jpg" className="d-block w-100 " alt="image3" />
                                    </div>
                                   
                                    
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </div>
                    </table>               
                </div>
 

                



                
            </div>
        )
    }
   
  }


export default HomeScreen