import objects.game.game_settings.*

import objects.scenes.scenes.*
import objects.scenes.credits_scene.*
import objects.scenes.how_to_play_scene.*
import objects.scenes.level_selector_scene.*

import wollok.game.*

object mainMenu inherits Scene {
  const options = [credits, levelSelector, howToPlay]
  
  override method show() {
    game.clear()
    self.board_config()

    game.onClickDo(
      { position =>
        const option_clicked = game.getObjectsIn(position)
        if (!option_clicked.isEmpty()) {
          self.hide()
          option_clicked.first().show()
        }
      }
    )
  }
  
  override method hide() {
    options.forEach({ o => game.removeVisual(o) })
  }
  
  override method board_config() {
    game.addVisual(fondo)
    fondo.image_actual("media/main_background.png")
    options.forEach({ o => game.addVisual(o) })
  }
  
  override method go_back() {
    
  }
}