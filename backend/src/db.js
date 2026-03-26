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
    
    // Create primary index to allow sorting and find() without specific keys
    try {
      await cluster.query(`CREATE PRIMARY INDEX ON \`${bucketName}\`.\`_default\`.\`waitlist_users\` IF NOT EXISTS`);
      console.log('Primary index ensured on waitlist_users');
    } catch (err) {
      console.warn('Could not create primary index:', err.message);
    }

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
