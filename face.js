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
function Face(hourParam, minuteParam, eyeballSize, eyeYOffset, pupilOffset, eyeCorner1, eyeCorner2, clockCorner1, clockCorner2, clockCorner3, clockCorner4) {
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

  // Clock face parameters
  this.clockSize = 200; // base clock size
  this.clockX = 2; // clock X location
  this.clockY = 2; // clock Y location
  this.notchSize = 10; // notch size
  this.clockColor = color(255); // clock colour
  this.shadowColor = color(0, 255); // clock shadow colour
  this.shadowOffset = 5; // shadow offset
  this.notchColor = color(0); // notch colour
  
  this.handColor = 0; // hand colour
  this.eyeX = this.clockX - 50; // eye X location (reletave to clockX)
  this.eyeY = this.clockY - 90; // eye Y location (reletave to clockY)
  this.eyeSize = 70; // eye size
  this.eyeRightOffset = 100; // second eye X offset



  this.hourParam = 0; // hour hand
  this.minuteParam = 0; // minute hand
  this.eyeballSize = 25; // eyeball Size
  this.eyeYOffset = 10; // eyeYOffset
  this.pupilOffset = 10; // pupil offset
  this.eyeCorner1 = 25; // eye roundness 1
  this.eyeCorner2 = 25; // eye roundness 2
  this.clockCorner1 = 50; // clock roundness 1
  this.clockCorner2 = 50; // clock roundness 2
  this.clockCorner3 = 50; // clock roundness 3
  this.clockCorner4 = 50; // clock roundness 4




  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {


  



// Left Eye Base
noStroke()
fill(this.clockColor)
rect(this.eyeX, this.eyeY + this.eyeYOffset, this.eyeSize, this.eyeSize + 40, this.eyeCorner1, this.eyeCorner2)

// Left Eye Ball
fill(this.notchColor);
ellipse(this.eyeX, this.eyeY -10, this.eyeballSize, this.eyeballSize)

// Left Eye Pupil
fill(this.clockColor)
ellipse(this.eyeX + this.pupilOffset, this.eyeY -10, this.eyeballSize/2 + 8, this.eyeballSize/1.5)

// Right Eye Base
noStroke()
fill(this.clockColor)
rect(this.eyeX + this.eyeRightOffset, this.eyeY + this.eyeYOffset, this.eyeSize, this.eyeSize + 40, this.eyeCorner1, this.eyeCorner2)

// Right Eye Ball
fill(this.notchColor);
ellipse(this.eyeX + this.eyeRightOffset, this.eyeY -10, this.eyeballSize, this.eyeballSize)

// Right Eye Pupil
fill(this.clockColor)
ellipse(this.eyeX + this.pupilOffset + this.eyeRightOffset, this.eyeY -10, this.eyeballSize/2 + 8, this.eyeballSize/1.5)

// Draw clock shadow
fill(this.shadowColor);
rect(this.clockX + this.shadowOffset, this.clockY + this.shadowOffset, this.clockSize, this.clockSize, this.clockCorner1, this.clockCorner2, this.clockCorner3, this.clockCorner4);

// Draw clock face
fill(this.clockColor);
rect(this.clockX, this.clockY, this.clockSize, this.clockSize, this.clockCorner1, this.clockCorner2, this.clockCorner3, this.clockCorner4);

// Draw hour notches
strokeWeight(4);
stroke(this.notchColor);
noFill();
for (let i = 0; i < 12; i++) {
  let angle = i * 30 - 90; // 30 degrees per hour
  let x1 = this.clockX + cos(angle) * (this.clockSize / 2 - this.notchSize);
  let y1 = this.clockY + sin(angle) * (this.clockSize / 2 - this.notchSize);
  let x2 = this.clockX + cos(angle) * (this.clockSize / 2);
  let y2 = this.clockY + sin(angle) * (this.clockSize / 2);
  line(x1, y1, x2, y2);
}

// Draw hour hand
let hourSize = this.clockSize / 2;
let hourAngle = map(this.hourParam % 12, 0, 12, 0, 360);
strokeWeight(5);
stroke(this.handColor);
line(this.clockX, this.clockY, this.clockX + cos(hourAngle - 90) * hourSize, this.clockY + sin(hourAngle - 90) * hourSize);

// Draw minute hand
let minuteSize = this.clockSize / 2.5;
let minuteAngle = map(this.minuteParam, 0, 60, 0, 360);
strokeWeight(5);
stroke(this.handColor);
line(this.clockX, this.clockY, this.clockX + cos(minuteAngle - 90) * minuteSize, this.clockY + sin(minuteAngle - 90) * minuteSize);











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
    this.hourParam = map(settings[0], 0, 100, 11, 0)
    this.minuteParam = map(settings[1], 0, 100, 59, 0)
    this.eyeballSize = map(settings[2], 0, 100, 50, 10)
    this.eyeYOffset = map(settings[3], 0, 100, 15, 0)
    this.pupilOffset = map(settings[4], 0, 100, 10, -10)
    this.eyeCorner1 = map(settings[5], 0, 100, 50, 10)
    this.eyeCorner2 = map(settings[6], 0, 100, 50, 10)
    this.clockCorner1 = map(settings[7], 0, 100, 100, 10)
    this.clockCorner2 = map(settings[8], 0, 100, 100, 10)
    this.clockCorner3 = map(settings[9], 0, 100, 100, 10)
    this.clockCorner4 = map(settings[10], 0, 100, 100, 10)
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.hourParam, 0, 11, 0, 100);
    settings[1] = map(this.minuteParam, 0, 59, 0, 100);
    settings[2] = map(this.eyeballSize, 10, 50, 0, 100);
    settings[3] = map(this.eyeYOffset, 0, 15, 0, 100);
    settings[4] = map(this.pupilOffset, -10, 10, 0, 100);
    settings[5] = map(this.eyeCorner1, 10, 50, 0, 100);
    settings[6] = map(this.eyeCorner2, 10, 50, 0, 100);
    settings[7] = map(this.clockCorner1, 10, 100, 0, 100);
    settings[8] = map(this.clockCorner2, 10, 100, 0, 100);
    settings[9] = map(this.clockCorner3, 10, 100, 0, 100);
    settings[10] = map(this.clockCorner4, 10, 100, 0, 100);
    return settings;
  }
}
