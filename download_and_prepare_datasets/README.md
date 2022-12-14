# Download and Prepare Datasets

There are two [Jupyter Notebook](https://jupyter.org/) files contained in this folder:
- `01_get_data.ipynb` is used to download the datasets
- `02_prepare_and_store_data.ipynb` is used to preprocess the data and upload it to a PostgreSQL database.

The data will be uploaded in two tables: `flights_and_weather` and `airports`, which will be joined on their [International Air Transport Association (IATA)](https://www.iata.org/) codes.

The database [Entity Relationship Diagram (ERD)](https://www.lucidchart.com/pages/er-diagrams), below, was created with [QuickDBD](https://www.quickdatabasediagrams.com/).

![entity relationship diagram](../resources/images/db_entity_relationship_diagram.png)

The diagram can be reproduced by entering the following into [its app](https://app.quickdatabasediagrams.com/):

```
airports as ap
----
id serial PK
icao_code varchar(4) UNIQUE
iata_code char(3) UNIQUE
name text
city text
country text
lat_deg integer
lat_min integer
lat_sec integer
lat_dir char(1)
lon_deg integer
lon_min integer
lon_sec integer
lon_dir char(1)
altitude integer
lat_decimal numeric
lon_decimal numeric

flights_and_weather as faw
----
carrier_code char(2)
flight_number integer
origin_airport char(3) FK >- ap.iata_code
destination_airport char(3) FK >- ap.iata_code
filght_date date
scheduled_elapsed_time integer
tail_number varchar(6) NULLABLE
departure_delay integer
arrival_delay integer
delay_carrier integer
delay_weather integer
delay_national_aviation_system integer
delay_security integer
delay_late_aircarft_arrival integer
cancelled_code boolean
scheduled_departure_dt timestamp
scheduled_arrival_dt timestamp
actual_departure_dt timestamp NULLABLE
actual_arrival_dt timestamp NULLABLE
STATION_x numeric NULLABLE
HourlyDryBulbTemperature_x numeric NULLABLE
HourlyPrecipitation_x numeric NULLABLE
HourlyStationPressure_x numeric NULLABLE
HourlyVisibility_x numeric NULLABLE
HourlyWindSpeed_x numeric NULLABLE
STATION_y numeric NULLABLE
HourlyDryBulbTemperature_y numeric NULLABLE
HourlyPrecipitation_y numeric NULLABLE
HourlyStationPressure_y numeric NULLABLE
HourlyVisibility_y numeric NULLABLE
HourlyWindSpeed_y numeric NULLABLE
```

Although not stated in the schema above, no columns in the `airports` table have a `NOT NULL` constraint (*i.e.*, they are all `NULLABLE`).

## Update

Although the `airports` data is extensive, it is not comprehensive, and there are airports in the `flights_and_weather` data that are not present in the `airports` data. Because of this, the `FOREIGN KEY CONSTRAINT` on the `flights_and_weather` table had to be removed. As a result, any `OUTER JOIN`s performed on that relation may result in `NULL` values in airports' coordinate data.
