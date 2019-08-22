<template>
    <div class="daily-item">
        <date-info :date="forecast.date"></date-info>
        <weather-icon :code="forecast.cond_code_d" :text="forecast.cond_txt_d"></weather-icon>
        <temperature :max="forecast.tmp_max" :min="forecast.tmp_min"></temperature>
    </div>
</template>

<script>
  import WeatherIcon from "./WeatherIcon";
  import Temperature from "./Temperature";
  import DateInfo from "./DateInfo";

  export default {
    name: "DailyItem",
    components: {DateInfo, Temperature, WeatherIcon},
    props: {
      forecast: {
        type: Object,
        default: () => {
        },
      }
    },

    methods: {},
  }
</script>

<style scoped lang="scss">
    @import "../css/base.scss";

    .daily-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
