import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {Judge0BatchedRequestDto} from './dto/judge0-batched-request-dto';
import {catchError, map, tap} from 'rxjs';
import {TokenEntity} from '../token/entities/token.entity';

@Injectable()
export class Judge0Service {
    constructor(private readonly httpService: HttpService) {}

    getBatchedResultByTokens(tokens: TokenEntity[]) {
        return this.httpService.get('https://judge0-ce.p.rapidapi.com/submissions/batch',
            {
                headers: {
                    'X-RapidAPI-Key': '060627b8abmshdeae72e7d99675dp18c0edjsn5bde844ecdf7',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                },
                params: {
                    tokens: tokens.map(token => token.token).join(','),
                }
            },
        ).pipe(
            tap((response) => console.log(response)),
            map(response => response.data),
            catchError(async (error) => console.log(error)),
        );
    }

    createBatchedSubmission(judge0BatchedRequestDto: Judge0BatchedRequestDto) {
        return this.httpService.post('https://judge0-ce.p.rapidapi.com/submissions/batch',
            judge0BatchedRequestDto,
            {
                headers: {
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': '060627b8abmshdeae72e7d99675dp18c0edjsn5bde844ecdf7',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                },
            }
        ).pipe(
            map(response => response.data),
            catchError(async (error) => console.log(error))
        )
    }
}
