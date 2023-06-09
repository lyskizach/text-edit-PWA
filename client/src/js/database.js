import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 2, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true  });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDB = await openDB('jate', 2);
    const tx = jateDB.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, jate: content});
    const result = await request;
    console.log('added to db', result);
  } catch (err) {
    console.log(err);
  };
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const jateDB = await openDB('jate', 2);
    const tx = jateDB.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(2);
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (err) {
    console.log(err);
  };
};

const eraseDB = async () => {
  try {
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Delete data with id 1
    await store.delete(1);

    // Delete data with id 2
    await store.delete(2);

    console.log('Data erased successfully');

      // Clear localStorage
      localStorage.clear();
      console.log('localStorage cleared');
  } catch (err) {
    console.log(err);
  }
};

initdb();