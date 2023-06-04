[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/wBh5q70M)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11107056&assignment_repo_type=AssignmentRepo)
## 2023 MDDN342 Assignment 3: Data Mappings - BENJAMIN PILBROW

My overall design for this project uses a base clock as the "face" which can then be mapped on top of a human face, with parameters being changed depending on what the input face looks like. Porting the face code over from Project 2 was a good start, however my orginal design required many adjustments and changes to work within the new framework. Notably I decided to change the posistion of the eyes to be in the same location as the input image so it would match up better. I also removed the hour and minute hands which before were acting as the mouth, and instead decided to map them to the location of the nose for the input image. I thought about keeping both sets of hand for the mouth AND nose, however this would have gotten far too busy so I ended up just sticking with the nose and ditching the mouth.

See below for the list of properties that I used for the training which were manually adjusted using sliders. There are many limitations to the sliders I chose, and I had to simplify many character traits such as sex, hair colour, skin colour, and so on down to very basic values. For instance, the stroke weight of the hour notches indicates if the subject appears male or female, with more male looking people having thicker strokes and more female looking people having thinner strokes. Of course this is not a very advanced way to show these traits, however it seems to work for what it is. 

TRAINING PROPERTIES:

    Clock Colour - Changes between 80, 255. Trained for skin tone. 

    Pupil Size - Changes between 0.3, 0.8. Trained on male / female, where female is thinner and male is thicker. 

    Eyeball Size - Changes between 0.5, 1.6. Trained on how large the eyes are. 

    Stroke Thickness - Changes between 0.2, 0.4. Trained on male / female, where female is thinner and male is thicker.

    Stroke Colour - Changes between 0, 200. Trained on hair colour, where lighter hair makes the stroke lighter, and vice versa. 

    Eye Corner Roundness 1 - Changes between 0.2, 2. Trained on shape of eyes. 

    Eye Corner Roundess 2 - Changes between 0.2, 2. Trained on shape of eyes. 

    Clock Corner Roundness 1 - Changes between 0, 3. Trained on male / female, where female is more often rounder and male is more often sharper.

    Clock Corner Roundness 2 - Changes between 0, 3. Trained on male / female, where female is more often rounder and male is more often sharper.

    Clock Corner Roundness 3 - Changes between 0, 3. Trained on male / female, where female is more often rounder and male is more often sharper.

    Clock Corner Roundness 4 - Changes between 0, 3. Trained on male / female, where female is more often rounder and male is more often sharper.
