import wollok.game.*

import objects.scenes.main_menu_scene.*

import objects.game.mice_counter.*
import objects.game.game_settings.*

import objects.characters.cat_character.*
import objects.characters.mice_character.*

class Level {

  method cuevas()

  method win_counter_condition()

  method level_settings()

  method general_level_settings() {
    game.clear()
    game.addVisual(fondo)
    fondo.image_actual("levels/level_background.png")

    counter.level_played(self)
    counter.counter_text(0)

    game.addVisual(counter)
    game.addVisual(cat)
    cat.keyboard_settings()
    cat.cat_collisions()
  }

  method win_condition() {
    if(counter.counter_text() == self.win_counter_condition()) {
      self.hide()
    }
  }

  method hide() {
    mainMenu.show()
  }

}