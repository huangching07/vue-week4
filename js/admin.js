import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.prod.min.js';
import pagination from './components/pagination.js';
import productModalComponent from './components/productModal.js';
import delProductModalComponent from './components/delProductModal.js';

let productModal = '';
let delProductModal = '';
const app = {
    // 資料
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'ching',
            products: [],
            tempProduct: {},
            isNew: false,
            pagination: {}
        }
    },
    // 方法
    methods:{
        checkLogin(){
            axios.post(`${this.apiUrl}/api/user/check`)
                .then((res) => {
                    this.getProducts();
                })
                .catch((error) => {
                    window.location.href = "./login.html"; // 跳轉回登入畫面
                    alert(error.response.data.message);
                })
        },
        getProducts(page = 1){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
                .then((res) => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
        openModal(action, product){
            if(action === 'add'){
                this.isNew = true;
                this.tempProduct = {
                    imagesUrl: []
                };
                productModal.show();
            }
            else if(action === 'edit'){
                this.isNew = false;
                this.tempProduct = {...product};
                productModal.show();
            }
            else if(action === 'delete'){
                this.tempProduct = {...product};
                delProductModal.show();
            }
        },
        updateProduct(){
            let method = 'post';
            let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            if(!this.isNew){
                method = 'put';
                api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            }
            
            axios[method](api, { data: this.tempProduct })
            .then((res) => {
                alert(res.data.message);
                // close modal
                productModal.hide();
                // get products
                this.getProducts();
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
        },
        deleteProduct(){
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    alert(res.data.message);
                    // close modal
                    delProductModal.hide();
                    // get products
                    this.getProducts();
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
        createImages(){
            this.tempProduct.imagesUrl = [],
            this.tempProduct.imagesUrl.push('');
        }
    },
    // 生命週期（元件開始時執行）
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // 取得token
        axios.defaults.headers.common['Authorization'] = token; // 每次發出request時都帶入token驗證身份

        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        this.checkLogin();
    },
    components: {
        pagination,
        productModalComponent,
        delProductModalComponent
    }
}

createApp(app).mount('#app');