const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  user: 'abhinavuser',
  host: 'localhost',
  database: 'finance_db',
  password: '2101',
  port: 5432,
});

client.connect();

async function watchTransactions() {
  try {
    await client.query('LISTEN new_transactions');

    client.on('notification', async (msg) => {
      if (msg.channel === 'new_transaction') {
        const payload = JSON.parse(msg.payload);
        const id = payload.id;

        const randomValue = crypto.randomBytes(32).toString('hex');

        await client.query('UPDATE transactions SET transaction_id = $1 WHERE id = $2', [randomValue, id]);
      }
    });
  } catch (err) {
    console.error('Error watching transactions:', err);
  }
}

client.query(`
  CREATE OR REPLACE FUNCTION notify_new_transaction() RETURNS TRIGGER AS $$
  BEGIN
    PERFORM pg_notify('new_transaction', json_build_object('id', NEW.id)::text);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  
  CREATE TRIGGER new_transaction_trigger
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_transaction();
`).then(() => {
  watchTransactions();
}).catch(err => {
  console.error('Error setting up trigger:', err);
});