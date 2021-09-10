import { Achievement } from '../../../achievement/models/achievement.interface';

export interface User {
  id: number;
  login: string;
  password?: string;
  registrationDate: Date;
  profilePic: string;
  email: string;
  achievements?: Achievement[];
  friends?: User[];
}
