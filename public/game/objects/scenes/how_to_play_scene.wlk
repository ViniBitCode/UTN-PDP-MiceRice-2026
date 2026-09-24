import wollok.game.*

import objects.game.game_settings.*
import objects.scenes.main_menu_scene.*
import objects.scenes.scenes.*

object howToPlay inherits Scene {

    method image() = "media/how_to_play.png"
    method position() = game.at(5, 2)

    override method show() {
        self.board_config()
        keyboard.backspace().onPressDo({self.go_back()})
    }

    override method hide() {
      
    }

    override method board_config(){
        fondo.image_actual("media/how_to_play_background.png")
    }

    override method go_back(){
        mainMenu.show()
    }
}

