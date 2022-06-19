import { initializeApp, getApps } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore'

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

const addPortfolio = async ({ symbol, price, position }: { symbol: string; price: number; position: number }) => {
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  const db = getFirestore()
  const c = collection(db, `users/${uid}`, 'portfolio')
  await addDoc(c, { symbol, price, position })
}

export const firebaseHelper = {
  initFirebase,
  addPortfolio,
  setUser,
}
