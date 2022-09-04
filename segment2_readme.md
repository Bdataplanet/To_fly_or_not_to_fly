### Segment 2: Machine Learning Model

### 1. Description of preliminary data preprocessing:

There are three Jupyter Notebook files to preprocess the data:

i. 01_get_data.ipynb:  Used to download the datasets

ii. 02_process_data.ipynb: Used to preprocess the data for eventual upload to a PostgreSQL database.
The data will be uploaded in two tables: flights_and_weather and airports, which will be joined on their International Air Transport Association (IATA) codes. 

iii. Retrieve data from database: Used to export to CSV from Postgres all the flight-and-weather data with airport coordinates.
After merging the flight_weather data with the airport data, we had 5468069 rows × 21 columns to analyze the data. 

#### What do the codes mean?
According to the United States Department of Transportation Bureau of Transportation Statistics Airlines and Airports data, Airline Codes document:

#### Airline Codes:
•	AA-American Airlines Inc.
•	AS-Alaska Airlines Inc.
•	B6-JetBlue Airways
•	DL-Delta Air Lines Inc.
•	F9-Frontier Airlines Inc.
•	G4-Allegiant Air
•	HA-Hawaiian Airlines Inc.
•	NK-Spirit Air Lines
•	UA-United Air Lines Inc.
•	WN-Southwest Airlines Co.

#### Cancellation Codes:
•	A-Carrier Caused
•	B-Weather
•	C-National Aviation System
•	D-Security
N is not on the list and represents "None" or "Not cancelled". We are only interested in flights that were cancelled due to weather, so we kept only rows with cancelled_code B or N. Origin_airport and destination_airport will serve as foreign keys to join to the airport data from the secondary dataset.

#### Weather and Flight features considered:

 i. Handling missing values: Rows with missing values such as tail_number, actual_departure_date, actual_arrival_date is dropped from the dataset. 

ii. Label Encoding using cat.codes: We are label encoding the origin_airport, destination_airport, and cancelled by first converting them to category type and then using cat.codes.         

iii. Normalize the values and scale –Using pythons inbuilt library called standard scalar the dataset was scaled to have mean of zero and a standard deviation of 1. This is done to get all features to the same scale relatively as the features vary in magnitudes and the distance metrics that the algorithms use internally are sensitive to a large variation in magnitudes.

iv. Feature creation for classification - A new feature with binary value 0 and 1 was created to run the classification model. This feature was created on the basis of flight cancelled. 0 indicates flight not cancelled. 1 indicates flight cancelled. 
 
 ### 2. Description of preliminary feature engineering and preliminary feature selection, including the decision-making process
 
Features not relevant to the cancellation of flights other than weather were dropped. The following were kept for prediction purposes: 
origin_airport',
 'destination_airport',
 'departure_delay',
 'arrival_delay',
 'cancelled',
 'station_x',
 'hourlydrybulbtemperature_x',
 'hourlyprecipitation_x',
 'hourlystationpressure_x',
 'hourlyvisibility_x',
 'hourlywindspeed_x',
 'station_y',
 'hourlydrybulbtemperature_y',
 'hourlyprecipitation_y',
 'hourlystationpressure_y',
 'hourlyvisibility_y',
 'hourlywindspeed_y',
 'origin_lat',
 'origin_lon',
 'destination_lat',
 'destination_lon'

### 3. Description of how data was split into training and testing sets
The model which used in this project is Classifier which is used to predict discrete outcomes. In this case, whether flight is cancelled or not.  The model uses the training dataset to learn from it. It then uses the testing dataset to assess its performance. We allocated 90% of the dataset to the training set, and 10% to the testing set.

### 4. Explanation of model choice, including limitations and benefits
The Processing_data_project/Test_1_Project_Logistic_Regression_Undersampling.ipynb contains the code to train a regression engine which predicts the cancellation of flights due to weather conditions.

As seen below, the number of actual flights cancelled compared to flights not cancelled is imbalanced. 
Under sampling was done where the data from truly cancelled flights were removed to reduce its influence on the machine learning algorithm.

### Benefits of using Logistic Regression:
i. Ease of use. Training the model and using it for predictions is very simple, and it does not require a lot of engineering overhead for maintenance.

ii. Interpretability. Unlike deep learning models (neural networks), logistic regression is straightforward to interpret. Although it is not as interpretable as linear regression, logistic regression can help us to assess which input variable is responsible for the greatest change in predicted value.

iii. Scalability. The algorithm is extremely efficient. Fast training times combined with low computational requirements make logistic regression easy to scale, even when the data volume and speed increase.

iv. Real-time predictions. Because of the ease of computation, logistic regression can be used in online settings, meaning that the model can be retrained with each new example and generate predictions in near real-time. This contrasts with computationally heavy approaches, such as neural networks or support vector machines, which require a lot of computing resources or long waiting times while new data is retrained. Ultimately, this makes them unsuitable for real-time applications (or at least very expensive).
The benefits of logistic regression from an engineering perspective make it more favorable than other, more advanced machine learning algorithms. (1)

### Limitations:
i. Identifying Independent Variables: 
Logistic regression attempts to predict outcomes based on a set of independent variables, but if we include the wrong independent variables, the model will have little to no predictive value. 

### References:
1. https://www.keboola.com/blog/logistic-regression-machine-learning
