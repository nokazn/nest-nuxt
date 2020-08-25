declare module 'nuxt' {
  import { IncomingMessage, ServerResponse } from 'http';
  import { NuxtConfig } from '@nuxt/types';

  type _RenderError = {
    statusCode: number;
    message: string;
  };

  type _Redirected = {
    path: string;
    query: Record<string, string>;
    status: number;
  };

  interface NuxtInstance {
    render: (req: IncomingMessage, res: ServerResponse) => Promise<any>;
    renderRoute: (
      route: string,
      context?: { req: IncomingMessage; res: ServerResponse },
    ) => Promise<{
      html: string;
      error: _RenderError | null;
      redirected: false | _Redirected;
    }>;
  }

  type NuxtLoader = (params: { for: 'dev' | 'start' }) => Promise<NuxtInstance>;
  type NuxtBuilder = (nuxt: NuxtInstance) => Promise<void>;

  var loadNuxt: NuxtLoader;
  var build: NuxtBuilder;

  class Nuxt implements NuxtInstance {
    constructor(config: NuxtConfig);
    renderAndGetWindow: (url: string, params: { virtualConsole?: boolean }) => Promise<Window>;
    render: NuxtInstance['render'];
    renderRoute: NuxtInstance['renderRoute'];
  }

  class Builder {
    constructor(nuxt: Nuxt);
    build: () => Promise<void>;
  }
}
