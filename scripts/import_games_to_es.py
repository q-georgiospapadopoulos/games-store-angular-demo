import pandas as pd
from elasticsearch import Elasticsearch, helpers
from elasticsearch.helpers import BulkIndexError
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get dataset path from environment variable
csv_path = os.path.expanduser(os.getenv("DATASET_PATH", "~/Desktop/vgsales.csv"))

df = pd.read_csv(csv_path)


# Rename columns to match ES mapping
df.columns = [col.strip().lower().replace('-', '_') for col in df.columns]

# Drop rows with missing values in critical fields
df = df.dropna(subset=[
    "rank", "name", "platform", "year", "genre", "publisher",
    "na_sales", "eu_sales", "jp_sales", "other_sales", "global_sales"
])


# Clean missing years (some rows have NaN in Year)
df = df[df['year'].notna()]
df['year'] = df['year'].astype(int)

# Get Elasticsearch configuration from environment variables
es_host = os.getenv("ES_HOST", "localhost")
es_port = int(os.getenv("ES_PORT", "9201"))
es_scheme = os.getenv("ES_SCHEME", "http")
es_username = os.getenv("ES_USERNAME")
es_password = os.getenv("ES_PASSWORD")
es_verify_certs = os.getenv("ES_VERIFY_CERTS", "false").lower() == "true"

# Build Elasticsearch connection URL
es_url = f"{es_scheme}://{es_host}:{es_port}"

# Configure Elasticsearch connection
es_config = {
    "hosts": [es_url],
    "verify_certs": es_verify_certs,
}

# Add basic authentication if credentials are provided
if es_username and es_password:
    es_config["http_auth"] = (es_username, es_password)
    print(f"Connecting to Elasticsearch at {es_url} with authentication...")
else:
    print(f"Connecting to Elasticsearch at {es_url} without authentication...")

# Connect to Elasticsearch
es = Elasticsearch(**es_config)

# Generator to yield documents in bulk format
def generate_docs(df):
    for i, row in df.iterrows():
        yield {
            "_index": "games",
            "_id": i,
            "_source": {
                "rank": int(row["rank"]),
                "name": row["name"],
                "platform": row["platform"],
                "year": int(row["year"]),
                "genre": row["genre"],
                "publisher": row["publisher"],
                "na_sales": float(row["na_sales"]),
                "eu_sales": float(row["eu_sales"]),
                "jp_sales": float(row["jp_sales"]),
                "other_sales": float(row["other_sales"]),
                "global_sales": float(row["global_sales"]),
            }
        }

# Upload in bulk
print("Indexing documents into Elasticsearch...")

try:
    helpers.bulk(es, generate_docs(df))
    print("Done!")
except BulkIndexError as e:
    print("Bulk indexing failed.")
    for err in e.errors:
        print(err)
