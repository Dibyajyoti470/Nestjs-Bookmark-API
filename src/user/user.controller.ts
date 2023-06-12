import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { RequestDto } from '../global/dto/request.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@Request() req: RequestDto) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('edit')
  editUser(@Request() req: RequestDto, @Body() dto: EditUserDto) {
    return this.userService.editUser(req.user.sub, dto);
  }
}
