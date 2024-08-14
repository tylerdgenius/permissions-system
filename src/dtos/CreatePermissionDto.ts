import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PermissionEnums } from 'src/enums';

export class CreatePermissionDto {
  @ApiProperty({
    required: true,
    description: 'This property details which permission action to create',
  })
  @IsIn(
    [
      PermissionEnums.CreateOrder,
      PermissionEnums.CreateProduct,
      PermissionEnums.DeleteOrder,
      PermissionEnums.DeleteProduct,
      PermissionEnums.ReadOrder,
      PermissionEnums.ReadProduct,
      PermissionEnums.UpdateOrder,
      PermissionEnums.UpdateProduct,
      PermissionEnums.CreateUser,
      PermissionEnums.ReadUser,
      PermissionEnums.DeleteUser,
      PermissionEnums.UpdateUser,
      PermissionEnums.CreateRole,
      PermissionEnums.UpdateRole,
      PermissionEnums.ReadRole,
      PermissionEnums.DeleteRole,
    ],
    {
      message: `Allowed permission actions are limited to - ${PermissionEnums.CreateOrder}, ${PermissionEnums.CreateProduct}, ${PermissionEnums.DeleteOrder}, ${PermissionEnums.DeleteProduct}, ${PermissionEnums.ReadOrder}, ${PermissionEnums.ReadProduct}, ${PermissionEnums.UpdateOrder}, ${PermissionEnums.UpdateProduct}, ${PermissionEnums.ReadUser}, ${PermissionEnums.CreateUser}, ${PermissionEnums.UpdateUser}, ${PermissionEnums.DeleteUser}, ${PermissionEnums.ReadRole}, ${PermissionEnums.CreateRole}, ${PermissionEnums.UpdateRole}, ${PermissionEnums.DeleteRole} -`,
    },
  )
  @IsNotEmpty({
    message: 'Action is required',
  })
  @IsString({
    message: 'Action has to be of type string',
  })
  action: string;
}
