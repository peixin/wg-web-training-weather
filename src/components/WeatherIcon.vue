<template>
    <div class="weather">
        <img class="weather-icon" :src="`./images/${code}.svg`"/>
        <span class="weather-desc">{{text}}</span>
    </div>
</template>

<script>
  export default {
    name: "WeatherIcon",

    props: {
      code: {
        type: String,
        default: '100',
      },
      text: {
        type: String,
        default: '晴天',
      }
    },
  }
</script>

<style scoped lang="scss">
    @import "../css/base.scss";

    .weather {
        margin: px2rem(90px) 0 px2rem(70px) 0;
        display: flex;
        flex-direction: column;
        align-items: center;

    .weather-icon {
        width: px2rem(80px);
        height: px2rem(80px);
    }

    .weather-desc {
        font-size: px2rem(28px);
        margin-top: px2rem(16px);
    }
    }
</style>
