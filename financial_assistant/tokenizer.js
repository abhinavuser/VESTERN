const { Client } = require('pg');
const crypto = require('crypto');

// Create a PostgreSQL client
const client = new Client({
  host: 'localhost',
  user: 'abhinavuser', // Replace with your PostgreSQL username
  password: '2101', // Replace with your PostgreSQL password
  database: 'finance_db'
});

// Function to generate a 256-bit token
function generate256BitToken() {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes * 8 = 256 bits
}

// Function to update the transaction_number of the last entry in the transactions table
async function updateLastTransactionNumber() {
  try {
    await client.connect();

    // Query to get the last entry in the transactions table
    const selectQuery = 'SELECT transaction_id FROM transactions ORDER BY transaction_id DESC LIMIT 1';
    const selectResult = await client.query(selectQuery);

    if (selectResult.rows.length === 0) {
      console.log('No entries found in the transactions table.');
      return;
    }

    const lastEntryId = selectResult.rows[0].transaction_id;
    const newTransactionNumber = generate256BitToken();

    // Wait for 10 seconds before updating
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Query to update the transaction_number field of the last entry
    const updateQuery = 'UPDATE transactions SET transaction_number = $1 WHERE transaction_id = $2';
    await client.query(updateQuery, [newTransactionNumber, lastEntryId]);

    console.log(Successfully updated transaction_number of entry with transaction_id ${lastEntryId} to ${newTransactionNumber});
  } catch (error) {
    console.error('Error updating the transaction_number:', error);
  } finally {
    await client.end();
  }
}

// Update the last transaction number once
updateLastTransactionNumber();