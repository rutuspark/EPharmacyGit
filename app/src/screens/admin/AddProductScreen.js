import "../../App.css"
import Header from '../../components/Header'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Component } from "react";
import ApiAdminService from "../../services/admin/ApiAdminService";
import Select from 'react-select';
import ApiCustomerService from "../../services/customer/ApiCustomerService";


export default class AddProductScreen extends Component {
    constructor(props) {
        super(props)
        this.state ={
            medicineName: '',
            description:'',
            price: '',
            qty: '',
            medicineUrl: '',
            selectedOption: null
            
        }
       
    }

    componentWillMount() {
        this.reloadCategoryList();  
    }

    reloadCategoryList() {
        ApiCustomerService.fetchAllCategory()
        .then((res) => {
            this.setState({category : res.data.result})
        });
    }


    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    backToOrderHistory(){
        this.props.history.push('/adminhome');
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      };

    addProduct = (e) => {
        e.preventDefault();

        const product = {
            name: this.state.productName, 
            description: this.state.description, 
            price: this.state.price, 
            quantity: this.state.qty,
            productImage: this.state.medicineUrl
        };

        console.log("product::",product)

        ApiAdminService.addProductBySupplier(this.state.selectedOption, product)
            .then(res => {
                alert("Medicine Added successfully")
                this.props.history.push('/adminhome');
            });
        
    };

    render(){
        return (
            <div>
                <Navigation />
            <div className="main">
            <Header title="Add Medicine" />
            <div className="form">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Name</label>
                <div class="col-sm-10">
                    <input type="text" required autoComplete="off" class="form-control" name="productName" value={this.state.productName} onChange={this.onChange}/>
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Description</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} />
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
                    <input type="number" class="form-control" name="qty" value={this.state.qty} onChange={this.onChange} />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Medicine Image URL</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="medicineUrl" value={this.state.medicineUrl} onChange={this.onChange} />
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Category name</label>
                <div class="col-sm-10">
                <Select
                    name="selectSubTag"
                    id="selectSubTag"
                    value={this.state.selectedOption}
                    options={this.state.category}
                    getOptionLabel ={(option)=>option.name}
                    getOptionValue ={(option)=>option.categoryId}
                    onChange={this.handleChange}
                    placeholder="Select Category"/>
                </div>
            </div>



     { /*      <div class="row mb-3">
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
                <button className="btn4 btn-success" onClick={() => this.backToOrderHistory()}>Home</button>
                </div>
                <button className="btn4 btn-success float-end" onClick={this.addProduct}>
                Add Medicine
                </button>
                <br></br>

            </div>
            </div>
        </div>
        </div>
        );
    }
}