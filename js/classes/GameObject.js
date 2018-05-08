export class GameObject
{
  // Constructor
  constructor(renderMode = 'visible', spriteDir = '/assets/sprites/', position = {x : positionX, y : positionY})
  {
    this.renderMode = renderMode;
    this.spriteDir = spriteDir;
    this.position = position;
  }
  // Methods
  function translate2D(movX, movY)
  {
    this.x += x;
    thix.y += y;
  }
}
