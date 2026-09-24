import wollok.game.*
import level.*
import objects.game.game_settings.*
import objects.caves.easy_cave.*
import objects.caves.medium_cave.*
import objects.caves.hard_cave.*

object levelSecond inherits Level {
  override method win_counter_condition() = 10
  
  override method cuevas() = [
    new LittleCave(position = game.at(0, 1)).spawn_cave(),
    new HardCave(position = game.at(0, 3)).spawn_cave(),
    new MediumCave(position = game.at(0, 5)).spawn_cave()
  ]
  
  method image() = "levels/level2.png"
  
  method position() = game.at(5, 2)
  
  override method level_settings() {
    self.general_level_settings()
    self.cuevas().forEach({ c => game.addVisual(c) })
  }
}