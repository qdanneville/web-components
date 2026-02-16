export async function fetchUsers() {
    const response = await fetch("/api/users");
    return response.json();
}

export async function createUser(user) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return response.json();
}
