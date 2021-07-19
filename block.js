class Block{
  constructor(x, y) {
      var options = {
                    
      }
      this.body = Bodies.rectangle(x, y, 30, 40, options);
      this.width = width;
      this.height = height;
      this.image = loadImage("block.png")
      this.Visiblity = 255
      World.add(world, this.body);
  }
  display(){
    if(this.body.speed < 5){
      var angle = this.body.angle;
      var pos= this.body.position;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0,0,30,40);
      pop();
    }else{
      this.body.position.x = undefined;
      World.remove(world, this.body);
      push();
      this.Visiblity = this.Visiblity - 75;
      tint(255,this.Visiblity);
      image(this.image, this.body.position.x, this.body.position.y, 30, 40);
      pop();
      if(this.Visiblity <= 0 && this.Visiblity >= -350){
        score = score+8
      }
    }
  }
}
