import wollok.game.*
import level.*
import objects.game.game_settings.*
import objects.caves.easy_cave.*
import objects.caves.medium_cave.*
import objects.caves.hard_cave.*

object levelThird inherits Level {

  override method win_counter_condition() = 15

  override method cuevas() = [
    new HardCave(position = game.at(0, 1)).spawn_cave(),
    new MediumCave(position = game.at(0, 3)).spawn_cave(),
    new HardCave(position = game.at(0, 5)).spawn_cave()
  ]
  
  method image() = "levels/level3.png"
  
  method position() = game.at(7, 2)
  
  override method level_settings() {
    self.general_level_settings()
    self.cuevas().forEach({ c => game.addVisual(c) })
  }
}