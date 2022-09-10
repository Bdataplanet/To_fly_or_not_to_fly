# Technical Hurdles

The project presented many technical challenges. The following serves as a log of some of the more noteworthy ones occuring on the back-end (mostly concerning the ETL pipeline and later data retrieval).

## Download Datasets

Downloading the data from their sources presented only had a handfull of challenges, which mostly involved learning how to use the Kaggle API and automating the UnZip process.

## Prepare and Store Data

### Data Preparation

#### Airport Data

##### General Text Conversion

The airport data required a lot of general text conversion, including: splitting, joining, regular expression substitution, and null-value conversion (to python `None` values).

##### Column Definitions

In addition, there were issues related to column definitions that had to be resolved before the SQL database would accept the data.

**Problem:** NumPy `NaN` values are technically `float`s, which causes Pandas to coerce otherwise-`integer` columns into `float` columns if `NaN` values are present.

**Solution:** convert such columns to Pandas `Int64Dtype`, whose `<NA>` values still count as `integer`s.

**Problem:** IATA codes are supposed to be unique. However, the `iata_code` column included some duplicates, which were most likely errors. Unfortunately, there is no publically available, canonical and comprehensive list of ICAO and IATA airport codes (that we were able to find), so we had to choose which rows to keep or drop.

**Solution:** For rows with duplicate IATA codes
- programmatically remove rows that contain no coordinate information
- of the rows that remain, manually choose which to keep and which to drop, using the following inclusion/exclusion guidelines:
  - If the rows contain similar data, but one has `NULL` values and the other doesn't, drop the row with `NULL` values.
  - If the same code specifies both an international airport and a smaller airfield in the same general vicinity, keep the international airport.
  - If the rows seem to be describing the same airport, but one has a more specific name than the other, keep the one with the more specific name.

#### Flights and Weather Data

##### Column Name Letter Case

PostgreSQL uses only lowercase column names, so the columns in the dataframe had to be made lowercase.

##### Redundant Data

The data contained both a `date` column as well as individual `year`, `month`, `day`, and `weekday` columns, all of which can be extracted from `date`, if they are in full agreement.

Analysis of the columns' data was in full agreement, and so `year`, `month`, `day`, and `weekday` were dropped.

##### Irrelevant Cancellations

Flights can be cancelled for many reasons. For this project, however, only weather-based cancellations were important. So flights with non-weather-based cancellations were dropped.

##### Incorrect Data Types

Once only two types of cancellations remained—"cancelled due to weather" or "not cancelled"—we converted the `cancelled_code` column into a `boolean` `cancelled` column.

##### Foreign Key Constraints

We intended to use the IATA codes in the flights-and-weather data to join to the airports data. However, we discovered that the airports data is not comprehensive, and so we had to remove the `FOREIGN KEY CONSTRAINT` from the PostgreSQL database to allow the flights-and-weather data to upload.

This does mean that some data extracted from the database using an (outer) join on these columns will have `NULL` values, but we decided it was to have the data and ignore it than it was to discard it and discover we needed it, later.

### Data Upload

Defining the PostgreSQL tables was generally straightforward. We did, however, have to do some tricks using the SQLAlchemy and Psycopg2 packages to get the data into our database, the most significant of which was to replace the upload method with a custom function that changed the upload attempts from running for twenty minutes *and then* reporting an error to instead uploading the whole five-million-plus-row dataset in just a few minutes.

## Retrieve Data

Because different applications might require the data in different forms, we wanted to be able to retrieve the data either as a CSV file or as a Pandas dataframe.

### Set-up

In order to retrieve the data from the database, we needed to be able to tell it what data we want, which required slightly different methods depending on format:
- **CSV:** a simple SQL query that could be run to extract the appropriate data.
- **Pandas Dataframe:** an SQLAlchemy object that parallels the aforementioned SQL query

The standard methods for extracting the data were also incredibly slow, and so, as with uploading, we needed to define custom functions to do the job. The functions were slightly different, again depending on format:
- **CSV:** pass the query to the PostgreSQL `COPY` function to sends its output stream directly to a CSV file.
- **Pandas Dataframe:** like the CSV method, uses the `COPY` function, but instead of sending the i/o-stream to a CSV file, it instead stores it in a `StringIO` object in memory, which, in turn, is read into the Pandas dataframe as if it were a CSV file.

In both cases, these changes reduced the data-retrieval time for all five-million-plus rows from an interminably long time to just a few minutes.

### Post-processing

The extraction of data into a Pandas dataframe also required a small amount of post-processing due to the differences in how PostgreSQL and Pandas store boolean data.
