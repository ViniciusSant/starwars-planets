const starWarsUrl = 'https://swapi.dev/api/planets';
const getPlanets = async () => fetch(starWarsUrl)
  .then((response) => response.json())
  .then((data) => data.results.map((planet) => {
    const {
      name,
      rotation_period: rotationPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water: surfaceWater,
      population,
      films,
      created,
      edited,
      url,
    } = planet;
    return {
      name,
      rotation_period: rotationPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water: surfaceWater,
      population,
      films,
      created,
      edited,
      url,
    };
  }));
export default getPlanets;
