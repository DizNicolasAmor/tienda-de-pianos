import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Filter from './Filter.js';
import Products from './Products.js';
import Footer from './Footer.js';
import * as _cloneDeep from 'lodash/cloneDeep';

const copyProducts = productsArray => productsArray.map(obj => _cloneDeep(obj));

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			productsBackup: [],
			productsBackupPorRelevancia: [],
			criteria: 'relevancia',
			condition: ''
		};
	}

	getData = () => {
		const url = 'https://api.mercadolibre.com/sites/MLA/search?category=MLA26960';
		axios.get(url)
			.then(response => {
				this.setState({
					products: response.data.results,
					productsBackup: response.data.results,
					productsBackupPorRelevancia: response.data.results,
					criteria: 'relevancia'
				});
			})
			.catch(console.error);
	}

	sortRelevancia = () => {
		const {
			productsBackupPorRelevancia,
			products
		} = this.state;
		const porRelevancia = product => currentProductsIds.indexOf(product.id) !== -1;
		let productsBackupAux = copyProducts(productsBackupPorRelevancia);
		let productsAux = copyProducts(products);
		let currentProductsIds = [];

		productsAux.forEach( (product) => { currentProductsIds.push(product.id) });
		productsBackupAux = productsBackupAux.filter(porRelevancia);
		this.setState({
			products: productsBackupAux,
			productsBackup: copyProducts(productsBackupPorRelevancia),
			criteria: 'relevancia'
		});
	}

	sortMenorPrecio = () => {
		const { productsBackup, products } = this.state;
		const menorPrecio = function(a,b) {
			if (a.price < b.price)  return -1;
			if (a.price > b.price)  return 1;
			return 0;
		}
		let productsBackupAux = copyProducts(productsBackup);
		let productsAux = copyProducts(products);

		productsBackupAux.sort(menorPrecio);
		productsAux.sort(menorPrecio);

		this.setState({
			products: productsAux,
			productsBackup: productsBackupAux,
			criteria: 'menor-precio'
		});
	}

	sortMayorPrecio = () => {
		const { productsBackup, products } = this.state;
		const mayorPrecio = function(a,b) {
			if (a.price > b.price)  return -1;
			if (a.price < b.price)  return 1;
			return 0;
		}
		let productsBackupAux = copyProducts(productsBackup),
			productsAux = copyProducts(products);

		productsBackupAux.sort(mayorPrecio);
		productsAux.sort(mayorPrecio);

		this.setState({
			products: productsAux,
			productsBackup: productsBackupAux,
			criteria: 'mayor-precio'
		});
	}

	filterAll = () => {
		const { condition, productsBackup } = this.state;
		const precioBase = document.getElementById('precio-base').value;
		const precioTope = document.getElementById('precio-tope').value; 
		let palabraClave = document.getElementById('palabra-clave').value;

		const porPalabraClave = product => product.title.toLowerCase().search(palabraClave.toLowerCase()) !== -1;
		const porPrecioBase = product => product.price > parseFloat(precioBase);
		const porPrecioTope = product => product.price < parseFloat(precioTope);
		const byCondition = product => product.condition === condition;
		let updatedProducts = copyProducts(productsBackup);

		if(palabraClave){
			const palabraClaveBackup = palabraClave;
			let cadaPalabraClave = palabraClave.split(' ');

			cadaPalabraClave.forEach(cadaPalabra => {
				palabraClave = cadaPalabra;
				updatedProducts = updatedProducts.filter(porPalabraClave);
			});

			palabraClave = palabraClaveBackup;
		}

		if(precioBase){ updatedProducts = updatedProducts.filter(porPrecioBase) }
		if(precioTope){ updatedProducts = updatedProducts.filter(porPrecioTope) }
		if(condition){ updatedProducts = updatedProducts.filter(byCondition) }

		this.setState({ products: updatedProducts });
	}

	handleChangeCondition = str => {
		const { condition } = this.state;
		const newCondition = condition === str ? '' : str;
		this.setState({ condition: newCondition }, () => { this.filterAll() });
	}

	componentDidMount(){
		this.getData();
	}
  
	render() {
		return (
			<div>
				<div className="grid">
					<Header />
					<Filter
						criteria={this.state.criteria}
						sortRelevancia={this.sortRelevancia}
						sortMenorPrecio={this.sortMenorPrecio}
						sortMayorPrecio={this.sortMayorPrecio}
						filterAll={this.filterAll}
						condition={this.state.condition}
						clickOnNew={() => this.handleChangeCondition('new')}
						clickOnUsed={() => this.handleChangeCondition('used')}
					/>
					<Products products={this.state.products} />
					<Footer />
				</div>
			</div>
		);
  }
}

export default App;
