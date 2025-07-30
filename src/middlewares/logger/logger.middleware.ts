import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class CreateBookLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Adding a New Book To Library')
    next();
  }
}
@Injectable()
export class UpdateBookLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Editing a Book Inside a Library')
    next();
  }
}

@Injectable()
export class DeleteBookLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Deleting an Existing Book in Library')
    next();
  }
}

@Injectable()
export class FetchAllBooksLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Fetching All the Books Inside Of Library')
    next();
  }
}

@Injectable()
export class GetBookByIDLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Searching For One Book Inside Of Library By ID')
    next();
  }
}
@Injectable()
export class SendAnAuthorLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Assign An Author into a Book Information')
    next();
  }
}
@Injectable()
export class CreateUserLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Action SignUp')
    next();
  }
}
@Injectable()
export class UpdateUserLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Editing the user')
    next();
  }
}
@Injectable()
export class FetchAllUsersLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Fetching All the users')
    next();
  }
}
@Injectable()
export class GetUserByIDLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Searching for a User Using ID')
    next();
  }
}
@Injectable()
export class DeleteUserLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Deleting the User Using ID')
    next();
  }
}
@Injectable()
export class loginLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Action login')
    next();
  }
}
@Injectable()
export class searchForaBookLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Searching for a book')
    next();
  }
}




