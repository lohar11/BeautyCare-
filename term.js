// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    databaseURL: "https://login-example-2831e-default-rtdb.firebaseio.com",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.firebasestorage.app",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:917df1f8217aa3ece3831e"
};

// Firebase Initialize
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const pdfRef = ref(db, "terms_conditions");

get(pdfRef).then((snapshot) => {
    if (snapshot.exists()) {
        let data = snapshot.val();
        console.log(" Data fetched from Firebase:", data);  

        
        if (data.TermsPdf && data.ConditionPdf) {
            document.getElementById("termsLink").href = data.TermsPdf;
            document.getElementById("conditionsLink").href = data.ConditionPdf;
        }
    
    } else {
        console.log(" No data found in Firebase!");
    }
}).catch((error) => {
    console.error(" Error fetching data: ", error);
});
