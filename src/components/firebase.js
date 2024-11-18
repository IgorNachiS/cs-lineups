// Importando as funções necessárias do Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Importando Firestore
import { getAnalytics } from "firebase/analytics"; // Para Firebase Analytics (opcional)

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCi9pG1Gb5dx9o3IECK77QRA522st7Cfp4",
  authDomain: "cs-lineups-72d89.firebaseapp.com",
  projectId: "cs-lineups-72d89",
  storageBucket: "cs-lineups-72d89.firebasestorage.app",
  messagingSenderId: "1065554620966",
  appId: "1:1065554620966:web:6c222c37f532c8af226ce7",
  measurementId: "G-MQ005JYHT6"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firestore e Analytics (se necessário)
const db = getFirestore(app);  // Firestore para banco de dados
const analytics = getAnalytics(app);  // Analytics se necessário

// Exportando o Firestore para ser usado no seu código
export { db, analytics };

