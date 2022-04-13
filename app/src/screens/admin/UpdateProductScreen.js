import "../../App.css"
import Header from '../../components/Header'
import {Link} from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Component } from "react";
import ApiAdminService from "../../services/admin/ApiAdminService";
import ApiCustomerService from "../../services/customer/ApiCustomerService";

export default class UpdateProductScreen extends Component {

    constructor(props) {
        super(props)
        this.state ={
            productName: '',
            description:'',
            price: '',
            qty: '',
            productImage: '',

           /* rating: '',
            discount: '',
            finalPrice: '',
            grams: ''  */
        }
    }

    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const productId = this.props.match.params.id;
        if(productId) {
            this.findProductById(productId)
            console.log(productId);
        }
    }

    findProductById = (productId) => {
        ApiCustomerService.fetchProductsById(productId)
            .then((response) => {
                if(response != null) {
                    this.setState({
                        id: response.data.result.productId,
                        name: response.data.result.name, 
                        description: response.data.result.description,
                        price: response.data.result.price,
                        quantity: response.data.result.quantity,
                        productImage: response.data.result.productImage

                     /*   rating: response.data.result.rating,
                        discount: response.data.result.discount,
                        finalPrice: response.data.result.finalPrice,                        
                        grams: response.data.result.grams   */
                    })
                }
            })
    }

    updateProduct = (e) => {
        e.preventDefault();

        const product = {
            id: this.state.id, 
            name: this.state.name, 
            description: this.state.description, 
            price: this.state.price, 
            quantity: this.state.quantity,
            productImage: this.state.productImage

         /*   discount: this.state.discount, 
            finalPrice: this.state.price - (this.state.discount * this.state.price / 100),    
            grams: this.state.grams  */
        };

        ApiAdminService.updateProduct(product)
            .then(res => {
                alert("Medicine Updates successfully")
                this.props.history.push('/show-medicine');
            });
        
    };

    render(){
        return (
            <div>
                <Navigation />
            <div className="main">
            <Header title="Update Product" />
            <div className="form">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Name</label>
                <div class="col-sm-10">
                    <input type="text" required autoComplete="off" class="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Description</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Image URL</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="productImage" value={this.state.productImage} onChange={this.onChange} />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Price</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" name="price" value={this.state.price} onChange={this.onChange} />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Quantity</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" name="quantity" value={this.state.quantity} onChange={this.onChange} />
                </div>
            </div>


    {/*        <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Discount %</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" name="discount" value={this.state.discount} onChange={this.onChange} />
                </div>
            </div>
 
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Final Price</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" name="finalPrice" value={this.state.finalPrice} onChange={this.onChange} />
                </div>
            </div>

           
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Grams</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" name="grams" value={this.state.grams} onChange={this.onChange} />
                </div>
            </div>  */}


            <div className="mb-3">
                <div className="float-start" >
                <Link to="/adminhome">Home Page</Link>
                </div>
                <button className="btn4 btn-success float-end" onClick={this.updateProduct}>
                Update Medicine
                </button>
                <br></br>

            </div>
            </div>
        </div>
        </div>
        );
    }
}