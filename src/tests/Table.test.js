import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { mockData } from "../helpers/data";
import userEvent from "@testing-library/user-event";

describe("Testando a Tabela e os filtros", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<App />);
  });

  test("Verificar se há o fetch", () => {
    expect(fetch).toHaveBeenCalled();
  });

  test("Verifica os inputs após o fetch", async () => {
    await waitFor(() => {
      const searchInput = screen.getByTestId("name-filter");
      expect(searchInput).toBeInTheDocument();
      expect(searchInput.value).toBe("");

      const rows = screen.getAllByTestId("planet-row");
      expect(rows).toHaveLength(10);
      
    });
  });
  test('verificando o fitro maior que ', async () => {
    await waitFor(() => {
      const planetsName = mockData.results.map((planet) => planet.name);
      planetsName.forEach((name) => {
        const getPlanet = screen.getByText(name)
        expect(getPlanet).toHaveTextContent(name)
      })

      const selectColumn = screen.getByTestId('column-filter')
      userEvent.selectOptions(selectColumn,'diameter');

      const selectComparison = screen.getByTestId('comparison-filter');
      userEvent.selectOptions(selectComparison,'maior que')

      const valueInput = screen.getByTestId('value-filter')
      userEvent.type(valueInput, '8900')

      const filterBtn = screen.getByTestId('button-filter')
      userEvent.click(filterBtn);

      const rowsAfterFilter = screen.getAllByTestId('planet-row')
      expect(rowsAfterFilter).toHaveLength(7)
    })
  })

  test("verificando o fitro menor que", async () => {
    await waitFor(() => {
      const planetsName = mockData.results.map((planet) => planet.name);
      planetsName.forEach((name) => {
        const getPlanet = screen.getByText(name);
        expect(getPlanet).toHaveTextContent(name);
      });

      const selectColumn = screen.getByTestId("column-filter");
      userEvent.selectOptions(selectColumn, "orbital_period");

      const selectComparison = screen.getByTestId("comparison-filter");
      userEvent.selectOptions(selectComparison, "menor que");

      const valueInput = screen.getByTestId("value-filter");
      userEvent.type(valueInput, "400");

      const filterBtn = screen.getByTestId("button-filter");
      userEvent.click(filterBtn);

      const rowsAfterFilter = screen.getAllByTestId("planet-row");
      expect(rowsAfterFilter).toHaveLength(5);
    });
  });

  test("verificando o fitro igual a", async () => {
    await waitFor(() => {
      const planetsName = mockData.results.map((planet) => planet.name);
      planetsName.forEach((name) => {
        const getPlanet = screen.getByText(name);
        expect(getPlanet).toHaveTextContent(name);
      });

      const selectColumn = screen.getByTestId("column-filter");
      userEvent.selectOptions(selectColumn, "surface_water");

      const selectComparison = screen.getByTestId("comparison-filter");
      userEvent.selectOptions(selectComparison, "igual a");

      const valueInput = screen.getByTestId("value-filter");
      userEvent.type(valueInput, "8");

      const filterBtn = screen.getByTestId("button-filter");
      userEvent.click(filterBtn);

      const rowsAfterFilter = screen.getAllByTestId("planet-row");
      expect(rowsAfterFilter).toHaveLength(3);
    });
  });
});
