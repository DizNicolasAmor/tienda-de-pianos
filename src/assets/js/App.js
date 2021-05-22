import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Filter from './Filter.js';
import Products from './Products.js';
import Footer from './Footer.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], 
      productsBackup: [],
      productsBackupPorRelevancia: [],
      criteria: 'relevancia',
      nuevoVsUsado: ''
    };

    this.getData = this.getData.bind(this);
    this.sortRelevancia = this.sortRelevancia.bind(this);
    this.sortMenorPrecio = this.sortMenorPrecio.bind(this);
    this.sortMayorPrecio = this.sortMayorPrecio.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.clickNuevo=this.clickNuevo.bind(this);
    this.clickUsado=this.clickUsado.bind(this);
  }

  getData(){
    let self = this;

    axios.get('https://api.mercadolibre.com/sites/MLA/search?category=MLA26960')
      .then(function (response) {
        console.log('PRODUCTS:');
        console.log(response.data.results);
        self.setState({
          products: response.data.results,
          productsBackup: response.data.results,
          productsBackupPorRelevancia: response.data.results,
          criteria: 'relevancia'
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sortRelevancia(){
    let productsBackupAux = JSON.parse(JSON.stringify(this.state.productsBackupPorRelevancia)),
        productsAux = JSON.parse(JSON.stringify(this.state.products));
    let currentProductsIds = [];

    productsAux.forEach( (product) => {
      currentProductsIds.push(product.id);
    });
    let porRelevancia = product => currentProductsIds.indexOf(product.id) !== -1;

    productsBackupAux = productsBackupAux.filter(porRelevancia);

    this.setState({
      products: productsBackupAux,
      productsBackup: JSON.parse(JSON.stringify(this.state.productsBackupPorRelevancia)),
      criteria: 'relevancia'
    });
  }

  sortMenorPrecio(){
    const menorPrecio = function(a,b) {
      if (a.price < b.price)  return -1;
      if (a.price > b.price)  return 1;
      return 0;
    }
    let productsBackupAux = JSON.parse(JSON.stringify(this.state.productsBackup));
    let productsAux = JSON.parse(JSON.stringify(this.state.products));

    productsBackupAux.sort(menorPrecio);
    productsAux.sort(menorPrecio);

    this.setState({
      products: productsAux,
      productsBackup: productsBackupAux,
      criteria: 'menor-precio'
    });
  }

  sortMayorPrecio(){
    const mayorPrecio = function(a,b) {
      if (a.price > b.price)  return -1;
      if (a.price < b.price)  return 1;
      return 0;
    }
    let productsBackupAux = JSON.parse(JSON.stringify(this.state.productsBackup)),
        productsAux = JSON.parse(JSON.stringify(this.state.products));

    productsBackupAux.sort(mayorPrecio);
    productsAux.sort(mayorPrecio);

    this.setState({
      products: productsAux,
      productsBackup: productsBackupAux,
      criteria: 'mayor-precio'
    });
  }

  //filter
  filterAll(){
    let palabraClave = document.getElementById('palabra-clave').value,
        precioBase = document.getElementById('precio-base').value,
        precioTope = document.getElementById('precio-tope').value, 
        nuevoVsUsado = this.state.nuevoVsUsado,

        updatedProducts = JSON.parse(JSON.stringify(this.state.productsBackup));

    let porPalabraClave = function(product){
          return product.title.toLowerCase()
                  .search( palabraClave.toLowerCase() ) !== -1;
        },
        porPrecioBase = function(product){
          return product.price > parseFloat(precioBase);   //remember that precioBase is a string
        }, 
        porPrecioTope = function(product){
          return product.price < parseFloat(precioTope);   //remember that precioTope is a string
        }, 
        porNuevoVsUsado = function(product){
          return product.condition === nuevoVsUsado;
        };

    //check and update all filters
    if(palabraClave !== ''){
      //Maybe the user writes more than one word. 
      let cadaPalabraClave = palabraClave.split(' '), 
          palabraClaveBackup = palabraClave;

      //I want to filter each of the words regardless of the order. 
      cadaPalabraClave.forEach( (cadaPalabra) => {
        palabraClave = cadaPalabra;
        updatedProducts = updatedProducts.filter( porPalabraClave );
      });

      palabraClave = palabraClaveBackup;
    }

    if(precioBase !== ''){
        updatedProducts = updatedProducts.filter( porPrecioBase );
    }

    if(precioTope !== ''){
        updatedProducts = updatedProducts.filter( porPrecioTope );
    }

    if(nuevoVsUsado !== ''){
        updatedProducts = updatedProducts.filter( porNuevoVsUsado );
    }

    this.setState({
      products: updatedProducts
    });
  }

  clickNuevo(){
    if(this.state.nuevoVsUsado === 'new'){
      this.setState({ nuevoVsUsado: '' }, () => {
            this.filterAll();   //it is a callback
      });
    }
    else{
      this.setState({ nuevoVsUsado: 'new' }, () => {
            this.filterAll();
      });      
    }
  }
  clickUsado(){
    if(this.state.nuevoVsUsado === 'used'){
      this.setState({ nuevoVsUsado: '' }, () => {
            this.filterAll();
      });
    }
    else{
      this.setState({ nuevoVsUsado: 'used' }, () => {
            this.filterAll();
      });
    }
  }

  //start
  componentDidMount(){
    this.getData();
  }
  
  render() {
    return (
      <div>
        <div className="grid">
          <Header />
          <Filter criteria={this.state.criteria}
                  sortRelevancia={this.sortRelevancia}
                  sortMenorPrecio={this.sortMenorPrecio}
                  sortMayorPrecio={this.sortMayorPrecio}
                  filterAll={this.filterAll}
                  nuevoVsUsado={this.state.nuevoVsUsado}
                  clickNuevo={this.clickNuevo}
                  clickUsado={this.clickUsado}
                  />
          <Products products={this.state.products} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;