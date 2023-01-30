import { useState, useContext, React } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TableComponents from './TableComponents';
/* import TableComponents from './TableComponents';
 */
function Table() {
  const { planets } = useContext(PlanetsContext);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  /*   const [selectedColumn, setSelectedColumn] = useState([]); */
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'surface_water',
    'diameter',
    'rotation_period',
  ]);

  const handleClick = () => {
    setSelectedFilters([...selectedFilters, selected]);
    /* setSelectedColumn([...selectedColumn, selected.column]); */

    const removeOpt = columns.filter((coluna) => coluna !== selected.column);
    setColumns(removeOpt);
    setSelected({ ...selected, column: removeOpt[1] });
  };

  const handleFilters = () => {
    const filteredName = planets
      .filter(({ name }) => name.toUpperCase().includes(search.toUpperCase()));
    const filteredNameConditions = filteredName.filter((planet) => {
      const filterResults = selectedFilters.map(
        ({ column, condition, value }) => {
          switch (condition) {
          case 'maior que':
            return Number(planet[column]) > Number(value);
          case 'menor que':
            return Number(planet[column]) < Number(value);
          case 'igual a':
            return Number(planet[column]) === Number(value);
          default:
            return true;
          }
        },
      );
      return filterResults.every((el) => el);
    });
    return filteredNameConditions;
  };

  /* verificar se algum elemento do array de colunas já foi selecionado, se sim filtra todos menos ele */

  /* const handleColumn = () => {
    const colunasNãoSelecionadas = selectedColumn.map((coluna) => {
      if(columns.includes(coluna)){
        setColumns.filter((colunaa) => colunaa !== coluna)
      }
      return colunasNãoSelecionadas
    }}
  useEffect(() => {
    console.log(handleColumn());
  }, selectedFilters); */

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          onChange={ (e) => setSearch(e.target.value) }
          value={ search }
          data-testid="name-filter"
          placeholder="Search"
        />
      </div>
      <div>
        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            value={ selected.column }
            onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
          >
            {columns.map((column, index) => (
              <option key={ index }>{column}</option>
            ))}
            {/* <option id="population" defaultValue value="population">
              population
            </option>
            <option id="orbital_period">orbital_period</option>
            <option id="diameter">diameter</option>
            <option id="rotation_period">rotation_period</option>
            <option id="surface_water">surface_water</option> */}
          </select>
        </label>
        <label htmlFor="condition">
          Condição:
          <select
            name="condition"
            id="condition"
            data-testid="comparison-filter"
            value={ selected.condition }
            onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="number">
          Numero:
          <input
            type="number"
            name="number"
            id="number"
            data-testid="value-filter"
            value={ selected.value }
            onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
          />
        </label>
        <button type="button" data-testid="button-filter" onClick={ handleClick }>
          Filtrar
        </button>
        {selectedFilters.map((filter) => (
          <div key={ filter.comparison } data-testid="filter">
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
            <button
              key={ filter.value }
              type="button"
              onClick={ () => {
                setSelectedFilters(
                  selectedFilters.filter(
                    (filterSet) => filterSet.column !== filter.column,
                  ),
                );
              } }
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setSelectedFilters([]) }
        >
          Remover todas filtragens
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {handleFilters()
            .filter(({ name }) => name.toUpperCase().includes(search.toUpperCase()))
            .map((planet) => (
              <TableComponents key={ planet } planet={ planet } />
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
