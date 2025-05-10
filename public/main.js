document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const backendUrl = ''; // Replace with your deployed backend URL
    const uploadResultDiv = document.getElementById('uploadResult');
    const retrieveForm = document.getElementById('retrieveForm');
    const retrieveResultDiv = document.getElementById('retrieveResult');

    // Handle file upload form submission
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(uploadForm);
        // Send the file to the server's /file endpoint
        try {
            const response = await fetch(`${backendUrl}/file`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) { // Assuming the server responds with the file URL on success
                const fileUrl = await response.text();
                uploadResultDiv.innerHTML = `File uploaded successfully. URL: <a href="${fileUrl}" target="_blank">${fileUrl}</a>`;
            } else {
                uploadResultDiv.textContent = 'Error uploading file.';
            }
        } catch (error) {
            console.error('Error:', error);
            uploadResultDiv.textContent = 'Error uploading file.';
        }
    });

    // Handle file retrieval form submission
    retrieveForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const publicIdInput = document.getElementById('publicId');
        const publicId = publicIdInput.value;

        if (!publicId) {
            retrieveResultDiv.textContent = 'Please enter a Public ID.';
            return;
        }

        // Request the file URL from the server's /file/:publicId endpoint
        try {
            const response = await fetch(`${backendUrl}/file/${publicId}`);
            if (response.ok) { // Assuming the server responds with the file URL on success
                const fileUrl = await response.text();
                retrieveResultDiv.innerHTML = `Retrieved file URL: <a href="${fileUrl}" target="_blank">${fileUrl}</a>`;
            } else {
                retrieveResultDiv.textContent = 'Error retrieving file. Make sure the Public ID is correct.';
            }
        } catch (error) {
            console.error('Error:', error);
            retrieveResultDiv.textContent = 'Error retrieving file.';
        }
    });
});