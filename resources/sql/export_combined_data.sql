COPY (
    SELECT
        faw.*,
        orig.lat_decimal AS origin_lat,
        orig.lon_decimal AS origin_lon,
        dest.lat_decimal AS destination_lat,
        dest.lon_decimal AS destination_lon
    FROM flights_and_weather AS faw
        LEFT JOIN airports AS orig
        ON orig.iata_code = faw.origin_airport
        LEFT JOIN airports AS dest
        ON dest.iata_code = faw.destination_airport
--     LIMIT 10
) TO 'FILEPATH'  -- Replace FILEPATH at left with a path to where you want to save the file on your local system
DELIMITER ','
CSV HEADER
;