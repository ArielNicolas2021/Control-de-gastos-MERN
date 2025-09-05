export const UseFetchUsers = async (url, formData) => {
    try {
        const response = await fetch('https://control-de-gastos-mern.onrender.com/api/' + url, {
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


