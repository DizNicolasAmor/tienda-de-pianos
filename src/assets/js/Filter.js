import React from 'react';
import {Button} from 'react-bootstrap';

const Filter = ({
	clickNuevo,
	clickUsado,
	criteria,
	filterAll,
	nuevoVsUsado,
	sortRelevancia,
	sortMenorPrecio,
	sortMayorPrecio
}) => (
	<div id="filter">
		<div>Ordenar por:</div>
		<div>
			<Button
				aria-label="Ordenar por Relevancia"
				bsStyle={criteria === 'relevancia' ? "info" : "default"}
				className="btn-sort"
				onClick={sortRelevancia}
			>
				Relevancia
			</Button>
			<Button
				aria-label="Ordenar por Menor precio"
				bsStyle={criteria === 'menor-precio' ? "info" : "default"}
				className="btn-sort"
				onClick={sortMenorPrecio}
			>
				Menor precio
			</Button>
			<Button
				aria-label="Ordenar por Mayor precio"
				bsStyle={criteria === 'mayor-precio' ? "info" : "default"}
				className="btn-sort"
				onClick={sortMayorPrecio}
			>
				Mayor precio
			</Button>
		</div>

		<fieldset>
			<legend>Filtros</legend>
			<label className="filter-text my-4" htmlFor="palabra-clave">
				Filtrar por palabra clave:
			</label>
			<input
				type="string"
				className="form-control"
				id="palabra-clave"
				onChange={filterAll}
			/>
			<label className="filter-text my-4" htmlFor="precio-base">
				Filtrar por precio mayor a $
			</label>
			<input
				type="number"
				className="form-control"
				id="precio-base"
				onChange={filterAll}
			/>
			<label className="filter-text my-4" htmlFor="precio-tope">
				Filtrar por precio menor a $
			</label>
			<input
				type="number"
				className="form-control"
				id="precio-tope"
				onChange={filterAll}
			/>

			<div className="m-4 text-center">
				<Button
					aria-label="Filtrar por producto Nuevo"
					bsStyle={nuevoVsUsado === 'new' ? "info" : "default"}
					className="btn-sort"
					onClick={clickNuevo}
				>
					Nuevo
				</Button>
				<Button
					aria-label="Filtrar por producto Usado"
					bsStyle={nuevoVsUsado === 'used' ? "info" : "default"}
					className="btn-sort"
					onClick={clickUsado}
				>
					Usado
				</Button>
			</div>
		</fieldset>
	</div>
);

export default Filter;
