import os
from pymongo import MongoClient

# Use MONGO_URI env var if set, otherwise default to local MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

# 1. Establish connection to the client
client = MongoClient(MONGO_URI)
db = client["kundabo_ecommerce"]
products = db["products"]

# 2. Insert test product "Peace Lilies" using the image provided
test_item = {"name": "Peace Lilies", "image": "image_99703a.jpg", "price": 45.0}
inserted_id = products.insert_one(test_item).inserted_id

# 3. Retrieve and print the product from the database
retrieved_item = products.find_one({"_id": inserted_id})
print("Successfully connected and inserted item:")
print(retrieved_item)

# 4. Clean up connection
client.close()
