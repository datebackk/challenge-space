import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ContestEntity} from '../../contest/entities/contest.entity';

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

    @ManyToOne(() => ContestEntity, contest => contest.solutions)
    contest: ContestEntity;
}
