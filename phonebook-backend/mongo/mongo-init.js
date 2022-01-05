db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('people')

db.people.insert({
  name: 'alex',
  number: '123456789'
})

db.people.insert({
  name: 'jane',
  number: '987654321'
})
