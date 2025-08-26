import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/role/role.decorator';
import { Roles } from '../../users/entities/user.entity';

@Injectable()
export class HeaderRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Check for missing or malformed Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or invalid');
    }

    // Extract role from Bearer <role>
    const userRole = authHeader.split(' ')[1] as Roles;

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // If role is not authorized, throw 401
    if (!requiredRoles.includes(userRole)) {
      throw new UnauthorizedException('User role is not authorized');
    }

    return true;
  }
}
