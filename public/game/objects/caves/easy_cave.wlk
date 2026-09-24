import wollok.game.*
import cave.*

class LittleCave inherits Cave {

  override method mice_spawn_time() = 8000

  const little_cave_sprite = "caves/easy_cave.png"
  override method image() = little_cave_sprite
  
}