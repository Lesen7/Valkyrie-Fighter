export class Player extends Actor
{
  // Constructor
  constructor(damage)
  {
    this.spriteDir = '/assets/sprites/vf1';
    this.damage = damage;
  }

  // Getters
  function getHealth ()
  {
    return this.health;
  }

  // Methods
  function changeHealth(num)
  {
    this.health -= num;
  }

  function changeSpeed(num)
  {
    this.speed -= num;
  }
}
