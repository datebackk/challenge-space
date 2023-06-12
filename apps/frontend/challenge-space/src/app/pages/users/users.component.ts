import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'challenge-space-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
    constructor(private readonly route: ActivatedRoute) {}
}
