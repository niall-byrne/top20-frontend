# TOP 20 Frontend Code

User Listening Data Visualizations (powered by last.fm)

## Develop Branch (Stage)
- ![Top20 Automation](https://github.com/playcounts/top20-frontend/workflows/Top20%20Automation/badge.svg?branch=develop)

## Master Branch (Production)
- ![Top20 Automation](https://github.com/playcounts/top20-frontend/workflows/Top20%20Automation/badge.svg?branch=master)

## Environment Variabes

1. SKIP_PREFLIGHT_CHECK=true

- Set this value to get around an issue where react-scripts detects false positives on package conflicts from the outer backend git repository.

2. REACT_APP_BACKEND

- Set this value to specify the root url of a backend server (defaults to http://localhost:5000)

3. REACT_APP_UA_CODE

- Set this to a google analytics UA id.
