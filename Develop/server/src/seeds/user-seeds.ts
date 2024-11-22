import { User } from '../models/user.js';

export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'test', password: 'password'},
        { username: 'test2', password: 'password2'},
        { username: 'test3', password: 'password3'},
    ], { individualHooks: true });
};