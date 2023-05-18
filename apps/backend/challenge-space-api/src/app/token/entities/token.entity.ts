import {Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name: 'tokens'
})
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
