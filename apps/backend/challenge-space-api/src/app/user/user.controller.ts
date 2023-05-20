import {Controller, Get} from '@nestjs/common';
import {AuthenticatedUser} from 'nest-keycloak-connect';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    currentUser(@AuthenticatedUser() keycloackUser) {
        return this.userService.findOrCreate(keycloackUser);
    }
}
