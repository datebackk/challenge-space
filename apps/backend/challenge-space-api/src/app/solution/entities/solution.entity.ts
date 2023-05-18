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

    @Column()
    completeAt: string;

    @Column()
    shouldCompleteAt: string;

    @ManyToOne(() => ContestEntity, contest => contest.solutions)
    contest: ContestEntity;
}
