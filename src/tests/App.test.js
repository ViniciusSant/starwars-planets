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

  test("Verifica os inputs", () => {
    const textInput = screen.getByTestId("name-filter");
    expect(textInput).toBeInTheDocument();
    const columnInput = screen.getByRole("spinbutton", {
      name: /numero:/i,
    });
    expect(columnInput).toBeInTheDocument();
    const condition = screen.getByText(/condição:/i);
    expect(condition).toBeInTheDocument();
    const inputNumber = screen.getByRole("spinbutton", {
      name: /numero:/i,
    });
    expect(inputNumber).toBeInTheDocument();
    const filterBtn = screen.getByRole("button", {
      name: /filtrar/i,
    });
    expect(filterBtn).toBeInTheDocument();
    const removeFilterBtn = screen.getByRole("button", {
      name: /remover todas filtragens/i,
    });
    expect(removeFilterBtn).toBeInTheDocument();
  });
});
