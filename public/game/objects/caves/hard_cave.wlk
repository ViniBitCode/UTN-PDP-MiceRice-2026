import wollok.game.*
import cave.*

class HardCave inherits Cave {

  override method mice_spawn_time() = 2000

  const hard_cave_sprite = "caves/hard_cave.png"
  override method image() = hard_cave_sprite

}