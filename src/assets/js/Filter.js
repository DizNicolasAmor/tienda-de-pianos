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
	<section aria-label="Filtros" id="filter">
		<div className="h5 my-2">Ordenar por:</div>
		<div className="text-center">
			<Button
				aria-label="Ordenar por Relevancia"
				bsStyle={criteria === 'relevancia' ? "info" : "light"}
				className="btn-sort"
				onClick={sortRelevancia}
			>
				RELEVANCIA
			</Button>
			<Button
				aria-label="Ordenar por Menor precio"
				bsStyle={criteria === 'menor-precio' ? "info" : "light"}
				className="btn-sort"
				onClick={sortMenorPrecio}
			>
				MENOR PRECIO
			</Button>
			<Button
				aria-label="Ordenar por Mayor precio"
				bsStyle={criteria === 'mayor-precio' ? "info" : "light"}
				className="btn-sort"
				onClick={sortMayorPrecio}
			>
				MAYOR PRECIO
			</Button>
		</div>

		<fieldset>
			<legend className="h5 my-2">Filtros</legend>
			<label className="filter-text my-4" htmlFor="palabra-clave">
				Filtrar por palabra clave:
			</label>
			<input
				type="string"
				className="form-control border border-light"
				id="palabra-clave"
				onChange={filterAll}
			/>
			<label className="filter-text my-4" htmlFor="precio-base">
				Filtrar por precio mayor a $
			</label>
			<input
				type="number"
				className="form-control border border-light"
				id="precio-base"
				onChange={filterAll}
			/>
			<label className="filter-text my-4" htmlFor="precio-tope">
				Filtrar por precio menor a $
			</label>
			<input
				type="number"
				className="form-control border border-light"
				id="precio-tope"
				onChange={filterAll}
			/>

			<div className="m-4 text-center">
				<Button
					aria-label="Filtrar por producto Nuevo"
					bsStyle={nuevoVsUsado === 'new' ? "info" : "light"}
					className="btn-sort"
					onClick={clickNuevo}
				>
					NUEVO
				</Button>
				<Button
					aria-label="Filtrar por producto Usado"
					bsStyle={nuevoVsUsado === 'used' ? "info" : "light"}
					className="btn-sort"
					onClick={clickUsado}
				>
					USADO
				</Button>
			</div>
		</fieldset>
	</section>
);

export default Filter;
