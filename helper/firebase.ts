import { IPortfolio } from './../redux/slice/portfolio'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'
import { addDoc, collection, doc, getFirestore, query, setDoc, getDocs, deleteDoc } from 'firebase/firestore'

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
  await setDoc(userDoc, {
    uid: user.uid,
    email: user.email,
  })
}

const addPortfolio = async ({ symbol, price, position }: { symbol: string; price: number; position: number }) => {
  const db = getFirestore()
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  const c = collection(db, `users/${uid}`, 'portfolio')
  await addDoc(c, { symbol, price, position })
}

const getPortifolio = async (): Promise<IPortfolio[]> => {
  const db = getFirestore()
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  const q = query(collection(db, `users/${uid}`, 'portfolio'))
  const snapshot = await getDocs(q)
  const portifolio = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() }
  })
  return portifolio as IPortfolio[]
}

const deletePortifolio = async (id: string) => {
  const db = getFirestore()
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  const d = doc(db, `users/${uid}`, 'portfolio', id)
  await deleteDoc(d)
}

export const firebaseHelper = {
  initFirebase,
  addPortfolio,
  getPortifolio,
  deletePortifolio,
  setUser,
}
