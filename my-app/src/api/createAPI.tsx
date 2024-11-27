import { UserData } from '../interfaces/UserData';
import Auth from '../utils/auth';


// Create a user
const createUser = async (body: UserData) => {
    try {
        const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        });
        const data = await response.json();
    
        if (!response.ok) {
        throw new Error('User creation failed, check network tab!');
        }
    
        return data;
    
    } catch (err) {
        console.log('Error from user creation:', err);
        return Promise.reject('Could not create user');
    }
    };

    export { createUser };