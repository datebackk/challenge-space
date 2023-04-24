import {Controller, Get} from '@nestjs/common';
import {AuthenticatedUser} from 'nest-keycloak-connect';
import {UserService} from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/current-user')
    currentUser(@AuthenticatedUser() keycloackUser) {
        return this.userService.findOrCreate(keycloackUser);
    }
}
