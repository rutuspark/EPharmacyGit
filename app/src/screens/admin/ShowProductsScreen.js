import { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer"
import Navigation from "../../components/Navigation"
import ApiAdminService from "../../services/admin/ApiAdminService";


export default class ShowProductsScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            products: [],
            categoryName:''
        };
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        ApiAdminService.fetchProducts()//Hard Coded Make Sure if the category id and supplier id is same
        .then((res) => {
            this.setState({products: res.data.result})
        });
    }

    deleteProduct(productId) {
        ApiAdminService.deleteProduct(productId)
        .then((res) => {
            window.location.reload();       
        });
       
    }

    render(){
        return (
            <div>
                <Navigation />
                <div className="container">
                <table class="table table-striped" >
                    <thead>
                        <tr>
                        <th scope="col" width="10%">Product id</th>
                        <th scope="col" width="20%">Product Name</th>
                       
                     { /*  <th scope="col" width="10%">Rating</th> */}
                        <th scope="col" width="10%">Update Product</th>
                        <th scope="col" width="9%">Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products === null  ?
                            <tr align="center">
                                <td colSpan="6">Products Not Available.</td>
                            </tr> :
                            this.state.products !== null && this.state.products.map((product) => (
                                <tr >
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                  
                                 {/*   <td>{product.rating}</td>    */}
                                    <td><Link to={"/update-medicine/"+product.productId} className="btn4 btn-success">Update Medicine</Link></td>
                                    <td><button className="btn4 btn-danger" onClick={() => this.deleteProduct(product.productId)}>Delete Medicine</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    
                </table>
                </div>
            </div>
        );
    }
}
