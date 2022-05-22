defmodule ElixirStorjWeb.Router do
  use ElixirStorjWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ElixirStorjWeb do
    pipe_through :api

    resources "/", PageController, only: [:create]
  end
end
