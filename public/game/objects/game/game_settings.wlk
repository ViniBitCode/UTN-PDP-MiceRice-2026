import wollok.game.*

object game_settings { 
  const ancho_mapa = 11
  const alto_mapa = 6
  const tamanio_celda = 150
  /*  . La resolucion inicial es: 1650 x 900

  */
  
  method initial_settings() {
    const juego_titulo = "Mice Rice"
    
    game.width(ancho_mapa)
    game.height(alto_mapa)
    game.cellSize(tamanio_celda)
    game.title(juego_titulo)
  }
}

object fondo {
  var property image_actual = "media/main_background.png"
  
  method image() = image_actual
  
  method position() = game.origin()
}