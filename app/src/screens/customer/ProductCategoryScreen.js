import {Link} from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiCustomerService";
class ProductCategoryScreen extends Component {

    constructor(props) {
        super(props)
        console.log("window.localStorage::",window.localStorage);
        this.state = {
            message:"",
            products: [],
        }
        this.productDetails = this.productDetails.bind(this);
        this.reloadProductsList = this.reloadProductsList.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.selectProductsByLowtoHigh = this.selectProductsByLowtoHigh.bind(this);
        this.selectProductsByHightoLow = this.selectProductsByHightoLow.bind(this);
    }

    componentDidMount() {
        this.reloadProductsList();
    }

    reloadProductsList() {
        ApiCustomerService.fetchProductsByCategoryId(window.localStorage.getItem("category_id"))
        .then((res) => {
            window.localStorage.setItem("msg", res.data.message)
            this.setState({products : res.data.result});
            //this.setState({userId : JSON.parse(window.localStorage.getItem("user_id"))});
            console.log("state ::",this.state);
        });
    }

    addProductToCart(product) {
        if(JSON.parse(window.localStorage.getItem("user_id")==="9999")) {
            alert("!!! Please Login First !!!");
        } else {
            let productCartId = {userId: JSON.parse(window.localStorage.getItem("user_id")), 
            productId: product.productId,
            quantity: 1};
            ApiCustomerService.addProductToCart(productCartId)
            .then((res) => {
                this.setState({message: res.data.result})
            });
            alert("!!! Medicine Added to Cart !!!");
            JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1) );      
            window.localStorage.setItem("addressStatus", false)
            this.props.history.push('/product-category');
        }
    }

    productDetails(product) {
        window.localStorage.setItem("product_id", product.productId);
        this.props.history.push('/product-details');
    }

    selectProductsByLowtoHigh() {
        ApiCustomerService.sortProductsByLowToHigh(window.localStorage.getItem("category_id"))
            .then((res) => {
                this.setState({products: res.data.result})
                console.log(this.state.products);
            });
    }

    selectProductsByHightoLow() {
        ApiCustomerService.sortProductsByHighToLow(window.localStorage.getItem("category_id"))
        .then((res) => {
            this.setState({products: res.data.result})
            console.log(this.state.products);
        });
    }  

    render(){
        return (
            <div>
               <Navigation/>
               <div className="container">
                    <div className="container">
                     <h4>!!! { window.localStorage.getItem("category_name")} !!!</h4>
                     <div className="position">
                         <div className="dropdown">
                             <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                             Sort
                             </a>
                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                 <li><a className="dropdown-item" onClick={() => { this.selectProductsByLowtoHigh()}}>Sort By Price : Low to High</a></li>
                                 <li><a className="dropdown-item" onClick={() => { this.selectProductsByHightoLow()}}>Sort By Price : High to Low</a></li>
                             </ul> 
                         </div>     
                     </div>  
                     <br/>  
                     <hr/>
                     <br/>  
               


                     <div className="container">
                    <div className="row row-center">
                    {this.state.products.map(product => 
                        <div className="product col-md-3" key={product.id}>
                            <div className="title"> 
                                <img src={product.productImage} className="d-block w-100 " alt="image" height="150px" width="50px" />
                                <a className="nav-link" onClick={() => { this.productDetails(product) }}><h5 className="nameColor">{product.name}</h5></a>
                                <h5 className="nameColor">Rs. {product.price}</h5>
                                
                            </div>
                            <button
                            onClick={() => {
                            this.addProductToCart(product)
                            }}
                            className="btn btn-sm btn-success btn-add-to-cart">
                            Add To Cart
                        </button>
                        </div>
                        )}         
                    </div>
                </div>
                </div>        
            </div>
            </div>     
         ); 
    } 
   
}  
export default ProductCategoryScreen