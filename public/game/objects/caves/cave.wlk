import wollok.game.*
import objects.characters.mice_character.*

class Cave {
  const property position
  
  method image()
  
  method mice_spawn_time()
  
  method mice_speed() = self.mice_spawn_time() / 4
  
  method collisionWithCat(cat) {
    game.say(cat, "Toque la cueva")
  }
  
  method appearMiceAndGoRight(mice_speed) {
    new Mice().appearAndGo(self.position(), self.mice_speed())
  }
  
  method mice_spawn() {
    const tick = game.tick(
      self.mice_spawn_time(),
      { self.appearMiceAndGoRight(self.mice_speed()) },
      false
    )
    tick.start()
  }
  
  method spawn_cave() {
    game.addVisual(self)
    self.mice_spawn()
  }
}