defmodule ElixirStorjWeb.PageController do
  use ElixirStorjWeb, :controller

  alias ElixirStorj

  def create(conn, %{"file" => %Plug.Upload{path: path}}) do
    case ElixirStorj.store(path) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        conn
        |> put_resp_header("Access-Control-Allow-Origin", "*")
        |> put_status(200)
        |> json(Jason.decode!(body))

      _ ->
        {:error, :not_found}
    end
  end
end
