#include <stdio.h>

void rotate(char *str) {
    int i = 0;
    char c;
  
    while (str[i] != '\0') {
        c = str[i];
      
        if (c >= 'a' && c <= 'z') {
            c = ((c - 'a' + 13) % 26) + 'a';  // Rotate lowercase letters
        } 
      
        str[i] = c;
        i++;
    }
}

int main() {
    char message[100];
  
    printf("Enter a message: ");
    fgets(message, sizeof(message), stdin);
  
    rotate(message);
  
    printf("Encrypted message: %s\n", message);
  
    return 0;
}
