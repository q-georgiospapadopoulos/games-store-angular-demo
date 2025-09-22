# Scripts

This directory contains utility scripts for the games store project.

## import_games_to_es.py

This script imports game data from a CSV file into Elasticsearch with support for basic authentication.

### Prerequisites

1. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables by copying the template:

   ```bash
   cp .env.template .env
   ```

3. Edit the `.env` file with your actual Elasticsearch configuration:
   ```bash
   # Example .env configuration
   ES_HOST=localhost
   ES_PORT=9201
   ES_SCHEME=http
   ES_USERNAME=elastic
   ES_PASSWORD=your_password_here
   ES_USE_SSL=false
   ES_VERIFY_CERTS=false
   DATASET_PATH=~/Desktop/vgsales.csv
   ```

### Usage

Run the script from the project root directory:

```bash
python scripts/import_games_to_es.py
```

### Environment Variables

| Variable          | Description                    | Default                 | Required              |
| ----------------- | ------------------------------ | ----------------------- | --------------------- |
| `ES_HOST`         | Elasticsearch host             | `localhost`             | No                    |
| `ES_PORT`         | Elasticsearch port             | `9201`                  | No                    |
| `ES_SCHEME`       | Connection scheme (http/https) | `http`                  | No                    |
| `ES_USERNAME`     | Basic auth username            | None                    | Yes (if auth enabled) |
| `ES_PASSWORD`     | Basic auth password            | None                    | Yes (if auth enabled) |
| `ES_USE_SSL`      | Enable SSL/TLS                 | `false`                 | No                    |
| `ES_VERIFY_CERTS` | Verify SSL certificates        | `false`                 | No                    |
| `DATASET_PATH`    | Path to CSV dataset            | `~/Desktop/vgsales.csv` | No                    |

### Security Notes

- The `.env` file is gitignored to prevent credentials from being committed
- Use the `.env.template` file as a reference for required variables
- Never commit actual credentials to version control
