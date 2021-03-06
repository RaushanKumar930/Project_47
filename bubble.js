class Bubble{
    constructor(x,y,r){
        var options={
            isStatic: false,
            restitution: 0,
            friction: 1,
            density: 1.2,
        }
        this.body=Bodies.circle(x,y,r,options)
        this.r=r
        this.image=loadImage("win.png")
        World.add(world,this.body)
    }
    display(){
        var pos=this.body.position
        var angle=this.body.angle
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.image,0,0,10,5)
        pop()
    }
    
}