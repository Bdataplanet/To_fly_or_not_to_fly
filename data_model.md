# Our Data Model

## Introduction

Flight delay is inevitable, and it plays an important role in both profits and losses of airlines. An accurate estimation of flight delay is critical for airlines because the results can be applied to increase customer satisfaction and incomes of airline agencies. Assuming $47 per hour* as the average value of a passenger's time, flight delays are estimated to have cost air travelers billions of dollars. FAA/Nextor estimated the annual costs of delays (direct cost to airlines and passengers, lost demand, and indirect costs) in 2018 to be $28 billion[^annual_cost_of_delays].

[^annual_cost_of_delays]: https://journalofbigdata.springeropen.com/articles/10.1186/s40537-020-00380-z

Delays can stem from various factors such as air-carrier delays (6.57%), late-arriving aircraft (5.34%), National Aviation System delays (4.12%), cancellations (1.72%), and "Extreme" Weather (.74%)[^delay_factors].

[^delay_factors]: https://www.travelmarketreport.com/articles/What-Are-the-Most-Common-Reasons-For-Flight-Delays-in-the-US

## Problem statement

Our project is about flight delays caused by inclement weather over the course of eight months: from May to December of 2019. Although the data gathered is limited to just a few months, we hope that it will give us a great direction on how weather plays a part in flight delays. In this project, the goal is to use exploratory analysis and to build machine-learning models to predict airline flight cancellations.

## Data Sources

1. Historical Flight Delay and Weather Data USA: originally sourced from the Bureau of Transportation Statistics (found [here](https://www.bts.gov/browse-statistical-products-and-data/bts-publications/airline-service-quality-performance-234-time), with weather data downloaded from local climatological data provided by the [National Oceanic and Atmospheric Administration](https://www.ncdc.noaa.gov/cdo-web/datatools/lcd). For each airport in the flight dataset, the geographically nearest weather station was considered[^dataset_details].

[^dataset_details]: https://www.kaggle.com/datasets/ioanagheorghiu/historical-flight-and-weather-data/metadata

2. [The Global Airport Database](https://www.partow.net/miscellaneous/airportdatabase/index.html): community-sourced list of airports in the United States of America with their latitudes and longitudes.

### Explanatory Notes

**Delay time:** a flight is "on-time" if the departure delay is within fifteen minutes of its scheduled departure time (CRSDepTime). A flight is "delayed" if the departure delay is more than fifteen minutes after its scheduled departure time (CRSDepTime).

## Data Model and Analysis

### Which model did you choose and why?  

We will implement a machine-learning model in Python using Scikit-learn, a Python machine-learning library. We will use supervised machine learning to perform tasks such as learning from data patterns and making predictions. Supervised Learning will help to predict—based on airport location and the weather conditions—whether a flight will be delayed or not. 

### How are you training your model?

There are two main uses of supervised learning: regression and classification. In the first part of the project, we look at using Python-based logistic regression  with possible support-vector analysis.

Logistic regression was chosen to model flight delay for multiple reasons: first, the weights of each feature trained by logistic regression are easily interpretable, as the sign of the weight indicates if a flight is more or less likely to be delayed if it has a high value for that feature; second, logistic regression outputs a measure of confidence in its output through the probability of belonging to each class.

### What is the model's accuracy?

It's not enough to use a machine-learning model to create predictions. The model will answer an important question: how well does it perform? Accuracy score is one way of assessing a classification model's performance. That is, what percentage of predictions does it get right.

### How does this model work?

The purpose of this project is to look at the approaches used to build models for predicting flight delays that occur due to bad weather conditions.

- Logistic regression: will evaluate the probability of an occurrence.
- Support vector machine (SVM): a binary classifier to categorize samples into one of two categories (for example, yes or no).
