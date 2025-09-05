export const UseFetchItems = async (method, auth, data) => {
    switch (method) {
        case 'get':
            try {
                const request = await fetch("http://control-de-gastos-mern.onrender.com/api/items", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': auth.token
                    }
                });
                const response = await request.json();
                const result = response.filter(item => item.userID == auth.username)
                return result;
            } catch (error) {
                console.error("Error fetching items:", error);
            }
            break;
            case 'post':
                try {
                    const request = await fetch("http://control-de-gastos-mern.onrender.com/api/items", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': auth.token
                        },
                        body: JSON.stringify(data)
                    });
                    const response = await request.json();
                    return response;
                } catch (error) {
                    console.error("Error posting item:", error);
                }
            break;
        case 'put':
            try {
                const request = await fetch(`http://control-de-gastos-mern.onrender.com/api/items/${data._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': auth.token
                    },
                    body: JSON.stringify(data)
                });
                const response = await request.json();
                return response;
            } catch (error) {
                console.error("Error updating item:", error);
            }
            break;
        case 'delete':
            try {
                const request = await fetch(`http://control-de-gastos-mern.onrender.com/api/items/${data._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': auth.token
                    }
                });
                const response = await request.json();
                return response;
            } catch (error) {
                console.error("Error deleting item:", error);
            }
            break;
        default:
            return { status: 400, message: "Método no válido" };
    }
}