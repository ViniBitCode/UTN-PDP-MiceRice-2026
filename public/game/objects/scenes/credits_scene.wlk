import wollok.game.*

import objects.game.game_settings.*
import objects.scenes.main_menu_scene.*
import objects.scenes.scenes.*

object credits inherits Scene {

    method image() = "media/credits.png"
    method position() = game.at(7, 2)

    override method show() {
        self.board_config()
        keyboard.backspace().onPressDo({self.go_back()})
    }

    override method hide() {
      
    }

    override method board_config(){
        fondo.image_actual("media/credits_background.png")
    }

    override method go_back(){
        mainMenu.show()
    }

}