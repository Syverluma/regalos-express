// Configuración de Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVWMCWYvLqIKcJRyDkbyB6MHkrMgL55FY",
  authDomain: "syverluma-regalos.firebaseapp.com",
  projectId: "syverluma-regalos",
  storageBucket: "syverluma-regalos.firebasestorage.app",
  messagingSenderId: "195527936578",
  appId: "1:195527936578:web:e9f75305005fa9d59ffbdb",
  measurementId: "G-8CJDLPJPHB"
};

// Exponer config global
window.firebaseConfig = firebaseConfig;

// Inicializar Firebase solo si el SDK está cargado y no está inicializado
if (typeof firebase !== 'undefined') {
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  // Referencias v8
  try {
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    window.storage = firebase.storage();
    var db = window.db;
    var auth = window.auth;
    var storage = window.storage;
  } catch (e) {
    // Ignorar si algún servicio no está disponible en la página
  }
  try {
    if (firebase.analytics) {
      window.analytics = firebase.analytics();
    }
  } catch {}
}
