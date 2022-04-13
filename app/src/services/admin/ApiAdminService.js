import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/admin';

class ApiAdminService {
    //user == supplier

    //get all product by category_id randomly from DB
    //return list of products
    fetchProducts() {
        return axios.get(USER_API_BASE_URL + '/products/');
    }

    addProduct(CategoryName, product) {
        return axios.put(USER_API_BASE_URL + '/addproduct/'+CategoryName, product);
    }

    addCategory(categoryName) {
        console.log(categoryName);
        return axios.post(USER_API_BASE_URL + '/category', categoryName);
    }
     
    addProductBySupplier(category, product) {
        return axios.post(USER_API_BASE_URL + '/'+category.categoryId + "/product", product);
    }
    //get all product by search from DB
    //return list of product which match with searchName
    fetchProductsById(productId) {
        return axios.get(USER_API_BASE_URL + '/product/' + productId);
    }

    //Edit Profile
    //return user object
    updateProduct(product) {
        return axios.put(USER_API_BASE_URL + '/' + product.id, product);
    }

    deleteProduct(productId){
        return axios.delete(USER_API_BASE_URL + '/'+ productId);
    }

    fetchProductCategoryName(supplierId){
        return axios.get(USER_API_BASE_URL + '/productcategoryname/' + supplierId);
    }

    fetchSuppliedProducts(supplierId){
        return axios.get(USER_API_BASE_URL + '/suppliedproducts/' + supplierId)
    }

    deleteFromSuppliedProducts(productId){
        return axios.delete(USER_API_BASE_URL + '/suppliedproducts/'+ productId);
    }

    addAddress(supplierId, address) {
        return axios.put(USER_API_BASE_URL + '/address/' + supplierId , address);
    }
}

export default new ApiAdminService();