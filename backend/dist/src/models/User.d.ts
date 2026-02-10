export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
}
export declare const createUser: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
export declare const getUserByEmail: (email: string) => Promise<any>;
export declare const verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const generateToken: (userId: number, email: string) => string;
//# sourceMappingURL=User.d.ts.map