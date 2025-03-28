import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/users.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector,
  ){}

  canActivate(context: ExecutionContext): boolean{

    const validRoles: string[] = this.reflector.get( META_ROLES , context.getHandler() )

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if(!user)
      throw new BadRequestException('Debe venir el usuario')

    for (const role of user.roles) {
      if(validRoles.includes(role)){
        return true
      }
    }

    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    );
    
  }
}
