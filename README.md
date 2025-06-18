# Masonty Grid Project

This project is a grid photo gallery with a detailed view for photos
The project was set up with React + Typescript + Vite
More information about setup you can find [here](https://vite.dev/guide/)

# Fetching Photo Data

To retrieve photo data from the Pexels API, ensure you have a valid API token configured.
Follow these steps:

1. ## Obtain an API Token

   Visit [Pexels API](https://www.pexels.com/api/) to generate your personal API key.

2. ## Configure the Token
   Add the API token to your project's configuration file (config.ts), under the appropriate key:

```js
PEXELS_API_KEY = your_api_key_here
```

⚠️ Note: Do not commit your API keys to version control. Use environment variables or a secrets manager to keep them secure.
