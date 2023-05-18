import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IContest} from '../../interfaces/contest.interface';

@Component({
    selector: 'challenge-space-contest-card',
    templateUrl: './contest-card.component.html',
    styleUrls: ['./contest-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestCardComponent {
    @Input() contest!: IContest;

    readonly bannerImage = `https://ng-web-apis.github.io/dist/assets/images/web-api.svg`;

    get routerLink(): string {
        return `./solution/${this.contest.id}`;
    }
}
