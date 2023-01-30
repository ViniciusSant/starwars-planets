import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../helpers/Planets';
import PlanetsContext from './PlanetsContext';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getFetchPlanets = async () => {
      const allPlanets = await getPlanets();
      setPlanets(allPlanets);
    };
    getFetchPlanets();
  }, [setPlanets]);

  const contextType = {
    planets,
  };
  return (
    <PlanetsContext.Provider value={ contextType }>
      {children}
    </PlanetsContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ContextProvider;
