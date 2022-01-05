import { Ingredient } from './ingredient';

describe('Ingredient', () => {
  it('should create an instance', () => {
    expect(new Ingredient(0,"","",0,0)).toBeTruthy();
  });
});
