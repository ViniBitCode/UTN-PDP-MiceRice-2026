import wollok.game.*

object counter {
  var property position = game.at(game.width(), game.height() - 1)
  var property counter_text = 0
  var property level_played = null
  
  method text() = "Ratones eliminados: " + counter_text
  
  method counter_increment() {
    counter_text += 1
    level_played.win_condition()
  }
}