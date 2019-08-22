<template>
    <div :class="$classnames('main', {'bg-rain': true})">
        <div class="location-area">
            <img class="location-icon" src="./images/location.svg">
            <span class="title">{{$getProperty(weatherData.basic, 'location', '天气')}}</span>
        </div>

        <div class="content">
            <today-info class="area1" :info="todayInfo"></today-info>
            <div class="area2 daily-forecast card">
                <daily-item v-for="forecast in weatherData.daily_forecast"
                            :key="weatherData.daily_forecast.date"
                            :forecast="forecast">
                </daily-item>
            </div>

            <div class="area3 card info item">
                <img class="icon" src="./images/ic_weather_wind.png"/>
                <span class="name">{{$getProperty(weatherData.now, 'wind_dir')}}</span>
                <span class="value">{{$getProperty(weatherData.now, 'wind_sc')}}级</span>
            </div>

            <div class="area4 card info item">
                <img class="icon" src="./images/ic_weather_humidity.png"/>
                <span class="name">湿度</span>
                <span class="value">{{$getProperty(weatherData.now,'hum')}}}%</span>
            </div>

            <div class="area5 card info item">
                <img class="icon" src="./images/ic_weather_small_sun.png"/>
                <span class="name">UV</span>
                <span class="value">{{uvLevel}}</span>
            </div>

            <div class="area6 card aq-info">
                <div class="info">
                    <span class="aq-name">CO</span>
                    <span class="aq-value">{{$getProperty(airQuality.air_now_city,'co')}}</span>
                    <span class="aq-unit">(PPM)</span>
                </div>
                <div class="info">
                    <span class="aq-name">CO2</span>
                    <span class="aq-value">{{$getProperty(airQuality.air_now_city,'no2')}}</span>
                    <span class="aq-unit">(PPM)</span>
                </div>
                <div class="info">
                    <span class="aq-name">PM2.5</span>
                    <span class="aq-value">{{$getProperty(airQuality.air_now_city,'pm25')}}</span>
                    <span class="aq-unit">(PPM)</span>
                </div>
                <div class="info">
                    <span class="aq-name">PM10</span>
                    <span class="aq-value">{{$getProperty(airQuality.air_now_city,'pm10')}}</span>
                    <span class="aq-unit">(PPM)</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import DailyItem from "./components/DailyItem";
  import TodayInfo from "./components/TodayInfo";
  import {isSameDay} from 'date-fns'
  import {getWeatherAPIUrl} from "./utils";

  const CITY_ID = 'CN101110101';
  const API_KEY = 'ec6364c284ec42e0891ba2bba140141b';

  export default {
    name: "App",
    components: {TodayInfo, DailyItem},
    data: function () {
      return {
        weatherData: {},
        airQuality: {},
        todayInfo: undefined,
      }
    },

    created() {
      this.getWeatherData();
    },

    methods: {
      setupTodayInfo: function () {
        this.todayInfo = {
          code: this.weatherData.now.cond_code,
          text: this.weatherData.now.cond_txt,
          temperature: this.weatherData.now.tmp,
          temperatureMax: this.$getProperty(this.todayForecast, 'tmp_max'),
          temperatureMin: this.$getProperty(this.todayForecast, 'tmp_min'),
          airQuality: this.airQuality.air_now_city.qlty
        };
      },

      getWeatherData: function () {
        Promise.all([
          fetch(getWeatherAPIUrl('weather', CITY_ID, API_KEY)).then(response => response.json()),
          fetch(getWeatherAPIUrl('air', CITY_ID, API_KEY)).then(response => response.json())
        ])
          .then(([weatherResponse, airResponse]) => {
            this.weatherData = weatherResponse['HeWeather6'][0];
            this.airQuality = airResponse['HeWeather6'][0];
            this.setupTodayInfo();
          })
          .catch(() => fetch('/weather_test_data.json')
            .then(response => response.json()).then()
            .then(json => {
              this.weatherData = json['payload']['normalWeatherDto']['HeWeather6'][0];
              this.airQuality = json['payload']['airDto']['HeWeather6'][0];
              this.setupTodayInfo();
            })
          )
          .catch(console.error);
      }
    },

    computed: {
      todayForecast: function () {
        if (!this.weatherData.daily_forecast) {
          return null
        }
        let today = this.weatherData.daily_forecast.find(item => isSameDay(item.date, new Date()));
        if (!today) {
          null
        }
        return today;
      },
      uvLevel: function () {
        let today = this.todayForecast;
        if (!today) {
          return '-'
        }
        if (today.uv_index <= 2) {
          return '弱';
        } else if (today.uv_index > 2 && today.uv_index <= 5) {
          return '中';
        } else if (today.uv_index > 5 && today.uv_index <= 7) {
          return '强';
        } else if (today.uv_index > 7 && today.uv_index <= 10) {
          return '甚强';
        } else if (today.uv_index > 10) {
          return '极强';
        } else {
          return '-';
        }
      }
    },
  }
</script>


<style scoped lang="scss">
    @import "./css/mixin";

    .main {
        background: white url("./images/bg_other.png") no-repeat fixed center;
        background-size: cover;
        color: #ffffff;
        width: 100%;
        height: 100%;

        &.bg-rain {
            background-image: url("./images/bg_rain.png");
        }

        &.bg-snow {
            background-image: url("./images/bg_snow.png");
        }

        &.bg-sunny {
            background-image: url("./images/bg_fine.png");
        }
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: px2rem(32px);
        width: calc(100% - #{px2rem(64px)});
        height: calc(100% - #{px2rem(64px)});

        .location-area {
            display: flex;
            align-items: center;
            margin-bottom: px2rem(44px);

            .location-icon {
                width: px2rem(24px);
                height: px2rem(25px);
                margin-right: px2rem(8px);

                path {
                    fill: #ffffff;
                    background-color: #000;
                }
            }

            .title {
                color: #fff;
                font-size: px2rem(32px);
                font-weight: bold;
            }
        }

        .content {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 5fr;
            grid-template-rows: 3fr 1fr;
            grid-gap: px2rem(32px);
            width: calc(100% - #{px2rem(64px)});

            .area1 {
                grid-row: 1 / 2;
                grid-column: 1 / span 3;
                justify-content: flex-end;
                margin-bottom: px2rem(112px);
            }

            .area2 {
                grid-row: 1 / 2;
                grid-column: 4 / 5;
            }

            .area3 {
                grid-row: 2 / 3;
                grid-column: 1 / 2;
            }

            .area4 {
                grid-row: 2 / 3;
                grid-column: 2 / 3;
            }

            .area5 {
                grid-row: 2 / 3;
                grid-column: 3 / 4;
            }

            .area6 {
                grid-row: 2 / 3;
                grid-column: 4 / 5;
            }

            .daily-forecast {
                flex: 3;
                padding: px2rem(66px) px2rem(50px);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .info {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .icon {

                }

                .name {
                    font-size: px2rem(26px);
                    opacity: 0.5;
                    margin: px2rem(23px) 0 px2rem(8px) 0;
                }

                .value {
                    font-size: px2rem(32px);
                }

                .aq-name {
                    font-size: px2rem(40px);
                    opacity: 0.5;
                }

                .aq-value {
                    font-size: px2rem(40px);
                    font-weight: bold;
                    margin: px2rem(6px) 0;
                }

                .aq-unit {
                    font-size: px2rem(26px);
                    opacity: 0.5;
                }
            }

            .aq-info {
                display: flex;
                padding: px2rem(42px) px2rem(99px);
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>
