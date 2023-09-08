import pygame
import random

# Initialize Pygame
pygame.init()

# Set up the game window
screen_width = 288
screen_height = 512
window = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Flappy Bird")

# Load game assets
background_image = pygame.image.load("pygame/images/background.png")
bird_image = pygame.image.load("pygame/images/flappy.png")
pipe_image = pygame.image.load("pygame/images/pipe.png")

# Define game variables
gravity = 0.25
bird_movement = 0
bird_position = [50, screen_height // 2]
pipe_height = 300
pipe_width = 70
pipe_gap = 150
pipe_x = screen_width

clock = pygame.time.Clock()

# Function to draw objects on the screen
def draw_objects():
    window.blit(background_image, (0, 0))
    window.blit(bird_image, bird_position)
    window.blit(pipe_image, (pipe_x, pipe_height))
    window.blit(pipe_image, (pipe_x, pipe_height + pipe_gap))

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                bird_movement = 0
                bird_movement -= 6

    # Update bird position and apply gravity
    bird_movement += gravity
    bird_position[1] += bird_movement

    # Update pipe position
    pipe_x -= 2
    if pipe_x < -pipe_width:
        pipe_x = screen_width
        pipe_height = random.randint(150, 350)

    # Collision detection
    bird_rect = pygame.Rect(bird_image.get_rect())
    bird_rect.left = bird_position[0]
    bird_rect.top = bird_position[1]

    pipe_rect1 = pygame.Rect(pipe_image.get_rect())
    pipe_rect1.left = pipe_x
    pipe_rect1.bottom = pipe_height

    pipe_rect2 = pygame.Rect(pipe_image.get_rect())
    pipe_rect2.left = pipe_x
    pipe_rect2.top = pipe_height + pipe_gap

    if bird_rect.colliderect(pipe_rect1) or bird_rect.colliderect(pipe_rect2):
        running = False

    # Draw objects on the screen
    draw_objects()

    # Update the game display
    pygame.display.update()

    # Set the frame rate
    clock.tick(60)

# Quit the game
pygame.quit()