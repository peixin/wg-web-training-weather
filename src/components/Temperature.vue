<template>
    <div class="temp">
        <span class="max du">{{max}}</span>
        <span class="split"></span>
        <span class="min du">{{min}}</span>
    </div>
</template>

<script>
  export default {
    name: "Temperature",
    props: {
      min: String,
      max: String
    }
  }
</script>

<style scoped lang="scss">
    @import "../css/base.scss";

    .temp {
        font-size: px2rem(40px);
        font-weight: bold;
        display: flex;
        flex-direction: column;
        width: px2rem(70px);
        align-items: center;

        .max {

        }

        .split {
            margin: px2rem(10px) 0;
            height: px2rem(2px);
            background: #000000;
            opacity: 0.1;
            width: 100%;
        }

        .min {
            opacity: 0.5;
        }
    }
</style>
