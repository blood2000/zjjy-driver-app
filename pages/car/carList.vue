  <template>
  <div>
    <div @click="add" class="add">新增车辆</div>
    <option-list
      :list="list"
      :threshold="threshold"
      @click="rowClick"
      @optionClick="optionClick"
      :options="options"
    >
      <!-- <template v-slot:default="{ item }">
        <view class="list-item">
          <image
            :src="item.img"
            @error="imageError($event, index)"
            mode="aspectFill"
          />
          <div class="list-item-content">
            <div class="list-item-content-top">
              <div>闽A54772</div>
              <img src="../../static/order/svip.png" alt="" />
            </div>
            <div class="list-item-content-bottom">车型：普通重型半挂车</div>
          </div>
        </view>
      </template> -->
    </option-list>
  </div>
</template>


<script>
import optionList from "../../components/gzz-option-list/option-list.vue";

export default {
  components: { optionList },
  data() {
    return {
      list: [
        {
          id: 1,
          img: "dfaf.png",
          text: "Senior Product Designer1",
        },
        {
          id: 2,
          img: "https://zos.alipayobjects.com/rmsportal/EMQSSlFQtGYEnWx.png",
          text: "Senior Product Designer2",
        },
        {
          id: 3,
          img: "https://zos.alipayobjects.com/rmsportal/OCuGZXfRioLyhKF.png",
          text: "Senior Product Designer3",
        },
        {
          id: 4,
          img: "https://zos.alipayobjects.com/rmsportal/agzYYwzggpOjqge.png",
          text: "Senior Product Designer4",
        },
      ],
      options: [
        //左滑的操作列表
        {
          color: "#ffffff",
          bgColor: "#409EFF",
          text: "编辑",
          width: 120,
        },
        {
          color: "#ffffff", //字体颜色，非必须，默认 #ffffff
          bgColor: "#FF4058", //背景颜色，非必须，默认 #409EFF
          text: "删除", //展示文字
          width: 120, //按钮宽度 默认120rpx 适合两个字的宽度 这个宽度按需调整
        },
      ],
      threshold: 50,
    };
  },
  watch: {},
  methods: {
    listDelete(item, index) {
      console.log("删除");
      // console.log(item);
      // this.list.splice(index, 1);
    },
    listEdit(item) {
      console.log("编辑");
      console.log(item);
    },
    rowClick(item) {
      console.log("点击某一行");
      console.log(item);
    },
    optionClick(item, oitem) {
      console.log("点击某个操作按钮");
      console.log(item, oitem);
      if (oitem.text == "删除") {
        //这里直接根据text判断点击了哪个按钮，也可自自己增加唯一标识key，当然也可以自己在组件按需定义对应事件
        this.listDelete(item);
      } else if (oitem.text == "编辑") {
        this.listEdit(item);
      }
    },
    add() {
      uni.navigateTo({
        url: "./addCar",
      });
    },
  },
  beforeMount() {},
};
</script>
  <style scoped lang="scss">
//scoped 在当前页生效 不影响子组件
.add {
  width: 100%;
  height: 80rpx;
  background: #67c23a;
  color: #fff;
  font-size: 36rpx;
  text-align: center;
  line-height: 80rpx;
}
</style>
