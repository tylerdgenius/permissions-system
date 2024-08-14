import { IsIn } from 'class-validator';
import { StatusEnums } from 'src/enums';

export class StatusDto {
  @IsIn([StatusEnums.Default, StatusEnums.Archived])
  status: string;
}
