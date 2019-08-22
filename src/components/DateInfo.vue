<template>
    <div class="date">
        <span class="week-day">{{weekDay}}</span>
        <span class="formatted-date">{{formatDate}}</span>
    </div>
</template>

<script>
  import dateFns from 'date-fns';
  import zhCN from 'date-fns/locale/zh_cn';

  export default {
    name: "DateInfo",
    props: {date: String},
    computed: {
      weekDay: function () {
        if (dateFns.isToday(this.date)) {
          return '今天'
        } else if (dateFns.isYesterday(this.date)) {
          return '昨天'
        } else if (dateFns.isTomorrow(this.date)) {
          return '明天'
        } else {
          return dateFns.format(this.date, 'dddd', {locale: zhCN})
        }
      },

      formatDate: function () {
        return dateFns.format(this.date, 'MM/DD')
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../css/base.scss";

    .date {
        display: flex;
        flex-direction: column;
        align-items: center;

        .week-day {
            font-size: px2rem(32px);
            margin-bottom: px2rem(24px);
        }

        .formatted-date {
            color: #ffffff7f;
            font-size: px2rem(28px);
            padding: px2rem(6px) px2rem(18px);
            background: #00000019;
            border-radius: px2rem(24px);
        }
    }
</style>
