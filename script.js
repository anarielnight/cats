

var gem = Math.random();
var gem_arr = ['red','orange','yellow','green','blue','violet'];

var gem_width = 8;
var gem_length = 8;
var gem_pixel = 32;
var color;
var score = 0;


var game = new Phaser.Game(gem_width*gem_pixel, gem_length*gem_pixel, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var field = new Array();
for (i = 0; i < gem_width; i += 1) {
  field[i] = new Array();
};


/*Ф-ция случайно выбирает один из элементов массива с картинками*/
var sel_gem = function(gem_arr){
  gem = Math.random();
  var gem_id = Math.floor( gem * gem_arr.length );
  return gem_arr[gem_id];
};

function change(first_i, first_j, sec_i, sec_j) {
  tmp = field[first_i][first_j].clr;
  field[first_i][first_j].clr = field[sec_i][sec_j].clr;
  field[sec_i][sec_j].clr = tmp;

  field[first_i][first_j].stn.x = sec_j * gem_pixel;
  field[first_i][first_j].stn.y = sec_i * gem_pixel;
  field[sec_i][sec_j].stn.x = first_j * gem_pixel;
  field[sec_i][sec_j].stn.y = first_i * gem_pixel;

  /*for ( i = 1; i < gem_width - 1; i += 1) {
    for ( j = 1; j < gem_length - 1; j += 1) {
      if ( (field[i-1][j] == field[i][j] == field[i+1][j]) || (field[i][j-1] == field[i][j] == field[i][j+1]) ) {
        field[i][j] = gem[0];
      }
    }
  }*/
};

function pregame(timer) {
  var rand_i = Math.floor( Math.random * gem_width );
  var rand_j = Math.floor( Math.random * gem_length );
  //setInterval(change(rand_i,rand_j,rand_i+1,rand_j),timer);
  setInterval(function () {
    change(rand_i,rand_j,rand_i+1,rand_j);
  },timer);
  console.log(1);
}

/*Предзагрузка картинок*/
function preload() {
  game.load.image('red','img/red.png');
  game.load.image('orange','img/orange.png');
  game.load.image('yellow','img/yellow.png');
  game.load.image('green','img/green.png');
  game.load.image('blue','img/blue.png');
  game.load.image('violet','img/violet.png');
};
/*Начальное заполнение поля*/
function create() {
  for ( i = 0; i < gem_width; i += 1 ) {
    for (var j = 0; j < gem_length; j += 1){
    //  var cat = new Object();
      if ( i < 2 && j < 2) {
        field[i][j] = {
          clr: sel_gem(gem_arr)
        }
        field[i][j].stn = game.add.sprite(i*gem_pixel,j*gem_pixel,field[i][j].clr);
      }
      else if (i < 2 && j >= 2) {
        do{
          field[i][j] = {
            clr: sel_gem(gem_arr)
          }
        }
        while (field[i][j].clr == field[i][j-1].clr && field[i][j-1].clr == field[i][j-2].clr);
        field[i][j].stn = game.add.sprite(i*gem_pixel,j*gem_pixel,field[i][j].clr);
      }
      else if (i >= 2 && j < 2) {
        do{
          field[i][j] = {
            clr: sel_gem(gem_arr)
          }
        }
        while (field[i][j].clr == field[i-1][j].clr && field[i-1][j].clr == field[i-2][j].clr);
        field[i][j].stn = game.add.sprite(i*gem_pixel,j*gem_pixel,field[i][j].clr);
      }
      else {
        do {
          field[i][j] = {
            clr: sel_gem(gem_arr)
          }
        } while ((field[i][j].clr == field[i-1][j].clr && field[i-1][j].clr == field[i-2][j].clr)||(field[i][j].clr == field[i][j-1].clr && field[i][j-1].clr == field[i][j-2].clr));
        field[i][j].stn = game.add.sprite(i*gem_pixel,j*gem_pixel,field[i][j].clr);
      }
      console.log(field[i][j].clr, i, j);
    }
  }
};

function update() {
  var rand_i = Math.floor( Math.random() * (gem_width-1) );
  var rand_j = Math.floor( Math.random() * (gem_length-1) );
  console.log(rand_i, rand_j);
  //pregame(5000);
  change(rand_i,rand_j,rand_i+1,rand_j);
};
