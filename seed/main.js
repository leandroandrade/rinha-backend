const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

const SEED = 1000;
const TECH = ['Javascript', 'Python', 'Go', 'Java',
  'Kotlin', 'PHP', 'C#', 'Swift', 'R',
  'Ruby', 'C', 'C++', 'Matlab', 'TypeScript',
  'Scala', 'SQL', 'HTML', 'CSS', 'NoSQL',
  'Rust', 'Perl', 'C#', 'Clojure', 'MySQL',
  'Postgres'];

function getRandomTechList(numItems) {
  const techCopy = TECH.slice();

  for (let i = techCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [techCopy[i], techCopy[j]] = [techCopy[j], techCopy[i]];
  }
  return techCopy.slice(0, numItems);
}

async function main() {
  const client = new MongoClient(process.env.MONGODB_URL);
  await client.connect();

  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('pessoas');

  const pessoas = [];

  for (let i = 0; i < SEED; i++) {
    pessoas.push({
      id: crypto.randomUUID(),
      apelido: faker.person.lastName().toLowerCase(),
      nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
      nascimento: '2023-08-16',
      stack: getRandomTechList(5),
    });
  }

  await collection.insertMany(pessoas);
  await client.close();

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
