import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Filter extends Component {
  render(){
    return (
      <div id="filter">
        <h4>Ordenar por:</h4>
        <h4>
          <Button bsStyle={this.props.criteria === 'relevancia' ? 
                              "info" : "default"} 
                  className="btn-sort"
                  onClick={this.props.sortRelevancia}
                    >Relevancia</Button>
          <Button bsStyle={this.props.criteria === 'menor-precio' ? 
                              "info" : "default"} 
                  className="btn-sort"
                  onClick={this.props.sortMenorPrecio}
                    >Menor precio</Button>
          <Button bsStyle={this.props.criteria === 'mayor-precio' ? 
                              "info" : "default"}
                  className="btn-sort"
                  onClick={this.props.sortMayorPrecio}
                  >Mayor precio</Button>
        </h4>
        <h4 id="filtrar-por">Filtrar por:</h4>

        <br /> <h5 className="filter-text">Palabra clave</h5>
        <br /> <input type="string" 
                className="form-control" 
                id="palabra-clave"
                onChange={ this.props.filterAll } />

        <br /> <h5 className="filter-text">Precio mayor a $ </h5>
        <br /> <input type="number" 
                className="form-control" 
                id="precio-base"
                onChange={ this.props.filterAll }/>

        <br /> <h5 className="filter-text">Precio menor a $ </h5>
        <br /> <input type="number" 
                className="form-control"
                id="precio-tope"
                onChange={ this.props.filterAll } />

        <br />
        <h4>
          <Button bsStyle={this.props.nuevoVsUsado === 'new' ? 
                              "info" : "default"}
                  className="btn-sort"
                  onClick={ this.props.clickNuevo }
                  >Nuevo</Button>
          <Button bsStyle={this.props.nuevoVsUsado === 'used' ? 
                              "info" : "default"}
                  className="btn-sort"
                  onClick={ this.props.clickUsado }
                  >Usado</Button>
        </h4>
      </div>
      );
  }
}

export default Filter;