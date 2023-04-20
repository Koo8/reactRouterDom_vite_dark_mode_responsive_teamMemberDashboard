// useMemo for caching data
import { matchSorter } from 'match-sorter';

// localStorage: support string, so JSON.parse and JSON.stringify is needed for convering JSON to string. Not asynchronous. 10MB is limit. Good for simple data read-write operation
// indexedDB: for complex data storage, has transactional capability, recommended for PWA storage, not promise based. See README for IndexedDB, use dexie.js for wrapper

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await JSON.parse(localStorage.getItem('contacts'));
  if (!contacts) {
    contacts = [];
    return contacts;
  }
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['fn', 'ln'] });
  }
  return contacts;
}

export async function createNewContact() {
  await fakeNetwork();
  const id = crypto.randomUUID().slice(-7);
  const newContact = { id, createAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  return newContact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  const contacts = await getContacts();
  const theContact = contacts.find((item) => item.id === id);
  return theContact ?? null; // I don't think ?? makes sense in this case.
}

export async function updateContact(update, id) {
  await fakeNetwork();
  const contacts = await getContacts();
  const updatedContacts = contacts.map((item) =>
    item.id === id ? { ...item, ...update } : item
  );
  localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  return contacts;
}

export function capFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export async function deleteContact(id) {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === id);
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  // return true;
}

let fakeCache = {};

async function fakeNetwork(key) {
  // if (!key) {
  //   fakeCache = {};
  //   // console.log(`fakecache is ${fakeCache}`);
  // }

  // if (fakeCache[key]) {
  //   return;
  // }

  // fakeCache[key] = true;
  // // console.log(fakeCache);
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
