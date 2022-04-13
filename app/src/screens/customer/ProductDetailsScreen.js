import {Link} from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiCustomerService";
class ProductDetailsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: [],
            message:""
        }
        this.addProductToCart = this.addProductToCart.bind(this);
    }

    componentDidMount() {
        ApiCustomerService.fetchProductsById(window.localStorage.getItem("product_id"))
        .then((res) => {
            this.setState({product : res.data.result})
            console.log("productDetails::",this.state);
        });
    }

    addProductToCart() {
        if(JSON.parse(window.localStorage.getItem("user_id")==="9999")) {
            alert("!!! Please Login First !!!");
        } else {
           
            let productCartId = {userId: JSON.parse(window.localStorage.getItem("user_id")), 
            productId: this.state.product.productId,
            quantity: 1};
            ApiCustomerService.addProductToCart(productCartId)
            .then((res) => {
                this.setState({message: res.data.result})
            });
            alert("!!! Medicine Added to Cart !!!");
            JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1) );  
            this.props.history.push('/product-category');
        }
    }

    render(){
        return (
            <div>
                <Navigation/>
                 <div className="container">
                     <div className="main">
                    <h4>!!! { window.localStorage.getItem("category_name")} !!!</h4> 
                    <img src={this.state.product.productImage} className="center " alt="image" height="150px" width="150px" />    
                    <h5 className="nameColor">{this.state.product.productName}</h5>
                    <h5 className="nameColor">Rs. {this.state.product.price}</h5>

                    <h5 className="nameColor">Description : {this.state.product.description}</h5>
           
                    <button
                        onClick={() => {
                        this.addProductToCart()
                        }}
                        className="btn4 btn-sm btn-success btn-add-to-cart">
                        Add To Cart
                    </button>
                    </div>
             </div>
            </div>     
         );
    }
   
}
export default ProductDetailsScreen