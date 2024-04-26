from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController

class TicTacToe3D(Entity):
    def __init__(self, size=3):
        super().__init__()
        self.size = size
        self.board = [[[None for _ in range(size)] for _ in range(size)] for _ in range(size)]
        self.players = ['X', 'O', 'Z']
        self.current_player = 0
        self.blocks = []
        
        for z in range(size):
            for y in range(size):
                for x in range(size):
                    b = Button(parent=self, position=(x, y, z), color=color.white, model='cube', origin_y=0.5,
                               texture='white_cube', highlight_color=color.lime, scale=0.9)
                    b.x, b.y, b.z = x, y, z
                    b.on_click = Func(self.make_move, x, y, z, b)
                    self.blocks.append(b)

    def make_move(self, x, y, z, button):
        if self.board[x][y][z] is None:  # Only allow to place if the spot is empty
            self.board[x][y][z] = self.players[self.current_player]
            button.text = self.players[self.current_player]
            button.color = color.azure if self.current_player == 0 else color.orange if self.current_player == 1 else color.green
            self.current_player = (self.current_player + 1) % len(self.players)

def update():
    pass

app = Ursina()

ground = Entity(model='plane', scale=(8, 1, 8), color=color.yellow.tint(-.2), texture='white_cube', texture_scale=(4,4))
sky = Sky()
player = FirstPersonController()
game = TicTacToe3D()

app.run()
