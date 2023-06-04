/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 11;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];



// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face(hourParam, minuteParam, eyeballSize, pupilOffset, eyeCorner1, eyeCorner2, clockCorner1, clockCorner2, clockCorner3, clockCorner4) {
  // Clock face parameters
  this.clockSize = 5; // base clock size
  this.clockX = 0; // clock X location
  this.clockY = 0; // clock Y location
  this.notchSize = 0.6; // notch size
  
  this.shadowColor = color(0, 255); // clock shadow colour
  this.shadowOffset = 0.2; // shadow offset

  

  this.eyeSize = 1.6; // eye size

  this.clockColor = color(100); // clock colour

  this.hourParam = 0; // hour hand
  this.minuteParam = 0; // minute hand
  this.eyeballSize = 1; // eyeball Size
  this.pupilOffset = 0; // pupil offset
  this.eyeCorner1 = 1; // eye roundness 1
  this.eyeCorner2 = 1; // eye roundness 2
  this.clockCorner1 = 1.5; // clock roundness 1
  this.clockCorner2 = 1.5; // clock roundness 2
  this.clockCorner3 = 1.5; // clock roundness 3
  this.clockCorner4 = 1.5; // clock roundness 4

  this.pupilSize = 0.5;

  this.strokeThick = 0; // stroke weight 
  this.strokeColor = color(255); // notch colour

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {


    this.averageLeftEye = segment_average(positions.left_eye)
    this.averageRightEye = segment_average(positions.right_eye)


    push();
    rectMode(CENTER)





    


    // Draw clock shadow
    noStroke();
    fill(this.strokeColor);
    rect(this.clockX + this.shadowOffset, this.clockY + this.shadowOffset, this.clockSize, this.clockSize, this.clockCorner1, this.clockCorner2, this.clockCorner3, this.clockCorner4);

    // Draw clock face
    fill(this.clockColor);
    rect(this.clockX, this.clockY, this.clockSize, this.clockSize, this.clockCorner1, this.clockCorner2, this.clockCorner3, this.clockCorner4);

    // Draw hour notches
    strokeWeight(this.strokeThick);
    stroke(this.strokeColor);
    noFill();
    for (let i = 0; i < 12; i++) {
      let angle = i * 30 - 90; // 30 degrees per hour
      let x1 = this.clockX + cos(angle) * (this.clockSize / 2 - this.notchSize);
      let y1 = this.clockY + sin(angle) * (this.clockSize / 2 - this.notchSize);
      let x2 = this.clockX + cos(angle) * (this.clockSize / 2);
      let y2 = this.clockY + sin(angle) * (this.clockSize / 2);
      line(x1, y1, x2, y2);
    }



    this.topNose = positions.nose_bridge[0]
    this.bottomNose = positions.nose_tip[2]

    this.facingRightNose = positions.nose_tip[4]
    this.facingLeftNose = positions.nose_tip[0]
    this.noisePoint;

    if(this.bottomNose < this.topNose){
      this.noisePoint = this.facingRightNose;
      this.pupilOffset = -0.2
    }
    else{
      this.noisePoint = this.facingLeftNose;
      this.pupilOffset = 0.2
    }



    //Nose
    stroke(this.strokeColor);
    strokeWeight(0.2)
    line(this.topNose[0], this.topNose[1] + 0.4, this.bottomNose[0], this.bottomNose[1] + 0.4)
    line(this.bottomNose[0], this.bottomNose[1] + 0.4, this.noisePoint[0], this.noisePoint[1] + 0.4)

   

    // Left Eye Base
    strokeWeight(0.05)
    fill(this.clockColor)
    rect(this.averageLeftEye[0], this.averageLeftEye[1], this.eyeSize, this.eyeSize, this.eyeCorner1, this.eyeCorner2)

    // Left Eye Ball
    fill(this.strokeColor);
    ellipse(this.averageLeftEye[0], this.averageLeftEye[1], this.eyeballSize, this.eyeballSize)

    // Left Eye Pupil
    fill(this.clockColor)
    ellipse(this.averageLeftEye[0] + this.pupilOffset, this.averageLeftEye[1], this.eyeballSize*0.6, this.eyeballSize* this.pupilSize)

    // Right Eye Base
    strokeWeight(0.05)
    fill(this.clockColor)
    rect(this.averageRightEye[0], this.averageRightEye[1], this.eyeSize, this.eyeSize, this.eyeCorner1, this.eyeCorner2)

    // Right Eye Ball
    fill(this.strokeColor);
    ellipse(this.averageRightEye[0], this.averageRightEye[1], this.eyeballSize, this.eyeballSize)

    // Right Eye Pupil
    fill(this.clockColor)
    ellipse(this.averageRightEye[0] + this.pupilOffset, this.averageRightEye[1], this.eyeballSize*0.6, this.eyeballSize* this.pupilSize)

    // // Draw hour hand
    // let hourSize = this.clockSize / 2;
    // let hourAngle = map(this.hourParam % 12, 0, 12, 0, 360);
    // strokeWeight(0.3);
    // stroke(this.strokeColor);
    // line(this.clockX, this.clockY, this.clockX + cos(hourAngle - 90) * hourSize, this.clockY + sin(hourAngle - 90) * hourSize);

    // // Draw minute hand
    // let minuteSize = this.clockSize / 2.5;
    // let minuteAngle = map(this.minuteParam, 0, 60, 0, 360);
    // strokeWeight(0.3);
    // stroke(this.strokeColor);
    // line(this.clockX, this.clockY, this.clockX + cos(minuteAngle - 90) * minuteSize, this.clockY + sin(minuteAngle - 90) * minuteSize);

   


    pop();

  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.clockColor = map(settings[0], 0, 100, 80, 255)
    this.pupilSize = map(settings[1], 0, 100, 0.3, 0.8)
    this.eyeballSize = map(settings[2], 0, 100, 0.5, 1.6)
    this.strokeThick = map(settings[3], 0, 100, 0.2, 0.4)
    this.strokeColor = map(settings[4], 0, 100, 0, 200)
    this.eyeCorner1 = map(settings[5], 0, 100, 0.2, 2)
    this.eyeCorner2 = map(settings[6], 0, 100, 0.2, 2)
    this.clockCorner1 = map(settings[7], 0, 100, 0, 3)
    this.clockCorner2 = map(settings[8], 0, 100, 0, 3)
    this.clockCorner3 = map(settings[9], 0, 100, 0, 3)
    this.clockCorner4 = map(settings[10], 0, 100, 0, 3)
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.clockColor, 80, 255, 0, 100);
    settings[1] = map(this.pupilSize, 0.3, 0.8, 0, 100);
    settings[2] = map(this.eyeballSize, 0.5, 1.6, 0, 100);
    settings[3] = map(this.strokeThick, 0.2, 0.4, 0, 100);
    settings[4] = map(this.strokeColor, 0, 200, 0, 100);
    settings[5] = map(this.eyeCorner1, 0.2, 2, 0, 100);
    settings[6] = map(this.eyeCorner2, 0.2, 2, 0, 100);
    settings[7] = map(this.clockCorner1, 0, 3, 0, 100);
    settings[8] = map(this.clockCorner2, 0, 3, 0, 100);
    settings[9] = map(this.clockCorner3, 0, 3, 0, 100);
    settings[10] = map(this.clockCorner4, 0, 3, 0, 100);

    return settings;
  }
}



  // these are state variables for a face
  // (your variables should be different!)
  // this.detailColour = [204, 136, 17];
  // this.mainColour = [51, 119, 153];
  // this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  // this.eye_shift = -1;   // range is -10 to 10
  // this.mouth_size = 1;  // range is 0.5 to 8

  // this.chinColour = [153, 153, 51]
  // this.lipColour = [136, 68, 68]
  // this.eyebrowColour = [119, 85, 17]


 //   console.log()
  
  //   // head
  //   ellipseMode(CENTER);
  //   stroke(stroke_color);
  //   fill(this.mainColour);
  //   ellipse(segment_average(positions.chin)[0], 0, 3, 4);
  //   noStroke();


  //   // mouth
  //   fill(this.detailColour);
  //   ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

  //   // eyebrows
  //   fill( this.eyebrowColour);
  //   stroke( this.eyebrowColour);
  //   strokeWeight(0.08);
  //   this.draw_segment(positions.left_eyebrow);
  //   this.draw_segment(positions.right_eyebrow);

  //   // draw the chin segment using points
  //   fill(this.chinColour);
  //   stroke(this.chinColour);
  //   this.draw_segment(positions.chin);

  //   fill(100, 0, 100);
  //   stroke(100, 0, 100);
  //   this.draw_segment(positions.nose_bridge);
  //   this.draw_segment(positions.nose_tip);

  //   strokeWeight(0.03);

  //   fill(this.lipColour);
  //   stroke(this.lipColour);
  //   this.draw_segment(positions.top_lip);
  //   this.draw_segment(positions.bottom_lip);

  //   let left_eye_pos = segment_average(positions.left_eye);
  //   let right_eye_pos = segment_average(positions.right_eye);

  //   // eyes
  //   noStroke();
  //   let curEyeShift = 0.04 * this.eye_shift;
  //   if(this.num_eyes == 2) {
  //     fill(this.detailColour);
  //     ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
  //     ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

  //     // fill(this.mainColour);
  //     // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
  //     // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
  //   }
  //   else {
  //     let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
  //     let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

  //     fill(this.detailColour);
  //     ellipse(eyePosX, eyePosY, 0.45, 0.27);

  //     fill(this.mainColour);
  //     ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
  //   }
  //  // fill(0)
  //  //ellipse(0,0, 0.5,0.5) center point
  //  //rect(-2,-2,4.5,4) sizing debug 