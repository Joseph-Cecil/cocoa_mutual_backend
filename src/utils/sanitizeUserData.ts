import { IUser } from './../models/user';

export const sanitizeUserData = (user: IUser) => {
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        staffId: user.staffId,
        role: user.role
    }
} 