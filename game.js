
/* Colors */
const COLOR = [
  '#b5291f', // red
  '#c96e12', // orange
  '#e5ff00', // yellow
  '#2de01d', // green
  '#1de0cc', // aqua
  '#1dace0', // light blue
  '#1d65e0', // blue
  '#7e1de0', // purple
  '#e01dc3', // pink
  '#b39154', // golden
];

class Cell {
  constructor() {
    this.active = false;
    this.empty = true;
    this.col = 0;
  }
}

class GameField {

  constructor(rows, columns) {
    this.ROWS = rows;
    this.COLUMNS = columns;
    this.CELL_SIZE = 32;

    // cells display 2D array
    this.cells = [];
    // next random shape
    this.nextShape = this.randomShape();

    //this.cells = Cell[this.COLUMNS][this.ROWS];
    for (let x = 0; x < this.COLUMNS; x++) {
      this.cells[x] = []; // create nested array
      for (let y = 0; y < this.ROWS; y++) {
        this.cells[x][y] = new Cell();
      }
    }

    /* add first shape */
    this.getNextShape();

    // player score
    this.score = 0;
		
		this.end = false;
  }

  draw() {

    /* set cells stroke (border) */
    stroke(0);
    strokeWeight(1);

    /* Cycles for draw cells */
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {

        let c = this.cells[x][y]; // get cell

        // set cell color
        if (c.empty) {
          fill(30); // empty cell
        } else {
          fill(c.col); // occupied cell
        }

        let cx, cy; // cell x, y
        cx = x * this.CELL_SIZE;
        cy = y * this.CELL_SIZE;

        rect(cx, cy, this.CELL_SIZE, this.CELL_SIZE); // draw cell as box
      }
    }
  }

  drawPredictedPosition() {

    /* 1. Get borders and values from active shape */

    let minX = this.COLUMNS, minY = this.ROWS, maxX = 0, maxY = 0;
    let shapeExists = false;

    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y];
        if (c.active) {
          if (minX > x) {
            minX = x;
          }
          if (minY > y) {
            minY = y;
          }
          if (maxX < x) {
            maxX = x;
          }
          if (maxY < y) {
            maxY = y;
          }
          shapeExists = true;
        }
      }
    }

    if (!shapeExists) { 
      return;
    }

    // increase the interval area, as total maximum
    maxX++;
    maxY++;

    let sx, sy; // shape x, y
    sx = minX;
    sy = minY;

    let w, h; // width, height
    w = maxX - minX;
    h = maxY - minY;

    /* 2. Get shape cells to array */

    let s = []; // new shape
    for (let x = 0; x < w; x++) {
      s[x] = [];
    }

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        // get only active region, where is the shape
        if (sx+x >= minX && sy+y >= minY && sx+x < maxX && sy+y < maxY) {
          if (this.cells[sx+x][sy+y].active) {
            s[x][y] = 1;
          } else {
            s[x][y] = 0;
          }
        }
      }
    }

    let collision = false;
    do {
      sy++;

      if (sy + h > this.ROWS) { 
        collision = true;
      }

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (s[x][y] == 1) {

            let cx, cy;
            cx = sx + x;
            cy = sy + y;

            if (cx >= 0 && cy >= 0 && cx < this.COLUMNS && cy < this.ROWS) {

              if (!this.cells[cx][cy].empty && !this.cells[cx][cy].active) { 
                collision = true;
              }
            } else {
              collision = true;
            }
          }
        }
      }
    } while (!collision);

    sy--;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (s[x][y] == 1) {

          let cx, cy;
          cx = sx + x;
          cy = sy + y;

          stroke(0);
          fill(255, 80);
          rect(cx*this.CELL_SIZE, cy*this.CELL_SIZE, this.CELL_SIZE, this.CELL_SIZE);
        }
      }
    }
  }

  rotateShape() {

    /* 1. Get borders and values from active shape */

    let minX = this.COLUMNS, minY = this.ROWS, maxX = 0, maxY = 0;
    let shapeExists = false;
    let col = 0; // shape color

    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y];
        if (c.active) {
          if (col == 0) { 
            col = c.col;
          } // get shape color

          if (minX > x) {
            minX = x;
          }
          if (minY > y) {
            minY = y;
          }
          if (maxX < x) {
            maxX = x;
          }
          if (maxY < y) {
            maxY = y;
          }
          shapeExists = true;
        }
      }
    }

    if (!shapeExists) { 
      return;
    } // shape doesnt exists

    // increase the interval area, as total maximum
    maxX++;
    maxY++;

    let sx, sy; // shape x, y
    sx = minX;
    sy = minY;

    let w, h; // width, height
    w = maxX - minX;
    h = maxY - minY;

    /* 2. Get shape cells to array */

    let s = [w*h]; // shape
    let i = 0; // index of array

    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        // get only active region, where is the shape
        if (x >= minX && y >= minY && x < maxX && y < maxY) {
          if (this.cells[x][y].active) {
            s[i] = 1;
          } else {
            s[i] = 0;
          }
          i++;
        }
      }
    }


    /* 3. Create 90deg rotated 2D array from shape cells array */
    let ns = []; // new shape
    for (let x = w-1; x >= 0; x--) {
      ns[x] = [];
    }

    i = 0;

    for (let y = h-1; y >= 0; y--) {
      for (let x = 0; x < w; x++) {
        ns[x][y] = s[i]; 
        i++;
      }
    }

    /* 4. Test rotated shape, if it fits */

    let dwh = w - h; // delta w, h

    for (let y = 0; y < w; y++) {
      for (let x = 0; x < h; x++) {
        if (ns[y][x] == 1) {

          let cx = 0, cy = 0; // cell x, y
          cx = sx + x + int(dwh/2); // centered & shifted cell pos
          cy = sy + y - int(dwh/2); 

          // exclude offscreen rotation
          if (cy < 0 || cx < 0 || cx >= this.COLUMNS || cy >= this.ROWS) {
            return;
          }

          let c = this.cells[cx][cy]; // get cell

          // exclude existing cells overlay
          if (!c.empty && !c.active) { 
            return;
          }
        }
      }
    }

    /* 5. Clear active cells */

    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y]; 
        if (c.active) {
          this.cells[x][y] = new Cell();
        }
      }
    }

    /* 6. Enable cells, where is rotated shape  */

    for (let y = 0; y < w; y++) {
      for (let x = 0; x < h; x++) {
        if (ns[y][x] == 1) {
          let cx, cy; // cell x, y

          cx = sx + x + int(dwh/2); // centered & shifted cell pos
          cy = sy + y - int(dwh/2); 

          // set cells to active as rotated shape
          this.cells[cx][cy].empty = false; 
          this.cells[cx][cy].active = true; 
          this.cells[cx][cy].col = col;
        }
      }
    }
  }

  step() {

    if (!this.isMovePossible(0, 1)) { 
      return true;
    }

    for (let y = this.ROWS-1; y >= 0; y--) {
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y]; 
        if (c.active) {

          if (y >= this.ROWS-1) { 
            return true;
          }

          if (this.cells[x][y+1].empty) {
            this.cells[x][y+1] = c; 
            this.cells[x][y] = new Cell();
          } else {
            return true;
          }
        }
      }
    }
    return false;
  }

  randomShape() {
    return shapes[int(random(shapes.length))];
  }

  addShape(s) { // shape

    let w = s[0].length; // get shape width
    let h = s.length; // get shape height

    let wshift = int(this.COLUMNS/2.0 - w/2.0); // width center shift

    let col = COLOR[int(random(COLOR.length))]; // get random color

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (s[y][x] == 1) {

          let cx, cy; // cell x, y¨
          cx = x + wshift; 
          cy = y; 

          if (!this.cells[cx][cy].empty) { 
            return true;
          }

          this.cells[cx][cy].empty = false; 
          this.cells[cx][cy].active = true; 
          this.cells[cx][cy].col = col;
        }
      }
    }
    return false;
  }

  isMovePossible(dirX, dirY) {
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y]; 
        if (c.active) {

          if (x+dirX < 0 || x+dirX > this.COLUMNS-1 || y+dirY < 0 || y+dirY > this.ROWS-1) { 
            return false;
          }

          let nc = this.cells[x+dirX][y+dirY]; // neighbor cell

          if (!nc.active && !nc.empty) {
            return false;
          }
        }
      }
    }
    return true;
  }

  moveX(dir) { // left or right move

    // if it is not possible to move
    if (!this.isMovePossible(dir, 0)) { 
      return;
    }

    for (let y = 0; y < this.ROWS; y++) {

      if (dir == 1) {
        for (let x = this.COLUMNS-1; x >= 0; x--) {
          let c = this.cells[x][y]; 
          if (c.active) {
            this.cells[x+1][y] = c; 
            this.cells[x][y] = new Cell();
          }
        }
      }
      if (dir == -1) {
        for (let x = 0; x < this.COLUMNS; x++) {
          let c = this.cells[x][y]; 
          if (c.active) {
            this.cells[x-1][y] = c; 
            this.cells[x][y] = new Cell();
          }
        }
      }
    }
  }

  getNextShape() {
    this.score += 5;
    // every active cell gets deactivated
    this.disableCells(); 
    // finds out if any row is filled
    this.score += this.destroyFilledRows() * 100; 
    // add new random shape to the game
    if (this.addShape(this.nextShape)) { // TRUE = no space for new shape
      // new shape collided, game ended

      var data = {
        name: player_name,
        score: this.score,
				duration: int(millis()/1000)
      };
      socket.emit('new-score',data);
			
			document.getElementById("score-input").value = field.score;
			document.getElementById('endForm').submit()
			
			this.end = true;
			
			return;
    }

    this.nextShape = this.randomShape();
  }

  disableCells() {
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y]; 
        c.active = false;
      }
    }
  }

  destroyFilledRows() {
    let n = 0; // number of destroyed rows

    for (let y = 0; y < this.ROWS; y++) {
      let isFilled = true; 
      for (let x = 0; x < this.COLUMNS; x++) {
        let c = this.cells[x][y]; 
        if (c.empty) {
          isFilled = false;
        }
      }
      if (isFilled) {
        this.destroyRow(y); 
        n++;
      }
    }

    return n;
  }

  destroyRow(row) {

    // moves each line down one
    for (let y = row; y > 0; y--) {
      for (let x = 0; x < this.COLUMNS; x++) {
        this.cells[x][y] = this.cells[x][y-1];
      }
    }

    // first top row must be recreated, due to referencing common cells
    for (let x = 0; x < this.COLUMNS; x++) {
      this.cells[x][0] = new Cell();
    }
  }

  restart() {
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        this.cells[x][y] = new Cell();
      }
    }

    this.score = 0;

    this.nextShape = this.randomShape();
    this.getNextShape();

    this.end = false;
  }
}
