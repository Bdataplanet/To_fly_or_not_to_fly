hostname = 'localhost'
database = 'To_fly_or_not_to_fly'
username = 'postgres'
password = ''
port = 5432

# ap_create = '''DROP TABLE IF EXISTS airports;
# 
# CREATE TABLE IF NOT EXISTS airports (
#     id serial PRIMARY KEY,
#     icao_code char(4) UNIQUE,
#     iata_code char(3) UNIQUE,
#     name text,
#     city text,
#     country text,
#     lat_deg integer,
#     lat_min integer,
#     lat_sec integer,
#     lat_dir char(1),
#     lon_deg integer,
#     lon_min integer,
#     lon_sec integer,
#     lon_dir char(1),
#     altitude integer,
#     lat_decimal numeric,
#     lon_decimal numeric
# );'''

ap_create = '''CREATE TABLE IF NOT EXISTS airports (
    id serial PRIMARY KEY,
    icao_code char(4) UNIQUE,
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

ap_populate = 'INSERT INTO airports VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

