import { initializeApp, getApps } from 'firebase/app'
import { User } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDtBHz9Ctjl93WA8ggYUQANsP30gKwYyTY',
  authDomain: 'synpluse-test.firebaseapp.com',
  projectId: 'synpluse-test',
  storageBucket: 'synpluse-test.appspot.com',
  messagingSenderId: '207419220704',
  appId: '1:207419220704:web:ce2c996e907b2050e92685',
  measurementId: 'G-67KSMX8C7S',
}

const initFirebase = () => {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig)
  }
}

const setUser = async (user: User) => {
  const db = getFirestore()
  const userDoc = doc(db, 'users', user.uid)
  setDoc(userDoc, {
    uid: user.uid,
    email: user.email,
  })
    .then((result) => console.log({ result }))
    .catch((error) => console.log({ error }))
}

export const firebaseHelper = {
  initFirebase,
  setUser,
}
