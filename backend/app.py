from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)

@app.route('/items', methods=['GET'])
def get_items():
    items = mongo.db.items.find()
    output = []
    for item in items:
        output.append({
            'id': str(item['_id']),
            'name': item['name'],
            'description': item['description']
        })
    return jsonify(output)

@app.route('/item', methods=['POST'])
def add_item():
    name = request.json['name']
    description = request.json['description']
    item_id = mongo.db.items.insert_one({'name': name, 'description': description}).inserted_id
    return jsonify({'id': str(item_id)})

@app.route('/item/<id>', methods=['PUT'])
def update_item(id):
    name = request.json['name']
    description = request.json['description']
    mongo.db.items.update_one({'_id': ObjectId(id)}, {'$set': {'name': name, 'description': description}})
    return jsonify({'message': 'Item updated successfully'})

@app.route('/item/<id>', methods=['DELETE'])
def delete_item(id):
    mongo.db.items.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Item deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

