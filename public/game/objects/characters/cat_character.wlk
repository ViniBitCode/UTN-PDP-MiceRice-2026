import mice_character.*
import objects.caves.easy_cave.*
import wollok.game.*

object cat {
  var property position = game.at(5, 5)
  var cat_sprite = "characters/main_cat/main_cat_initial_sprite.png"
  const cat_sprite_up = "characters/main_cat/main_cat_up.png"
  const cat_sprite_down = "characters/main_cat/main_cat_down.png"
  const cat_sprite_left = "characters/main_cat/main_cat_left.png"
  const cat_sprite_rigth = "characters/main_cat/main_cat_right.png"
  
  method image() = cat_sprite
  
  method keyboard_settings() {
    keyboard.up().onPressDo({ self.go_up() })
    keyboard.w().onPressDo({ self.go_up() })

    keyboard.down().onPressDo({ self.go_down() })
    keyboard.s().onPressDo({ self.go_down() })

    keyboard.a().onPressDo({ self.go_left() })
    keyboard.left().onPressDo({ self.go_left() })
    
    keyboard.d().onPressDo({ self.go_right() })
    keyboard.right().onPressDo({ self.go_right() })
  }
  
  method move(sprite, newPosition) {
    cat_sprite = sprite
    if (self.itsInMap(newPosition)) {
      position = newPosition
    }
  }
  
  method itsInMap(newPosition) = newPosition.x().between(
    0,
    game.width() - 1
  ) && newPosition.y().between(0, game.height() - 1)
  
  method go_up() {
    self.move(cat_sprite_up, position.up(1))
  }
  
  method go_down() {
    self.move(cat_sprite_down, position.down(1))
  }
  
  method go_right() {
    self.move(cat_sprite_rigth, position.right(1))
  }
  
  method go_left() {
    self.move(cat_sprite_left, position.left(1))
  }
  
  method cat_collisions() {
    self.cat_collision()
  }
  
  method cat_collision() {
    game.onCollideDo(
      self,
      { otherObject => otherObject.collitionWithCat(self) }
    )
    // Borrar raton y sumar un punto -> m_c.delete() y dentro de delete sumo punto
  }
}