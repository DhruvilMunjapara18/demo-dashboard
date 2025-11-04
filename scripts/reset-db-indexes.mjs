"use strict";
import { MongoClient } from 'mongodb';

async function fixDatabaseIndexes() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('users');

    // Drop all existing indexes
    console.log('Dropping existing indexes...');
    await collection.dropIndexes();

    // Create new indexes
    console.log('Creating new indexes...');
    await collection.createIndexes([
      {
        key: { email: 1 },
        unique: true,
        name: 'email_unique'
      },
      {
        key: { company: 1 },
        name: 'company_index'
      }
    ]);

    console.log('Indexes have been successfully reset');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

fixDatabaseIndexes().catch(console.error);