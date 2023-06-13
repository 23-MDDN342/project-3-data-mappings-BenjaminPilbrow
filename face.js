/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 11;

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
function Face(eyeballSize, pupilOffset, eyeCorner1, eyeCorner2, clockCorner1, clockCorner2, clockCorner3, clockCorner4) {

  // Clock face parameters
  this.clockSize = 5; // base clock size
  this.clockX = 0; // clock X location
  this.clockY = 0; // clock Y location
  this.notchSize = 0.6; // notch size
  this.shadowOffset = 0.2; // shadow offset
  this.eyeSize = 1.6; // eye size
  this.clockColor = color(100); // clock colour
  this.pupilSize = 0.5; // pupil size
  this.strokeThick = 0; // stroke weight 
  this.strokeColor = color(255); // notch colour
  this.eyeballSize = 1; // eyeball Size
  this.pupilOffset = 0; // pupil offset
  this.eyeCorner1 = 1; // eye roundness 1
  this.eyeCorner2 = 1; // eye roundness 2
  this.clockCorner1 = 1.5; // clock roundness 1
  this.clockCorner2 = 1.5; // clock roundness 2
  this.clockCorner3 = 1.5; // clock roundness 3
  this.clockCorner4 = 1.5; // clock roundness 4

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

    this.averageLeftEye = segment_average(positions.left_eye) // get left eye average pos
    this.averageRightEye = segment_average(positions.right_eye) // get right eye average pos

    this.topNose = positions.nose_bridge[0] // get top of nose position
    this.bottomNose = positions.nose_tip[2] // get bottom of nose position
    this.facingRightNose = positions.nose_tip[4] // value IF facing right
    this.facingLeftNose = positions.nose_tip[0] // value IF facing left
    this.nosePoint; // create nose point

    // Handle facing direction 
    if(this.bottomNose < this.topNose){
      this.nosePoint = this.facingRightNose;
      this.pupilOffset = -0.2
    }
    else{
      this.nosePoint = this.facingLeftNose;
      this.pupilOffset = 0.2
    }

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

    // Nose
    stroke(this.strokeColor);
    strokeWeight(0.2)
    line(this.topNose[0], this.topNose[1] + 0.4, this.bottomNose[0], this.bottomNose[1] + 0.4)
    line(this.bottomNose[0], this.bottomNose[1] + 0.4, this.nosePoint[0], this.nosePoint[1] + 0.4)

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
    this.clockColor = map(settings[0], 0, 100, 80, 255); // clock color
    this.pupilSize = map(settings[1], 0, 100, 0.3, 0.8); // pupil size
    this.eyeballSize = map(settings[2], 0, 100, 0.5, 1.6); // eyeball size
    this.strokeThick = map(settings[3], 0, 100, 0.2, 0.4); // stroke thickness
    this.strokeColor = map(settings[4], 0, 100, 0, 200); // stroke colour
    this.eyeCorner1 = map(settings[5], 0, 100, 0.2, 2); // eye corner roundness 1
    this.eyeCorner2 = map(settings[6], 0, 100, 0.2, 2); // eye corner roundess 2
    this.clockCorner1 = map(settings[7], 0, 100, 0, 3); // clock corner roundness 1
    this.clockCorner2 = map(settings[8], 0, 100, 0, 3); // clock corner roundness 2
    this.clockCorner3 = map(settings[9], 0, 100, 0, 3); // clock corner roundness 3
    this.clockCorner4 = map(settings[10], 0, 100, 0, 3); // clock corner roundness 4
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.clockColor, 80, 255, 0, 100); // clock colour
    settings[1] = map(this.pupilSize, 0.3, 0.8, 0, 100); // pupil size
    settings[2] = map(this.eyeballSize, 0.5, 1.6, 0, 100); // eyeball size
    settings[3] = map(this.strokeThick, 0.2, 0.4, 0, 100); // stroke thickness
    settings[4] = map(this.strokeColor, 0, 200, 0, 100); // stroke colour
    settings[5] = map(this.eyeCorner1, 0.2, 2, 0, 100); // eye corner roundness 1
    settings[6] = map(this.eyeCorner2, 0.2, 2, 0, 100); // eye corner roundess 2
    settings[7] = map(this.clockCorner1, 0, 3, 0, 100); // clock corner roundness 1
    settings[8] = map(this.clockCorner2, 0, 3, 0, 100); // clock corner roundness 2
    settings[9] = map(this.clockCorner3, 0, 3, 0, 100); // clock corner roundness 3
    settings[10] = map(this.clockCorner4, 0, 3, 0, 100); // clock corner roundness 4
    return settings;
  }
}
