hostname = 'localhost'
database = 'To_fly_or_not_to_fly'
username = 'postgres'
port = 5432

ap_create = '''CREATE TABLE IF NOT EXISTS airports (
    icao_code varchar(4) PRIMARY KEY,
    iata_code char(3) UNIQUE,
    name text,
    city text,
    country text,
    lat_deg integer,
    lat_min integer,
    lat_sec integer,
    lat_dir char(1),
    lon_deg integer,
    lon_min integer,
    lon_sec integer,
    lon_dir char(1),
    altitude integer,
    lat_decimal numeric,
    lon_decimal numeric
);'''

