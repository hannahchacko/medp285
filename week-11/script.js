
let system;

function setup() {
  createCanvas(600, 400);
  system = new ParticleSystem(createVector(width / 2, height / 2));
}

function draw() {
  background(30, 30, 40, 40); 
  system.addParticle();
  system.run();
}

class Particle {
  constructor(position) {
    this.position = position.copy();
    this.velocity = createVector(random(-8.5, 8.5), random(-10, -90)); 
    this.lifespan = 340; 
  }

  update() {
    this.position.add(this.velocity);
    this.lifespan -= 1;
  }

  display() {
    noStroke();
    fill(10, 70, 235, this.lifespan); 
    ellipse(this.position.x, this.position.y, 15); 
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
