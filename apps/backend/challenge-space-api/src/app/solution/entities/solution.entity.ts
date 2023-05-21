import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ContestEntity} from '../../contest/entities/contest.entity';
import {UserEntity} from '../../user/entities/user.entity';
import {TokenEntity} from '../../token/entities/token.entity';

@Entity({
    name: 'solutions'
})
export class SolutionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @Column({nullable: true, type: 'timestamptz'})
    completeAt: Date;

    @Column({type: 'timestamptz'})
    shouldCompleteAt: Date;

    @OneToMany(() => TokenEntity, token => token.solution)
    tokens: TokenEntity[];

    @ManyToOne(() => ContestEntity, contest => contest.solutions)
    contest: ContestEntity;

    @ManyToOne(() => UserEntity, user => user.solutions)
    user: UserEntity;
}
