import { UserData } from '../interfaces/UserData';


// Create a user
const createUser = async (body: UserData) => {
    try {
        const response = await fetch('/auth/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        });
        const data = await response.json();
    
        if (!response.ok) {
        throw new Error('User creation failed, check network tab!');
        }
    
        return data;
    
    } catch (err) {
        console.error('Error from user creation:', err);
        throw new Error('Could not create user');
    }
    };

    export { createUser };