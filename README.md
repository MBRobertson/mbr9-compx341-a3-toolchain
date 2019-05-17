# DemoDRA

# Task 1: NZ Cities
Adjusted API
Adjusted Angular App
    Occurs on focus
Repurposed test cases from zip
    Added additional case for city from another country

Reorganized tests for better ide expreriences
Removed dependancy on grunt, using npm tasks

Moved into a webpack build system rather than bower dependancies
Moved to react away from angular v1 (not deprecated).

Moved testing from mocha to jest

Added test for returning an index page

Tests for react rendering
    Four elements correctly rendered
TODO: Look into supertest

# Task 2
API responds with coordinates of the place being searched
Tests adjusted to also test for coordinates

Added map
    Ensure always viewing New Zealand

Added ability for API to fetch data by latitude and longitude
    Need to test for these paramters (only one of each)
    Need to test that both city and location are not provided

In order to better facilitate clicking bahaviour, now maintains a dynamic list of locations
Click on map to add or search to add

Map and search and search bar enforced with test

# Task 3
Connecting cloudant datastore

Testing api that gets and sets are called appropriate amounts
Also need to check that databse isn't updated when passed bad data

FVT to check that data is fetched without error
(Opted out of fvt for setting data, as we do not currently have testing/staging database, this means tests override current data)