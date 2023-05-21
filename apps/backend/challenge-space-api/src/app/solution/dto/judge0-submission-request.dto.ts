export class Judge0SubmissionRequestDto {
    readonly language_id: number;
    readonly source_code: string;
    readonly stdin?: string;
    readonly expected_output?: string;
}
