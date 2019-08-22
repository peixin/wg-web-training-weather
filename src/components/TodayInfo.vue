<template>
    <div class="today-info">
        <img class="icon" :src="`./images/${$getProperty(info, 'code', 999)}.svg`"/>
        <div class="info">
            <div class="left">
                <span class="temp-now du">{{$getProperty(info, 'temperature')}}</span>
            </div>
            <div class="right">
                <span class="text">{{$getProperty(info, 'text')}}</span>
                <div class="temp">
                    <span class="temp-max du">{{$getProperty(info, 'temperatureMax')}}</span>
                    <span class="temp-min du">{{$getProperty(info, 'temperatureMin')}}</span>
                </div>
            </div>
        </div>
        <span class="qir-quality">空气质量 {{$getProperty(info, 'airQuality')}}</span>
    </div>
</template>

<script>
  export default {
    name: "TodayInfo",
    props: {
      info: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "../css/base.scss";

    .today-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .icon {
            width: px2rem(120px);
            height: px2rem(120px);
        }

        .info {
            font-size: px2rem(40px);
            margin: px2rem(19px) 0 px2rem(13px) 0;
            display: flex;
            justify-items: flex-end;

            .left {
                display: flex;
                align-items: flex-end;

                .temp-now {
                    font-size: px2rem(200px);
                }
            }

            .right {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-bottom: px2rem(35px);
                font-size: px2rem(40px);

                .text {

                }

                .temp {
                    .temp-max {
                    }

                    .temp-min {
                        opacity: 0.5;
                    }
                }
            }
        }

        .qir-quality {
            font-size: px2rem(32px);
            background: linear-gradient(to right, #b5eb45, #7ed321);
            border-radius: px2rem(3px);
            padding: px2rem(16px);
        }
    }
</style>
