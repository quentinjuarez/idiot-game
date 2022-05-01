<template>
  <div>
    <div class="dice-container" ref="container" @click="roll">
      <div class="dice" ref="dice">
        <div class="face" data-id="1">
          <div class="point point-middle point-center"></div>
        </div>
        <div class="face" data-id="2">
          <div class="point point-top point-right"></div>
          <div class="point point-bottom point-left"></div>
        </div>
        <div class="face" data-id="6">
          <div class="point point-top point-right"></div>
          <div class="point point-top point-left"></div>
          <div class="point point-middle point-right"></div>
          <div class="point point-middle point-left"></div>
          <div class="point point-bottom point-right"></div>
          <div class="point point-bottom point-left"></div>
        </div>
        <div class="face" data-id="5">
          <div class="point point-top point-right"></div>
          <div class="point point-top point-left"></div>
          <div class="point point-middle point-center"></div>
          <div class="point point-bottom point-right"></div>
          <div class="point point-bottom point-left"></div>
        </div>
        <div class="face" data-id="3">
          <div class="point point-top point-right"></div>
          <div class="point point-middle point-center"></div>
          <div class="point point-bottom point-left"></div>
        </div>
        <div class="face" data-id="4">
          <div class="point point-top point-right"></div>
          <div class="point point-top point-left"></div>
          <div class="point point-bottom point-right"></div>
          <div class="point point-bottom point-left"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
export default {
  props: {
    stopRoll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      angleX: 0,
      angleY: 0,
      result: 1,
      delay: 0,
      canRoll: true,
      rollMax: 8,
    };
  },
  mounted() {},
  methods: {
    roll() {
      if (!this.canRoll || this.stopRoll) return;
      this.canRoll = false;
      const { dice } = this.$refs;

      const xTurn = 4 + getRandomInt(this.rollMax),
        yTurn = 4 + getRandomInt(this.rollMax);

      this.delay = Math.max(xTurn, yTurn) * 150;

      this.angleX += 90 * xTurn;
      this.angleY += 90 * yTurn;
      // balancing the results
      if (this.angleX % 180) {
        getRandomInt(3) > 1 && (this.angleX += 90);
      }

      dice.style.transform =
        "rotateX(" + this.angleX + "deg) rotateY(" + this.angleY + "deg)";
      dice.style.transitionDuration = this.delay + "ms";

      let x = this.angleX % 360,
        y = this.angleY % 360;

      if (x === 0 || x === 180) {
        switch ((x + y) % 360) {
          case 0:
            this.result = 1;
            break;
          case 90:
            this.result = 5;
            break;
          case 180:
            this.result = 6;
            break;
          case 270:
            this.result = 2;
            break;
          default:
            console.error(123456);
        }
      } else if (x === 90) {
        this.result = 4;
      } else if (x === 270) {
        this.result = 3;
      }

      setTimeout(() => {
        this.canRoll = true;
        this.$emit("roll", this.result);
      }, this.delay);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

$border-radius: 1vmin;
$duration: 2s;
$face-size: 25vmin;
$point-size: 5vmin;
$point-position: 2.5vmin;
$face-length: 25vmin;

body {
  min-height: 100vh;
  background: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.dice-container {
  width: $face-size;
  aspect-ratio: 1;
  cursor: pointer;
}

.dice {
  position: relative;
  width: $face-size;
  aspect-ratio: 1;
  border-radius: $border-radius;
  transform-style: preserve-3d;
  transform-origin: 50% 50% ($face-size * -0.5);
  transform: rotateX(180deg) rotateY(180deg);
  transition: transform $duration ease-in-out;
}

.face {
  position: absolute;
  background: radial-gradient(circle at center, #eee, #ccc);
  width: $face-size;
  aspect-ratio: 1;
  border-radius: $border-radius;
  transform: rotateX(0deg) rotateY(180deg);
  transform-origin: 50% 50% ($face-size * -0.5);
  /*backface-visibility: hidden;*/
}

.face:nth-child(1) {
  transform: rotateY(0deg);
}

.face:nth-child(2) {
  transform: rotateY(90deg);
}

.face:nth-child(3) {
  transform: rotateY(180deg);
}

.face:nth-child(4) {
  transform: rotateY(270deg);
}

.face:nth-child(5) {
  transform: rotateX(90deg);
}

.face:nth-child(6) {
  transform: rotateX(270deg);
}

.point {
  position: absolute;
  width: $point-size;
  aspect-ratio: 1;
  border-radius: 100%;
  align-self: center;
  justify-self: center;
  background: #444;
  box-shadow: inset 5px 0 10px #222;
}

.point-top {
  top: $point-position;
}

.point-middle {
  top: ($face-size - $point-size)/2;
}

.point-bottom {
  bottom: $point-position;
}

.point-left {
  left: $point-position;
}

.point-center {
  left: ($face-size - $point-size)/2;
}

.point-right {
  right: $point-position;
}

.roll-btn {
  margin-top: 2rem;
}
</style>
