import wollok.game.*
import level.*
import objects.game.game_settings.*
import objects.caves.easy_cave.*
import objects.caves.medium_cave.*
import objects.caves.hard_cave.*

object levelOne inherits Level {
  override method win_counter_condition() = 5
  
  override method cuevas() = [
    new LittleCave(position = game.at(0, 1)).spawn_cave(),
    new MediumCave(position = game.at(0, 3)).spawn_cave(),
    new LittleCave(position = game.at(0, 5)).spawn_cave()
  ]
  
  method image() = "levels/level1.png"
  
  method position() = game.at(3, 2)
  
  override method level_settings() {
    self.general_level_settings()
    self.cuevas().forEach({ c => game.addVisual(c) })
  }
}