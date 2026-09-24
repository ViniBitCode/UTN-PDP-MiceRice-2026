import wollok.game.*
import objects.game.game_settings.*
import objects.scenes.main_menu_scene.*
import objects.levels.level_one.*
import objects.levels.level_second.*
import objects.levels.level_third.*
import objects.scenes.scenes.*

object levelSelector inherits Scene {
  const levels = [levelOne, levelSecond, levelThird]
  
  method image() = "media/select_level.png"
  
  method position() = game.at(3, 2)
  
  override method show() {
    self.board_config()
    keyboard.backspace().onPressDo({ self.go_back() })
    
    game.onClickDo(
      { position =>
        const level = game.getObjectsIn(position)
        if (!level.isEmpty()) {
          self.hide()
          level.first().level_settings()
        }
      }
    )
  }
  
  override method hide() {
    levels.forEach({ l => game.removeVisual(l) })
  }
  
  override method board_config() {
    fondo.image_actual("media/level_selector_background.png")
    levels.forEach({ l => game.addVisual(l) })
  }
  
  override method go_back() {
    self.hide()
    mainMenu.show()
  }
}

