import { Router, Request, Response, NextFunction } from 'express';
import { SwaggerService } from './swagger.service';
import * as assert from 'assert';
import { build, ISwaggerBuildDefinition } from './swagger.builder';
import { ISwagger } from './i-swagger';

export interface ISwaggerExpressOptions {
  /**
   * Path of resource.
   * Default is "/api-docs/swagger.json".
   */
  path?: string;

  /**
   * Swagger Definition.
   */
  definition?: ISwaggerBuildDefinition;

  /**
   * The Type of API specification being leveraged
   */
  specification?: 'openapi' | 'jsonapi';
}

const defaults: Pick<ISwaggerExpressOptions, 'specification' | 'path'> = {
  specification: 'openapi',
  path: '/api-docs/swagger.json',
};

export function express(options?: ISwaggerExpressOptions): Router {
  let settings: ISwaggerExpressOptions = defaults;
  if (options) {
    settings = Object.assign(defaults, options);
    assert.ok(settings.definition, 'Definition is required.');
    if (settings.definition) {
      build(settings.definition, settings.specification);
    }
  }
  const router = buildRouter(settings.path as string);
  return router;
}

function buildRouter(path: string): Router {
  const router: Router = Router();
  router.get(
    path,
    (request: Request, response: Response, next: NextFunction) => {
      const data: ISwagger = SwaggerService.getInstance().getData();
      response.json(data);
    },
  );
  return router;
}
