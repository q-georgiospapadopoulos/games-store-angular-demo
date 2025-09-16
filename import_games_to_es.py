import pandas as pd
from elasticsearch import Elasticsearch, helpers
from elasticsearch.helpers import BulkIndexError
import os

# Load dataset
csv_path = os.path.expanduser("~/Desktop/vgsales.csv")

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

# Connect to Elasticsearch (port 9201 as per your setup)
es = Elasticsearch("http://localhost:9201")

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
