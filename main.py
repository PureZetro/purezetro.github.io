import random

def guess_the_number():
    print("====================================")
    print("Welcome to the Number Guessing Game!")
    print("====================================")
    print("I'm thinking of a number between 1 and 100.")
    
    # The computer picks a random number from 1 to 100
    secret_number = random.randint(1, 100)
    attempts = 0
    guessed_correctly = False
    
    # Loop keeps running until the player guesses the right number
    while not guessed_correctly:
        try:
            # Get input from the player and convert it to an integer
            user_guess = int(input("\nEnter your guess: "))
            attempts += 1
            
            if user_guess < secret_number:
                print("Too low! Try a higher number.")
            elif user_guess > secret_number:
                print("Too high! Try a lower number.")
            else:
                print(f"\n🎉 Congratulations! You guessed it in {attempts} attempts!")
                guessed_correctly = True
                
        except ValueError:
            # Handles the error if the user types letters instead of numbers
            print("Invalid input. Please enter a valid number.")

# This triggers the game to start when you run the script
if __name__ == "__main__":
    guess_the_number()
