  <template>
  <view class="page-carnumber-test">
    <view class="number-wrap">
      <CarNumber v-model="carNumber" />
    </view>
  </view>
</template>


<script>
import CarNumber from '@/components/codecook-carnumber/codecook-carnumber.vue';
export default {
  components: {
        CarNumber
      },
      data() {
        return {
          carNumber: '',
        }
      },
      watch: {
        carNumber(num) {
          console.log(num);
        },
      },
      methods: {
      },
      beforeMount() {
      },
};
</script>
  <style scoped lang="scss">
    .number-wrap {
      padding: 0 19rpx;
      padding-top: 323rpx;
    }
  </style>
