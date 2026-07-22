import { Controller, Get, Param, Query } from '@nestjs/common';
import type { ArticleCategory } from '@i-career/database';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query('category') category?: ArticleCategory) {
    const items = await this.articlesService.findAll(category);
    return { items };
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }
}
