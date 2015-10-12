

var gem = Math.random();
var gem_arr = ['red','orange','yellow','green','blue','violet'];

var gem_width = 8;
var gem_length = 8;
var gem_pixel = 32;
var color;

var game = new Phaser.Game(gem_width*gem_pixel, gem_length*gem_pixel, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

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
  for ( i = 0; i < gem_width; i+=1 ) {
    for (var j = 0; j < gem_length; j += 1){
      if ( i < 2 && j < 2) {
        field[i][j] = sel_gem(gem_arr);
        color = field[i][j];
        game.add.sprite(i*gem_pixel,j*gem_pixel,color);
      }
      else if (i < 2 && j >= 2) {
        do{
          field[i][j] = sel_gem(gem_arr);
          color = field[i][j];
        }
        while (field[i][j] == field[i][j-1] && field[i][j-1] == field[i][j-2]);
        game.add.sprite(i*gem_pixel,j*gem_pixel,color);
      }
      else if (i >= 2 && j < 2) {
        do{
          field[i][j] = sel_gem(gem_arr);
          color = field[i][j];
        }
        while (field[i][j] == field[i-1][j] && field[i-1][j] == field[i-2][j]);
        game.add.sprite(i*gem_pixel,j*gem_pixel,color);
      }
      else {
        do {
          field[i][j] = sel_gem(gem_arr);
          color = field[i][j];
        } while ((field[i][j] == field[i-1][j] && field[i-1][j] == field[i-2][j])||(field[i][j] == field[i][j-1] && field[i][j-1] == field[i][j-2]));
        game.add.sprite(i*gem_pixel,j*gem_pixel,color);
      }
    }
  }
};
