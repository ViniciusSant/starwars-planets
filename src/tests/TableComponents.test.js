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

  test("Verifica a tabela", () => {
    const nameHeaderTable = screen.getByRole("columnheader", {
      name: /name/i,
    });
    expect(nameHeaderTable).toBeInTheDocument();
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(13)
});
})
