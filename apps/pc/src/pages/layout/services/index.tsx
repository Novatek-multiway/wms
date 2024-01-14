import { post } from "@/http/request";

export const modifyUserPwd = (body: { newPassword: string; oldPassword: string }) => post('/User/ModifyUserPwd', body)