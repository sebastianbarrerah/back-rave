import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "../interfaces/rolesEnum.enum";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserGuard } from "../guards/user-role.guard";


export function Auth(...roles:Roles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards( AuthGuard(), UserGuard )
    )
}