import { IAuth } from "@/types/IAuth";

export const userData: IAuth[] = [
  {
    id: "1",
    token:"123",
    email: "user@africavision.com",
    firstname: "Ebube",
    lastname: "Modebe",
    role: {
      id: "1",
      roleName: "User",
      roleDesc: "This role belongs to ordinary admin",
    },
  },
  {
    id: "2",
    email: "admin@africavision.com",
    token:"1234",
    firstname: "Ebube",
    lastname: "Joh",
    role: {
      id: "2",
      roleName: "Super Admin",
      roleDesc: "This role belongs to super admin",
    },
  },
];
