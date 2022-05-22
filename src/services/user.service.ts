import User from "../models/user.interface";
import db from "../database";

class UserService {
    
    // create user
    async createUser(u:User): Promise<User> {
        try {
        // open connexion
        const connexion = await db.connect();
        const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
        VALUES ($1, $2, $3, $4, $5) returning email, user_name, first_name, last_name`;
        // run query
        const result = await connexion.query(sql, [
            u.email,
            u.username,
            u.firstname,
            u.lastname,
            u.password
        ]);
        // release connxion
        connexion.release()
        // return user created
        return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create (${u.username}): ${(error as Error).message}` 
            )
            
        }        
    }

    // get all users
    async getUsers(): Promise<User[]> {
        try {
            // open connexion
            const connexion = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users`;
            // run query
            const result = await connexion.query(sql);
            // release connxion
            connexion.release()
            // return user created
            return result.rows;
            } catch (error) {
                throw new Error(
                    `Error at retrieving users ${(error as Error).message}` 
                )
                
            }       
    }
}
export default UserService;