export class User {
    userId!: number;

    static of({ user_id }: any): User {
        const user = new User();
        user.userId = user_id;
        return user;
    }
}
