defmodule ElixirStorj do
  @moduledoc """
  ElixirStorj keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def store(image) do
    HTTPoison.post(
      "https://demo.storj-ipfs.com/api/v0/add",
      {:multipart, [{:file, image}]},
      [],
      recv_timeout: 30000
    )
  end
end
