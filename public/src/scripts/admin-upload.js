/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for admin product upload page]
*/
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/uploads', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert(`File processed successfully. ${data.processed} products added.`);
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    } else {
        alert('Please select a valid JSON file');
    }
});
