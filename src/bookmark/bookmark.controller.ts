import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { RequestDto } from '../global/dto';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@Request() req: RequestDto) {
    return this.bookmarkService.getBookmarks(req.user.sub);
  }

  @Get(':id')
  getBookmarkById(
    @Request() req: RequestDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(req.user.sub, bookmarkId);
  }

  @Post()
  createBookmark(@Request() req: RequestDto, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(req.user.sub, dto);
  }

  @Patch(':id')
  editBookmarkById(
    @Request() req: RequestDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(req.user.sub, bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @Request() req: RequestDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(req.user.sub, bookmarkId);
  }
}
