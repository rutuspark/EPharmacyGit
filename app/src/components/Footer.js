import { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    constructor(props) {
        super(props)
        this.selectcategory = this.selectcategory.bind(this);
    }

    selectcategory(id, name) {
        window.localStorage.setItem("category_id", id);
        window.localStorage.setItem("category_name", name);
        this.props.history.push('/product-category');
    }

    render(){
        return (
        <div className="footer">
            <div  >
                <table width="90%" style={{marginLeft: "16px"}}>
                    <br></br>
                    <tr>
                    <td>
                    <tr>
                        <a href="/aboutus" className="nav-link">
                            <h6 className="nameColor">About Us</h6>
                        </a>
                    </tr>
                    <tr>
                        <a href="/contactus" className="nav-link">
                            <h6 className="nameColor">Contact Us</h6>
                        </a>
                    </tr>
                    

                </td>

               
                </tr>
                </table>

               
                
                <div class="copyright">
                    <div>©Copyrights Reserved</div>
                </div>
            </div>
            
        </div>
        )
    }
}