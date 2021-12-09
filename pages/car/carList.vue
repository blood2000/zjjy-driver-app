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
    </option-list>
  </div>
</template>


<script>
import optionList from "../../components/gzz-option-list/option-list.vue";
import { uniRequest } from "../../config/request";

export default {
  components: { optionList },
  data() {
    return {
      list: [],
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
  onLoad() {
    this.getList();
  },
  watch: {},
  methods: {
    async getList() {
      const config = {
        url: "jyzList",
        method: "GET",
      };
      const res = await uniRequest(config);
      if (res.statusCode !== 200) return;
      console.log("res1111", res.data.data);
      this.list = res.data.data;
    },
    listDelete(item, index) {
      console.log("删除", item);
      uni.showModal({
        title: "提示",
        content: `确定要删除车辆【${item.license_number}】`,
        // showCancel: false,
        success: (res) => {
          console.log("res", res);
          if (res.confirm) {
            const config = {
              url: "delVehicleReDriver",
              method: "DELETE",
              querys: { vehicleCodes: item.code },
            };
            uniRequest(config).then((res) => {
              console.log("删除", res);
              this.getList();
            });
          }
        },
      });
    },
    listEdit(item) {
      console.log("编辑", item);
      const config = {
        url: "getByCode",
        method: "GET",
        params:{code:item.code}
      };
      uniRequest(config).then(res=>{
        console.log('获取详情',res)
        if(res.data.code == 200){
          const data = res.data.data
            uni.navigateTo({
          url: `./addCar?data=${JSON.stringify(data)}`,
        });
        }
      })
    },
    rowClick(item) {
      console.log("点击某一行");
      console.log(item);
    },
    optionClick(item, oItem) {
      console.log("点击某个操作按钮",item.license_number);
      console.log(item, oItem);
      if (oItem.text == "删除") {
        //这里直接根据text判断点击了哪个按钮，也可自自己增加唯一标识key，当然也可以自己在组件按需定义对应事件
        this.listDelete(item);
      } else if (oItem.text == "编辑") {
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
