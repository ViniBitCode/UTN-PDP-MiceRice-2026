import wollok.game.*
import objects.caves.easy_cave.*
import objects.game.mice_counter.*

class Mice {
  var property position = game.at(5, 5)
  const mice_sprite_down = "characters/mice_enemy/mice_enemy_down.png"
  
  method image() = mice_sprite_down
  
  method collitionWithCat(cat) {
    game.removeVisual(self)
    counter.counter_increment()
  }

  method appearAndGo(cave_position, mice_speed) {
    game.addVisual(self)
    position = game.at(cave_position.x(), cave_position.y())
    const tick = game.tick(mice_speed, { position = position.right(1) }, true)
    tick.start()

  }

}