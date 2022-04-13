import "../../App.css"
import Header from '../../components/Header'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Component } from "react";
import ApiSupplierService from "../../services/supplier/ApiSupplierService";
import ApiAdminService from "../../services/admin/ApiAdminService";

export default class AddCategoryScreen extends Component {
    constructor(props) {
        super(props)
        this.state ={
            categoryName: '',
        }
    }

    componentDidMount(){
      
    }
    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    backToOrderHistory(){
        this.props.history.push('/adminhome');
    }

    addCategory = (e) => {
        e.preventDefault();

        const category = {
            name: this.state.categoryName
        };


        ApiAdminService.addCategory(category)
            .then(res => {
                alert("Category Added successfully")
                this.props.history.push('/adminhome');
            });
        
    };

    render(){
        return (
            <div>
                <Navigation />
            <div className="main">
            <Header title="Add Category" />
            <div className="form">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Category Name</label>
                <div class="col-sm-10">
                    <input type="text" required autoComplete="off" class="form-control" name="categoryName" value={this.state.categoryName} onChange={this.onChange}/>
                </div>
            </div>

            <div className="mb-3">
                <div className="float-start" >
                <button className="btn4 btn-success" onClick={() => this.backToOrderHistory()}>Home</button>
                </div>
                <button className="btn4 btn-success float-end" onClick={this.addCategory}>
                Add Category
                </button>
                <br></br>

            </div>
            </div>
        </div>
        </div>
        );
    }
}