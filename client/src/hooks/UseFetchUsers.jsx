export const UseFetchUsers = async (url, formData) => {
    try {
        const response = await fetch('http://localhost:1234/api/' + url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


