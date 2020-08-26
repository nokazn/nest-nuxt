import { Controller, Get, Request, Response } from '@nestjs/common';
// @ts-ignore @todo
import { Nuxt, Builder } from 'nuxt';

import { config } from '../nuxt.config';

@Controller()
export class NuxtController {
  private nuxt: Nuxt;

  constructor() {
    this.nuxt = new Nuxt(config);
    if (process.env.mode === 'production') {
      config.dev = false;
    } else if (process.env.IS_NUXT_ENABLED) {
      // this.nuxt = new Nuxt(config);
      new Builder(this.nuxt).build();
    }
  }
  @Get('*')
  async root(@Request() req: any, @Response() res: any) {
    if (this.nuxt) {
      await this.nuxt.render(req, res);
    } else {
      res.send('Nuxt is disabled.');
    }
  }
}
