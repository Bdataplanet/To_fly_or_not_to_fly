# Segment 2: Machine Learning Model

## Description of preliminary data preprocessing:

There are three Jupyter Notebook files to preprocess the data:

1. [01_get_data.ipynb](./download_and_prepare_datasets/01_get_data.ipynb): used to download the datasets

2. [02_prepare_and_store_data.ipynb](./download_and_prepare_datasets/02_prepare_and_store_data.ipynb)]: used to preprocess the data for eventual upload to a PostgreSQL database.
The data will be uploaded in two tables: `flights_and_weather` and `airports`, which will be joined on their International Air Transport Association (IATA) codes. 

3. [retrieve_data.ipynb](./retrieve_data.ipynb): Used to extract the data from PostgreSQL database into a Pandas dataframe that contains all the flight-and-weather data merged with airport coordinates.

After merging the `flight_and_weather` data with the `airports` data, the resulting dataframe had 5,468,069 rows × 21 columns. 

### What do the codes mean?
According to the United States Department of Transportation Bureau of Transportation Statistics Airlines and Airports data:

The [Airline Codes](https://www.bts.gov/topics/airlines-and-airports/airline-codes) document specifies the airline codes:

**AIRLINE CODES:**
- `AA`-American Airlines Inc.
- `AS`-Alaska Airlines Inc.
- `B6`-JetBlue Airways
- `DL`-Delta Air Lines Inc.
- `F9`-Frontier Airlines Inc.
- `G4`-Allegiant Air
- `HA`-Hawaiian Airlines Inc.
- `NK`-Spirit Air Lines
- `UA`-United Air Lines Inc.
- `WN`-Southwest Airlines Co.

Document [Number 14 - On-Time Reporting](https://www.bts.gov/topics/airlines-and-airports/number-14-time-reporting) specifies cancellation codes:

**CANCELLATION CODES**
- `A`-Carrier Caused
- `B`-Weather
- `C`-National Aviation System
- `D`-Security

\[`N` is not on the list and represents "None" or "Not cancelled".\]

We are only interested in flights that were cancelled due to weather, so we will keep only rows with `cancelled_code` `B` or `N`.

### Feature Considerations for Machine-Learning Model:

1. Handle missing values: Rows with missing values (in any columns that remain as features) will be dropped from the dataset. 

2. Label Encoding using cat.codes: We are label encoding `origin_airport`, `destination_airport`, and `cancelled` by first converting them to category type and then using cat.codes.

3. Normalize column values: scikit-learn`s StandardScaler scales numeric values in a column to have mean of 0 and a standard deviation of 1. This is done to get all features to the same relative scale, as the features vary in magnitude, and the distance metrics that the algorithms use internally may be sensitive to a variations in magnitude.

4. Feature creation for classification: a new feature with binary values 0 and 1 was created for the classification model. This feature was created on the basis of flight cancelled: 0 indicates the flight was not cancelled; 1 indicates the flight was cancelled. 
 
## Description of preliminary feature engineering and preliminary feature selection (including the decision-making process)
 
Features not relevant to the cancellation of flights other than weather were dropped.

The following columns were kept for prediction purposes:
- `origin_airport`,
- `destination_airport`,
- `departure_delay`,
- `arrival_delay`,
- `cancelled`,
- `station_x`,
- `hourlydrybulbtemperature_x`,
- `hourlyprecipitation_x`,
- `hourlystationpressure_x`,
- `hourlyvisibility_x`,
- `hourlywindspeed_x`,
- `station_y`,
- `hourlydrybulbtemperature_y`,
- `hourlyprecipitation_y`,
- `hourlystationpressure_y`,
- `hourlyvisibility_y`,
- `hourlywindspeed_y`,
- `origin_lat`,
- `origin_lon`,
- `destination_lat`,
- `destination_lon`

## Training and Testing

The model used in this project is Classifier, which is used to predict discrete outcomes. In this case, whether a flight is cancelled or not.  The model uses the training dataset to learn from it. It then uses the testing dataset to assess its performance. We allocated 90% of the dataset to the training set, and 10% to the testing set.

## Explanation of model choice, including limitations and benefits
The `Seg2_Processing_Data` folder contains [a Jupyter Notebook](./Seg2_Processing_Data/Processing_data_project/Test_1_Project_Logistic_Regression_Undersampling.ipynb) that contains the code to train a regression engine that predicts the cancellation of flights due to weather conditions.

As seen below, the number of actual flights cancelled compared to flights not cancelled is imbalanced.

Undersampling was done where data from non-cancelled flights is trimmed to reduce its influence on the machine-learning algorithm.

### Benefits of Logistic Regression:

1. Ease of use: Training the model and using it for predictions is very simple, and it does not require a lot of engineering overhead for maintenance.

2. Interpretability: Unlike deep learning models (*e.g.*, neural networks), logistic regression is straightforward to interpret. Although it is not as interpretable as linear regression, logistic regression can help us assess which input variables are responsible for the greatest changes in predicted value.

3. Scalability: The algorithm is extremely efficient. Fast training times combined with low computational requirements make logistic regression easy to scale, even when the data volume and speed increase.

4. Real-time predictions: Because of the ease of computation, logistic regression can be used in online settings, meaning that the model can be retrained with each new example and generate predictions in near real-time. This contrasts with computationally heavy approaches, such as neural networks or support vector machines, which require a lot of computing resources or long waiting times while new data is retrained, which ultimately makes them unsuitable (or at least very expensive) for real-time applications.

The benefits of logistic regression from an engineering perspective make it more favorable than other, more advanced machine learning algorithms. [^1]

[^1]: https://www.keboola.com/blog/logistic-regression-machine-learning

## Limitations
1. Identifying Independent Variables: Logistic regression attempts to predict outcomes based on a set of independent variables, but if we include the wrong independent variables, the model could have little to no predictive value.
