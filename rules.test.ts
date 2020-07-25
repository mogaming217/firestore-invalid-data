// This is production codes.

import { firestore } from 'firebase-admin'

const updateWithAdmin = (db: firestore.Firestore) => {
  return db.collection('users').doc().set({
    hello: 1,
    createdAt: firestore.FieldValue.serverTimestamp()
  })
}

// Test code

import * as firebase from '@firebase/testing'
import * as fs from 'fs'
const projectID = 'sample'
const databaseName = 'database'
const rules = fs.readFileSync('./firestore.rules', 'utf8')

// firestore client for admin
const adminDB = firebase.initializeAdminApp({ projectId: projectID, databaseName }).firestore()

// setup and clean up

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId: projectID, rules });
})

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: projectID });
})

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
})

describe('/users', () => {
  it('ok ', async () => {
    await firebase.assertSucceeds(
      updateWithAdmin(adminDB as any)
    )
  })
})
