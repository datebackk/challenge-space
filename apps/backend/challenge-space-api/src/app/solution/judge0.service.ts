import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';

@Injectable()
export class Judge0Service {
    constructor(private readonly httpService: HttpService) {}

    createBatchedSubmission() {
        this.httpService.post('https://judge0-ce.p.rapidapi.com/submissions/batch', {
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '78bea80d0cmsh7d3b0d8d69a6616p1fe360jsn800724ca88ab',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            body: {

            }
        })
    }
}
