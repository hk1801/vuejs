var products = [
  {id: 1, name: 'Angular', description: 'Superheroic JavaScript MVW Framework.', price: 150},
  {id: 2, name: 'PHP', description: 'A framework for creating ambitious web applications.', price: 50},
  {id: 3, name: 'React', description: 'A JavaScript Library for building user interfaces.', price: 200},
  {id: 4, name: 'Node.js', description: 'A JavaScript framework for building backend.', price: 250}
];

function findProduct (productId) {
  return products[findProductKey(productId)];
};

function findProductKey (productId) {
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#product-list',
  data: function () {
    return {products: products, searchKey: ''};
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter(function (product) {
        return this.searchKey=='' || product.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  }
});
var index;  // variable to set the selected row index
function getSelectedRow()
{
	var table = document.getElementById("table");
	for(var i = 1; i <= table.rows.length; i++)
	{
		table.rows[i].onclick = function()
		{
			// clear the selected from the previous selected row
			// the first time index is undefined
			if(typeof index !== "undefined"){
				table.rows[index].classList.toggle("selected");
			}
		   
			index = this.rowIndex;
			this.classList.toggle("selected");

		};
	}	
}
setTimeout(function() {getSelectedRow()},1000);
function upNdown(direction)
{
	var rows = document.getElementById("table").rows,
		parent = rows[index].parentNode;
	 if(direction === "up")
	 {
		 if(index > 1){
			parent.insertBefore(rows[index],rows[index - 1]);
			// when the row go up the index will be equal to index - 1
			index--;
		}
	 }
	 
	 if(direction === "down")
	 {
		 if(index < rows.length -1){
			parent.insertBefore(rows[index + 1],rows[index]);
			// when the row go down the index will be equal to index + 1
			index++;
		}
	 }
}
var ProductEdit = Vue.extend({
  template: '#product-edit',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    updateProduct: function () {
      var product = this.product;
      products[findProductKey(product.id)] = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      };
      router.push('/');
    }
  }
});

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    deleteProduct: function () {
      products.splice(findProductKey(this.$route.params.product_id), 1);
      router.push('/');
    }
  }
});

var AddProduct = Vue.extend({
  template: '#add-product',
  data: function () {
    return {product: {name: '', description: '', price: ''}}
  },
  methods: {
    createProduct: function() {
      var product = this.product;
      products.push({
        id: Math.random().toString().split('.')[1],
        name: product.name,
        description: product.description,
        price: product.price
      });
      router.push('/');
    }
  }
});

var router = new VueRouter({routes:[
  { path: '/', component: List},
  { path: '/product/:product_id', component: Product, name: 'product'},
  { path: '/add-product', component: AddProduct},
  { path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
  { path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
]});
app = new Vue({
  router:router
}).$mount('#app')