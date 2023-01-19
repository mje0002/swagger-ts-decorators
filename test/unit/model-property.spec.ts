import { SwaggerService } from '../../src/swagger.service';
import {
  ApiModelProperty,
  IApiModelPropertyArgs,
} from '../../src/api-model-property.decorator';

describe('api-model-property.decorator.ts', () => {
  let testingClass: any | undefined;

  describe('Api Model Property Arguments', () => {
    beforeAll(() => {
      class TestingClass {
        @ApiModelProperty({
          description: 'Id of version',
          required: false,
          example: '123456789',
          name: 'attribute-a',
        })
        attributeA: string;

        @ApiModelProperty({
          description: 'Id of version',
          required: true,
          example: '123456789',
          name: 'attribute-b',
        })
        attributeB: string;

        constructor(attA: string, attB = 'ModelPropertyAttrB') {
          this.attributeA = attA;
          this.attributeB = attB;
        }
      }

      testingClass = new TestingClass('ModelPropertyAttrA');
    });

    it('Api Model Property, Name', () => {
      const swaggerData = SwaggerService.getInstance().getData();

      expect(swaggerData.definitions).toHaveProperty('TestingClass');
      expect(swaggerData.definitions['TestingClass'].properties).toHaveProperty(
        'attribute-a',
      );
    });

    it('Api Model Property, Description', () => {
      const swaggerData = SwaggerService.getInstance().getData();

      expect(swaggerData.definitions).toHaveProperty('TestingClass');
      expect(swaggerData.definitions['TestingClass'].properties).toHaveProperty(
        'attribute-a',
      );

      const attributeA =
        swaggerData.definitions['TestingClass'].properties['attribute-a'];

      expect(attributeA.description).toBe('Id of version');
    });

    it('Api Model Property, Example', () => {
      const swaggerData = SwaggerService.getInstance().getData();

      expect(swaggerData.definitions).toHaveProperty('TestingClass');
      expect(swaggerData.definitions['TestingClass'].properties).toHaveProperty(
        'attribute-a',
      );

      const attributeA =
        swaggerData.definitions['TestingClass'].properties['attribute-a'];

      expect(attributeA.example).toBe('123456789');
    });

    it('Api Model Property, not required attributeA', () => {
      const swaggerData = SwaggerService.getInstance().getData();

      expect(swaggerData.definitions).toHaveProperty('TestingClass');
      expect(swaggerData.definitions['TestingClass'].properties).toHaveProperty(
        'attribute-a',
      );
      expect(swaggerData.definitions['TestingClass'].required).not.toContain(
        'attribute-a',
      );
    });

    it('Api Model Property, required attributeB', () => {
      const swaggerData = SwaggerService.getInstance().getData();

      expect(swaggerData.definitions).toHaveProperty('TestingClass');
      expect(swaggerData.definitions['TestingClass'].properties).toHaveProperty(
        'attribute-b',
      );
      expect(swaggerData.definitions['TestingClass'].required).toContain(
        'attribute-b',
      );
    });
  });
});
