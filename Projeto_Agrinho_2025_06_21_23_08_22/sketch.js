let player;
let playerImage, enemyImage, itemImage, backgroundImage;
let playerSpeed = 4;
let mapWidth = 700;
let mapHeight = 600;
let score = 0;
let enemies = [];
let items = [];

function preload() {
  playerImage = loadImage("sprite.gif");
  enemyImage = loadImage("inimigo.gif");
  itemImage = loadImage("coletavel.gif");
  backgroundImage = loadImage("cenario.webp");
}

function setup() {
  createCanvas(mapWidth, mapHeight);
  player = new Player(width / 2, height / 2);

  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy(random(width), random(height)));
  }

  items.push(new Item(random(width), random(height)));
}

function draw() {
  image(backgroundImage, 0, 0, mapWidth, mapHeight);

  player.update();
  player.show();

  for (let enemy of enemies) {
    enemy.update();
    enemy.show();
  }

  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    item.show();
    if (player.collidesWith(item)) {
      score += 10;
      items.splice(i, 1);
      items.push(new Item(random(width), random(height)));
    }
  }

  for (let enemy of enemies) {
    if (player.collidesWith(enemy)) {
      score = 0;
      player.resetPosition();
    }
  }

  fill(0);
  textSize(24);
  text("Pontuação: " + score, 20, 30);
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.speed = playerSpeed;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < mapWidth - this.width) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < mapHeight - this.height) {
      this.y += this.speed;
    }
  }

  show() {
    if (playerImage) {
      image(playerImage, this.x, this.y, this.width, this.height); // Desenha o sprite do jogador
    }
  }

  collidesWith(other) {
    return (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y);
  }

  resetPosition() {
    this.x = width / 2;
    this.y = height / 2;
  }
}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.speed = 2;
  }

  update() {
    let direction = int(random(4));
    if (direction === 0) this.x += this.speed;
    if (direction === 1) this.x -= this.speed;
    if (direction === 2) this.y += this.speed;
    if (direction === 3) this.y -= this.speed;

    this.x = constrain(this.x, 0, mapWidth - this.width);
    this.y = constrain(this.y, 0, mapHeight - this.height);
  }

  show() {
    if (enemyImage) {
      image(enemyImage, this.x, this.y, this.width, this.height); // Desenha o sprite do inimigo
    }
  }
}

class Item {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
  }

  show() {
    if (itemImage) {
      image(itemImage, this.x, this.y, this.width, this.height);
    }
  }
}
