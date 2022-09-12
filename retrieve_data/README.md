# Data Retrieval

The Jupyter Notebook in this directory is used to extract joined data from the `airports` and `flights_and_weather` PostgreSQL tables that were uploaded via notebook `02_prepare_and_store_data.ipynb` (located in the [download_and_prepare_datasets](../download_and_prepare_datasets/) folder).

To use it, place a copy of it inside a folder that is itself inside the root-level folder of the project (*e.g.*, the [ML_tests](../ML_tests/) folder that sits inside the [To_fly_or_not_to_fly](../) folder).

The code in the notebook will extract the data from the database into a Pandas dataframe. From there, you can further explore the data by adding code to the end of the notebook.