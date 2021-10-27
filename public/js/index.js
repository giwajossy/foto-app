
// read and update slider value as user slides back or forth
document.getElementById("customRangeQuality").addEventListener("mouseup", function() {
    document.getElementById("qualityValue").innerHTML = `Quality: <span id="value">&nbsp;+${this.value}%</span>`
})

document.getElementById("customRangeRadius").addEventListener("mouseup", function() {
    document.getElementById("cornerRadiusValue").innerHTML = `Corner Radius: <span id="value">&nbsp;${this.value}px</span>`
})

document.getElementById("customRangeAngle").addEventListener("mouseup", function() {
    document.getElementById("rotationAngleValue").innerHTML = `Rotation Angle: <span id="value">&nbsp;${this.value}<sup>o</sup></span>`
})
            