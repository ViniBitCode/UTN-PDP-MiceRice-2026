import wollok.game.*
import cave.*

class MediumCave inherits Cave {

  override method mice_spawn_time() = 4000

  const medium_cave_sprite = "caves/medium_cave.png"
  override method image() = medium_cave_sprite

}