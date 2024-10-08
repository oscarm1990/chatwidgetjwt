document.getElementById('generateToken').addEventListener('click', async () => {
    const widgetKey = document.getElementById('widgetKey').value; // This is your ACCOUNT_KEY
    const sharedSecret = document.getElementById('sharedSecret').value;
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;

    if (!widgetKey || !sharedSecret || !userName || !email) {
        alert('Please fill in all fields.');
        return;
    }

    // Make a POST request to generate the JWT token
    const response = await fetch('/generate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName, email: email, sharedSecret: sharedSecret }),
    });

    if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
    }

    const data = await response.json();
    document.getElementById('tokenOutput').value = data.token;

    // Generate the URL to the widget page with the JWT token and ACCOUNT_KEY for local testing
    const constructedUrl = `http://localhost:3000/widget.html?token=${data.token}&widgetKey=${encodeURIComponent(widgetKey)}`;
    document.getElementById('urlOutput').value = constructedUrl; // Display the constructed URL

    // Update the Zendesk Widget script with the user-provided Widget Key
    window.zESettings = {
        webWidget: {
            authenticate: {
                chat: {
                    jwtFn: (cb) => cb(data.token)
                }
            }
        }
    };
});
