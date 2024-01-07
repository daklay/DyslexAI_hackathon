/* eslint-disable prettier/prettier */
// create-activity.dto.ts
export class CreateActivityDto {
    readonly id_user: string;
    readonly id_chapter: string;
    readonly age: number;
    readonly answers: {
      id: number;
      time: number;
      tries: number;
      hints: number;
    }[];
  }
  