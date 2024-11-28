document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Use the custom token to sign in and get the ID token
            const idToken = await firebase.auth().signInWithCustomToken(data.token).then(userCredential => userCredential.user.getIdToken());
            document.cookie = `token=${idToken}; path=/;`;
            window.location.href = "/";
        } else {
            document.getElementById("errorMessage").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again.";
    }
});

function show() {
    let passwords = document.getElementById("password");
    if (passwords.type === "password") {
        passwords.type = "text";
    } else {
        passwords.type = "password";
    }
}