import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Profile) private readonly Profiles: Repository<Profile>,
  ) {}

  private secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();

    const auth = req.headers['authorization'];

    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = auth.slice('Bearer '.length);

    let payload: any;

    try {
      // Dynamic import for jose library to handle ESM compatibility
      const { jwtVerify } = await import('jose');
      
      const { payload: p } = await jwtVerify(token, this.secret, {
        algorithms: ['HS256'],
        audience: 'authenticated',
      });
      payload = p;
    } catch (error) {
      console.error('JWT verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }

    const userId = payload.sub as string;
    if (!userId) throw new UnauthorizedException('Invalid token subject');

    // get profile from db
    const profile = await this.Profiles.findOne({ where: { id: userId } });
    if (!profile) {
      throw new ForbiddenException('Profile not found');
    }

    if (profile.disabled) throw new ForbiddenException('Account disabled');

    (req as any).user = {
      id: userId,
      email: payload.email,
    };
    (req as any).profile = profile;

    return true;
  }
}
