import couchbase from 'couchbase';
import dotenv from 'dotenv';

dotenv.config();

const clusterConnStr = process.env.COUCHBASE_URI || 'couchbase://localhost';
const username = process.env.COUCHBASE_USERNAME || 'Administrator';
const password = process.env.COUCHBASE_PASSWORD || 'password';
const bucketName = process.env.COUCHBASE_BUCKET || 'trektribe';

let cluster;
let bucket;

export const connectDB = async () => {
  try {
    cluster = await couchbase.connect(clusterConnStr, {
      username,
      password,
    });
    console.log('Connected to Couchbase Cluster');
    bucket = cluster.bucket(bucketName);
    return { cluster, bucket };
  } catch (error) {
    console.error('Couchbase connection error:', error);
    process.exit(1);
  }
};

export const getCluster = () => cluster;
export const getBucket = () => bucket;
export const getCollection = (collectionName) => {
  return bucket.scope('_default').collection(collectionName);
};
