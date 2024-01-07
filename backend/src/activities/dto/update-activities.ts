/* eslint-disable prettier/prettier */
// update-activity.dto.ts
export class UpdateActivityDto {
    readonly id_user?: string;
    readonly id_chapter?: string;
    readonly age: number;
    readonly answers?: {
      id?: number;
      time?: number;
      tries?: number;
      hints?: number;
    }[];
  }
  